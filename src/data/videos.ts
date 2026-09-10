import type { VideoItem } from '../types';

/**
 * VIDEO LIBRARY.
 *
 * No official Thrive Pakistan videos are published yet, so the library is
 * intentionally empty. When official event films and session recordings
 * exist they will be added here (or served by `/api/videos.php`) and the
 * page will pick them up automatically.
 *
 * Never publish invented view counts, dates or event footage.
 */
export const VIDEOS: VideoItem[] = [];

export const VIDEO_CATEGORIES = ['FutureX', 'Sessions', 'Interviews', 'Event Highlights'] as const;
