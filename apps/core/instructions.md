# Instruções e Explicações do Sistema Voxelcraft Playground

## Visão Geral
Este sistema é uma aplicação web interativa para criação, visualização e manipulação de objetos baseados em voxels (cubos 3D), com suporte a desafios, modo livre e integração com IA (Gemini) para auxílio ao usuário.

## Lógica de Voxels e Geração de Objetos
- O usuário pode criar ou editar estruturas 3D usando voxels, visualizando em tempo real no painel direito.
- O painel esquerdo permite editar código ou selecionar desafios, que definem regras ou objetivos para a construção.
- A lógica de geração de voxels pode ser baseada em código do usuário, instruções ou presets de desafios.
- O sistema utiliza providers/contextos para compartilhar estado dos voxels e desafios entre componentes.

### Exemplo: Código JS para gerar voxels
```js
// Exemplo de função que adiciona um cubo na posição (x, y, z)
addVoxel(0, 0, 0);
addVoxel(1, 0, 0);
addVoxel(0, 1, 0);
// O usuário pode criar laços, condições, etc.
for (let x = 0; x < 5; x++) {
  addVoxel(x, 0, 0);
}
```

### Exemplo: Enviando código do usuário para a IA
Ao pedir ajuda para a IA, o sistema pode enviar junto o código do usuário:
```
Mensagem do usuário: "Como faço uma pirâmide?"
código do usuário:
<conteúdo atual do editor>
```
A IA pode analisar o código e sugerir melhorias ou exemplos.

## Estrutura de Páginas
- **Home:** Apresentação, links para playground, docs e exemplos.
- **Playground:** Ambiente principal, com abas para "Desafios" (com regras) e "Livre" (criação aberta).
- **Desafios:** Cada desafio pode ter instruções, código inicial e validação automática.

## Integração com IA (Gemini)
- O chat IA pode ser aberto a qualquer momento para pedir ajuda, gerar código ou tirar dúvidas.
- O contexto inicial do Gemini explica que ele deve ajudar o usuário a criar objetos baseados em voxels, explicando a lógica e sugerindo soluções.
- O histórico do chat é salvo no localStorage, mantendo o contexto entre sessões.

## Persistência e Histórico
- O progresso do usuário (código, voxels, chat) é salvo no localStorage para continuidade após recarregar a página.
- O histórico do chat IA é restaurado automaticamente ao abrir o chat.

## Pontos de Extensão
- Novos desafios podem ser adicionados via arquivos JSON ou scripts.
- Componentes de UI são modulares e podem ser reutilizados em outras páginas.
- A lógica de geração de voxels pode ser customizada para diferentes tipos de desafios ou modos.

## Recomendações para APIs/Agentes
- Sempre respeite o contexto inicial ao interagir com o Gemini.
- Use o histórico salvo para manter conversas consistentes.
- Para gerar objetos, explique a lógica de voxels e forneça exemplos claros ao usuário.
- Oriente o usuário sobre como manipular o editor e visualizar resultados.

---
Este arquivo serve como referência para agentes, APIs e desenvolvedores que precisem entender e interagir com o sistema Voxelcraft Playground.
