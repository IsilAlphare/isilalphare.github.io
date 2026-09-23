import test from 'node:test';
import assert from 'node:assert/strict';
import { createNavigationFeedback } from '../src/lib/navigationFeedback.mjs';
function harness() {
  const updates=[];const timers=new Map();let id=0;
  const feedback=createNavigationFeedback({
    show:state=>updates.push(state), hide:()=>updates.push(null),
    setTimer:fn=>{timers.set(++id,fn);return id;}, clearTimer:id=>timers.delete(id),
  });
  return {feedback,updates,timers};
}
test('navigation responds immediately and finishes without waiting for resources',()=>{
  const {feedback,updates,timers}=harness();
  const signal=new AbortController();
  feedback.start('收藏馆',signal.signal);
  assert.deepEqual(updates.at(-1),{label:'收藏馆',slow:false});
  feedback.finish();
  assert.equal(updates.at(-1),null);assert.equal(timers.size,0);
});
test('an aborted older navigation cannot clear the next navigation',()=>{
  const {feedback,updates}=harness();
  const a=new AbortController(),b=new AbortController();
  feedback.start('文章',a.signal);feedback.start('关于',b.signal);
  a.abort();assert.equal(updates.at(-1).label,'关于');
  b.abort();assert.equal(updates.at(-1),null);
});
test('slow requests keep honest feedback and cancellation clears the timer',()=>{
  const {feedback,updates,timers}=harness();const a=new AbortController();
  feedback.start('旅途拾光',a.signal);
  for(const fn of [...timers.values()])fn();
  assert.deepEqual(updates.at(-1),{label:'旅途拾光',slow:true});
  a.abort();assert.equal(updates.at(-1),null);assert.equal(timers.size,0);
});
