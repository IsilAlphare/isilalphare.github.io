export interface TravelPhoto { id: string; originalName: string; alt: string; width: number; height: number; collage: boolean; }
export interface TravelEntry { slug: string; title: string; date: string; location: string; text: string; status: 'draft' | 'published'; recordId: string; assetFolder: string; extension: string; coverId: string; coverCaption: string; endText: string; photos: TravelPhoto[]; }
const entries = import.meta.glob<{default: TravelEntry}>('./travel/*.json', { eager: true });
export const trips = Object.values(entries).map(entry => entry.default).filter(entry => entry.status === 'published').sort((a,b)=>b.date.localeCompare(a.date));
