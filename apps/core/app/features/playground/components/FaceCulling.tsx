import { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute, MeshStandardMaterial, Mesh } from "three";
import { useFrame, useThree } from "@react-three/fiber";

// Directions: +X, -X, +Y, -Y, +Z, -Z
const faceDirs = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

// Face vertex positions for each direction (from three.js manual)
const faceVertexOffsets = [
  // +X
  [ [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5] ],
  // -X
  [ [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, -0.5, -0.5] ],
  // +Y
  [ [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5] ],
  // -Y
  [ [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5] ],
  // +Z
  [ [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, -0.5, 0.5] ],
  // -Z
  [ [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [0.5, -0.5, -0.5] ],
];

export function FaceCulling() {
  // 3x3x3 grid, all filled
  const gridSize = 3;
  const voxels = useMemo(() => {
    const arr = [];
    for (let x = 0; x < gridSize; x++)
      for (let y = 0; y < gridSize; y++)
        for (let z = 0; z < gridSize; z++)
          arr.push({ x, y, z, filled: true });
    return arr;
  }, [gridSize]);

  // Helper to check if a voxel exists at (x, y, z)
  const isFilled = (x: number, y: number, z: number) =>
    voxels.some(v => v.x === x && v.y === y && v.z === z && v.filled);

  // Build geometry with only exposed faces
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];
    let vertexCount = 0;
    for (const voxel of voxels) {
      if (!voxel.filled) continue;
      for (let dir = 0; dir < 6; dir++) {
        const [dx, dy, dz] = faceDirs[dir];
        const nx = voxel.x + dx;
        const ny = voxel.y + dy;
        const nz = voxel.z + dz;
        if (!isFilled(nx, ny, nz)) {
          // Add face (quad)
          const face = faceVertexOffsets[dir];
          for (let i = 0; i < 4; i++) {
            positions.push(
              voxel.x + face[i][0],
              voxel.y + face[i][1],
              voxel.z + face[i][2]
            );
          }
          // Two triangles per face
          indices.push(
            vertexCount, vertexCount + 1, vertexCount + 2,
            vertexCount, vertexCount + 2, vertexCount + 3
          );
          vertexCount += 4;
        }
      }
    }
    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [voxels]);

  return (
    <mesh geometry={geometry as any}>
      <meshStandardMaterial color={0xcccccc} />
    </mesh>
  );
}
