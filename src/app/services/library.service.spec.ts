import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function create() {
    return TestBed.inject(LibraryService);
  }

  it('starts with no favorites on a clean storage', () => {
    const service = create();
    expect(service.favorites().size).toBe(0);
  });

  it('toggles favorites and persists them', () => {
    const service = create();
    service.toggleFavorite('p-email');
    expect(service.isFavorite('p-email')).toBe(true);
    expect(JSON.parse(localStorage.getItem('promptbox.favorites')!)).toEqual(['p-email']);

    service.toggleFavorite('p-email');
    expect(service.isFavorite('p-email')).toBe(false);
    expect(JSON.parse(localStorage.getItem('promptbox.favorites')!)).toEqual([]);
  });

  it('records last-used timestamps', () => {
    const service = create();
    service.touch('p-email');
    expect(service.lastUsed()['p-email']).toBeGreaterThan(0);
  });

  it('keeps working when localStorage is unavailable', () => {
    const spy = vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new Error('blocked');
    });
    try {
      const service = create();
      expect(service.favorites().size).toBe(0);
      expect(() => service.toggleFavorite('p-email')).not.toThrow();
      expect(service.isFavorite('p-email')).toBe(true);
    } finally {
      spy.mockRestore();
    }
  });
});
