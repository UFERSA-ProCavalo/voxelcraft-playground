# Instruções e Explicações do Sistema Voxelcraft Playground

## Visão Geral
Este sistema é uma aplicação web interativa para criação, visualização e manipulação de objetos baseados em voxels (cubos 3D), com suporte a desafios, modo livre e integração com IA (Gemini) para auxílio ao usuário.

## Lógica de Voxels e Geração de Objetos
- O usuário pode criar ou editar estruturas 3D usando voxels, visualizando em tempo real no painel direito.
- O painel esquerdo permite editar código ou selecionar desafios, que definem regras ou objetivos para a construção.
- **O código do usuário é executado para cada voxel do espaço 3D. O valor retornado pela função determina a cor (ou existência) do voxel naquela posição.**
- Por exemplo, se o usuário digitar `return 1;`, todos os voxels possíveis receberão a cor 1.
- O sistema utiliza providers/contextos para compartilhar estado dos voxels e desafios entre componentes.

### Exemplo: Código JS para gerar voxels
```js
// Este código roda para cada voxel (x, y, z):
return (x + y + z) % 2; // alterna cor entre 0 e 1

// Se você quiser que todos os voxels sejam da cor 1:
return 1;

// Para criar uma pirâmide, por exemplo:
if (y <= 4 - Math.abs(x) - Math.abs(z)) {
  return 2; // cor 2 para voxels dentro da pirâmide
}
return 0; // sem voxel fora da pirâmide
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
