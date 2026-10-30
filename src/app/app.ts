import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Prompt } from './models/prompt.model';
import { SiteHeader, HeaderView } from './components/site-header';
import { LibraryPage } from './components/library-page';
import { PromptBuilder } from './components/prompt-builder';
import { ToastArea } from './components/toast-area';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteHeader, LibraryPage, PromptBuilder, ToastArea],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly view = signal<HeaderView>('library');
  protected readonly builderPrompt = signal<Prompt | null>(null);

  protected openBuilder(prompt: Prompt): void {
    this.builderPrompt.set(prompt);
  }

  protected switchView(view: HeaderView): void {
    this.view.set(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
