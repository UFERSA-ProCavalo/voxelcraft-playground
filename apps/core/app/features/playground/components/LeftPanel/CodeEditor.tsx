import MonacoEditor from "@monaco-editor/react";
import * as acorn from "acorn";
import { useState, useCallback, useRef, useEffect } from "react";
import { useTypingSoundPerKey } from "~/store/soundStore";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  // Memoized handleChange para evitar re-render desnecessário
  const handleChange = useCallback(
    (v: string | undefined) => {
      const value = v || "";
      try {
        acorn.parse(`function _user(x, y, z) { ${value} }`, {
          ecmaVersion: 2020,
        });
        setError(null);
      } catch (e: any) {
        setError(e.message || "Erro de sintaxe");
      }
      onChange(value);
    },
    [onChange],
  );

  // Monta o editor Monaco
  const { handleKeyDown, handleKeyUp } = useTypingSoundPerKey();
  const handleEditorDidMount = useCallback(
    (editor: any) => {
      editorRef.current = editor;
      // Adiciona som de digitação no pressionar/soltar tecla
      editor.onKeyDown((e: any) => {
        handleKeyDown(e.browserEvent);
      });
      editor.onKeyUp((e: any) => {
        handleKeyUp(e.browserEvent);
      });
    },
    [handleKeyDown, handleKeyUp],
  );

  // ResizeObserver para ajustar o layout ao redimensionar
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new window.ResizeObserver((entries) => {
      if (editorRef.current) {
        const { width, height } = entries[0].contentRect;
        console.log("[ResizeObserver] Container resized:", width, height);
        requestAnimationFrame(() => {
          if (editorRef.current) {
            console.log("[ResizeObserver] Calling editor.layout()");
            editorRef.current.layout();
          }
        });
      } else {
        console.log("[ResizeObserver] Editor not ready");
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", height: "100%", width: "100%" }}
    >
      <div
        style={{
          height: "100%",
        }}
      >
        <MonacoEditor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleChange}
          theme="vs-dark"
          options={{ minimap: { enabled: false } }}
          onMount={handleEditorDidMount}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
          minWidth: 240,
          maxWidth: 400,
          padding: "12px 20px",
          background: "rgba(220, 50, 47, 0.95)",
          color: "#fff",
          boxShadow: "0 4px 24px rgba(220,50,47,0.18)",
          fontWeight: 500,
          fontSize: "1em",
          zIndex: 10,
          opacity: error ? 1 : 0,
          transform: error ? "translateY(0)" : "translateY(20px)",
          pointerEvents: error ? "auto" : "none",
          transition:
            "opacity 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {error && (
          <span>
            <strong>Erro de sintaxe:</strong> {error}
          </span>
        )}
      </div>
    </div>
  );
}
