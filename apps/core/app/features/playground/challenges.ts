import type { Challenge } from "./types";

export const challenges: Challenge[] = [
  {
    id: "tutorial-1",
    name: "Tudo preenchido",
    description: {
  lead: "Preencha todo o grid de voxels!",
  paragraphs: [
    "Imagine um universo onde cada espaço é ocupado.",
    "Basta retornar `1` em todas as posições e ver a mágica acontecer."
  ],
  code: "// Dica: Retorne 1 para preencher todas as posições\n// Experimente mudar o valor para ver o efeito.",
  tips: [
    "Use sempre o comando `return`.",
    "Experimente mudar o valor para ver o efeito."
  ]
},
    constructionCode: `// Para cada posição (x, y, z), esta função é chamada.\n// Retorne 1 para preencher tudo.\nreturn 1;`,
    difficulty: "tutorial",
    progress: "not-started",
  },
  {
    id: "tutorial-2",
    name: "Voxel Central",
    description: {
  lead: "Preencha apenas o voxel central!",
  paragraphs: [
    "Seu objetivo é preencher apenas o voxel que está exatamente no centro do grid, ou seja, na posição (0, 0, 0).",
    "Use uma condição para identificar essa coordenada e retornar 1 somente nela. Isso ensina como selecionar pontos específicos no espaço."
  ],
  code: "// Dica: Verifique se x, y e z estão no centro (0, 0, 0)\n// Retorne 1 apenas nessa posição",
  tips: [
    "Experimente mudar a condição para selecionar outros pontos.",
    "Você pode usar operadores lógicos como && e ||."
  ]
},
    constructionCode: `// Preencha apenas o centro\nif (x === 0 && y === 0 && z === 0) return 1;`,
    difficulty: "tutorial",
    progress: "not-started",
  },
  {
    id: "tutorial-3",
    name: "Plano XY",
    description: {
  lead: "Preencha o plano XY!",
  paragraphs: [
    "Preencha todos os voxels que estão no plano onde z = 0. Um plano é como uma folha dentro do espaço 3D.",
    "Use uma condição para retornar 1 apenas quando z for igual a zero, preenchendo esse plano inteiro."
  ],
  code: "// Dica: Use uma condição para z igual a zero\n// Retorne 1 para preencher o plano XY",
  tips: [
    "Experimente mudar o valor de z para criar outros planos.",
    "Você pode combinar condições para criar formas mais complexas."
  ]
},
    constructionCode: `// Preencha um plano no eixo Z=0\nif (z === 0) return 1;`,
    difficulty: "tutorial",
    progress: "not-started",
  },
  {
    id: "tutorial-4",
    name: "Cubo Maciço",
    description: {
  lead: "Construa um cubo maciço!",
  paragraphs: [
    "Construa um cubo sólido de 5x5x5 voxels bem no centro.",
    "Limite x, y e z entre -2 e 2. Experimente criar formas tridimensionais com condições em vários eixos!"
  ],
  code: "// Dica: Limite x, y e z entre -2 e 2\n// Retorne 1 para criar um cubo no centro",
  tips: [
    "Experimente mudar os limites para criar cubos maiores ou menores.",
    "Combine condições para criar outras formas tridimensionais."
  ]
},
    constructionCode: `// Preencha um cubo 5x5x5 no centro\nif (\n  Math.abs(x) <= 2 &&\n  Math.abs(y) <= 2 &&\n  Math.abs(z) <= 2\n) return 1;`,
    difficulty: "tutorial",
    progress: "not-started",
  },
  {
    id: "tutorial-5",
    name: "Cores por eixo",
    description: {
  lead: "Cores por eixo!",
  paragraphs: [
    "Experimente usar diferentes valores de retorno (como 2, 3, etc.) para colorir os voxels de acordo com sua posição.",
    "Por exemplo, retorne 2 para voxels à esquerda, 3 para à direita e 1 para o centro. Isso mostra como criar padrões coloridos no grid."
  ],
  code: "// Dica: Use diferentes valores para diferentes regiões do grid\n// Experimente retornar 2 para um lado, 3 para outro, 1 para o centro",
  tips: [
    "Experimente usar outros valores para criar mais cores.",
    "Combine condições para criar padrões complexos."
  ]
},
    constructionCode: `// Use diferentes valores de return para diferentes cores\nif (x < 0) return 2; // verde\nif (x > 0) return 3; // azul\nreturn 1; // vermelho`,
    difficulty: "tutorial",
    progress: "not-started",
  },
  {
    id: "tutorial-6",
    name: "Gradiente simples",
    description: {
  lead: "Gradiente simples!",
  paragraphs: [
    "Crie um gradiente de cor usando o valor de x.",
    "Quanto maior o valor de x, mais intensa será a cor."
  ],
  code: "// Dica: Use o valor de x para variar a cor\n// Retorne valores diferentes conforme x muda",
  tips: [
    "Experimente usar outros eixos para criar gradientes diferentes.",
    "Combine com condições para criar efeitos visuais únicos."
  ]
},
    constructionCode: `// Gradiente de cor pelo eixo x\nif (Math.abs(x) <= 4) return 1 + Math.abs(x);`,
    difficulty: "tutorial",
    progress: "not-started",
  },
  // ... (outros desafios iniciante/desafiador podem ser mantidos)
];
