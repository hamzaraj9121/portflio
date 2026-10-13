
"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

function InteractiveCube() {
  const cubeRef = useRef<THREE.Mesh>(null!);

  useGSAP(() => {
    const cube = cubeRef.current;

    // Create smooth animators once
    const rotateX = gsap.quickTo(cube.rotation, "x", {
      duration: 1,
      ease: "power2.out",
    });

    const rotateY = gsap.quickTo(cube.rotation, "y", {
      duration: 0.4,
      ease: "power2.out",
    });

    function handlePointerMove(
      event: { pointer: THREE.Vector2 }
    ) {
      rotateX(-event.pointer.y * 0.5);
      rotateY(event.pointer.x * 1.5);
    }

    // Store the handler for the mesh below
    cube.userData.handlePointerMove = handlePointerMove;
  });

  return (
    <mesh
      ref={cubeRef}
      onPointerMove={(event) => {
        const handler = cubeRef.current?.userData
          .handlePointerMove;

        handler?.(event);
      }}
      onPointerLeave={() => {
        gsap.to(cubeRef.current.rotation, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="orange"
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
}

export default function MouseCube() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 5]} />
        <InteractiveCube />
      </Canvas>
    </div>
  );
}
