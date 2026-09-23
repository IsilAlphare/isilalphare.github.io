import { getArticleCounter } from '@waline/api';
import { walineServerURL } from './comments';
import { STARLIGHT_PATH, counterValue } from './commentIdentity.mjs';
import { createStarlightCache } from './starlightCache.mjs';
const countCacheKey='starry-dome:count:v1:'+walineServerURL;
function showStarlightCount(record?: {value:number;at:number}){
  document.querySelectorAll<HTMLElement>('[data-starlight-count]').forEach(node=>{
    const value=node.querySelector<HTMLElement>('[data-count-value]')!;
    const fallback=node.querySelector<HTMLElement>('[data-count-fallback]')!;
    value.hidden=!record;fallback.hidden=Boolean(record);
    if(record){
      value.querySelector('em')!.textContent=record.value.toLocaleString('zh-CN');
      node.title='最近成功更新：'+new Date(record.at).toLocaleString('zh-CN');
    }else node.title='计数会在连接成功后显示';
  });
}
const counter=createStarlightCache({
  read:()=>JSON.parse(localStorage.getItem(countCacheKey)||'null'),
  write:(record:{value:number;at:number})=>localStorage.setItem(countCacheKey,JSON.stringify(record)),
  onChange:showStarlightCount,
  request:async()=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),8000);
    try{
      const data=await getArticleCounter({serverURL:walineServerURL,lang:'zh-CN',paths:[STARLIGHT_PATH],type:['reaction0'],signal:controller.signal});
      return counterValue(data);
    }finally{clearTimeout(timeout);}
  },
});
// Called once the companion is visible, even while its letter dialog is closed.
// Cached data renders synchronously; route changes reuse one in-flight request.
export function refreshStarlightCount(){return counter.refresh();}
export async function leaveStarlight(){
  // Waline's update helper has no signal option. Bound the request without retries:
  // a lost response does not prove that the server rejected the write.
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  let result;
  try{
    const response=await fetch(`${walineServerURL}/api/article?lang=zh-CN`,{
      method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},signal:controller.signal,
      body:JSON.stringify({path:STARLIGHT_PATH,type:'reaction0',action:'inc'}),
    });
    if(!response.ok)throw new Error('Star request failed');
    const payload=await response.json();
    if(payload.errno)throw new Error('Star request rejected');
    result=payload.data;
  }finally{clearTimeout(timeout);}
  // Do not retry a successful write just because refreshing its count fails.
  try{counter.accept(counterValue(result));}catch{void refreshStarlightCount();}
}
