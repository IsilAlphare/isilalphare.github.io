import audit from '../data/musicPlayback.json';

export function playableSong(title: string, artists: string) {
  return audit.tracks.find(song => song.title === title && song.artists === artists && song.status === 'verified');
}
