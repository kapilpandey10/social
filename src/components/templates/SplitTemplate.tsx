import React, { forwardRef } from 'react';
import { EditorState, buildOverlayGradient } from '@/types/editor';

interface Props {
  state: EditorState;
}

const SplitTemplate = forwardRef<HTMLDivElement, Props>(({ state }, ref) => {
  return (
    <div ref={ref} className="relative w-full aspect-square overflow-hidden flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="relative flex-[6] overflow-hidden">
        {state.photo && (
          <img src={state.photo} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0" style={{ background: buildOverlayGradient(state) }} />
        {state.logo && (
          <img src={state.logo} alt="Logo" className="absolute top-4 left-4 w-10 h-10 object-contain rounded-full" />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1
            className="text-xl font-bold leading-tight px-2 py-1 inline"
            style={{
              fontFamily: state.headlineFont, color: '#FFFFFF',
              backgroundColor: state.accentColor,
              boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone',
            }}
          >
            {state.headline}
          </h1>
        </div>
      </div>
      <div className="flex-[4] p-6 flex flex-col justify-center text-center">
        <p className="text-lg leading-relaxed font-medium" style={{ fontFamily: state.bodyFont, color: state.bodyColor === '#FFFFFF' ? '#1a1a1a' : state.bodyColor }}>
          {state.body}
        </p>
        <p className="text-xs font-bold tracking-widest uppercase mt-4" style={{ fontFamily: state.footerFont, color: state.accentColor }}>
          {state.footer}
        </p>
      </div>
    </div>
  );
});

SplitTemplate.displayName = 'SplitTemplate';
export default SplitTemplate;
