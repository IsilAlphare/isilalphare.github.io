const { test } = require('node:test');
const assert = require('node:assert/strict');
const avatarUrl = require('../services/waline/avatar.cjs');

test('anonymous comments without email always have a usable avatar URL', () => {
  for (const mail of [undefined, null, '']) {
    assert.equal(avatarUrl({ nick: '路过的朋友', mail }), 'https://seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e');
  }
});
test('email hashing normalizes whitespace and case', () => {
  assert.equal(avatarUrl({ mail: ' Person@Example.COM ' }), avatarUrl({ mail: 'person@example.com' }));
});
test('QQ avatars keep the existing nickname and email behavior', () => {
  assert.equal(avatarUrl({ nick: '12345' }), 'https://q1.qlogo.cn/g?b=qq&nk=12345&s=100');
  assert.equal(avatarUrl({ nick: '朋友', mail: '12345@qq.com' }), 'https://q1.qlogo.cn/g?b=qq&nk=12345&s=100');
});
