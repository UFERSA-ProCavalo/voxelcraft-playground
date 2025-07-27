import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { VoxelInstances } from "./VoxelInstances";
import { CommonSceneElements } from "./CommonSceneElements";
import { mapVoxelPositions } from "./utils";
import type { VoxelData } from "../types";



interface VoxelPreviewSceneProps {
  voxels: VoxelData[];
  showAxes?: boolean;
  showOutline?: boolean;
  bounds?: number;
  gridSize?: number;

}



export function VoxelPreviewScene({
  voxels,
  showAxes = true,
  showOutline = true,
  bounds = 1,
  gridSize = 32,
  // No reset camera prop
}: VoxelPreviewSceneProps) {

  const spacing = bounds - 0.1;
  const cameraDistance = gridSize * bounds * 1.15;
  const cameraPosition: [number, number, number] = [
    cameraDistance,
    cameraDistance,
    cameraDistance,
  ];

  return (
    <Canvas
      style={{ height: "100%", width: "100%" }}
      camera={{ position: cameraPosition, fov: 50 }}
    >
      {/* OrbitControls with right mouse (pan) disabled */}
      <OrbitControls enablePan={false} />
      <CommonSceneElements
        gridSize={gridSize}
        bounds={bounds}
        spacing={spacing}
        showAxes={showAxes}
        showOutline={showOutline}
      >
        <VoxelInstances
          voxels={mapVoxelPositions(voxels, spacing)}
          bounds={bounds}
        />
      </CommonSceneElements>
    </Canvas>
  );
}
