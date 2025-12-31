import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

// Vertex Shader
const vertexShader = `
varying vec2 vUv;
varying vec3 vPos;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vUv = uv;
  vPos = position;
  
  vec3 pos = position;
  
  // Calculate distance from mouse to vertex in world space (approximated on plane)
  float dist = distance(uv, uMouse);
  
  // Gentle wave effect
  pos.z += sin(pos.x * 2.0 + uTime) * 0.1;
  pos.z += cos(pos.y * 2.0 + uTime) * 0.1;
  
  // Mouse interaction: lift grid near mouse
  float interaction = smoothstep(0.5, 0.0, dist);
  pos.z += interaction * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Fragment Shader
const fragmentShader = `
varying vec2 vUv;
varying vec3 vPos;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  // Grid pattern
  float scale = 40.0;
  vec2 grid = abs(fract(vUv * scale - 0.5) - 0.5) / fwidth(vUv * scale);
  float line = min(grid.x, grid.y);
  
  // Soften lines
  float alpha = 1.0 - min(line, 1.0);
  
  // Distance from mouse
  float dist = distance(vUv, uMouse);
  float glow = smoothstep(0.4, 0.0, dist);
  
  // Base color (Silver/Grey)
  vec3 color = vec3(0.75, 0.75, 0.8);
  
  // Add glow near mouse
  color += vec3(1.0, 1.0, 1.0) * glow * 0.8;
  
  // Fade out edges of the plane
  float fade = 1.0 - smoothstep(0.0, 0.5, distance(vUv, vec2(0.5)));
  
  // Combine alpha
  float finalAlpha = alpha * (0.1 + glow * 0.3) * fade;

  gl_FragColor = vec4(color, finalAlpha);
}
`;

const GridMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.getElapsedTime() * 0.5;
        
        // Map normalized mouse (-1 to 1) to UV space (0 to 1)
        const targetX = (state.mouse.x + 1) / 2;
        const targetY = (state.mouse.y + 1) / 2;
        
        material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
          material.uniforms.uMouse.value.x,
          targetX,
          0.1
        );
        material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
          material.uniforms.uMouse.value.y,
          targetY,
          0.1
        );
      }
    }
  });

  return (
    <Plane
      ref={meshRef}
      args={[viewport.width * 1.5, viewport.height * 1.5, 64, 64]}
      position={[0, 0, -2]}
      rotation={[0, 0, 0]} // Facing camera
    >
      {/* @ts-ignore */}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Plane>
  );
};

const InteractiveGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]} // Optimization for high DPI screens
      >
        <GridMesh />
      </Canvas>
    </div>
  );
};

export default InteractiveGrid;