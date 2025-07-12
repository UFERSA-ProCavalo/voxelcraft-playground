# REQUISITOS E STATUS DO PROJETO

## Descrição Geral

Este projeto é um playground interativo para visualização e manipulação de voxels, utilizando React, Three.js (via @react-three/fiber) e componentes customizados. O objetivo é servir como base para experimentação de algoritmos de renderização, edição e otimização de mundos voxelizados.

---

## Funcionalidades Implementadas

- **Renderização 3D de Voxels**
  - Geração e exibição de uma grade 3D de voxels (cuboides) centrada na origem.
  - Câmera com controles orbitais (OrbitControls) para navegação livre.
  - Iluminação ambiente e direcional configurada.
  - Eixos XYZ visíveis e destacados com cilindros e cones coloridos.

- **Editor de Código (CodeEditor)**
  - Editor de código integrado na interface (lado esquerdo), permitindo edição de scripts ou parâmetros (ainda sem integração direta com a cena).

- **Face Culling (Remoção de Faces Ocultas)**
  - Implementação de exemplo minimalista que gera apenas as faces externas dos voxels (FaceCulling.tsx), otimizando a malha e reduzindo o número de triângulos renderizados.

- **Arquitetura Modular**
  - Separação clara de componentes (Scene, Voxel, AxesCylinders, FaceCulling, CodeEditor).
  - Tipos TypeScript explícitos para dados de voxel (VoxelData).

- **Performance**
  - Integração com r3f-perf para monitoramento de desempenho em tempo real.

---

## Funcionalidades em Desenvolvimento ou Planejadas

- [ ] Integração do editor de código com a cena (permitir que scripts modifiquem voxels em tempo real)
- [ ] Suporte a diferentes tamanhos, cores e propriedades de voxels
- [ ] Otimização de malha com "greedy meshing" (redução máxima de polígonos)
- [ ] Ferramentas de edição interativa (adicionar/remover voxels via UI)
- [ ] Exportação/importação de mundos voxelizados
- [ ] Suporte a grids maiores e parametrizáveis
- [ ] Testes automatizados (Vitest)

---

## Observações de Arquitetura e Práticas

- Código em TypeScript, com tipagem explícita e comentários em português brasileiro (padrão JSDoc).
- Organização modular, facilitando extensões e refatorações.
- Uso de boas práticas de importação, formatação (Prettier) e estrutura de pastas.
- Componentes reutilizáveis e desacoplados.

---

## Limitações Conhecidas

- O editor de código ainda não interage com a cena 3D.
- O exemplo de face culling é fixo para uma grade 3x3x3 e não é parametrizável.
- Não há ferramentas de edição interativa de voxels na interface.
- Não há testes automatizados implementados.
- Não há persistência ou exportação de dados de voxel.

---

## Última atualização

12/07/2025
