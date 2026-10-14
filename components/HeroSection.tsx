"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ----------------------------------
// Robot Component
// ----------------------------------

function Robot() {
  const { scene } = useGLTF("/models/friendly_robot.glb") as any;

  const robotRef = useRef<THREE.Group>(null);

  const pointer = useRef({
    x: 0,
    y: 0,
  });

  const initialPosition = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      pointer.current.y =
        (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    const robot = robotRef.current;

    if (!robot) return;

    const { x, y } = pointer.current;

    // Turn toward the cursor.
    robot.rotation.y = THREE.MathUtils.damp(
      robot.rotation.y,
      x * 0.4,
      4,
      delta
    );

    // Tilt vertically.
    robot.rotation.x = THREE.MathUtils.damp(
      robot.rotation.x,
      -y * 0.12,
      4,
      delta
    );

    // Floating animation.
    robot.position.y =
      initialPosition.current +
      Math.sin(state.clock.elapsedTime * 1.3) * 0.12;
  });

  return (
    <group
      ref={robotRef}
      position={[0, -2, -3]}
      scale={2.1}
    >
      <primitive object={scene} />
    </group>
  );
}

// ----------------------------------
// Robot Scene
// ----------------------------------

function RobotScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5.5],
        fov: 35,
      }}
      gl={{
        alpha: true,
        antialias: true,
      }}
      dpr={[1, 1.75]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.8} />

      <directionalLight
        position={[3, 5, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-4, 2, 1]}
        intensity={1.5}
        color="#ffcf6c"
      />

      <Suspense fallback={null}>
        <Robot />

        <ContactShadows
          position={[0, -1.18, 0]}
          opacity={0.2}
          scale={4}
          blur={2.5}
          far={3}
        />
      </Suspense>
    </Canvas>
  );
}

// ----------------------------------
// Magnetic Button
// ----------------------------------

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  primary?: boolean;
}

interface Offset {
  x: number;
  y: number;
}

interface PointerPosition {
  x: number;
  y: number;
}

interface HeroButtonStyle extends CSSProperties {
  "--mouse-x": string;
  "--mouse-y": string;
}

function MagneticButton({
  children,
  href,
  primary = false,
}: MagneticButtonProps) {
  const [offset, setOffset] = useState<Offset>({
    x: 0,
    y: 0,
  });

  const [pointer, setPointer] = useState<PointerPosition>({
    x: 50,
    y: 50,
  });

  function handleMouseMove(
    event: MouseEvent<HTMLAnchorElement>
  ) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPointer({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });

    // Magnetic pull toward the cursor.
    setOffset({
      x: (x - rect.width / 2) * 0.12,
      y: (y - rect.height / 2) * 0.12,
    });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
    setPointer({ x: 50, y: 50 });
  }

  const buttonStyle: HeroButtonStyle = {
    "--mouse-x": `${pointer.x}%`,
    "--mouse-y": `${pointer.y}%`,
    transform: `translate(${offset.x}px, ${offset.y}px)`,
  };

  return (
    <a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
      className={`hero-button ${
        primary
          ? "hero-button-primary"
          : "hero-button-secondary"
      }`}
    >
      <span>{children}</span>

      <span
        className="hero-button-arrow"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  );
}

// ----------------------------------
// Hero Component
// ----------------------------------

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative isolate overflow-hidden"
    >
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-layout">
        {/* Left: text and actions */}
        <div className="hero-copy">
          <div className="availability">
            <span className="availability-dot" />
            AVAILABLE FOR FREELANCE
          </div>

          <p className="hero-eyebrow">
            CREATIVE DEVELOPER &amp; FULL-STACK ENGINEER
          </p>

          <h1 className="hero-title">
            Building full-
            <br />
            stack
            <br />
            <span>applications</span>
            <br />
            that matter.
          </h1>

          <p className="hero-description">
            Full-stack developer specializing in building
            exceptional web and mobile applications — from
            fluid 3D interfaces to pixel-perfect UI.
          </p>

          <div className="hero-actions">
            <MagneticButton href="#skills" primary>
              View Skills
            </MagneticButton>

            <MagneticButton href="#contact">
              Get in Touch
            </MagneticButton>
          </div>
        </div>

        {/* Right: interactive 3D robot */}
        <div className="hero-visual">
          <div className="robot-halo" aria-hidden="true" />

          <RobotScene />

          <div className="robot-caption">
            <span className="caption-dot" />
            <span>DESIGN · CODE · INNOVATE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
