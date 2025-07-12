import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="javascript"
      value={code}
      onChange={v => onChange(v || "")}
      theme="vs-dark"
      options={{ minimap: { enabled: false } }}
    />
  );
}
