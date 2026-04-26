"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, RoundedBox } from "@react-three/drei";

function FloatingStack() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 3]} intensity={2} />
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.5}>
        <RoundedBox args={[2.4, 3, 0.35]} radius={0.12}>
          <meshStandardMaterial color="#d8d8d8" metalness={0.15} roughness={0.2} />
        </RoundedBox>
      </Float>
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[-1.8, 1.1, -1.1]}>
          <sphereGeometry args={[0.45, 40, 40]} />
          <meshStandardMaterial color="#707070" />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[1.8, -1.3, -1]}>
          <torusGeometry args={[0.55, 0.14, 24, 90]} />
          <meshStandardMaterial color="#f6f6f6" metalness={0.2} roughness={0.18} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 42 }}>
      <FloatingStack />
    </Canvas>
  );
}
