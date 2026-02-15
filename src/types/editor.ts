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
  overlayOpacity: number;
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

export const DEFAULT_STATE: EditorState = {
  photo: null,
  logo: null,
  headline: 'Your Headline Here',
  headlineColor: '#FFFFFF',
  headlineFont: "'Oswald', sans-serif",
  body: 'Add your body text here. This will appear below the headline.',
  bodyColor: '#FFFFFF',
  bodyFont: "'Roboto', sans-serif",
  footer: 'YOUR BRAND',
  footerColor: '#FFFFFF',
  footerFont: "'Montserrat', sans-serif",
  accentColor: '#DC2626',
  overlayOpacity: 0.6,
  dateBadge: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  activeTemplate: 'white-gradient',
};
