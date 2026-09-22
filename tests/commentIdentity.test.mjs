import test from 'node:test';
import assert from 'node:assert/strict';
import { commentPath, markedMessage, counterValue } from '../src/lib/commentIdentity.mjs';
test('same page variants share comments, different trips remain separate',()=>{
  assert.equal(commentPath('/posts/a'),commentPath('/posts/a/?q=1#comments'));
  assert.notEqual(commentPath('/travel/a/'),commentPath('/travel/b/'));
  assert.equal(commentPath('/'),'/');
  assert.equal(commentPath('/?from=home#top'),'/');
});
test('blank and oversized messages are rejected; marks are restricted',()=>{
  assert.throws(()=>markedMessage('  '));
  assert.throws(()=>markedMessage('a'.repeat(501)));
  assert.equal(markedMessage(' hello ','<script>'),'✧\n\nhello');
});
test('zero is valid, missing counters must not appear as zero',()=>{
  assert.equal(counterValue([{reaction0:0}]),0);
  assert.throws(()=>counterValue([]));
  assert.throws(()=>counterValue([{reaction0:-1}]));
});
