import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Icon, IconName } from './icon';
import { Prompt } from '../models/prompt.model';

export interface CategoryMeta {
  label: string;
  icon: IconName;
}

export const CATEGORY_META: Record<Prompt['category'], CategoryMeta> = {
  writing: { label: 'การเขียน', icon: 'pencil' },
  coding: { label: 'เขียนโค้ด', icon: 'code' },
  learning: { label: 'การเรียนรู้', icon: 'school' },
  business: { label: 'ธุรกิจ', icon: 'briefcase' },
  marketing: { label: 'การตลาด', icon: 'megaphone' },
  data: { label: 'วิเคราะห์ข้อมูล', icon: 'chart' },
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
