import { getArticleCounter } from '@waline/api';
import { walineServerURL } from './comments';
import { STARLIGHT_PATH, counterValue } from './commentIdentity.mjs';
export function showStarlightCount(value:number|null){
  document.querySelectorAll<HTMLElement>('[data-starlight-count]').forEach(node=>{
    node.textContent=value===null?'…':value.toLocaleString('zh-CN');
    node.title=value===null?'暂时无法读取星光计数':'';
  });
}
export async function refreshStarlightCount(){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),12000);
  try{
    const data=await getArticleCounter({serverURL:walineServerURL,lang:'zh-CN',paths:[STARLIGHT_PATH],type:['reaction0'],signal:controller.signal});
    showStarlightCount(counterValue(data));
  }catch{showStarlightCount(null);}finally{clearTimeout(timeout);}
}
export async function leaveStarlight(){
  // Waline's update helper has no signal option. Bound the request without retries:
  // a lost response does not prove that the server rejected the write.
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  let result;
  try{
    const response=await fetch(`${walineServerURL}/api/article?lang=zh-CN`,{
      method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,
      body:JSON.stringify({path:STARLIGHT_PATH,type:'reaction0',action:'inc'}),
    });
    if(!response.ok)throw new Error('Star request failed');
    const payload=await response.json();
    if(payload.errno)throw new Error('Star request rejected');
    result=payload.data;
  }finally{clearTimeout(timeout);}
  // Do not retry a successful write just because refreshing its count fails.
  try{showStarlightCount(counterValue(result));}catch{void refreshStarlightCount();}
}
