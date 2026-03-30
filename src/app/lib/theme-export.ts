import type { ThemeColors, ThemeDef } from '../../imports/themes';

export function exportAsJSON(theme: ThemeDef, name: string): string {
  return JSON.stringify({ name, ...theme }, null, 2);
}

export function exportAsTypeScript(theme: ThemeDef, name: string): string {
  return `export const ${name.replace(/[^a-zA-Z0-9]/g, '_')} = ${JSON.stringify(theme, null, 2)} as const;`;
}

export function exportAsCSS(colors: ThemeColors, prefix: string = ''): string {
  const entries = Object.entries(colors);
  return `:root {\n${entries.map(([key, value]) => `  --${prefix}${key}: ${value};`).join('\n')}\n}`;
}

export function exportAsMarkdown(theme: ThemeDef, name: string): string {
  return `# ${name}

## Meta
- **Mode**: ${theme.mode}
- **Family**: ${theme.family}
- **Source**: ${theme.source}
- **Gray Scale**: ${theme.gray}
- **Accent**: ${theme.accent}
- **Radius**: ${theme.radius ?? 0}px

## Colors

| Token | Value |
|-------|-------|
${Object.entries(theme.colors).map(([key, value]) => `| \`${key}\` | ${value} |`).join('\n')}
`;
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}