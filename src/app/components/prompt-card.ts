import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Icon, IconName } from './icon';
import { Prompt } from '../models/prompt.model';

export interface CategoryMeta {
  label: string;
  icon: IconName;
  tile: string;
  text: string;
}

export const CATEGORY_META: Record<Prompt['category'], CategoryMeta> = {
  writing: { label: 'การเขียน', icon: 'pencil', tile: 'bg-violet-100', text: 'text-violet-700' },
  coding: { label: 'เขียนโค้ด', icon: 'code', tile: 'bg-indigo-100', text: 'text-indigo-700' },
  learning: { label: 'การเรียนรู้', icon: 'school', tile: 'bg-sky-100', text: 'text-sky-700' },
  business: { label: 'ธุรกิจ', icon: 'briefcase', tile: 'bg-amber-100', text: 'text-amber-700' },
  marketing: { label: 'การตลาด', icon: 'megaphone', tile: 'bg-rose-100', text: 'text-rose-700' },
  data: { label: 'วิเคราะห์ข้อมูล', icon: 'chart', tile: 'bg-emerald-100', text: 'text-emerald-700' },
};

@Component({
  selector: 'app-prompt-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './prompt-card.html',
})
export class PromptCard {
  readonly prompt = input.required<Prompt>();
  readonly index = input(0);
  readonly favorited = input(false);

  readonly tryIt = output<Prompt>();
  readonly toggleFavorite = output<Prompt>();

  protected readonly meta = computed(() => CATEGORY_META[this.prompt().category]);
  protected readonly visibleTags = computed(() => this.prompt().tags.slice(0, 3));
  protected readonly pop = signal(false);

  protected onToggleFavorite(): void {
    this.pop.set(true);
    this.toggleFavorite.emit(this.prompt());
  }
}
