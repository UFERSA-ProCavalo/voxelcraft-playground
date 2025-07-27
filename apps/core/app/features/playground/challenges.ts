import type { Challenge } from './types';

export const challenges: Challenge[] = [
  {
    id: 'tutorial-1',
    name: 'Primeiro Cubo',
    description: 'Crie um cubo simples na cena.',
    starterCode: `// Crie um cubo na posição (0,0,0)\naddVoxel(0, 0, 0, 'red');`,
    expectedVoxels: [
      { position: [0, 0, 0], color: 'red' },
    ],
    difficulty: 'tutorial',
    progress: 'not-started',
    // solution?: string; // Deprecated: use expectedVoxels for validation
    // hint?: string;
    // order?: number;
  },
  {
    id: 'iniciante-1',
    name: 'Linha de Cubos',
    description: 'Crie uma linha de 5 cubos.',
    starterCode: `// Crie uma linha de cubos\nfor (let i = 0; i < 5; i++) {\n  addVoxel(i, 0, 0, 'blue');\n}`,
    expectedVoxels: [
      { position: [0, 0, 0], color: 'blue' },
      { position: [1, 0, 0], color: 'blue' },
      { position: [2, 0, 0], color: 'blue' },
      { position: [3, 0, 0], color: 'blue' },
      { position: [4, 0, 0], color: 'blue' },
    ],
    difficulty: 'iniciante',
    progress: 'not-started',
  },
  {
    id: 'desafiador-1',
    name: 'Pirâmide',
    description: 'Construa uma pirâmide de cubos.',
    starterCode: `// Construa uma pirâmide de cubos\n// Dica: use dois loops aninhados`,
    expectedVoxels: [],
    difficulty: 'desafiador',
    progress: 'not-started',
  },
];
