import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingBox() {
  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!boxRef.current) return;

    // Rotate
    boxRef.current.rotation.y += delta;

    // Move up and down
    boxRef.current.position.y = Math.sin(state.clock.elapsedTime) * 1;
  });

  return (
    <mesh
      ref={boxRef}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={1}
    >
      <boxGeometry args={[2, 2, 2]} />
boxRef.current.position.y =
  Math.sin(state.clock.elapsedTime) * 1;
      <meshStandardMaterial
        color="orange"
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
}

export default RotatingBox;