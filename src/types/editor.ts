export interface EditorState {
  photo: string | null;
  logo: string | null;
  headline: string;
  headlineColor: string;
  headlineFont: string;
  body: string;
  bodyColor: string;
  bodyFont: string;
  footer: string;
  footerColor: string;
  footerFont: string;
  accentColor: string;
  overlayColor: string;
  overlayOpacity: number;
  overlayDirection: string;
  overlayStyle: string;
  dateBadge: string;
  activeTemplate: string;
}

export const FONT_OPTIONS = [
  { label: 'Bebas Neue', value: "'Bebas Neue', sans-serif" },
  { label: 'Oswald', value: "'Oswald', sans-serif" },
  { label: 'Playfair Display', value: "'Playfair Display', serif" },
  { label: 'Roboto', value: "'Roboto', sans-serif" },
  { label: 'Montserrat', value: "'Montserrat', sans-serif" },
  { label: 'Poppins', value: "'Poppins', sans-serif" },
];

export const OVERLAY_DIRECTIONS = [
  { id: 'bottom', label: '↑ Bottom', css: 'to top' },
  { id: 'top', label: '↓ Top', css: 'to bottom' },
  { id: 'left', label: '→ Left', css: 'to right' },
  { id: 'right', label: '← Right', css: 'to left' },
  { id: 'center', label: '◎ Radial', css: 'radial' },
];

export const OVERLAY_PRESETS = [
  { id: 'none', label: 'None', color: 'transparent', opacity: 0 },
  { id: 'dark', label: 'Dark', color: '#000000', opacity: 0.6 },
  { id: 'light', label: 'Light', color: '#FFFFFF', opacity: 0.7 },
  { id: 'warm', label: 'Warm', color: '#8B4513', opacity: 0.4 },
  { id: 'cool', label: 'Cool', color: '#1E3A5F', opacity: 0.5 },
  { id: 'red', label: 'Red', color: '#8B0000', opacity: 0.45 },
];

export const DEFAULT_STATE: EditorState = {
  photo: null,
  logo: null,
  headline: 'Your Headline Here',
  headlineColor: '#1a1a1a',
  headlineFont: "'Oswald', sans-serif",
  body: 'Add your body text here. This will appear below the headline.',
  bodyColor: '#333333',
  bodyFont: "'Roboto', sans-serif",
  footer: 'YOUR BRAND',
  footerColor: '#666666',
  footerFont: "'Montserrat', sans-serif",
  accentColor: '#DC2626',
  overlayColor: '#000000',
  overlayOpacity: 0,
  overlayDirection: 'bottom',
  overlayStyle: 'none',
  dateBadge: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  activeTemplate: 'white-gradient',
};

export function buildOverlayGradient(state: EditorState): string {
  if (state.overlayOpacity === 0) return 'none';

  const { r, g, b } = hexToRgb(state.overlayColor);
  const a = state.overlayOpacity;

  if (state.overlayDirection === 'center') {
    return `radial-gradient(circle, rgba(${r},${g},${b},0) 20%, rgba(${r},${g},${b},${a}) 100%)`;
  }

  const dir = OVERLAY_DIRECTIONS.find(d => d.id === state.overlayDirection)?.css || 'to top';
  return `linear-gradient(${dir}, rgba(${r},${g},${b},${a}), rgba(${r},${g},${b},0))`;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 0, g: 0, b: 0 };
}
