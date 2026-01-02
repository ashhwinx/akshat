// @ts-nocheck
import React from 'react';
import { Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import HeroCoins from './HeroCoins'; // Import the new coins file

// ==========================================
// 1. EXISTING GRIDS
// ==========================================
const GridMaterial = {
  uniforms: {
    uColor: { value: new THREE.Color('#FFFFFF') },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float scale = 30.0;
      vec2 grid = abs(fract(vUv * scale - 0.5) - 0.5) / fwidth(vUv * scale);
      float line = min(grid.x, grid.y);
      float alpha = 1.0 - min(line, 1.0);
      float mask = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x) * smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
      gl_FragColor = vec4(uColor, alpha * mask * 0.12);
    }
  `
};

const CornerGrid: React.FC<{ position: [number, number, number], rotation: [number, number, number] }> = ({ position, rotation }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[30, 30]} />
      {/* @ts-ignore */}
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={GridMaterial.uniforms}
        vertexShader={GridMaterial.vertexShader}
        fragmentShader={GridMaterial.fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// ==========================================
// MAIN BACKGROUND SCENE
// ==========================================
const HeroBackground: React.FC = () => {
  return (
    <group>
      {/* LIGHTING & ATMOSPHERE */}
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={1.5} color="#4444ff" />
      <fog attach="fog" args={['#000000', 5, 55]} />
      
      {/* GRIDS */}
      <CornerGrid position={[-20, 12, -15]} rotation={[0.5, 0.8, 0.2]} />
      <CornerGrid position={[20, 12, -15]} rotation={[0.5, -0.8, -0.2]} />
      
      {/* SPARKLES */}
      <Sparkles count={25} scale={20} size={3} speed={0.4} opacity={0.4} color="#FFD700" />

      {/* COINS IMPORTED HERE */}
      <HeroCoins />
    </group>
  );
};

export default HeroBackground;