"use client";

import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas>
    <mesh
  position={[2, 0, 0]}
  rotation={[2, 0, 0]}
  scale={1}
>
  <boxGeometry args={[2, 2, 2]} />

  <meshStandardMaterial
    color="orange"
    roughness={0.4}
    metalness={0.3}
  />
</mesh>

<directionalLight position={[0, 0, 1]} intensity={1} />
    </Canvas>
  );
}