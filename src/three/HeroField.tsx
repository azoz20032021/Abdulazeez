import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { pointer } from '../lib/pointer';
import { prefersReducedMotion } from '../lib/motion';

const COLS = 30;
const ROWS = 30;
const GAP = 0.46;
const COUNT = COLS * ROWS;

function Lattice() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const ripple = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => new THREE.BoxGeometry(0.085, 1, 0.085), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3D4650',
        metalness: 0.75,
        roughness: 0.34,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  const writeMatrices = useCallback(
    (t: number) => {
      const inst = mesh.current;
      if (!inst) return;

      let i = 0;
      for (let cx = 0; cx < COLS; cx++) {
        for (let cz = 0; cz < ROWS; cz++) {
          const x = (cx - COLS / 2) * GAP;
          const z = (cz - ROWS / 2) * GAP;

          const d = Math.hypot(x - ripple.current.x, z + ripple.current.y);
          const wave = Math.sin(d * 1.15 - t * 1.5) * Math.exp(-d * 0.13);
          const drift = Math.sin(x * 0.35 + t * 0.45) * 0.18;
          const height = 0.35 + Math.abs(wave) * 1.5 + Math.abs(drift);

          dummy.position.set(x, height * 0.5 - 0.6, z);
          dummy.scale.set(1, height, 1);
          dummy.updateMatrix();
          inst.setMatrixAt(i++, dummy.matrix);
        }
      }

      inst.instanceMatrix.needsUpdate = true;
    },
    [dummy],
  );

  // With reduced motion the frame loop never runs, so lay the field out once —
  // otherwise every instance stays stacked at the origin.
  useEffect(() => {
    writeMatrices(0);
  }, [writeMatrices]);

  useFrame(({ clock }) => {
    ripple.current.x += (pointer.x * 5 - ripple.current.x) * 0.045;
    ripple.current.y += (pointer.y * 4 - ripple.current.y) * 0.045;
    writeMatrices(clock.elapsedTime);
  });

  return <instancedMesh ref={mesh} args={[geometry, material, COUNT]} frustumCulled={false} />;
}

export default function HeroField() {
  const reduced = prefersReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 3.1, 7.4], fov: 38 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      onCreated={({ camera }) => camera.lookAt(0, -0.4, 0)}
    >
      <color attach="background" args={['#08090B']} />
      <fog attach="fog" args={['#08090B', 7, 17]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 8, 4]} intensity={1.15} color="#CFE0F5" />
      <pointLight position={[-5, 1.5, 3]} intensity={38} distance={22} color="#FF5F2E" />
      <pointLight position={[6, 2, -2]} intensity={22} distance={20} color="#4E7FFF" />

      <Lattice />
    </Canvas>
  );
}
