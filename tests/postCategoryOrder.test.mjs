import test from 'node:test';
import assert from 'node:assert/strict';
import { sortCategoriesByLatestPost } from '../src/lib/postCategoryOrder.mjs';
const post = date => ({ data: { date: new Date(date) } });
test('newest post determines category order, including unsorted posts and empty categories', () => {
  const groups = [
    { key: 'empty', posts: [] },
    { key: 'tech', posts: [post('2025-01-01'), post('2026-09-22')] },
    { key: 'life', posts: [post('2026-09-24')] },
    { key: 'echo', posts: [post('2026-03-13')] },
  ];
  assert.deepEqual(sortCategoriesByLatestPost(groups).map(x => x.key), ['life', 'tech', 'echo', 'empty']);
  assert.equal(groups[0].key, 'empty');
});
test('equal dates preserve existing category order', () => {
  const groups = ['tech', 'life', 'echo'].map(key => ({ key, posts: [post('2026-09-24')] }));
  assert.deepEqual(sortCategoriesByLatestPost(groups).map(x => x.key), ['tech', 'life', 'echo']);
});
