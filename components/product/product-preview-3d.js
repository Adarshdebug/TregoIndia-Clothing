"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, useTexture } from "@react-three/drei";

function PreviewMesh({ images }) {
  const [frontTexture, sideTexture] = useTexture([
    images?.[0] || "/logo.png",
    images?.[1] || images?.[0] || "/logo.png"
  ]);

  return (
    <Float rotationIntensity={0.25} floatIntensity={0.3}>
      <mesh rotation={[0.1, 0.55, -0.06]}>
        <boxGeometry args={[2.5, 3.2, 0.25]} />
        <meshStandardMaterial attach="material-0" map={frontTexture} />
        <meshStandardMaterial attach="material-1" map={frontTexture} />
        <meshStandardMaterial attach="material-2" color="#2a2018" />
        <meshStandardMaterial attach="material-3" color="#2a2018" />
        <meshStandardMaterial attach="material-4" map={sideTexture} />
        <meshStandardMaterial attach="material-5" map={sideTexture} />
      </mesh>
    </Float>
  );
}

export function ProductPreview3D({ images }) {
  return (
    <div className="surface mt-6 overflow-hidden p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">3D preview</div>
          <div className="text-sm text-[var(--muted)]">Drag to inspect the product surfaces.</div>
        </div>
      </div>
      <div className="h-[320px] rounded-lg bg-[var(--surface-alt)]">
        <Canvas camera={{ position: [0, 0, 5], fov: 38 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 6, 6]} intensity={2} />
          <Suspense fallback={null}>
            <PreviewMesh images={images} />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={4} maxDistance={7} />
        </Canvas>
      </div>
    </div>
  );
}
