import React, { forwardRef } from 'react';
import { EditorState, buildOverlayGradient } from '@/types/editor';

interface Props {
  state: EditorState;
}

const NewsBannerTemplate = forwardRef<HTMLDivElement, Props>(({ state }, ref) => {
  return (
    <div ref={ref} className="relative w-full aspect-square overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      {state.photo && (
        <img src={state.photo} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      )}

      <div className="absolute inset-0" style={{ background: buildOverlayGradient(state) }} />

      <div
        className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold tracking-wide"
        style={{ backgroundColor: state.accentColor, color: '#FFFFFF', fontFamily: state.headlineFont }}
      >
        {state.dateBadge}
      </div>

      {state.logo && (
        <img src={state.logo} alt="Logo" className="absolute top-4 right-4 w-10 h-10 object-contain rounded-full" />
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <span
            className="px-2 py-0.5 font-bold tracking-wider uppercase"
            style={{ backgroundColor: state.accentColor, color: '#fff', fontFamily: state.footerFont }}
          >
            {state.footer}
          </span>
        </div>
        <h1 className="text-2xl font-bold leading-tight" style={{ fontFamily: state.headlineFont, color: state.headlineColor }}>
          {state.headline}
        </h1>
        <p className="text-sm leading-relaxed opacity-90" style={{ fontFamily: state.bodyFont, color: state.bodyColor }}>
          {state.body}
        </p>
      </div>
    </div>
  );
});

NewsBannerTemplate.displayName = 'NewsBannerTemplate';
export default NewsBannerTemplate;
