"use client";

import { Canvas } from "@react-three/fiber";

export default function CubeScene() {
  return (
    <Canvas camera={{ position: [1, 1, 1] }}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="green" />
      </mesh>
     
    </Canvas>
  );
}