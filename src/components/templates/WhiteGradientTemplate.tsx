import React, { forwardRef } from 'react';
import { EditorState, buildOverlayGradient } from '@/types/editor';

interface Props {
  state: EditorState;
}

const WhiteGradientTemplate = forwardRef<HTMLDivElement, Props>(({ state }, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full aspect-square overflow-hidden"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      {state.photo && (
        <img src={state.photo} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      )}

      {/* Custom overlay */}
      <div className="absolute inset-0" style={{ background: buildOverlayGradient(state) }} />

      {/* White fade at bottom for readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%]"
        style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0))' }}
      />

      {state.logo && (
        <img src={state.logo} alt="Logo" className="absolute top-4 left-4 w-12 h-12 object-contain rounded-full" />
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
        <div className="w-16 h-1" style={{ backgroundColor: state.accentColor }} />
        <h1
          className="text-2xl font-bold leading-tight uppercase"
          style={{ fontFamily: state.headlineFont, color: state.headlineColor }}
        >
          {state.headline}
        </h1>
        <p className="text-sm leading-relaxed" style={{ fontFamily: state.bodyFont, color: state.bodyColor }}>
          {state.body}
        </p>
        <p
          className="text-xs font-semibold tracking-widest uppercase pt-2"
          style={{ fontFamily: state.footerFont, color: state.footerColor, opacity: 0.8 }}
        >
          {state.footer}
        </p>
      </div>
    </div>
  );
});

WhiteGradientTemplate.displayName = 'WhiteGradientTemplate';
export default WhiteGradientTemplate;
