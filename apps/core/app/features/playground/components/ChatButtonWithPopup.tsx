import { useState, useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { useSoundStore } from "~/store/soundStore";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { MessageCircle, X, RotateCcw } from "lucide-react";
import {
  criarSessaoChat,
  enviarMensagem,
  carregarHistorico,
  resetarChat,
} from "../lib/gemini";

import React from "react";

function ChatMessageWithCodeblocks({ text }: { text: string }) {
  // Regex para codeblock: ```lang\n...\n```
  const codeBlockRegex = /```([\w-]*)\n([\s\S]*?)```/g;
  const inlineCodeRegex = /`([^`]+)`/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let idx = 0;
  // Render codeblocks
  while ((match = codeBlockRegex.exec(text))) {
    if (match.index > lastIndex) {
      // Texto antes do bloco
      elements.push(
        renderInlineCode(text.slice(lastIndex, match.index), idx++),
      );
    }
    elements.push(
      <pre
        key={idx++}
        style={{
          background: "#222",
          color: "#fff",
          borderRadius: 8,
          padding: 10,
          margin: "8px 0",
          fontSize: 13,
          overflowX: "auto",
        }}
      >
        <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>
          {match[1]}
        </div>
        <code>{match[2]}</code>
      </pre>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    elements.push(renderInlineCode(text.slice(lastIndex), idx++));
  }
  return <>{elements}</>;
  // Função para inline code
  function renderInlineCode(str: string, key: number) {
    const parts = [];
    let last = 0;
    let m;
    let partIdx = 0;
    while ((m = inlineCodeRegex.exec(str))) {
      if (m.index > last) {
        parts.push(<span key={partIdx++}>{str.slice(last, m.index)}</span>);
      }
      parts.push(
        <code
          key={partIdx++}
          style={{
            background: "#eee",
            borderRadius: 4,
            padding: "1px 4px",
            fontSize: 13,
          }}
        >
          {m[1]}
        </code>,
      );
      last = m.index + m[0].length;
    }
    if (last < str.length) {
      parts.push(<span key={partIdx++}>{str.slice(last)}</span>);
    }
    return <>{parts}</>;
  }
}

export function ChatButtonWithPopup({ userCode }: { userCode: string }) {
  // play close sound when popover closes
  const playSound = useSoundStore((s) => s.playSound);
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(false);
  useEffect(() => {
    if (prevOpen.current && !open) {
      playSound("close");
    }
    prevOpen.current = open;
  }, [open, playSound]);

  const [incluirCodigo, setIncluirCodigo] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>(carregarHistorico().slice(2));
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tamanho do botão
  const buttonSize = 56;
  // Tamanho do chat
  const chatWidth = "100vh";
  const chatHeight = 420;

  useEffect(() => {
    if (open && !chat) {
      criarSessaoChat().then(setChat);
    }
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, chat]);

  const handleSend = async () => {
    if (!input.trim() || !chat) return;
    setLoading(true);
    let mensagem = input;
    if (incluirCodigo) {
      mensagem = `${input}\ncódigo do usuário:\n${userCode}`;
    }
    await enviarMensagem(chat, mensagem);
    setMessages(chat.getHistory().slice(2));
    setInput("");
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const handleReset = () => {
    resetarChat();
    setMessages(carregarHistorico().slice(2));
    setChat(null);
    criarSessaoChat().then(setChat);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", left: 72, bottom: 32, zIndex: 40 }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="default"
            style={{ width: buttonSize, height: buttonSize, borderRadius: 999 }}
            title="Abrir chat IA"
            aria-label="Abrir chat IA"
          >
            <MessageCircle size={22} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={12}
          className="p-0"
          style={{
            width: chatWidth,
            height: chatHeight,
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: buttonSize,
                minHeight: buttonSize,
                background: "#f6f6f6",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: 600,
                fontSize: 16,
                padding: "0 8px 0 16px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MessageCircle size={22} />
                Chat IA
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleReset}
                  title="Resetar chat"
                  aria-label="Resetar chat"
                >
                  <RotateCcw size={18} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  title="Fechar"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                padding: 12,
                overflowY: "auto",
                background: "#fafbfc",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    background: msg.role === "user" ? "#e0e7ff" : "#f3f4f6",
                    color: "#222",
                    borderRadius: 12,
                    padding: "6px 12px",
                    maxWidth: "100%",
                    fontSize: 14,
                    marginBottom: 2,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <ChatMessageWithCodeblocks
                    text={msg.parts?.[0]?.text || ""}
                  />
                </div>
              ))}

              {loading && (
                <div
                  style={{
                    color: "#888",
                    fontSize: 13,
                    alignSelf: "flex-start",
                  }}
                >
                  Pensando...
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 8px 4px 8px",
              }}
            >
              <Button
                size={"sm"}
                variant={incluirCodigo ? "default" : "secondary"}
                onClick={() => setIncluirCodigo((v) => !v)}
                style={{ fontSize: 13 }}
                title="Enviar código do usuário junto da mensagem"
              >
                {incluirCodigo ? "Enviando código do usuário" : "Só mensagem"}
              </Button>
            </div>
            <form
              style={{
                display: "flex",
                borderTop: "1px solid #eee",
                background: "#fff",
                padding: 8,
                gap: 8,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                style={{
                  flex: 1,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "6px 10px",
                  fontSize: 14,
                }}
                disabled={loading}
                autoFocus
              />
              <Button
                type="submit"
                size="sm"
                disabled={loading || !input.trim()}
              >
                Enviar
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
