import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { pointer } from '../lib/pointer';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Shards are pinned to the viewport corners rather than fixed world coordinates,
 * so they frame the headline instead of landing on top of it at any aspect ratio.
 */
function Shards() {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const hw = viewport.width / 2;
  const hh = viewport.height / 2;
  const compact = viewport.width < 4.2;
  const s = compact ? 0.72 : Math.min(1.05, Math.max(0.6, viewport.width / 9));

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += (pointer.x * 0.2 - g.rotation.y) * 0.03;
    g.rotation.x += (-pointer.y * 0.14 - g.rotation.x) * 0.03;
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.55} floatIntensity={0.9}>
        <mesh
          position={compact ? [hw - 0.35 * s, -hh + 0.7 * s, 0] : [hw - 1.35 * s, 0.2, 0]}
          rotation={[0.6, 0.3, 0.2]}
          scale={s}
        >
          <torusGeometry args={[0.78, 0.22, 40, 110]} />
          <meshStandardMaterial color="#D9DEE4" metalness={1} roughness={0.13} envMapIntensity={1.4} />
        </mesh>
      </Float>

      <Float speed={1.35} rotationIntensity={0.9} floatIntensity={1.3}>
        <mesh
          position={compact ? [hw - 0.8 * s, hh - 1.25 * s, -0.4] : [hw - 1.45 * s, hh - 1.05 * s, -0.8]}
          rotation={[0.2, 0.4, 0.5]}
          scale={s}
        >
          <torusKnotGeometry args={[0.36, 0.13, 140, 22]} />
          <meshStandardMaterial color="#FF5F2E" metalness={0.92} roughness={0.24} envMapIntensity={1.1} />
        </mesh>
      </Float>

      {!compact && (
        <Float speed={0.9} rotationIntensity={0.7} floatIntensity={1.1}>
          <mesh position={[hw - 1.15 * s, -hh + 1.35 * s, 0.4]} rotation={[0.4, 0.8, 0]} scale={s}>
            <icosahedronGeometry args={[0.74, 0]} />
            <meshStandardMaterial color="#C8CED6" metalness={1} roughness={0.2} envMapIntensity={1.2} flatShading />
          </mesh>
        </Float>
      )}

      {/* Sits in the notch the ragged headline leaves, and drifts just over its edge. */}
      {!compact && (
        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.7}>
          <mesh position={[Math.min(hw - 2.4 * s, 1.4), -0.2, 0.9]} rotation={[1.2, 0.2, 0.4]} scale={s}>
            <torusGeometry args={[0.44, 0.05, 24, 90]} />
            <meshStandardMaterial color="#E3E8EE" metalness={1} roughness={0.1} envMapIntensity={1.5} />
          </mesh>
        </Float>
      )}
    </group>
  );
}

export default function HeroShards() {
  const reduced = prefersReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />

      {/* Reflections come from lightformers, so nothing is fetched over the network. */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#0A0C10']} />
        <Lightformer form="rect" intensity={3} position={[0, 4, -3]} scale={[9, 4, 1]} color="#FFFFFF" />
        <Lightformer form="rect" intensity={2.2} position={[-5, 1, 2]} scale={[5, 5, 1]} color="#FF7A45" />
        <Lightformer form="circle" intensity={1.6} position={[5, -2, 3]} scale={4} color="#5C8CFF" />
        <Lightformer form="rect" intensity={1.1} position={[0, -4, 2]} scale={[8, 3, 1]} color="#9AA6B5" />
      </Environment>

      <Shards />
    </Canvas>
  );
}
