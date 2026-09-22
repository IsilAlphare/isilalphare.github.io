import test from 'node:test';
import assert from 'node:assert/strict';
import { musicGroups, musicArtists } from '../src/data/music.ts';
import audit from '../src/data/musicPlayback.json' with { type: 'json' };
const key = song => JSON.stringify([song.title, song.artists]);
test('every curated recording has exactly one audit decision', () => {
  const expected = new Set([...musicGroups, ...musicArtists].flatMap(group => group.tracks).map(key));
  assert.equal(audit.tracks.length, expected.size);
  assert.deepEqual(new Set(audit.tracks.map(key)), expected);
  for (const song of audit.tracks) assert.ok(['verified', 'unavailable', 'unmatched', 'unverified'].includes(song.status));
});
test('playable recordings have full anonymous audio and repeated successful probes', () => {
  for (const song of audit.tracks.filter(song => song.status === 'verified')) {
    assert.ok(Number.isSafeInteger(song.id) && song.id > 0);
    assert.ok([0, 8].includes(song.fee));
    assert.equal(song.apiCode, 200);
    assert.equal(song.trial, false);
    assert.ok(song.durationMs > 0 && song.audioDurationMs >= song.durationMs - 3000);
    assert.deepEqual(song.checks, [true, true, true]);
  }
});
test('audit never persists expiring audio URLs or credentials', () => {
  assert.doesNotMatch(JSON.stringify(audit), /https?:|cookie|token|_cdn/i);
});
