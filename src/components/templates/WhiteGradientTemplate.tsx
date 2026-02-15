import React from 'react';
import { EditorState } from '@/types/editor';

interface Props {
  state: EditorState;
}

const WhiteGradientTemplate: React.FC<Props> = ({ state }) => {
  return (
    <div
      className="relative w-full aspect-square overflow-hidden"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      {/* Background Photo */}
      {state.photo && (
        <img
          src={state.photo}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* White gradient overlay from bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background: `linear-gradient(to top, rgba(255,255,255,${state.overlayOpacity + 0.3}), rgba(255,255,255,0))`,
        }}
      />

      {/* Logo top-left */}
      {state.logo && (
        <img
          src={state.logo}
          alt="Logo"
          className="absolute top-4 left-4 w-12 h-12 object-contain rounded-full"
        />
      )}

      {/* Text content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
        {/* Accent line */}
        <div className="w-16 h-1" style={{ backgroundColor: state.accentColor }} />
        
        <h1
          className="text-2xl font-bold leading-tight uppercase"
          style={{
            fontFamily: state.headlineFont,
            color: state.headlineColor,
          }}
        >
          {state.headline}
        </h1>

        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: state.bodyFont,
            color: state.bodyColor,
          }}
        >
          {state.body}
        </p>

        <p
          className="text-xs font-semibold tracking-widest uppercase pt-2"
          style={{
            fontFamily: state.footerFont,
            color: state.footerColor,
            opacity: 0.7,
          }}
        >
          {state.footer}
        </p>
      </div>
    </div>
  );
};

export default WhiteGradientTemplate;
