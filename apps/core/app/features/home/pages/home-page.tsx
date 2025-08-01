
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from '../components/Scene';
import Overlay from '../components/Overlay';

export function meta() {
  return [
    { title: "Voxelcraft Playground - Home" },
    { name: "description", content: "Vamo!" },
  ];
}
export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.25}>
            <Scene />
            <Overlay />
          </ScrollControls>
        </Suspense>
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-12 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-xl font-bold text-white/90 tracking-widest uppercase">VoxelArt</h1>
      </div>
      <div className="absolute bottom-4 right-4 text-white/50 text-sm pointer-events-none z-10">
        Role para explorar
      </div>
    </>
  );
}