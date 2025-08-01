
import React, { useRef, useMemo } from 'react';
import { useFrame} from '@react-three/fiber';
import { useScroll, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import type { ThreeElements } from '@react-three/fiber';

const Voxel = (props: ThreeElements['mesh']) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#6a0dad" roughness={0.5} metalness={0.1} />
    </mesh>
  );
};

const VoxelGroup = () => {
  const count = 100;
  const voxels = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const x = (1 + Math.random()) * 2 * (Math.random() < 0.5 ? -1 : 1);
      const y = (1 + Math.random()) * 2 * (Math.random() < 0.5 ? -1 : 1);
      const z = (1 + Math.random()) * 2 * (Math.random() < 0.5 ? -1 : 1);
      temp.push({ t, factor, x, y, z, position: new THREE.Vector3(x,y,z) });
    }
    return temp;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!groupRef.current) return;
    voxels.forEach((data, i) => {
      let { t, factor, x, y, z } = data;
      t = data.t += 0.01;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        x + a,
        y + b,
        z + b
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

	  if (groupRef.current == null){
		console.warn("groupRef is null, skipping update");
		return;
	  }
      const child = groupRef.current.children[i];
      if (child) {
        child.position.copy(dummy.position);
        child.scale.copy(dummy.scale);
        child.rotation.copy(dummy.rotation);
      }
    });
  });

  return (
    <group ref={groupRef}>
        {voxels.map((_, i) => <Voxel key={i} />)}
    </group>
  );
};


export default function Scene() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null!);
  const shapeRef1 = useRef<THREE.Mesh>(null!);
  const shapeRef2 = useRef<THREE.Group>(null!);
  const shapeRef3 = useRef<THREE.Mesh>(null!);
  const shapeRef4 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current || !shapeRef1.current || !shapeRef2.current || !shapeRef3.current || !shapeRef4.current) return;

    const r1 = scroll.range(0 / 5, 1 / 5);
    const r2 = scroll.range(1 / 5, 1 / 5);
    const r3 = scroll.range(2 / 5, 1 / 5);
    const r4 = scroll.range(3 / 5, 1 / 5);
    
    // Animate group rotation for overall scene movement
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, (-state.pointer.x * Math.PI) / 6, 4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, (state.pointer.y * Math.PI) / 6, 4, delta);

    // Section 1: Idealização (Cube)
    shapeRef1.current.rotation.y = r1 * Math.PI * 2;
    shapeRef1.current.position.z = 8 - 16 * r1;
    shapeRef1.current.visible = r1 > 0;

    // Section 2: Objetivo (Voxel Group)
    shapeRef2.current.position.z = 10 - 20 * r2;
    shapeRef2.current.rotation.x = r2 * Math.PI;
    shapeRef2.current.visible = r2 > 0;
    
    // Section 3: Funcionalidades (Torus)
    shapeRef3.current.position.z = 12 - 24 * r3;
    shapeRef3.current.rotation.z = -r3 * Math.PI * 3;
    shapeRef3.current.visible = r3 > 0;
    
    // Section 4: Equipe (Dodecahedron)
    shapeRef4.current.position.z = 14 - 28 * r4;
    shapeRef4.current.rotation.y = r4 * Math.PI * 1.5;
    shapeRef4.current.visible = r4 > 0;
    shapeRef4.current.scale.setScalar(Math.max(0.1, r4));

  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8a2be2" />
      <directionalLight position={[-10, -10, 5]} intensity={0.8} color="#00ffff" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <group ref={groupRef}>
        <mesh ref={shapeRef1} visible={false}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#4a044e" roughness={0.3} metalness={0.2} />
        </mesh>
        
        <group ref={shapeRef2} visible={false}>
           <VoxelGroup />
        </group>
        
        <mesh ref={shapeRef3} visible={false}>
          <torusGeometry args={[1, 0.2, 16, 100]} />
          <meshStandardMaterial color="#2d00f7" roughness={0.2} metalness={0.3} />
        </mesh>

        <mesh ref={shapeRef4} visible={false}>
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#00f5d4" roughness={0.1} metalness={0.5} wireframe/>
        </mesh>
      </group>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.8} />
      </EffectComposer>
    </>
  );
}
