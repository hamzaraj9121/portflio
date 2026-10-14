"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

function CameraRig() {
  const { camera } = useThree();

  useGSAP(() => {
    // Make the camera look at the cube
    camera.lookAt(0, 0, 0);

    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    // Move closer and to the right
    timeline.to(camera.position, {
      x: 2,
      y: 0,
      z: 3,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(0, 0, 0),
    });

    // Move to the left
    timeline.to(camera.position, {
      x: -2,
      y: 0,
      z: 5,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(0, 0, 0),
    });

    return () => {
      timeline.kill();
    };
  }, [camera]);

  return null;
}

function Cube() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function CameraAnimation() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 5]} />

        <CameraRig />
        <Cube />
      </Canvas>
    </div>
  );
}
