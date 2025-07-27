import type { VoxelData, ChallengeDifficulty } from './types';

export interface Challenge {
  id: string;
  name: string;
  description: string;
  starterCode: string;
  solutionCode?: string;
  expectedVoxels: VoxelData[];
  difficulty: ChallengeDifficulty;
  version: number;
}

export const challenges: Challenge[] = [
  {
    id: 'tutorial-1',
    name: 'Primeiro Cubo',
    description: 'Crie um cubo simples na cena.',
    starterCode: `// Crie um cubo na posição (0,0,0)\naddVoxel(0, 0, 0, 'red');`,
    solutionCode: `addVoxel(0, 0, 0, 'red');`,
    expectedVoxels: [
      { position: [0, 0, 0], color: 'red' },
    ],
    difficulty: 'tutorial',
    version: 1,
  },
  {
    id: 'iniciante-1',
    name: 'Linha de Cubos',
    description: 'Crie uma linha de 5 cubos.',
    starterCode: `// Crie uma linha de cubos\nfor (let i = 0; i < 5; i++) {\n  addVoxel(i, 0, 0, 'blue');\n}`,
    solutionCode: `for (let i = 0; i < 5; i++) { addVoxel(i, 0, 0, 'blue'); }`,
    expectedVoxels: [
      { position: [0, 0, 0], color: 'blue' },
      { position: [1, 0, 0], color: 'blue' },
      { position: [2, 0, 0], color: 'blue' },
      { position: [3, 0, 0], color: 'blue' },
      { position: [4, 0, 0], color: 'blue' },
    ],
    difficulty: 'iniciante',
    version: 1,
  },
  {
    id: 'desafiador-1',
    name: 'Pirâmide',
    description: 'Construa uma pirâmide de cubos.',
    starterCode: `// Construa uma pirâmide de cubos\n// Dica: use dois loops aninhados`,
    solutionCode: `for (let y = 0; y < 3; y++) { for (let x = y; x < 3 - y; x++) { addVoxel(x, y, 0, 'yellow'); } }`,
    expectedVoxels: [],
    difficulty: 'desafiador',
    version: 1,
  },
];
