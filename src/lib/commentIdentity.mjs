export const GUESTBOOK_PATH = '/guestbook/';
export const STARLIGHT_PATH = '/__starlight__/';
export function commentPath(path) {
  const segments=path.split(/[?#]/)[0].split('/').filter(Boolean);
  return segments.length ? '/'+segments.join('/')+'/' : '/';
}
export function markedMessage(message, mark='✧') {
  const text=message.trim();
  if(!text || text.length>500) throw new Error('请填写 1–500 字的留言。');
  return (['✧','☾','❧','≈'].includes(mark)?mark:'✧')+'\n\n'+text;
}
export function counterValue(data) {
  const value=data?.[0]?.reaction0;
  if(typeof value!=='number' || !Number.isFinite(value) || value<0) throw new Error('星光计数暂不可用');
  return Math.floor(value);
}
