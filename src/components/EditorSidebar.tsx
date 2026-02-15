import React, { useRef } from 'react';
import { EditorState, FONT_OPTIONS, OVERLAY_DIRECTIONS, OVERLAY_PRESETS } from '@/types/editor';
import { Upload, Image, Type, Layers, Download, Sparkles } from 'lucide-react';

interface Props {
  state: EditorState;
  onChange: (updates: Partial<EditorState>) => void;
  onDownload: () => void;
}

const TEMPLATES = [
  { id: 'white-gradient', label: 'White Gradient', icon: '◻' },
  { id: 'news-banner', label: 'News Banner', icon: '📰' },
  { id: 'split', label: 'Split Layout', icon: '◧' },
  { id: 'dark-bold', label: 'Dark Bold', icon: '◼' },
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

  const applyPreset = (presetId: string) => {
    const preset = OVERLAY_PRESETS.find(p => p.id === presetId);
    if (preset) {
      onChange({ overlayStyle: presetId, overlayColor: preset.color, overlayOpacity: preset.opacity });
    }
  };

  return (
    <div className="editor-sidebar h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 sidebar-section flex items-center gap-2">
        <Sparkles size={18} style={{ color: 'hsl(220, 70%, 60%)' }} />
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
              className="px-2 py-2.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 justify-center"
              style={{
                backgroundColor: state.activeTemplate === t.id ? 'hsl(220, 70%, 50%)' : 'hsl(220, 14%, 20%)',
                color: '#fff',
                boxShadow: state.activeTemplate === t.id ? '0 0 12px hsl(220, 70%, 50%, 0.4)' : 'none',
              }}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upload */}
      <div className="p-4 sidebar-section space-y-3">
        <span className="sidebar-label">Media</span>
        <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'photo')} />
        <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
        
        <button onClick={() => photoRef.current?.click()} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg sidebar-input text-sm cursor-pointer hover:opacity-80 transition">
          <Image size={14} /> {state.photo ? 'Change Photo' : 'Upload Photo'}
        </button>
        {state.photo && (
          <div className="w-full h-16 rounded-lg overflow-hidden">
            <img src={state.photo} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <button onClick={() => logoRef.current?.click()} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg sidebar-input text-sm cursor-pointer hover:opacity-80 transition">
          <Upload size={14} /> {state.logo ? 'Change Logo' : 'Upload Logo'}
        </button>
      </div>

      {/* Overlay Controls - NEW REVAMPED */}
      <div className="p-4 sidebar-section space-y-3">
        <span className="sidebar-label flex items-center gap-1"><Layers size={12} /> Overlay</span>
        
        {/* Presets grid */}
        <div className="space-y-1">
          <label className="text-xs opacity-50">Quick Presets</label>
          <div className="grid grid-cols-3 gap-1.5">
            {OVERLAY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className="relative rounded-lg py-2 text-[10px] font-bold uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: preset.id === 'none' ? 'hsl(220, 14%, 20%)' : preset.color,
                  color: preset.id === 'light' ? '#000' : '#fff',
                  opacity: state.overlayStyle === preset.id ? 1 : 0.6,
                  outline: state.overlayStyle === preset.id ? '2px solid hsl(220, 70%, 55%)' : '2px solid transparent',
                  outlineOffset: '1px',
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gradient Direction */}
        <div className="space-y-1">
          <label className="text-xs opacity-50">Gradient Direction</label>
          <div className="flex gap-1.5">
            {OVERLAY_DIRECTIONS.map((dir) => (
              <button
                key={dir.id}
                onClick={() => onChange({ overlayDirection: dir.id })}
                className="flex-1 rounded-lg py-2 text-xs font-medium transition-all text-center"
                style={{
                  backgroundColor: state.overlayDirection === dir.id ? 'hsl(220, 70%, 50%)' : 'hsl(220, 14%, 20%)',
                  color: '#fff',
                }}
                title={dir.label}
              >
                {dir.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Custom overlay color + opacity */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="space-y-0.5 flex-1">
              <label className="text-xs opacity-50">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.overlayColor}
                  onChange={(e) => onChange({ overlayColor: e.target.value, overlayStyle: 'custom' })}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs font-mono opacity-60">{state.overlayColor}</span>
              </div>
            </div>
            <div className="space-y-0.5 flex-1">
              <label className="text-xs opacity-50">Intensity</label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono opacity-60">{Math.round(state.overlayOpacity * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Visual opacity slider with gradient preview */}
          <div className="relative">
            <div
              className="h-6 rounded-lg overflow-hidden"
              style={{
                background: `linear-gradient(to right, transparent, ${state.overlayColor})`,
              }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={state.overlayOpacity}
              onChange={(e) => onChange({ overlayOpacity: parseFloat(e.target.value), overlayStyle: 'custom' })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* Indicator */}
            <div
              className="absolute top-0 h-6 w-0.5 rounded-full pointer-events-none"
              style={{
                left: `${state.overlayOpacity * 100}%`,
                backgroundColor: '#fff',
                boxShadow: '0 0 4px rgba(0,0,0,0.5)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Text Fields */}
      <div className="p-4 sidebar-section space-y-3">
        <span className="sidebar-label flex items-center gap-1"><Type size={12} /> Text</span>

        <div className="space-y-1">
          <label className="text-xs opacity-50">Headline</label>
          <textarea
            value={state.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            className="w-full sidebar-input rounded-lg px-3 py-2 text-sm resize-none"
            rows={2}
          />
          <div className="flex gap-2 items-center">
            <input type="color" value={state.headlineColor} onChange={(e) => onChange({ headlineColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
            <select value={state.headlineFont} onChange={(e) => onChange({ headlineFont: e.target.value })} className="flex-1 sidebar-input rounded-lg px-2 py-1.5 text-xs">
              {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs opacity-50">Body</label>
          <textarea
            value={state.body}
            onChange={(e) => onChange({ body: e.target.value })}
            className="w-full sidebar-input rounded-lg px-3 py-2 text-sm resize-none"
            rows={3}
          />
          <div className="flex gap-2 items-center">
            <input type="color" value={state.bodyColor} onChange={(e) => onChange({ bodyColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
            <select value={state.bodyFont} onChange={(e) => onChange({ bodyFont: e.target.value })} className="flex-1 sidebar-input rounded-lg px-2 py-1.5 text-xs">
              {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs opacity-50">Footer / Brand</label>
          <input
            value={state.footer}
            onChange={(e) => onChange({ footer: e.target.value })}
            className="w-full sidebar-input rounded-lg px-3 py-2 text-sm"
          />
          <div className="flex gap-2 items-center">
            <input type="color" value={state.footerColor} onChange={(e) => onChange({ footerColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
            <select value={state.footerFont} onChange={(e) => onChange({ footerFont: e.target.value })} className="flex-1 sidebar-input rounded-lg px-2 py-1.5 text-xs">
              {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Style extras */}
      <div className="p-4 sidebar-section space-y-3">
        <span className="sidebar-label">Extras</span>
        <div className="flex items-center justify-between">
          <label className="text-xs opacity-50">Accent Color</label>
          <input type="color" value={state.accentColor} onChange={(e) => onChange({ accentColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-xs opacity-50">Date Badge</label>
          <input value={state.dateBadge} onChange={(e) => onChange({ dateBadge: e.target.value })} className="sidebar-input rounded-lg px-2 py-1.5 text-xs w-40 text-right" />
        </div>
      </div>

      {/* Download */}
      <div className="p-4">
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: 'hsl(220, 70%, 50%)', color: '#fff', boxShadow: '0 4px 20px hsl(220, 70%, 50%, 0.3)' }}
        >
          <Download size={16} /> Download Image
        </button>
      </div>
    </div>
  );
};

export default EditorSidebar;
