import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon, IconName } from './icon';
import { Toast, ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast-area',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './toast-area.html',
})
export class ToastArea {
  private readonly toastService = inject(ToastService);

  protected readonly toasts = this.toastService.toasts;

  protected iconFor(type: Toast['type']): IconName {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  }

  protected colorFor(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'text-emerald-400';
      case 'error':
        return 'text-rose-400';
      default:
        return 'text-brand-300';
    }
  }

  protected dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
