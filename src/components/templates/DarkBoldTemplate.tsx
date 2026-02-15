import React, { forwardRef } from 'react';
import { EditorState, buildOverlayGradient } from '@/types/editor';

interface Props {
  state: EditorState;
}

const DarkBoldTemplate = forwardRef<HTMLDivElement, Props>(({ state }, ref) => {
  return (
    <div ref={ref} className="relative w-full aspect-square overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {state.photo && (
        <img src={state.photo} alt="Background" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
      )}
      <div className="absolute inset-0" style={{ background: buildOverlayGradient(state) }} />

      {state.logo && (
        <img src={state.logo} alt="Logo" className="absolute top-4 right-4 w-12 h-12 object-contain" />
      )}

      <div className="absolute top-4 left-4 flex items-center gap-3">
        <span className="px-3 py-1 text-xs font-bold" style={{ backgroundColor: 'hsl(190, 100%, 50%)', color: '#000', fontFamily: state.footerFont }}>
          {state.dateBadge}
        </span>
        <span className="px-3 py-1 text-xs font-bold" style={{ backgroundColor: state.accentColor, color: '#fff', fontFamily: state.footerFont }}>
          Breaking News
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        <div className="flex gap-3">
          <div className="w-1 self-stretch" style={{ backgroundColor: state.accentColor }} />
          <div className="space-y-1">
            <h1 className="text-2xl font-black leading-tight uppercase" style={{ fontFamily: state.headlineFont, color: state.headlineColor }}>
              {state.headline}
            </h1>
            <p className="text-sm leading-relaxed opacity-90" style={{ fontFamily: state.bodyFont, color: state.bodyColor }}>
              {state.body}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs font-bold tracking-widest" style={{ fontFamily: state.footerFont, color: state.footerColor }}>
            @{state.footer}
          </p>
          <span className="px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: state.accentColor, color: '#fff' }}>
            SWIPE ➤
          </span>
        </div>
      </div>
    </div>
  );
});

DarkBoldTemplate.displayName = 'DarkBoldTemplate';
export default DarkBoldTemplate;
