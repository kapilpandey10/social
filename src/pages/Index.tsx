import React, { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { EditorState, DEFAULT_STATE } from '@/types/editor';
import EditorSidebar from '@/components/EditorSidebar';
import WhiteGradientTemplate from '@/components/templates/WhiteGradientTemplate';
import NewsBannerTemplate from '@/components/templates/NewsBannerTemplate';
import SplitTemplate from '@/components/templates/SplitTemplate';
import DarkBoldTemplate from '@/components/templates/DarkBoldTemplate';

const Index = () => {
  const [state, setState] = useState<EditorState>(DEFAULT_STATE);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((updates: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;
    const canvas = await html2canvas(canvasRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement('a');
    link.download = `post-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  const renderTemplate = () => {
    switch (state.activeTemplate) {
      case 'news-banner':
        return <NewsBannerTemplate state={state} />;
      case 'split':
        return <SplitTemplate state={state} />;
      case 'dark-bold':
        return <DarkBoldTemplate state={state} />;
      default:
        return <WhiteGradientTemplate state={state} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 min-w-[320px] flex-shrink-0 border-r border-border">
        <EditorSidebar state={state} onChange={handleChange} onDownload={handleDownload} />
      </div>

      {/* Canvas Area */}
      <div className="flex-1 canvas-area flex items-center justify-center p-8 overflow-auto">
        <div className="max-w-lg w-full">
          {/* Preview label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Live Preview
            </span>
            <span className="text-xs text-muted-foreground">
              1080 × 1080px
            </span>
          </div>

          {/* Template render */}
          <div ref={canvasRef} className="w-full rounded-lg overflow-hidden shadow-2xl">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
