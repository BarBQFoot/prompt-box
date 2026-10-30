import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  closing?: boolean;
}

const LEAVE_MS = 190;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;

  readonly toasts = signal<readonly Toast[]>([]);

  show(message: string, type: ToastType = 'success'): void {
    const id = ++this.nextId;
    this.toasts.update((list) => [...list, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3400);
  }

  /** Marks the toast as leaving so it can animate out, then removes it. */
  dismiss(id: number): void {
    this.toasts.update((list) => {
      const toast = list.find((t) => t.id === id);
      if (!toast || toast.closing) return list;
      setTimeout(() => {
        this.toasts.update((current) => current.filter((t) => t.id !== id));
      }, LEAVE_MS);
      return list.map((t) => (t.id === id ? { ...t, closing: true } : t));
    });
  }
}
