
"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function AnimatedCube() {
  const cubeRef = useRef<THREE.Mesh>(null!);

  useGSAP(() => {
    const cube = cubeRef.current;

    const animation = gsap.to(cube.rotation, {
      x: Math.PI ,
      y: Math.PI ,
      ease: "none",

      scrollTrigger: {
        trigger: "#cube-section",
        start: "top end",
        end: "+600",
        scrub: 1,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="orange"
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
}

export default function ScrollCube() {
  return (
    <section
      id="cube-section"
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 5]} />

          <AnimatedCube />
        </Canvas>
      </div>
    </section>
  );
}

