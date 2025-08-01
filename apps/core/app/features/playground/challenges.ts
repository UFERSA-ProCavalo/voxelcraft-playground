import type { Challenge } from "./types";

export const challenges: Challenge[] = [
  {
    id: "tutorial-1",
    name: "Tudo preenchido",
    description: {
      lead: "Preencha todo o grid de voxels!",
      paragraphs: [
        "Imagine um universo onde cada espaço é ocupado.",
        "Basta retornar `1` em todas as posições e ver a mágica acontecer.",
      ],
      code: "// Dica: Retorne 1 para preencher todas as posições\n// Experimente mudar o valor para ver o efeito.",
      tips: [
        "Use sempre o comando `return`.",
        "Experimente mudar o valor para ver o efeito.",
      ],
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
        "Use uma condição para identificar essa coordenada e retornar 1 somente nela. Isso ensina como selecionar pontos específicos no espaço.",
      ],
      code: "// Dica: Verifique se x, y e z estão no centro (0, 0, 0)\n// Retorne 1 apenas nessa posição",
      tips: [
        "Experimente mudar a condição para selecionar outros pontos.",
        "Você pode usar operadores lógicos como && e ||.",
      ],
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
        "Use uma condição para retornar 1 apenas quando z for igual a zero, preenchendo esse plano inteiro.",
      ],
      code: "// Dica: Use uma condição para z igual a zero\n// Retorne 1 para preencher o plano XY",
      tips: [
        "Experimente mudar o valor de z para criar outros planos.",
        "Você pode combinar condições para criar formas mais complexas.",
      ],
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
        "Limite x, y e z entre -2 e 2. Experimente criar formas tridimensionais com condições em vários eixos!",
      ],
      code: "// Dica: Limite x, y e z entre -2 e 2\n// Retorne 1 para criar um cubo no centro",
      tips: [
        "Experimente mudar os limites para criar cubos maiores ou menores.",
        "Combine condições para criar outras formas tridimensionais.",
      ],
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
        "Por exemplo, retorne 2 para voxels à esquerda, 3 para à direita e 1 para o centro. Isso mostra como criar padrões coloridos no grid.",
      ],
      code: "// Dica: Use diferentes valores para diferentes regiões do grid\n// Experimente retornar 2 para um lado, 3 para outro, 1 para o centro",
      tips: [
        "Experimente usar outros valores para criar mais cores.",
        "Combine condições para criar padrões complexos.",
      ],
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
        "Quanto maior o valor de x, mais intensa será a cor.",
      ],
      code: "// Dica: Use o valor de x para variar a cor\n// Retorne valores diferentes conforme x muda",
      tips: [
        "Experimente usar outros eixos para criar gradientes diferentes.",
        "Combine com condições para criar efeitos visuais únicos.",
      ],
    },
    constructionCode: `// Gradiente de cor pelo eixo x\nif (Math.abs(x) <= 4) return 1 + Math.abs(x);`,
    difficulty: "tutorial",
    progress: "not-started",
  },
  // ... (outros desafios iniciante/desafiador podem ser mantidos)

  {
    "id": "hollow-cube-1",
    "name": "Cubo Oco",
    "description": {
      "lead": "Construa um cubo oco!",
      "paragraphs": [
        "O seu objetivo é construir um cubo de 5x5x5 voxels, mas sem preencher o seu interior.",
        "Você precisa usar condições para preencher apenas as camadas externas, deixando o interior vazio."
      ],
      "code": "// Dica: Combine as condições de limite com operadores lógicos para deixar o interior vazio.",
      "tips": [
        "Para verificar se um voxel está na camada externa, veja se ele está no limite do cubo, ou seja, se `x`, `y` ou `z` é igual a -2 ou 2.",
        "Você pode usar o operador lógico `||` para combinar as condições de cada face."
      ]
    },
    "constructionCode": "if (\n  (Math.abs(x) === 2 && Math.abs(y) <= 2 && Math.abs(z) <= 2) ||\n  (Math.abs(y) === 2 && Math.abs(x) <= 2 && Math.abs(z) <= 2) ||\n  (Math.abs(z) === 2 && Math.abs(x) <= 2 && Math.abs(y) <= 2)\n) return 1;",
    "difficulty": "iniciante",
    "progress": "not-started"
  },
  {
    "id": "3d-checkerboard-1",
    "name": "Xadrez 3D",
    "description": {
      "lead": "Construa um padrão de xadrez em 3D!",
      "paragraphs": [
        "O objetivo é colorir os voxels em um padrão que se assemelhe a um tabuleiro de xadrez, mas em três dimensões.",
        "Use o operador de módulo (`%`) para alternar a cor dos voxels com base em suas coordenadas `x`, `y` e `z`."
      ],
      "code": "// Dica: Use o operador de módulo (%) para verificar se a soma das coordenadas é par ou ímpar.",
      "tips": [
        "Verifique se a soma de `x`, `y` e `z` é par ou ímpar. Por exemplo, `(x + y + z) % 2 === 0`.",
        "Retorne cores diferentes (valores como `1` e `2`) para cada condição."
      ]
    },
    "constructionCode": "if (\n    (x + y + z) % 2 === 0\n) return 1;\nreturn 2;",
    "difficulty": "iniciante",
    "progress": "not-started"
  },
  {
    "id": "static-scene-1",
    "name": "Cena Estática",
    "description": {
      "lead": "Construa uma cena estática!",
      "paragraphs": [
        "Combine a árvore e o personagem para criar uma cena completa.",
        "Você deve usar as funções `Paralelepipedo` e `Boy` para desenhar os elementos e organizá-los no espaço, garantindo que nada se mova."
      ],
      "code": "// Dica: Chame a função 'Boy' e a 'Paralelepipedo' para a árvore.",
      "tips": [
        "Posicione a árvore e o boneco em diferentes partes do grid.",
        "Você pode adicionar o chão para completar a cena."
      ]
    },
    "constructionCode": "function Paralelepipedo(pos, tam) {\n    return (\n        x >= pos.x && x <= pos.x + tam.x - 1 &&\n        y >= pos.y && y <= pos.y + tam.y - 1 &&\n        z >= pos.z && z <= pos.z + tam.z - 1\n    );\n}\n\nfunction Boy(pos) {\n    if (\n        Paralelepipedo(\n            {x:pos.x + 2, y:pos.y, z:pos.z},\n            {x:2, y:5, z:2}\n        )\n    ) return 1;\n\n    if (\n        Paralelepipedo(\n            {x:pos.x - 2, y:pos.y, z:pos.z},\n            {x:2, y:5, z:2}\n        )\n    ) return 1;\n    \n    if (\n        Paralelepipedo(\n            {x:pos.x-2, y:pos.y + 5, z:pos.z},\n            {x:6, y:5, z:2}\n        )\n    ) return 1;\n\n    if (\n        Paralelepipedo(\n            {x:pos.x-8, y:pos.y + 9, z:pos.z},\n            {x:18, y:2, z:2}\n        )\n    ) return 1;\n\n    if (\n        Paralelepipedo(\n            {x:pos.x - 1, y:pos.y + 12, z:pos.z - 1},\n            {x:4, y:4, z:4}\n        )\n    ) return 1;\n}\n\n// Chame a função Boy\nif (Boy({x: 0, y: 0, z: 0})) return 1;\n\n// Tronco da árvore\nif (Paralelepipedo(\n    {x:-10, y:0, z:-10},\n    {x:2, y:7, z:2}\n)) return 1;\n\n// Copa da árvore\nif (Paralelepipedo(\n    {x:-14, y:7, z:-14},\n    {x:10, y:7, z:10}\n)) return 2;\nif (Paralelepipedo(\n    {x:-12, y:14, z:-12},\n    {x:6, y:2, z:6}\n)) return 2;\n\n// Chão\nif (y < 0) return 3;",
    "difficulty": "desafiador",
    "progress": "not-started"
  },
  {
    "id": "static-house-1",
    "name": "Construa uma Casa",
    "description": {
      "lead": "Crie uma casa no grid!",
      "paragraphs": [
        "Use a função `Paralelepipedo` para desenhar as paredes, o telhado e a porta de uma casa.",
        "Você precisará pensar nas coordenadas e dimensões de cada parte da casa para que elas se encaixem perfeitamente, formando uma estrutura coesa."
      ],
      "code": "// Dica: Use a função Paralelepipedo para criar as paredes, o telhado e a porta. Lembre-se de usar retornos diferentes para dar cores diferentes às partes da casa.",
      "tips": [
        "Comece pelas paredes. Crie quatro `Paralelepipedos` para formar as faces da casa.",
        "Use um `Paralelepipedo` maior para o telhado.",
        "Adicione uma porta para deixar a estrutura mais realista."
      ]
    },
    "constructionCode": "function Paralelepipedo(pos, tam) {\n    return (\n        x >= pos.x && x <= pos.x + tam.x - 1 &&\n        y >= pos.y && y <= pos.y + tam.y - 1 &&\n        z >= pos.z && z <= pos.z + tam.z - 1\n    );\n}\n\n// Porta\nif (Paralelepipedo({x: -2, y: 0, z: -10}, {x: 4, y: 5, z: 1})) return 1;\n\n// Paredes\nif (Paralelepipedo({x: -10, y: 0, z: -10}, {x: 1, y: 8, z: 20})) return 9; // Parede esquerda\nif (Paralelepipedo({x: 10, y: 0, z: -10}, {x: 1, y: 8, z: 20})) return 9; // Parede direita\nif (Paralelepipedo({x: -10, y: 0, z: -10}, {x: 21, y: 8, z: 1})) return 9; // Parede da frente\nif (Paralelepipedo({x: -10, y: 0, z: 10}, {x: 21, y: 8, z: 1})) return 9; // Parede de trás\n\n// Telhado\nfor (let i = 0; i < 8; i+= 1) {\n    if (Paralelepipedo(\n        {x: -12 + i, y: 8, z: -12}, \n        {x: 25 - i * 2, y: 1 + i, z: 25})\n    ) {\n        return 6;\n    }\n}\n\n// Chão\nif (Paralelepipedo({x: -15, y: -1, z: -15}, {x: 31, y: 1, z: 31})) return 2;",
    "difficulty": "desafiador",
    "progress": "not-started"
  },
  {
    "id": "parameterized-furniture-1",
    "name": "Mesa e Cadeiras Parametrizadas",
    "description": {
      "lead": "Construa uma cena com móveis usando funções parametrizadas!",
      "paragraphs": [
        "Seu objetivo é criar uma cena com uma mesa e várias cadeiras usando as funções `Mesa` e `Cadeira` já definidas.",
        "Essas funções são 'parametrizadas', o que significa que você pode controlar o tamanho e a posição dos objetos facilmente apenas mudando os valores das variáveis, sem ter que alterar o código interno das funções."
      ],
      "code": "// Dica: Altere os valores de `mesaTam` e `cadeiraTam` para ver como o tamanho dos objetos muda automaticamente!",
      "tips": [
        "Observe como a posição e o tamanho dos móveis são definidos por variáveis no início do código.",
        "Tente adicionar mais cadeiras ou mover a mesa para um novo lugar, alterando apenas os parâmetros."
      ]
    },
    "constructionCode": "function Paralelepipedo(pos, tam) {\n    return (\n        x >= pos.x && x <= pos.x + tam.x - 1 &&\n        y >= pos.y && y <= pos.y + tam.y - 1 &&\n        z >= pos.z && z <= pos.z + tam.z - 1\n    );\n}\n\nfunction Mesa(pos, tam) {\n    // Pernas da mesa\n    let pernaTam = {x: 1, y: tam.altura, z: 1};\n    if (Paralelepipedo({x: pos.x - tam.largura/2, y: pos.y, z: pos.z - tam.profundidade/2}, pernaTam)) return 1;\n    if (Paralelepipedo({x: pos.x + tam.largura/2, y: pos.y, z: pos.z - tam.profundidade/2}, pernaTam)) return 1;\n    if (Paralelepipedo({x: pos.x - tam.largura/2, y: pos.y, z: pos.z + tam.profundidade/2}, pernaTam)) return 1;\n    if (Paralelepipedo({x: pos.x + tam.largura/2, y: pos.y, z: pos.z + tam.profundidade/2}, pernaTam)) return 1;\n    // Tampo da mesa\n    if (Paralelepipedo({x: pos.x - tam.largura/2 - 1, y: pos.y + tam.altura, z: pos.z - tam.profundidade/2 - 1}, {x: tam.largura + 2, y: 1, z: tam.profundidade + 2})) return 2;\n}\n\nfunction Cadeira(pos, tam) {\n    // Pernas da cadeira\n    let pernaTam = {x: 1, y: tam.alturaAssento, z: 1};\n    if (Paralelepipedo({x: pos.x, y: pos.y, z: pos.z}, pernaTam)) return 3;\n    if (Paralelepipedo({x: pos.x + tam.largura - 1, y: pos.y, z: pos.z}, pernaTam)) return 3;\n    if (Paralelepipedo({x: pos.x, y: pos.y, z: pos.z + tam.profundidade - 1}, pernaTam)) return 3;\n    if (Paralelepipedo({x: pos.x + tam.largura - 1, y: pos.y, z: pos.z + tam.profundidade - 1}, pernaTam)) return 3;\n    // Assento da cadeira\n    if (Paralelepipedo({x: pos.x, y: pos.y + tam.alturaAssento, z: pos.z}, {x: tam.largura, y: 1, z: tam.profundidade})) return 4;\n    // Encosto da cadeira\n    if (Paralelepipedo({x: pos.x, y: pos.y + tam.alturaAssento + 1, z: pos.z}, {x: tam.largura, y: tam.alturaEncosto, z: 1})) return 4;\n}\n\n// Definições de tamanho\nlet mesaTam = {largura: 20, altura: 5, profundidade: 8};\nlet cadeiraTam = {largura: 3, profundidade: 3, alturaAssento: 3, alturaEncosto: 4};\n\n// Desenhe a cena com os objetos parametrizados\nif (Mesa({x: 0, y: 0, z: 0}, mesaTam)) return 1;\nif (Cadeira({x: -8, y: 0, z: -7}, cadeiraTam)) return 5;\nif (Cadeira({x: 6, y: 0, z: -7}, cadeiraTam)) return 5;\nif (Cadeira({x: -1, y: 0, z: -7}, cadeiraTam)) return 5;\n\n// Chão\nif (y < 0) return 2;",
    "difficulty": "desafiador",
    "progress": "not-started"
  }
];
