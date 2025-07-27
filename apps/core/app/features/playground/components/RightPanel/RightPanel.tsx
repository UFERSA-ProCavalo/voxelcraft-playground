import { useState } from 'react';
import { Scene } from './Scene';
import { Button } from '../ui/button';
import { Card } from '@voxelcraft-playground/ui';

interface RightPanelProps {
  code: string;
  perfOffset?: number;
}

// Simple draggable popup window component
import React, { useRef, useState as useReactState, useCallback } from 'react';

function DraggablePopup({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useReactState(false);
  const [resizing, setResizing] = useReactState(false);
  const [offset, setOffset] = useReactState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position, setPosition] = useReactState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useReactState<{ width: number; height: number }>({ width: 420, height: 260 });

  // Set initial position to center of parent container
  React.useEffect(() => {
    if (!position && containerRef.current && popupRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: containerRect.width / 2 - size.width / 2,
        y: containerRect.height / 2 - size.height / 2,
      });
    }
  }, [position, size.width, size.height]);

  // Drag logic
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) return;
    setDragging(true);
    const rect = popupRef.current?.getBoundingClientRect();
    setOffset({ x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) });
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (dragging && containerRef.current && popupRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      let newX = e.clientX - containerRect.left - offset.x;
      let newY = e.clientY - containerRect.top - offset.y;
      // Constrain to container bounds
      newX = Math.max(0, Math.min(newX, containerRect.width - size.width));
      newY = Math.max(0, Math.min(newY, containerRect.height - size.height));
      setPosition({ x: newX, y: newY });
    } else if (resizing && containerRef.current && popupRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();
      let newWidth = e.clientX - popupRect.left;
      let newHeight = e.clientY - popupRect.top;
      // Min/max constraints
      const minWidth = 280;
      const minHeight = 180;
      const maxWidth = containerRect.width - (position?.x ?? 0);
      const maxHeight = containerRect.height - (position?.y ?? 0);
      newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
      setSize({ width: newWidth, height: newHeight });
    }
  }, [dragging, resizing, offset, size.width, size.height, position]);

  const onMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  React.useEffect(() => {
    if (dragging || resizing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [dragging, resizing, onMouseMove]);

  // Resize handle logic
  const onResizeMouseDown = (e: React.MouseEvent) => {
    setResizing(true);
    e.stopPropagation();
    e.preventDefault();
  };

  // The parent must provide a ref to the container for bounds
  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // allow background interaction
        zIndex: 10,
      }}
    >
      <div
        ref={popupRef}
        style={{
          position: 'absolute',
          top: position ? position.y : '40%',
          left: position ? position.x : '30%',
          width: size.width,
          height: size.height,
          minWidth: 280,
          minHeight: 180,
          background: '#f9f9f9',
          border: '2px solid #b3b3b3',
          borderRadius: 8,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          cursor: dragging ? 'move' : 'default',
          userSelect: dragging ? 'none' : 'auto',
          pointerEvents: 'auto', // allow interaction with popup
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: 'linear-gradient(90deg, #e0e0e0 0%, #f8f8f8 100%)',
            padding: '8px 16px',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'move',
          }}
          onMouseDown={onMouseDown}
        >
          Pré-visualização do desafio
          <Button size="sm" variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {children}
          {/* Resize handle */}
          <div
            className="resize-handle"
            onMouseDown={onResizeMouseDown}
            style={{
              position: 'absolute',
              width: 18,
              height: 18,
              right: 2,
              bottom: 2,
              cursor: 'nwse-resize',
              background: 'rgba(180,180,180,0.18)',
              borderRadius: 4,
              zIndex: 2,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
            title="Redimensionar"
            aria-label="Redimensionar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#888" strokeWidth="2"><path d="M2 12L12 2"/><path d="M7 12L12 7"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolMenu({ showAxes, setShowAxes, showOutline, setShowOutline }: {
  showAxes: boolean;
  setShowAxes: (v: boolean) => void;
  showOutline: boolean;
  setShowOutline: (v: boolean) => void;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 16 }}>
      <Card className="tool-menu-card">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px' }}>
          <Button
            variant={showAxes ? 'default' : 'outline'}
            size="icon"
            onClick={() => setShowAxes(!showAxes)}
            title="Alternar eixos"
            aria-label="Alternar eixos"
          >
            {/* Lucide Axis3D icon fallback SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
          </Button>
          <Button
            variant={showOutline ? 'default' : 'outline'}
            size="icon"
            onClick={() => setShowOutline(!showOutline)}
            title="Alternar grade"
            aria-label="Alternar grade"
          >
            {/* Lucide Grid icon fallback SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function PreviewButton({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
      <Button size="sm" onClick={onClick}>
        Preview
      </Button>
    </div>
  );
}

function SceneDisplay({ code, perfOffset, showAxes, showOutline, children }: {
  code: string;
  perfOffset?: number;
  showAxes: boolean;
  showOutline: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden' }}>
      <Scene
        perfOffset={perfOffset}
        code={code}
        showAxes={showAxes}
        showOutline={showOutline}
      />
      {children}
    </div>
  );
}

export function RightPanel({ code, perfOffset = 0 }: RightPanelProps) {
  const [showAxes, setShowAxes] = useState(true);
  const [showOutline, setShowOutline] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ToolMenu showAxes={showAxes} setShowAxes={setShowAxes} showOutline={showOutline} setShowOutline={setShowOutline} />
      <PreviewButton onClick={() => setShowPreview(true)} />
      <SceneDisplay code={code} perfOffset={perfOffset} showAxes={showAxes} showOutline={showOutline}>
        {showPreview && (
          <DraggablePopup onClose={() => setShowPreview(false)}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 15 }}>
              (Conteúdo de pré-visualização aqui)
            </div>
          </DraggablePopup>
        )}
      </SceneDisplay>
    </div>
  );
}
