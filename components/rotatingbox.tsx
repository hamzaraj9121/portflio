"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function RotatingBox() {
  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!boxRef.current) return;

    boxRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [2, 2, 5]  }} >
      <RotatingBox />
    </Canvas>
  );
}