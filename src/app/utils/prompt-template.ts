import { TemplateSegment } from '../models/prompt.model';

const TOKEN_RE = /\{\{\s*([A-Za-z_]\w*)\s*\}\}/g;

/** Split a prompt template into plain text and `{{variable}}` segments. */
export function toSegments(
  template: string,
  values: Record<string, string | undefined | null>
): TemplateSegment[] {
  const segments: TemplateSegment[] = [];
  let last = 0;

  for (const match of template.matchAll(TOKEN_RE)) {
    const start = match.index ?? 0;
    if (start > last) {
      segments.push({
        text: template.slice(last, start),
        isToken: false,
        token: '',
        filled: false,
      });
    }
    const key = match[1];
    const value = (values[key] ?? '').toString().trim();
    segments.push({
      text: value || match[0],
      isToken: true,
      token: key,
      filled: Boolean(value),
    });
    last = start + match[0].length;
  }

  if (last < template.length) {
    segments.push({
      text: template.slice(last),
      isToken: false,
      token: '',
      filled: false,
    });
  }
  return segments;
}

/** Render the template as plain text; unfilled tokens stay visible. */
export function renderPlain(
  template: string,
  values: Record<string, string | undefined | null>
): string {
  return template.replace(TOKEN_RE, (match, key: string) => {
    const value = (values[key] ?? '').toString().trim();
    return value || match;
  });
}
