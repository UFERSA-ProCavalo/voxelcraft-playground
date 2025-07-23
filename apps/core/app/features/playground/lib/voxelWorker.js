/**
 * Worker responsável por processar o código do usuário e gerar voxels.
 *
 * @param {Object} e - Evento de mensagem recebido pelo worker.
 * @param {Object} e.data - Dados enviados para o worker.
 * @param {string} e.data.code - Código JavaScript do usuário.
 * @param {number} e.data.gridSize - Tamanho da grade (número de voxels por eixo).
 * @param {number} e.data.bounds - Tamanho de cada voxel.
 * @param {string[]} e.data.colorMap - Mapa de cores para os voxels.
 *
 * @returns {Object} Mensagem enviada de volta para o thread principal.
 * @returns {VoxelData[]} [voxels] - Array de voxels prontos para renderização.
 * @returns {string} [error] - Mensagem de erro, se houver.
 */
self.onmessage = function (e) {
  const { code, gridSize, bounds, colorMap } = e.data;
  let voxels = [];
  try {
    // Compila a função do usuário
    const userFn = new Function('x', 'y', 'z', code);
    const half = Math.floor(gridSize / 2);
    // Gera os voxels de acordo com o código do usuário
    for (let x = -half; x <= half; x++) {
      for (let y = -half; y <= half; y++) {
        for (let z = -half; z <= half; z++) {
          let colorIdx = 0;
          try {
            colorIdx = userFn(x, y, z);
          } catch {
            colorIdx = 0;
          }
          // Ignora valores inválidos ou não positivos
          if (!Number.isFinite(colorIdx) || colorIdx <= 0) continue;
          voxels.push({
            position: [x, y, z],
            color: colorMap[colorIdx] || '#888',
          });
        }
      }
    }
    /**
     * Pipeline de mesh: culling de faces internas.
     * Remove faces internas para otimizar renderização.
     *
     * @param {Array<{position: number[]}>} voxels - Array de voxels com posições.
     * @returns {Array<{position: number[]}>} Voxels apenas com faces externas visíveis.
     */
    function faceCulling(voxels) {
      const voxelSet = new Set(voxels.map((v) => v.position.join(',')));
      const faceDirs = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
      ];
      return voxels.filter((voxel) => {
        return faceDirs.some(
          ([dx, dy, dz]) =>
            !voxelSet.has(
              [voxel.position[0] + dx, voxel.position[1] + dy, voxel.position[2] + dz].join(',')
            )
        );
      });
    }
    const culledVoxels = faceCulling(voxels);
    self.postMessage({ voxels: culledVoxels });
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};
