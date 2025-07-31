import type { Challenge } from "./types";

export const challenges: Challenge[] = [
  {
    id: "tutorial-1",
    name: "Primeiro Cubo",
    description: "Crie um cubo simples na cena.",
    constructionCode: `// Crie um cubo na posição (0,0,0)\nif(x==0 && y==0 && z==0) return 1;`,
    difficulty: "tutorial",
    progress: "not-started",
    // hint?: string;
    // order?: number;
  },
  {
    id: "iniciante-1",
    name: "Linha de Cubos",
    description: "Crie uma linha de 5 cubos.",
    constructionCode: `// Crie uma linha de cubos\nfor (let i = 0; i < 5; i++) {\n  addVoxel(i, 0, 0, 'blue');\n}`,
    difficulty: "iniciante",
    progress: "not-started",
  },
  {
    id: "desafiador-1",
    name: "Pirâmide",
    description: "Construa uma pirâmide de cubos.",
    constructionCode: `// Construa uma pirâmide de cubos\n// Dica: use dois loops aninhados`,
    difficulty: "desafiador",
    progress: "not-started",
  },
];
