import { useState, useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { MessageCircle, X, RotateCcw } from "lucide-react";
import {
  criarSessaoChat,
  enviarMensagem,
  carregarHistorico,
  resetarChat,
} from "../lib/gemini";

export function ChatButtonWithPopup() {
  const [incluirCodigo, setIncluirCodigo] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>(carregarHistorico());
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tamanho do botão
  const buttonSize = 56;
  // Tamanho do chat
  const chatWidth = 320;
  const chatHeight = 420;
  // Posição do botão
  const left = 72;
  const bottom = 32;

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
      // O código do usuário é salvo no localStorage como 'playground.userCode' ou similar
      // Vamos tentar pegar do localStorage
      const codigo = localStorage.getItem("playground.userCode") || "";
      mensagem = `${input}\ncódigo do usuário:\n${codigo}`;
    }
    const resposta = await enviarMensagem(chat, mensagem);
    setMessages([
      ...chat.getHistory(),
      { role: "user", parts: [{ text: mensagem }] },
      { role: "model", parts: [{ text: resposta }] },
    ]);
    setInput("");
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const handleReset = () => {
    resetarChat();
    setMessages(carregarHistorico());
    setChat(null);
    criarSessaoChat().then(setChat);
    setInput("");
  };

  return (
    <>
      {!open && (
        <div
          style={{
            position: "fixed",
            left,
            bottom,
            zIndex: 20,
            width: buttonSize,
            height: buttonSize,
            transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
          }}
        >
          <Button
            size="icon"
            variant="default"
            style={{ width: buttonSize, height: buttonSize, borderRadius: 999 }}
            onClick={() => setOpen(true)}
            title="Abrir chat IA"
            aria-label="Abrir chat IA"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>
        </div>
      )}
      {open && (
        <div
          style={{
            position: "fixed",
            left,
            bottom,
            width: chatWidth,
            height: chatHeight,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: 18,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
            overflow: "hidden",
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
                  maxWidth: "80%",
                  fontSize: 14,
                  marginBottom: 2,
                }}
              >
                {msg.parts?.[0]?.text}
              </div>
            ))}
            {loading && (
              <div
                style={{ color: "#888", fontSize: 13, alignSelf: "flex-start" }}
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
            {" "}
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
            <Button type="submit" size="sm" disabled={loading || !input.trim()}>
              Enviar
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
