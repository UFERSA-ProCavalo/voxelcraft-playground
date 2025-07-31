import { GoogleGenAI } from "@google/genai";

const CONTEXTO_INICIAL = [
  {
    role: "user",
    parts: [
      {
        text: "Você é um assistente que ajuda o usuário a gerar objetos baseado em voxel, baseadas em uma estrutura. //explicar logica de como funciona a geração a partir do código.",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "Entendi. Estou pronto para ajudar o usuário com base nessa lógica.",
      },
    ],
  },
];

export function carregarHistorico() {
  const salvo = localStorage.getItem("gemini.historico");
  return salvo ? JSON.parse(salvo) : CONTEXTO_INICIAL;
}

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function criarSessaoChat() {
  // Novo SDK: chats.create
  const chat = genAI.chats.create({
    model: "gemini-1.5-flash",
    history: carregarHistorico(),
  });
  return chat;
}

export async function enviarMensagem(chat: any, mensagem: string) {
  // Novo SDK: sendMessage({ message })
  const resultado = await chat.sendMessage({ message: mensagem });
  const resposta = resultado.text;

  const novoHistorico = [
    ...chat.getHistory(),
    { role: "user", parts: [{ text: mensagem }] },
    { role: "model", parts: [{ text: resposta }] },
  ];

  localStorage.setItem("gemini.historico", JSON.stringify(novoHistorico));
  return resposta;
}

export function resetarChat() {
  localStorage.removeItem("gemini.historico");
}
