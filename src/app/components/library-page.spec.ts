import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LibraryPage } from './library-page';
import { PROMPTS } from '../data/prompts.data';

describe('LibraryPage', () => {
  let fixture: ComponentFixture<LibraryPage>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [LibraryPage],
    }).compileComponents();
    fixture = TestBed.createComponent(LibraryPage);
    fixture.componentRef.setInput('mode', 'library');
    await fixture.whenStable();
  });

  function cardTitles(): string[] {
    return [...fixture.nativeElement.querySelectorAll('app-prompt-card h3 button')].map(
      (el: Element) => (el.textContent || '').trim()
    );
  }

  it('renders all prompts at first', () => {
    expect(cardTitles().length).toBe(PROMPTS.length);
  });

  function typeSearch(value: string) {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#prompt-search');
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return fixture.whenStable();
  }

  it('filters by search text (title, description or tag)', async () => {
    await typeSearch('โค้ด');
    expect(cardTitles().length).toBe(1);
    expect(cardTitles()[0]).toContain('อธิบายโค้ด');

    await typeSearch('อีเมล');
    expect(cardTitles()[0]).toContain('อีเมล');
  });

  it('filters by category and combines search with category', async () => {
    const codeBtn = [...fixture.nativeElement.querySelectorAll('button.filter-pill')].find(
      (b: Element) => (b.textContent || '').includes('เขียนโค้ด')
    ) as HTMLButtonElement;
    codeBtn.click();
    await fixture.whenStable();

    const titles = cardTitles();
    expect(titles.length).toBe(1);
    expect(titles[0]).toContain('อธิบายโค้ด');

    // search for something in a different category -> no match
    await typeSearch('อีเมล');
    const emptyState = fixture.nativeElement.textContent;
    expect(emptyState).toContain('ไม่พบพรอมต์ที่ตรงกับเงื่อนไข');
  });

  it('clears search and filters with the empty-state button', async () => {
    const codeBtn = [...fixture.nativeElement.querySelectorAll('button.filter-pill')].find(
      (b: Element) => (b.textContent || '').includes('เขียนโค้ด')
    ) as HTMLButtonElement;
    codeBtn.click();
    await typeSearch('อีเมล');

    const clearBtn = [...fixture.nativeElement.querySelectorAll('button')].find(
      (b: Element) => (b.textContent || '').includes('ล้างการค้นหาและตัวกรอง')
    ) as HTMLButtonElement;
    clearBtn.click();
    await fixture.whenStable();

    expect(cardTitles().length).toBe(PROMPTS.length);
  });

  it('sorts by Thai name (ก–ฮ) and by recently used', async () => {
    const sort: HTMLSelectElement = fixture.nativeElement.querySelector('#prompt-sort');
    const titles = cardTitles();

    sort.value = 'name';
    sort.dispatchEvent(new Event('change', { bubbles: true }));
    await fixture.whenStable();
    const byName = cardTitles();
    const expectedOrder = [...titles].sort((a, b) => a.localeCompare(b, 'th'));
    expect(byName.join('|')).toBe(expectedOrder.join('|'));

    fixture.componentInstance['library'].touch('p-meeting-notes');
    sort.value = 'recent';
    sort.dispatchEvent(new Event('change', { bubbles: true }));
    await fixture.whenStable();
    expect(cardTitles()[0]).toContain('การประชุม');
  });
});
