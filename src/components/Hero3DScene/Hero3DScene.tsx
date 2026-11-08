import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface Hero3DSceneProps {
  isDarkMode: boolean;
}

// Interactive floating 3D vinyl record
const VinylRecord = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.7;
      const targetX = (state.pointer.x * Math.PI) / 7;
      const targetY = (-state.pointer.y * Math.PI) / 7;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetY + 0.3,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetX + 0.2,
        0.05
      );
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.2}>
      <group ref={meshRef} position={[0, 0.4, 0]} rotation={[0.35, 0.2, 0]}>
        {/* Outer Vinyl Disc */}
        <mesh>
          <cylinderGeometry args={[2.5, 2.5, 0.06, 64]} />
          <meshStandardMaterial
            color={isDarkMode ? "#0d0e11" : "#1a1d24"}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Subtle Grooves on Disc */}
        {[1.3, 1.6, 1.9, 2.2].map((radius, idx) => (
          <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.032, 0]}>
            <ringGeometry args={[radius - 0.015, radius, 64]} />
            <meshBasicMaterial
              color={isDarkMode ? "#38567B" : "#5588cc"}
              opacity={0.35}
              transparent
            />
          </mesh>
        ))}

        {/* Center Label (Nora themed) */}
        <mesh position={[0, 0.035, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.02, 48]} />
          <meshStandardMaterial
            color={isDarkMode ? "#0076FF" : "#3b82f6"}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>

        {/* Center Hole */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.03, 32]} />
          <meshStandardMaterial
            color={isDarkMode ? "#2F3137" : "#e2e8f0"}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Circular 3D Audio Frequency Visualizer Bars
const AudioWaveRings = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const barsGroupRef = useRef<THREE.Group>(null);
  const barCount = 56;

  const barPositions = useMemo(() => {
    const arr = [];
    const radius = 3.3;
    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      arr.push({ x, z, angle });
    }
    return arr;
  }, [barCount]);

  useFrame(({ clock }) => {
    if (barsGroupRef.current) {
      const t = clock.getElapsedTime() * 2.8;
      barsGroupRef.current.children.forEach((child, index) => {
        const scale =
          Math.sin(t + index * 0.35) * 0.7 +
          Math.cos(t * 1.6 + index * 0.18) * 0.5 +
          1.2;
        child.scale.y = Math.max(0.2, scale);
      });
      barsGroupRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group ref={barsGroupRef} position={[0, 0.4, 0]} rotation={[0.35, 0.2, 0]}>
      {barPositions.map((pos, idx) => (
        <mesh key={idx} position={[pos.x, 0, pos.z]} rotation={[0, -pos.angle, 0]}>
          <boxGeometry args={[0.09, 1.3, 0.09]} />
          <meshStandardMaterial
            color={
              idx % 2 === 0
                ? isDarkMode
                  ? "#0076FF"
                  : "#2563eb"
                : isDarkMode
                ? "#60a5fa"
                : "#93c5fa"
            }
            emissive={isDarkMode ? "#0076FF" : "#3b82f6"}
            emissiveIntensity={isDarkMode ? 0.7 : 0.3}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
};

// 3D Animated undulating terrain waves behind the scene
const WaveGrid = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const gridSize = 45;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const geom = meshRef.current.geometry;
      const pos = geom.attributes.position;
      const t = clock.getElapsedTime() * 1.2;

      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        // Harmonic undulating wave formula
        const z =
          Math.sin(u * 0.35 + t) * 0.6 +
          Math.cos(v * 0.35 + t * 0.8) * 0.6;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.3, 0, 0]}
      position={[0, -1.8, -3.5]}
    >
      <planeGeometry args={[26, 18, gridSize, gridSize]} />
      <meshStandardMaterial
        wireframe
        color={isDarkMode ? "#0076FF" : "#38567B"}
        opacity={isDarkMode ? 0.35 : 0.22}
        transparent
      />
    </mesh>
  );
};

// Dynamic floating notes / particle spheres
const FloatingMusicParticles = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <>
      <Float speed={3} rotationIntensity={1} floatIntensity={2} position={[-4.5, 2.2, -1]}>
        <mesh scale={0.55}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={isDarkMode ? "#60a5fa" : "#3b82f6"}
            distort={0.4}
            speed={3}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8} position={[4.6, -0.6, 1]}>
        <mesh scale={0.45}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={isDarkMode ? "#0076FF" : "#0284c7"}
            distort={0.5}
            speed={2}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.5} position={[4.2, 2.6, -2]}>
        <mesh scale={0.32}>
          <torusGeometry args={[1, 0.35, 16, 32]} />
          <meshStandardMaterial
            color={isDarkMode ? "#B2D6FF" : "#93c5fd"}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.6} position={[-3.8, -1.2, 0]}>
        <mesh scale={0.28}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={isDarkMode ? "#00c6ff" : "#0284c7"}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>
      </Float>
    </>
  );
};

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto w-full h-full opacity-95 transition-opacity duration-700">
      <Canvas
        camera={{ position: [0, 1.2, 8], fov: 48 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={isDarkMode ? 0.9 : 1.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={isDarkMode ? 1.8 : 2.2}
          color={isDarkMode ? "#cce0ff" : "#ffffff"}
        />
        <pointLight
          position={[-6, -4, -3]}
          intensity={isDarkMode ? 1.2 : 1.4}
          color="#0076FF"
        />

        {/* 3D Cosmic Particle Glow / Stardust */}
        <Sparkles
          count={75}
          scale={12}
          size={isDarkMode ? 2.8 : 2.2}
          speed={0.4}
          opacity={isDarkMode ? 0.6 : 0.4}
          color={isDarkMode ? "#B2D6FF" : "#0076FF"}
        />

        {/* Interactive 3D Vinyl & Sound Wave Rings */}
        <VinylRecord isDarkMode={isDarkMode} />
        <AudioWaveRings isDarkMode={isDarkMode} />

        {/* Dynamic 3D Undulating Wave Grid */}
        <WaveGrid isDarkMode={isDarkMode} />

        {/* Floating Shapes & Distortion Orbs */}
        <FloatingMusicParticles isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
