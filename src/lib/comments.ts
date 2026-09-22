const configured=(import.meta.env.PUBLIC_WALINE_SERVER_URL || '').trim();
if(configured){
  const url=new URL(configured);
  if(!['http:','https:'].includes(url.protocol))throw new Error('Invalid Waline server URL');
}
export const walineServerURL=configured.replace(/\/$/,'');
export const commentsEnabled=Boolean(walineServerURL);
export const interactionsVisible=commentsEnabled || import.meta.env.DEV;
