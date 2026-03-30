import { useState } from 'react';
import type { ThemeDef } from '../../../imports/themes';
import { exportAsJSON, exportAsTypeScript, exportAsCSS, exportAsMarkdown, downloadFile } from '../../lib/theme-export';
import { mono } from '../../../imports/shared';

interface ExportTabProps {
  selectedTheme: string;
  theme: ThemeDef;
  allThemes: Record<string, ThemeDef>;
}

type ExportFormat = 'json' | 'typescript' | 'css' | 'markdown';

export function ExportTab({ selectedTheme, theme, allThemes }: ExportTabProps) {
  const [format, setFormat] = useState<ExportFormat>('json');
  const [cssPrefix, setCssPrefix] = useState('theme-');

  const getExportContent = () => {
    switch (format) {
      case 'json': return exportAsJSON(theme, selectedTheme);
      case 'typescript': return exportAsTypeScript(theme, selectedTheme);
      case 'css': return exportAsCSS(theme.colors, cssPrefix);
      case 'markdown': return exportAsMarkdown(theme, selectedTheme);
      default: return '';
    }
  };

  const getFileExtension = () => {
    switch (format) {
      case 'json': return 'json';
      case 'typescript': return 'ts';
      case 'css': return 'css';
      case 'markdown': return 'md';
      default: return 'txt';
    }
  };

  const handleDownload = () => {
    const content = getExportContent();
    const filename = `${selectedTheme.replace(/\s+/g, '-').toLowerCase()}.${getFileExtension()}`;
    const mimeType = format === 'json' ? 'application/json' : 'text/plain';
    downloadFile(content, filename, mimeType);
  };

  const handleCopy = () => {
    const content = getExportContent();
    navigator.clipboard.writeText(content);
  };

  const formatBtn = (f: ExportFormat, label: string) => (
    <button key={f} onClick={() => setFormat(f)}
      style={{ padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
        background: format === f ? '#a78bfa' : 'transparent',
        color: format === f ? '#09090b' : '#71717a',
        border: `1px solid ${format === f ? '#a78bfa' : '#27272a'}`,
        fontWeight: format === f ? 600 : 400 }}>
      {label}
    </button>
  );

  const content = getExportContent();

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fafafa', marginBottom: 8 }}>Export Theme: {selectedTheme}</div>
        <p style={{ fontSize: 13, color: '#71717a', marginBottom: 12 }}>Export your selected theme in multiple formats for use in your projects.</p>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#52525b', alignSelf: 'center', marginRight: 4 }}>Format:</span>
        {formatBtn('json', 'JSON')}
        {formatBtn('typescript', 'TypeScript')}
        {formatBtn('css', 'CSS Variables')}
        {formatBtn('markdown', 'Markdown')}
      </div>
      {format === 'css' && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: '#71717a', display: 'block', marginBottom: 4 }}>CSS Variable Prefix:</label>
          <input type="text" value={cssPrefix} onChange={e => setCssPrefix(e.target.value)}
            style={{ ...mono, background: '#09090b', color: '#fafafa', border: '1px solid #3f3f46', padding: '6px 10px', fontSize: 12, width: 200 }}
            placeholder="theme-" />
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={handleDownload}
          style={{ background: '#a78bfa', color: '#09090b', border: '2px solid #8b5cf6', padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          Download
        </button>
        <button onClick={handleCopy}
          style={{ background: '#27272a', color: '#fafafa', border: '1px solid #3f3f46', padding: '8px 20px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
          Copy to Clipboard
        </button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 8 }}>Preview:</div>
        <pre style={{ ...mono, fontSize: 11, background: '#09090b', border: '1px solid #27272a', padding: 16, maxHeight: 500, overflow: 'auto', color: '#a1a1aa', lineHeight: 1.6 }}>
          {content}
        </pre>
      </div>
    </div>
  );
}
