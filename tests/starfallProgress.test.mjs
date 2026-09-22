import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readingPosition } from '../src/lib/starfallProgress.mjs';
test('船停在航道端点且随倒退滚动返回', () => {
  assert.deepEqual(readingPosition(-300,[40,540,1240]),{y:40,index:0});
  assert.deepEqual(readingPosition(2000,[40,540,1240]),{y:1240,index:2});
  assert.deepEqual(readingPosition(890,[40,540,1240]),{y:890,index:2});
  assert.deepEqual(readingPosition(400,[40,540,1240]),{y:400,index:1});
  assert.deepEqual(readingPosition(41,[40,540,1240]),{y:41,index:0});
});
test('空航道和单节点均有稳定位置',()=>{
  assert.deepEqual(readingPosition(40,[]),{y:0,index:0});
  assert.deepEqual(readingPosition(900,[80]),{y:80,index:0});
});
