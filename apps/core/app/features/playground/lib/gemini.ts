import { GoogleGenAI } from "@google/genai";

const CONTEXTO_INICIAL = [
  {
    role: "user",
    parts: [
      {
        text: [
          "Você é um assistente que ajuda o usuário a gerar objetos baseados em voxels em um ambiente 3D interativo.",
          "",
          "Lógica do sistema:",
          "- O código do usuário deve ser escrito em **JavaScript**.",
          "- O código é executado para cada voxel do espaço 3D. O valor retornado pela função determina a cor (ou existência) do voxel naquela posição.",
          "- Exemplo: se o usuário digitar 'return 1;', todos os voxels possíveis receberão a cor 1.",
          "- O usuário pode usar condições, laços e lógica para criar padrões, formas e estruturas.",
          "",
          "Exemplo de código em JavaScript:",
          "",
          "```js",
          "return (x + y + z) % 2; // alterna cor entre 0 e 1",
          "```",
          "",
          "Seja didático, explique a lógica e sugira exemplos práticos. Sempre responda de forma sucinta e breve, sem enrolação. Sempre que mostrar código, use blocos markdown (três crases, js, código, três crases).",
        ].join("\n"),
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
    model: "gemini-2.5-flash",
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
