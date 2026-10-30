import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { Icon } from './icon';
import { LibraryService } from '../services/library.service';
import { ToastService } from '../services/toast.service';

export type HeaderView = 'library' | 'favorites';

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  readonly view = input.required<HeaderView>();
  readonly viewChange = output<HeaderView>();

  protected readonly menuOpen = signal(false);

  private readonly library = inject(LibraryService);
  private readonly toast = inject(ToastService);

  protected readonly favoritesCount = computed(() => this.library.favorites().size);

  protected selectView(view: HeaderView): void {
    this.viewChange.emit(view);
    this.menuOpen.set(false);
  }

  protected myPrompts(): void {
    this.toast.show(
      'เดโมนี้ยังไม่รองรับการบันทึกพรอมต์ของคุณ — ส่วนนี้กำลังจะมาเร็ว ๆ นี้',
      'info'
    );
    this.menuOpen.set(false);
  }

  protected createPrompt(): void {
    this.toast.show(
      'โหมดสร้างพรอมต์เองยังไม่พร้อมในเดโมนี้ ลองเลือกใช้พรอมต์จากคลังด้านล่างได้เลย',
      'info'
    );
    this.menuOpen.set(false);
  }
}
