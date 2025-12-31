// @ts-nocheck
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import '../../types';

// --- GPU SHADER MATERIAL ---
// This handles all animation on the graphics card, freeing up the CPU.

const RainShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#C0C0C0') },
    uHeightRange: { value: 20.0 }
  },
  vertexShader: `
    uniform float uTime;
    uniform float uHeightRange;
    
    attribute float aSpeed;
    attribute float aOffset;
    attribute float aHeight;
    
    varying float vAlpha;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      
      vec3 pos = position;
      
      // Calculate Y position based on time, speed, and offset
      // We use modulo to wrap the rain endlessly
      float fall = mod(uTime * aSpeed + aOffset, uHeightRange);
      pos.y = (uHeightRange * 0.5) - fall;
      
      // Stretch the particle based on its speed (motion blur effect)
      pos.y *= aHeight; 

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Fade out at top and bottom
      float normalizedY = (pos.y / (uHeightRange * 0.5)); // -1 to 1
      vAlpha = 1.0 - abs(normalizedY);
      vAlpha = smoothstep(0.0, 0.2, vAlpha); // Hard fade at edges
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vAlpha;
    varying vec2 vUv;

    void main() {
      // Create a soft rectangular glow
      // float strength = 1.0 - step(0.45, abs(vUv.x - 0.5)); // Hard edge
      
      gl_FragColor = vec4(uColor, vAlpha * 0.3);
    }
  `
};

const FeedVisualizer: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Increase count for denser feel without performance cost (GPU handles it)
  const count = 800; 

  // Generate attributes
  const { positions, speeds, offsets, heights } = useMemo(() => {
    const tempPos = [];
    const tempSpeed = [];
    const tempOffset = [];
    const tempHeight = [];
    
    for (let i = 0; i < count; i++) {
      // Position X and Z
      tempPos.push((Math.random() - 0.5) * 40); // X
      tempPos.push(0); // Y (handled by shader)
      tempPos.push((Math.random() - 0.5) * 15 - 5); // Z
      
      // Attributes
      tempSpeed.push(2.0 + Math.random() * 3.0); // Fast fall speed
      tempOffset.push(Math.random() * 20.0); // Random start pos
      tempHeight.push(1.0 + Math.random() * 2.0); // Stretch factor
    }
    
    return {
      positions: new Float32Array(tempPos),
      speeds: new Float32Array(tempSpeed),
      offsets: new Float32Array(tempOffset),
      heights: new Float32Array(tempHeight)
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.05, 1, 0.05]}>
        <instancedBufferAttribute attach="attributes-position" args={[positions, 3]} />
        <instancedBufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <instancedBufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
        <instancedBufferAttribute attach="attributes-aHeight" args={[heights, 1]} />
      </boxGeometry>
      {/* @ts-ignore */}
      <shaderMaterial
        ref={materialRef}
        args={[RainShaderMaterial]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};

export default FeedVisualizer;