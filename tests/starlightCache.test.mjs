import test from 'node:test';
import assert from 'node:assert/strict';
import { createStarlightCache } from '../src/lib/starlightCache.mjs';
const tick=()=>new Promise(resolve=>setImmediate(resolve));
test('cached count displays immediately, concurrent pages share one refresh',async()=>{
 let resolve, calls=0;const shown=[];
 const cache=createStarlightCache({now:()=>1000000,read:()=>({value:8,at:1}),write:()=>{},onChange:r=>shown.push(r),request:()=>{calls++;return new Promise(r=>resolve=r);}});
 const first=cache.refresh();assert.equal(shown[0].value,8);
 const second=cache.refresh();assert.equal(first,second);
 await tick();assert.equal(calls,1);resolve(9);await first;
 assert.equal(cache.snapshot().value,9);
 await cache.refresh();assert.equal(calls,1);
});
test('first-visit failures leave no invented number and throttle retries',async()=>{
 let time=1000000,calls=0;
 const cache=createStarlightCache({now:()=>time,read:()=>null,write:()=>{},onChange:()=>{},request:()=>{calls++;throw Error('offline');}});
 await cache.refresh();assert.equal(cache.snapshot(),undefined);
 await cache.refresh();assert.equal(calls,1);
 time+=30001;await cache.refresh();assert.equal(calls,2);
});
test('stale zero remains visible on failure even if persistence is blocked',async()=>{
 const cache=createStarlightCache({now:()=>1000000,read:()=>({value:0,at:1}),write:()=>{throw Error('storage');},onChange:()=>{},request:()=>Promise.reject(Error('offline'))});
 await cache.refresh();assert.equal(cache.snapshot().value,0);
 cache.accept(3);assert.equal(cache.snapshot().value,3);
});
test('older pending GET cannot overwrite a confirmed increment',async()=>{
 let resolve;
 const cache=createStarlightCache({read:()=>null,write:()=>{},onChange:()=>{},request:()=>new Promise(r=>resolve=r)});
 const pending=cache.refresh();await tick();cache.accept(20);resolve(19);await pending;
 assert.equal(cache.snapshot().value,20);
});
test('invalid cache is ignored and a new document can reuse fresh stored data',async()=>{
 let calls=0;const base={now:()=>1000000,write:()=>{},onChange:()=>{},request:async()=>{calls++;return 7;}};
 const invalid=createStarlightCache({...base,read:()=>({value:-1,at:900000})});assert.equal(invalid.snapshot(),undefined);
 const valid=createStarlightCache({...base,read:()=>({value:7,at:900000})});await valid.refresh();assert.equal(calls,0);
});
