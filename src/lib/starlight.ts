import { getArticleCounter, updateArticleCounter } from '@waline/api';
import { walineServerURL } from './comments';
import { STARLIGHT_PATH, counterValue } from './commentIdentity.mjs';
export function showStarlightCount(value:number|null){
  document.querySelectorAll<HTMLElement>('[data-starlight-count]').forEach(node=>{
    node.textContent=value===null?'…':value.toLocaleString('zh-CN');
    node.title=value===null?'暂时无法读取星光计数':'';
  });
}
export async function refreshStarlightCount(){
  try{
    const data=await getArticleCounter({serverURL:walineServerURL,lang:'zh-CN',paths:[STARLIGHT_PATH],type:['reaction0'],signal:AbortSignal.timeout(12000)});
    showStarlightCount(counterValue(data));
  }catch{showStarlightCount(null);}
}
export async function leaveStarlight(){
  const result=await updateArticleCounter({serverURL:walineServerURL,lang:'zh-CN',path:STARLIGHT_PATH,type:'reaction0',action:'inc'});
  // Do not retry a successful write just because refreshing its count fails.
  try{showStarlightCount(counterValue(result));}catch{void refreshStarlightCount();}
}
