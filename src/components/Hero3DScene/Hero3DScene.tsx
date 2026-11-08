import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface Hero3DSceneProps {
  isDarkMode: boolean;
}

// Interactive floating 3D vinyl record
const VinylRecord = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle spin & mouse follow rotation
      meshRef.current.rotation.z += delta * 0.8;
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (-state.pointer.y * Math.PI) / 8;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetY + 0.35,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetX + 0.25,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={meshRef} position={[0, 0, 0]} rotation={[0.4, 0.2, 0]}>
        {/* Outer Vinyl Disc */}
        <mesh>
          <cylinderGeometry args={[2.5, 2.5, 0.06, 64]} />
          <meshStandardMaterial
            color={isDarkMode ? "#121316" : "#1a1d24"}
            roughness={0.25}
            metalness={0.85}
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
            roughness={0.4}
            metalness={0.3}
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

// Circular 3D Audio Frequency Visualizer Bars around the disc
const AudioWaveRings = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const barsGroupRef = useRef<THREE.Group>(null);
  const barCount = 48;

  const barPositions = useMemo(() => {
    const arr = [];
    const radius = 3.2;
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
      const t = clock.getElapsedTime() * 2.5;
      barsGroupRef.current.children.forEach((child, index) => {
        // Simulated rhythmic music bounce frequency
        const scale =
          Math.sin(t + index * 0.4) * 0.6 +
          Math.cos(t * 1.5 + index * 0.2) * 0.4 +
          1.1;
        child.scale.y = Math.max(0.2, scale);
      });
      barsGroupRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group ref={barsGroupRef} rotation={[0.4, 0.2, 0]}>
      {barPositions.map((pos, idx) => (
        <mesh key={idx} position={[pos.x, 0, pos.z]} rotation={[0, -pos.angle, 0]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial
            color={
              idx % 2 === 0
                ? isDarkMode
                  ? "#0076FF"
                  : "#2563eb"
                : isDarkMode
                ? "#B2D6FF"
                : "#60a5fa"
            }
            emissive={isDarkMode ? "#0076FF" : "#3b82f6"}
            emissiveIntensity={isDarkMode ? 0.6 : 0.2}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Dynamic floating notes / particle spheres with distortion
const FloatingMusicParticles = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <>
      <Float speed={3} rotationIntensity={1} floatIntensity={2} position={[-3.5, 1.8, -1]}>
        <mesh scale={0.45}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={isDarkMode ? "#60a5fa" : "#3b82f6"}
            distort={0.4}
            speed={3}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8} position={[3.6, -1.2, 1]}>
        <mesh scale={0.35}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={isDarkMode ? "#0076FF" : "#0284c7"}
            distort={0.5}
            speed={2}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.5} position={[3.2, 2.2, -2]}>
        <mesh scale={0.25}>
          <torusGeometry args={[1, 0.35, 16, 32]} />
          <meshStandardMaterial
            color={isDarkMode ? "#B2D6FF" : "#93c5fd"}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </>
  );
};

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto w-full h-full opacity-90 transition-opacity duration-700">
      <Canvas
        camera={{ position: [0, 1.5, 7.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={isDarkMode ? 0.8 : 1.2} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={isDarkMode ? 1.5 : 2}
          color={isDarkMode ? "#cce0ff" : "#ffffff"}
        />
        <pointLight
          position={[-6, -4, -3]}
          intensity={isDarkMode ? 1 : 1.2}
          color="#0076FF"
        />

        <VinylRecord isDarkMode={isDarkMode} />
        <AudioWaveRings isDarkMode={isDarkMode} />
        <FloatingMusicParticles isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
