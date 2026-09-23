import test from 'node:test';
import assert from 'node:assert/strict';
import { lightStarlight, hasLocalStarlight } from '../src/lib/starDelivery.mjs';
const tick = () => new Promise(resolve => setImmediate(resolve));
test('lights immediately, confirms later, and deduplicates navigation clicks', async () => {
  let state = {}; let finish; let requests = 0;
  const options = {key:'success',read:()=>state,write:value=>{state=value;},send:()=>{requests++;return new Promise(resolve=>{finish=resolve;});}};
  assert.equal(lightStarlight(options),true);
  assert.deepEqual(state,{lit:true,sync:'pending'});
  assert.equal(hasLocalStarlight('success',()=>state),true);
  assert.equal(lightStarlight(options),false);
  await tick();assert.equal(requests,1);
  state.nickname='retained';finish();await tick();
  assert.deepEqual(state,{lit:true,sync:'confirmed',nickname:'retained'});
});
test('failed delivery keeps the local star without claiming confirmation or retrying', async () => {
  let state={};let requests=0;
  const options={key:'failure',read:()=>state,write:value=>{state=value;},send:()=>{requests++;throw new Error('timeout');}};
  lightStarlight(options);await tick();
  assert.deepEqual(state,{lit:true,sync:'unconfirmed'});
  assert.equal(lightStarlight(options),false);assert.equal(requests,1);
});
test('blocked browser storage still deduplicates within this document', async () => {
  let requests=0;
  const options={key:'no-storage',read:()=>({}),write:()=>false,send:()=>{requests++;}};
  assert.equal(lightStarlight(options),true);
  assert.equal(lightStarlight(options),false);
  await tick();assert.equal(requests,1);
});
