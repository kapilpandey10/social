import React from 'react';
import { EditorState } from '@/types/editor';

interface Props {
  state: EditorState;
}

const DarkBoldTemplate: React.FC<Props> = ({ state }) => {
  return (
    <div
      className="relative w-full aspect-square overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Background Photo */}
      {state.photo && (
        <img
          src={state.photo}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
      )}

      {/* Full dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 20%, rgba(0,0,0,${state.overlayOpacity + 0.2}) 50%, rgba(0,0,0,0.95) 100%)`,
        }}
      />

      {/* Logo top-right */}
      {state.logo && (
        <img
          src={state.logo}
          alt="Logo"
          className="absolute top-4 right-4 w-12 h-12 object-contain"
        />
      )}

      {/* Date badge */}
      <div className="absolute top-4 left-4 flex items-center gap-3">
        <span
          className="px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: 'hsl(190, 100%, 50%)',
            color: '#000',
            fontFamily: state.footerFont,
          }}
        >
          {state.dateBadge}
        </span>
        <span
          className="px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: state.accentColor,
            color: '#fff',
            fontFamily: state.footerFont,
          }}
        >
          Breaking News
        </span>
      </div>

      {/* Content bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        {/* Left accent bar + headline */}
        <div className="flex gap-3">
          <div className="w-1 self-stretch" style={{ backgroundColor: state.accentColor }} />
          <div className="space-y-1">
            <h1
              className="text-2xl font-black leading-tight uppercase"
              style={{
                fontFamily: state.headlineFont,
                color: state.headlineColor,
              }}
            >
              {state.headline}
            </h1>
            <p
              className="text-sm leading-relaxed opacity-90"
              style={{
                fontFamily: state.bodyFont,
                color: state.bodyColor,
              }}
            >
              {state.body}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p
            className="text-xs font-bold tracking-widest"
            style={{
              fontFamily: state.footerFont,
              color: state.footerColor,
            }}
          >
            @{state.footer}
          </p>
          <span
            className="px-3 py-1 text-xs font-bold rounded-full"
            style={{ backgroundColor: state.accentColor, color: '#fff' }}
          >
            SWIPE ➤
          </span>
        </div>
      </div>
    </div>
  );
};

export default DarkBoldTemplate;
