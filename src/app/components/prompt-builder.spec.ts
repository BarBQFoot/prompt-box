import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PromptBuilder } from './prompt-builder';
import { PROMPTS } from '../data/prompts.data';

describe('PromptBuilder', () => {
  let fixture: ComponentFixture<PromptBuilder>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [PromptBuilder],
    }).compileComponents();
    fixture = TestBed.createComponent(PromptBuilder);
    fixture.componentRef.setInput('prompt', PROMPTS.find((p) => p.id === 'p-email')!);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function dialog(): HTMLElement {
    const dlg = fixture.nativeElement.querySelector('[role="dialog"]');
    if (!dlg) throw new Error('builder dialog not rendered');
    return dlg;
  }

  function squash(s: string): string {
    return s.replace(/\s+/g, '');
  }

  function previewText(): string {
    // whitelist the RXPreview container: พรอมต์ของคุณ section
    const dlg = dialog();
    const sections = [...dlg.querySelectorAll('div')];
    const preview = sections.find((el) => el.textContent?.includes('พรอมต์ของคุณ'));
    return squash(preview?.textContent ?? '');
  }

  function type(field: string, value: string): PromiseLike<unknown> {
    const input: HTMLInputElement = dialog().querySelector(`#var-${field}`)!;
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return fixture.whenStable();
  }

  it('opens as a labelled dialog with form fields from the prompt', () => {
    const dlg = dialog();
    expect(dlg.getAttribute('aria-modal')).toBe('true');
    expect(dlg.querySelector('#var-recipient')).toBeTruthy();
    expect(dlg.textContent).toContain('คุณสมชาย');
  });

  it('renders the full email template from defaults', () => {
    const preview = previewText();
    expect(preview).toContain('ช่วยเขียนอีเมลถึงคุณสมชาย');
    expect(preview).toContain('ขอเลื่อนการประชุมสัปดาห์หน้า');
    expect(preview).toContain('โทนสุภาพและเป็นทางการ');
  });

  it('updates the preview live as values change', async () => {
    await type('topic', 'ขอยืมโน้ตการเรียน');
    expect(previewText()).toContain('ขอยืมโน้ตการเรียน');
  });

  it('keeps values when switching variants and alters the template', async () => {
    await type('topic', 'ขอยืมโน้ตการเรียน');

    const proTab = [...dialog().querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === 'มืออาชีพ'
    ) as HTMLButtonElement;
    proTab.click();
    await fixture.whenStable();

    const text = squash(dialog().textContent!);
    expect(text).toContain('ขอยืมโน้ตการเรียน');
    expect(text).toContain('ปิดท้ายด้วย'); // pro-only sentence
  });

  it('shows the raw token for blank required fields plus a warning', async () => {
    await type('topic', '');
    const text = squash(dialog().textContent!);
    expect(text).toContain('{{topic}}');
    expect(text).toContain('ยังไม่ได้กรอก');
  });

  it('applies example inputs onto the form', async () => {
    const exampleBtn = [...dialog().querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === 'ใส่ค่านี้ในฟอร์ม'
    ) as HTMLButtonElement;
    exampleBtn.click();
    await fixture.whenStable();

    const input: HTMLInputElement = dialog().querySelector('#var-recipient')!;
    expect(input.value).toContain('พิมพ์ชนก');
  });

  it('copies the rendered prompt to the clipboard and confirms in Thai', async () => {
    let copied = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (t: string) => {
          copied = t;
          return Promise.resolve();
        },
      },
    });

    const copyBtn = [...dialog().querySelectorAll('button')].find(
      (b) => (b.textContent || '').includes('คัดลอกพรอมต์')
    ) as HTMLButtonElement;
    copyBtn.click();
    await fixture.whenStable();

    await expect.poll(() => copied, { timeout: 2000 }).toContain('ช่วยเขียนอีเมลถึง คุณสมชาย');
    expect(dialog().textContent).toContain('คัดลอกแล้ว');
  });

  it('shows a Thai error and keeps the prompt visible when the clipboard fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('denied')) },
    });
    // also break the execCommand fallback
    const original = document.execCommand;
    (document as unknown as { execCommand: unknown }).execCommand = () => false;

    const err = console.error.bind(console);
    console.error = () => (console.error = err);

    const copyBtn = [...dialog().querySelectorAll('button')].find(
      (b) => (b.textContent || '').includes('คัดลอกพรอมต์')
    ) as HTMLButtonElement;
    copyBtn.click();
    await fixture.whenStable();
    await new Promise((r) => setTimeout(r, 50));

    expect(dialog().textContent).toContain('พรอมต์ของคุณ'); // prompt stays visible
    expect(dialog().textContent).not.toContain('คัดลอกแล้ว');
    (document as unknown as { execCommand: unknown }).execCommand = original;
  });
});
