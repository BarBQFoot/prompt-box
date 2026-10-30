import type { IconName } from './icon-names';

export type PromptCategoryId =
  | 'writing'
  | 'coding'
  | 'learning'
  | 'business'
  | 'marketing'
  | 'data';

export type VariableFieldType = 'text' | 'textarea' | 'select';

export interface PromptVariable {
  key: string;
  label: string;
  type: VariableFieldType;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  defaultValue?: string;
  options?: string[];
}

export interface PromptVariant {
  id: string;
  label: string;
  template: string;
}

export interface PromptExample {
  title: string;
  useCase: string;
  inputs: Record<string, string>;
}

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PromptCategoryId;
  tags: string[];
  template: string;
  variables: PromptVariable[];
  variants: PromptVariant[];
  examples: PromptExample[];
}

export interface CategoryDef {
  id: PromptCategoryId | 'all';
  label: string;
  icon: IconName;
}

export type SortKey = 'recommended' | 'name' | 'recent';

export interface SortOption {
  key: SortKey;
  label: string;
}

export interface TemplateSegment {
  text: string;
  isToken: boolean;
  token: string;
  filled: boolean;
}
