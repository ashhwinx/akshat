// @ts-nocheck
import React from 'react';
import * as THREE from 'three';
import '../../types';

// --- SHADER FOR THE CORNER GRIDS ---
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
      // Grid Pattern - Scaled to 30.0 for smaller, tighter boxes
      float scale = 30.0;
      vec2 grid = abs(fract(vUv * scale - 0.5) - 0.5) / fwidth(vUv * scale);
      float line = min(grid.x, grid.y);
      float alpha = 1.0 - min(line, 1.0);

      // Soft Edge Masking (Vignette for the plane)
      float mask = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x) * 
                   smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);

      gl_FragColor = vec4(uColor, alpha * mask * 0.12); // Low opacity for subtle look
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

const HeroBackground: React.FC = () => {
  return (
    <group>
      {/* Pure Black Fog to fade distant objects and blend the grids */}
      <fog attach="fog" args={['#000000', 5, 45]} />
      
      {/* Left Corner Grid (Upper Left) */}
      <CornerGrid position={[-20, 12, -15]} rotation={[0.5, 0.8, 0.2]} />

      {/* Right Corner Grid (Upper Right) */}
      <CornerGrid position={[20, 12, -15]} rotation={[0.5, -0.8, -0.2]} />
      
      {/* Orbs removed as they are now handled in HeroContent for better alignment */}
      
    </group>
  );
};

export default HeroBackground;