import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Icon } from './icon';
import { PromptCard, CATEGORY_META } from './prompt-card';
import { LibraryService } from '../services/library.service';
import { CATEGORIES, PROMPTS, SORT_OPTIONS } from '../data/prompts.data';
import {
  CategoryDef,
  Prompt,
  PromptCategoryId,
  SortKey,
} from '../models/prompt.model';

@Component({
  selector: 'app-library-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, PromptCard],
  templateUrl: './library-page.html',
})
export class LibraryPage {
  readonly mode = input.required<'library' | 'favorites'>();
  readonly openPrompt = output<Prompt>();
  readonly navigate = output<void>();

  protected readonly categories: CategoryDef[] = CATEGORIES;
  protected readonly sortOptions = SORT_OPTIONS;

  protected readonly search = signal('');
  protected readonly category = signal<PromptCategoryId | 'all'>('all');
  protected readonly sort = signal<SortKey>('recommended');
  protected readonly cardTick = signal(0);

  private readonly library = inject(LibraryService);
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    effect(() => {
      this.mode();
      this.bump();
    });
  }

  /** Press "/" outside a field to jump straight into search. */
  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key !== '/' || event.ctrlKey || event.altKey || event.metaKey) return;
    const target = event.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable)
    ) {
      return;
    }
    event.preventDefault();
    this.searchInput()?.nativeElement.focus();
  }

  private bump(): void {
    this.cardTick.update((v) => v + 1);
  }

  protected onSearchInput(value: string): void {
    this.search.set(value);
    this.bump();
  }

  protected setCategory(id: PromptCategoryId | 'all'): void {
    this.category.set(id);
    this.bump();
  }

  protected setSort(key: SortKey): void {
    this.sort.set(key);
    this.bump();
  }

  protected clearAll(): void {
    this.search.set('');
    this.category.set('all');
    this.bump();
  }

  protected readonly eyebrow = computed(() =>
    this.mode() === 'favorites' ? 'รายการโปรด' : 'คลังพรอมต์'
  );

  protected readonly subline = computed(() =>
    this.mode() === 'favorites'
      ? 'เฉพาะพรอมต์ที่คุณกดเป็นรายการโปรด ยังค้นหาและเรียงลำดับได้เหมือนเดิม'
      : 'เลือกพรอมต์ เติมเฉพาะข้อมูลของคุณ แล้วคัดลอกไปใช้กับ AI ที่คุณใช้งานได้ทันที'
  );

  protected readonly filteredPrompts = computed(() => {
    const q = this.search().trim().toLowerCase();
    const category = this.category();
    const onlyFavorites = this.mode() === 'favorites';
    const favoriteIds = this.library.favorites();
    const recent = this.library.lastUsed();

    const matched = PROMPTS.filter((p) => {
      if (onlyFavorites && !favoriteIds.has(p.id)) return false;
      if (category !== 'all' && p.category !== category) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.description,
        ...p.tags,
        CATEGORY_META[p.category].label,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });

    switch (this.sort()) {
      case 'name':
        return [...matched].sort((a, b) => a.title.localeCompare(b.title, 'th'));
      case 'recent':
        return [...matched].sort(
          (a, b) => (recent[b.id] ?? 0) - (recent[a.id] ?? 0)
        );
      default:
        return matched;
    }
  });

  protected readonly hasFavorites = computed(() => this.library.favorites().size > 0);

  protected readonly favoritesEmpty = computed(
    () =>
      this.mode() === 'favorites' && !this.hasFavorites()
  );

  protected readonly noMatch = computed(
    () => this.filteredPrompts().length === 0 && !this.favoritesEmpty()
  );
}
