/**
 * API transport layer.
 *
 * Today the PHP endpoints in `public/api/` are safe placeholders, so every
 * service falls back to the local mock data. When the PHP/MySQL backend goes
 * live, the same endpoints start returning `{ ok: true, source: 'mysql' }`
 * and the frontend switches over with zero UI changes.
 */
import type { ApiListResponse } from '../types';

export const API_BASE = '/api';

export async function apiGet<T>(endpoint: string): Promise<ApiListResponse<T> | null> {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiListResponse<T>;
    if (!json || json.ok !== true || !Array.isArray(json.data) || json.data.length === 0) return null;
    return json;
  } catch {
    return null;
  }
}

export async function apiPost(endpoint: string, payload: unknown): Promise<{ ok: boolean; message: string } | null> {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { ok: boolean; message: string };
    return json && typeof json.ok === 'boolean' ? json : null;
  } catch {
    return null;
  }
}

/** Simulated network latency so loading states are exercised in the prototype. */
export const delay = (ms = 280): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
