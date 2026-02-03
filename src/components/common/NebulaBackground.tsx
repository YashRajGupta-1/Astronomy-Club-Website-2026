import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* =======================
   NEBULA PARTICLE FIELD
   ======================= */
function NebulaField({ mouse }) {
  const ref = useRef(null);

  const { positions, colors, speeds } = useMemo(() => {
    const COUNT = 65000;

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);

    const color = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      // Volumetric sphere distribution
      const radius = Math.pow(Math.random(), 1.8) * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);

      // Nebula color palette (emission + reflection)
      const hue =
        Math.random() < 0.6
          ? 0.75 + Math.random() * 0.12 // purple / pink
          : 0.55 + Math.random() * 0.08; // blue

      color.setHSL(hue, 1.0, 0.6);
      colors.set([color.r, color.g, color.b], i * 3);

      speeds[i] = Math.random() * 0.6 + 0.2;
    }

    return { positions, colors, speeds };
  }, []);

  useFrame(({ clock }) => {
  const t = clock.elapsedTime;
  const geom = ref.current.geometry;
  const pos = geom.attributes.position.array;

  for (let i = 0; i < speeds.length; i++) {
    const ix = i * 3;
    const iy = ix + 1;
    const iz = ix + 2;

    const x = pos[ix];
    const y = pos[iy];
    const z = pos[iz];

    /* -------------------------
       Nebula curl-like motion
       ------------------------- */
    pos[ix] += Math.sin(t * 0.25 + y) * 0.002 * speeds[i];
    pos[iy] += Math.cos(t * 0.2 + z) * 0.002 * speeds[i];
    pos[iz] += Math.sin(t * 0.15 + x) * 0.002 * speeds[i];

    /* -------------------------
       Mouse hover disturbance
       ------------------------- */
    const dx = x - mouse.current.x * 3;
    const dy = y - mouse.current.y * 3;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const influenceRadius = 1.8;

    if (distance < influenceRadius) {
      const force =
        (1 - distance / influenceRadius) * 0.015;

      // Push outward (gas displacement)
      pos[ix] += dx * force;
      pos[iy] += dy * force;

      // Swirl (nebula turbulence)
      pos[ix] += -dy * force * 0.4;
      pos[iy] += dx * force * 0.4;
    }
  }

  geom.attributes.position.needsUpdate = true;

  /* -------------------------
     Cosmic rotation
     ------------------------- */
  ref.current.rotation.y = t * 0.035;
  ref.current.rotation.x = t * 0.02;
});


  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* =======================
   NEBULA BACKGROUND
   ======================= */
export default function NebulaBackground() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      style={{ position: "fixed", inset: 0 }}
      onMouseMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }}
    >
      <Canvas camera={{ position: [0, 0, 12], fov: 65 }}>
        <color attach="background" args={["#000"]} />
        <fog attach="fog" args={["#000", 6, 18]} />
        <NebulaField mouse={mouse} />
      </Canvas>
    </div>
  );
}
