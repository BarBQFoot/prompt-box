import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LibraryService {
  private static readonly FAVORITES_KEY = 'promptbox.favorites';
  private static readonly LAST_USED_KEY = 'promptbox.last-used';

  readonly favorites = signal<ReadonlySet<string>>(this.readSet(LibraryService.FAVORITES_KEY));
  readonly lastUsed = signal<Readonly<Record<string, number>>>(
    this.readRecord(LibraryService.LAST_USED_KEY)
  );

  isFavorite(id: string): boolean {
    return this.favorites().has(id);
  }

  toggleFavorite(id: string): void {
    const next = new Set(this.favorites());
    if (!next.delete(id)) {
      next.add(id);
    }
    this.favorites.set(next);
    this.write(LibraryService.FAVORITES_KEY, [...next]);
  }

  touch(id: string): void {
    const next = { ...this.lastUsed(), [id]: Date.now() };
    this.lastUsed.set(next);
    this.write(LibraryService.LAST_USED_KEY, next);
  }

  private readSet(key: string): ReadonlySet<string> {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return new Set();
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed)
        ? new Set(parsed.filter((v): v is string => typeof v === 'string'))
        : new Set();
    } catch {
      return new Set();
    }
  }

  private readRecord(key: string): Readonly<Record<string, number>> {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return {};
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return {};
      const out: Record<string, number> = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'number') out[k] = v;
      }
      return out;
    } catch {
      return {};
    }
  }

  private write(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage unavailable; keep the in-memory state for this session
    }
  }
}
