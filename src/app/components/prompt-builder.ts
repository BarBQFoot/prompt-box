import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Icon } from './icon';
import { CATEGORY_META } from './prompt-card';
import { LibraryService } from '../services/library.service';
import { ToastService } from '../services/toast.service';
import { Prompt, PromptExample, TemplateSegment } from '../models/prompt.model';
import { renderPlain, toSegments } from '../utils/prompt-template';

@Component({
  selector: 'app-prompt-builder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './prompt-builder.html',
})
export class PromptBuilder implements OnChanges, OnDestroy {
  readonly prompt = input<Prompt | null>(null);
  readonly closed = output<void>();

  protected readonly open = signal(false);
  protected readonly closing = signal(false);
  protected readonly variantId = signal('');
  protected readonly copied = signal(false);
  protected readonly formValues = signal<Record<string, string>>({});

  protected form: FormGroup<Record<string, FormControl<string>>> = new FormGroup({});

  private readonly toast = inject(ToastService);
  private readonly library = inject(LibraryService);

  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  private valueSub?: { unsubscribe: () => void };
  private closeTimer?: ReturnType<typeof setTimeout>;
  private copiedTimer?: ReturnType<typeof setTimeout>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prompt']) {
      this.handlePromptChange();
    }
  }

  ngOnDestroy(): void {
    this.valueSub?.unsubscribe();
    if (this.closeTimer) clearTimeout(this.closeTimer);
    if (this.copiedTimer) clearTimeout(this.copiedTimer);
    document.body.classList.remove('pb-locked');
  }

  protected close(): void {
    this.closed.emit();
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (!this.open()) return;
    if (event.key === 'Escape') {
      this.close();
      return;
    }
    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const root = this.panel()?.nativeElement;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    if (focusables.length === 0) return;

    const active = document.activeElement as HTMLElement | null;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && (active === first || active === null)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || active === null)) {
      event.preventDefault();
      first.focus();
    }
  }

  protected readonly categoryMeta = computed(() => {
    const p = this.prompt();
    return p ? CATEGORY_META[p.category] : CATEGORY_META.writing;
  });

  protected buildForm(p: Prompt): void {
    this.valueSub?.unsubscribe();
    const group: Record<string, FormControl<string>> = {};
    for (const v of p.variables) {
      group[v.key] = new FormControl(v.defaultValue ?? '', { nonNullable: true });
    }
    this.form = new FormGroup(group);
    this.formValues.set({ ...this.form.getRawValue() });
    this.valueSub = this.form.valueChanges.subscribe((vals) => {
      this.formValues.set({ ...(vals as Record<string, string>) });
    });
  }

  private handlePromptChange(): void {
    const p = this.prompt();
    if (p) {
      this.openBuilder(p);
    } else if (this.open()) {
      this.startClosing();
    }
  }

  private openBuilder(p: Prompt): void {
    this.open.set(true);
    this.closing.set(false);
    this.variantId.set(p.variants[0]?.id ?? '');
    this.buildForm(p);
    this.library.touch(p.id);
    document.body.classList.add('pb-locked');
    setTimeout(() => this.closeBtn()?.nativeElement.focus(), 40);
  }

  private startClosing(): void {
    this.closing.set(true);
    document.body.classList.remove('pb-locked');
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      this.open.set(false);
      this.closing.set(false);
      this.copied.set(false);
    }, 200);
  }

  protected readonly currentTemplate = () => {
    const p = this.prompt();
    if (!p) return '';
    const v = p.variants.find((x) => x.id === this.variantId());
    return v?.template ?? p.template;
  };

  protected readonly previewSegments = (): TemplateSegment[] =>
    toSegments(this.currentTemplate(), this.formValues());

  protected readonly renderedNow = (): string =>
    renderPlain(this.currentTemplate(), this.formValues());

  protected readonly missingCount = (): number => {
    const p = this.prompt();
    if (!p) return 0;
    const values = this.formValues();
    return p.variables.filter((v) => !(values[v.key] ?? '').trim()).length;
  };

  protected async copy(): Promise<void> {
    const text = this.renderedNow();
    let copied = false;

    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      try {
        this.legacyCopy(text);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (copied) {
      this.copied.set(true);
      const p = this.prompt();
      if (p) this.library.touch(p.id);
      this.toast.show('คัดลอกพรอมต์แล้ว นำไปวางใน AI ที่คุณใช้งานได้เลย', 'success');
      if (this.copiedTimer) clearTimeout(this.copiedTimer);
      this.copiedTimer = setTimeout(() => this.copied.set(false), 2200);
    } else {
      this.toast.show(
        'ไม่สามารถคัดลอกอัตโนมัติได้ โปรดลากเลือกข้อความใน "พรอมต์ของคุณ" แล้วคัดลอกเอง',
        'error'
      );
    }
  }

  private legacyCopy(text: string): void {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    if (!ok) throw new Error('execCommand failed');
  }

  protected labelOf(key: string): string {
    const v = this.prompt()?.variables.find((x) => x.key === key);
    return v?.label ?? key;
  }

  protected renderExample(example: PromptExample): string {
    const p = this.prompt();
    if (!p) return '';
    return renderPlain(p.template, example.inputs);
  }

  protected exampleChips(example: PromptExample): string[] {
    return Object.entries(example.inputs).map(([key, value]) => `${this.labelOf(key)}: ${value}`);
  }

  protected applyExample(example: PromptExample): void {
    this.form.patchValue(example.inputs);
    this.toast.show('ใส่ค่าจากตัวอย่างให้เรียบร้อยแล้ว ตัวอย่างที่เกี่ยวข้องจะปรับให้อัตโนมัติ', 'info');
  }
}
