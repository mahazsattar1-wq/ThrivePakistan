import { EVENTS } from '../data/events';
import { SPEAKERS } from '../data/speakers';
import { PROGRAMS } from '../data/programs';
import { BLOGS } from '../data/blogs';
import { VIDEOS } from '../data/videos';
import type { SearchResults } from '../types';
import { delay } from './api';

const has = (haystack: string, needle: string): boolean => haystack.toLowerCase().includes(needle);

/** Global search across every content type (mock sources today). */
export async function searchAll(rawQuery: string): Promise<SearchResults> {
  const query = rawQuery.trim();
  await delay(220);
  if (!query) {
    return { query, events: [], speakers: [], programs: [], blogs: [], videos: [], total: 0 };
  }
  const q = query.toLowerCase();
  const events = EVENTS.filter((e) => has(`${e.title} ${e.category} ${e.city} ${e.description} ${e.tags.join(' ')}`, q));
  const speakers = SPEAKERS.filter((s) => has(`${s.name} ${s.title} ${s.organization} ${s.topics.join(' ')} ${s.expertise.join(' ')}`, q));
  const programs = PROGRAMS.filter((p) => has(`${p.title} ${p.category} ${p.description}`, q));
  const blogs = BLOGS.filter((b) => has(`${b.title} ${b.excerpt} ${b.category} ${b.tags.join(' ')} ${b.author}`, q));
  const videos = VIDEOS.filter((v) => has(`${v.title} ${v.description} ${v.category}`, q));
  return {
    query,
    events,
    speakers,
    programs,
    blogs,
    videos,
    total: events.length + speakers.length + programs.length + blogs.length + videos.length,
  };
}
