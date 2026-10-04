"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Cube() {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!cubeRef.current) return;

    cubeRef.current.rotation.x += delta;
    // cubeRef.current.rotation.y += delta * 0.75; 
  });

  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" roughness={0.4} metalness={0.3} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [2, 0, 0], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 1]} intensity={1.5} />
      <Cube />
    </Canvas>
  );
}