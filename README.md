# Voxelcraft Playground - Core

## Visão Geral

Este projeto é o núcleo do Voxelcraft Playground, uma aplicação web interativa para criação, visualização e manipulação de estruturas 3D baseadas em voxels, utilizando React, Three.js e APIs modernas.

![/docs/examples/example-1.png](/docs/examples/example-1.png)

A proposta nasceu como parte de um trabalho avaliativo para a disciplina de Sistemas Multimídia da Universidade Federal do Semiárido (UFERSA). A equipe, movida pelo interesse comum em computação gráfica e modelagem tridimensional, idealizou uma solução que tornasse acessível a criação de arte em 3D. Inspirados por desenhos simples construídos com lógica e matemática, o objetivo inicial era desenvolver um site que permitisse a criação de formas tridimensionais — de forma intuitiva, visual e divertida — a partir de blocos básicos (voxels).

## Exemplos de Animação

As animações abaixo foram criadas diretamente na plataforma VoxelCraft Playground:

![Exemplo de Animação 1](/docs/examples/animation-1.gif)
![Exemplo de Animação 2](/docs/examples/animation-2.gif)
![Exemplo de Animação 3](/docs/examples/animation-3.gif)

## Tecnologias Utilizadas
- **React**: Interface e lógica de componentes.
- **Three.js**: Renderização 3D dos voxels.
- **three-stdlib**: Geometrias avançadas (ex: RoundedBoxGeometry).
- **TypeScript**: Tipagem estática e segurança.
- **TailwindCSS**: Estilização.
- **Google Gemini API**: Assistente de IA para sugestões de código voxel.
- **Web Workers**: Execução de código do usuário em segundo plano para evitar bloqueios na UI.
- **React-Three-Fiber**: Integração do Three.js com React para renderização declarativa.

## Como funciona a geração de voxels

1. **Código do Usuário**: O usuário escreve código JavaScript que define a lógica de geração dos voxels (ex: padrões, formas, cores).
2. **Execução Segura**: O código é executado em um Web Worker (`voxelWorker.ts`), que itera sobre uma grade 3D e chama a função do usuário para cada posição `(x, y, z)`. O valor retornado define a cor ou existência do voxel.
3. **Pipeline de Processamento**: Após gerar os voxels, o pipeline (`voxelPipeline.ts`) aplica etapas como face culling para otimizar a renderização, removendo faces internas não visíveis.
4. **Renderização**: O componente `VoxelInstances.tsx` utiliza `THREE.InstancedMesh` para renderizar eficientemente milhares de voxels, aplicando animações de montagem e atualização de cor/posição.
5. **Persistência**: O progresso do usuário (código, voxels, feedback) é salvo localmente.

## Detalhes do VoxelInstances.tsx
- Recebe um array de `VoxelData` (posição, cor, tamanho).
- Usa `RoundedBoxGeometry` para criar a geometria de cada voxel.
- Utiliza `InstancedMesh` para performance, atualizando matrizes e cores via referência.
- Implementa animação de "montagem" dos voxels do centro para fora.
- Atualiza apenas os voxels alterados para eficiência.

## APIs e Fluxo de Dados
- **/challenges-with-voxels.json**: Desafios pré-computados com voxels.
- **Google Gemini**: Sugestão e explicação de código voxel.
- **LocalStorage**: Persistência do progresso do usuário.

## Estrutura de Pastas Relevante
- `components/`: UI e renderização 3D.
- `lib/`: Lógica de IA, persistência, carregamento de desafios.
- `pipeline/`: Otimizações e processamento de voxels.
- `types.ts`: Tipos globais (VoxelData, Challenge, etc).

## Requisitos para rodar

Instale o **Pnpm** seguindo as instruções em https://pnpm.io/installation.
```bash
sudo apt install nodejs npm 
npm install -g pnpm
pnpm setup
pnpm install
```

## Como rodar

```bash
git clone https://github.com/UFERSA-ProCavalo/voxelcraft-playground.git

pnpm install

pnpm -F @voxelcraft-playground/core run dev
```

Acesse em http://localhost:3000

---

Para mais detalhes, consulte os comentários nos arquivos fonte principais.
