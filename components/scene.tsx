"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

function AnimatedBox() {
  const boxRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (!boxRef.current) return;


   const tl = gsap.timeline();

tl.to(boxRef.current.position, {
  x: 3,
  duration: 2,
})
.to(boxRef.current.rotation, {
  y: Math.PI,
  duration: 1,
})
.to(boxRef.current.scale, {
  x: 2,
  y: 2,
  z: 2,
  duration: 1,
});
  }, []);

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <AnimatedBox />
    </Canvas>
  );
}