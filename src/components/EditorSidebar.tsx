import React, { useRef } from 'react';
import { EditorState, FONT_OPTIONS } from '@/types/editor';
import { Upload, Image, Type, Palette, Download } from 'lucide-react';

interface Props {
  state: EditorState;
  onChange: (updates: Partial<EditorState>) => void;
  onDownload: () => void;
}

const TEMPLATES = [
  { id: 'white-gradient', label: 'White Gradient' },
  { id: 'news-banner', label: 'News Banner' },
  { id: 'split', label: 'Split Layout' },
  { id: 'dark-bold', label: 'Dark Bold' },
];

const EditorSidebar: React.FC<Props> = ({ state, onChange, onDownload }) => {
  const photoRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'photo' | 'logo') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ [field]: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="editor-sidebar h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 sidebar-section">
        <h2 className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
          POST EDITOR
        </h2>
      </div>

      {/* Template Selection */}
      <div className="p-4 sidebar-section space-y-2">
        <span className="sidebar-label">Template</span>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ activeTemplate: t.id })}
              className="px-2 py-2 text-xs font-medium rounded transition-all"
              style={{
                backgroundColor: state.activeTemplate === t.id ? 'hsl(220, 70%, 50%)' : 'hsl(220, 14%, 24%)',
                color: '#fff',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upload */}
      <div className="p-4 sidebar-section space-y-3">
        <span className="sidebar-label">Media</span>
        <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'photo')} />
        <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
        <button onClick={() => photoRef.current?.click()} className="w-full flex items-center gap-2 px-3 py-2 rounded sidebar-input text-sm cursor-pointer hover:opacity-80 transition">
          <Image size={14} /> {state.photo ? 'Change Photo' : 'Upload Photo'}
        </button>
        <button onClick={() => logoRef.current?.click()} className="w-full flex items-center gap-2 px-3 py-2 rounded sidebar-input text-sm cursor-pointer hover:opacity-80 transition">
          <Upload size={14} /> {state.logo ? 'Change Logo' : 'Upload Logo'}
        </button>
      </div>

      {/* Text Fields */}
      <div className="p-4 sidebar-section space-y-3">
        <span className="sidebar-label flex items-center gap-1"><Type size={12} /> Text</span>

        {/* Headline */}
        <div className="space-y-1">
          <label className="text-xs opacity-60">Headline</label>
          <textarea
            value={state.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            className="w-full sidebar-input rounded px-2 py-1.5 text-sm resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <input type="color" value={state.headlineColor} onChange={(e) => onChange({ headlineColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
            <select value={state.headlineFont} onChange={(e) => onChange({ headlineFont: e.target.value })} className="flex-1 sidebar-input rounded px-2 py-1 text-xs">
              {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-1">
          <label className="text-xs opacity-60">Body</label>
          <textarea
            value={state.body}
            onChange={(e) => onChange({ body: e.target.value })}
            className="w-full sidebar-input rounded px-2 py-1.5 text-sm resize-none"
            rows={3}
          />
          <div className="flex gap-2">
            <input type="color" value={state.bodyColor} onChange={(e) => onChange({ bodyColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
            <select value={state.bodyFont} onChange={(e) => onChange({ bodyFont: e.target.value })} className="flex-1 sidebar-input rounded px-2 py-1 text-xs">
              {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-1">
          <label className="text-xs opacity-60">Footer / Brand</label>
          <input
            value={state.footer}
            onChange={(e) => onChange({ footer: e.target.value })}
            className="w-full sidebar-input rounded px-2 py-1.5 text-sm"
          />
          <div className="flex gap-2">
            <input type="color" value={state.footerColor} onChange={(e) => onChange({ footerColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
            <select value={state.footerFont} onChange={(e) => onChange({ footerFont: e.target.value })} className="flex-1 sidebar-input rounded px-2 py-1 text-xs">
              {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Style controls */}
      <div className="p-4 sidebar-section space-y-3">
        <span className="sidebar-label flex items-center gap-1"><Palette size={12} /> Style</span>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs opacity-60">Accent Color</label>
            <input type="color" value={state.accentColor} onChange={(e) => onChange({ accentColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs opacity-60">Date Badge</label>
            <input value={state.dateBadge} onChange={(e) => onChange({ dateBadge: e.target.value })} className="sidebar-input rounded px-2 py-1 text-xs w-40 text-right" />
          </div>
          <div className="space-y-1">
            <label className="text-xs opacity-60">Overlay Opacity</label>
            <input type="range" min="0" max="1" step="0.05" value={state.overlayOpacity} onChange={(e) => onChange({ overlayOpacity: parseFloat(e.target.value) })} className="w-full" />
          </div>
        </div>
      </div>

      {/* Download */}
      <div className="p-4">
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: 'hsl(220, 70%, 50%)', color: '#fff' }}
        >
          <Download size={16} /> Download Image
        </button>
      </div>
    </div>
  );
};

export default EditorSidebar;
