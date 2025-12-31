// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import '../../types';

const HeroSphere: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  // We reference the material directly now
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // 1. Generate specific sphere coordinates for a "Latitude/Longitude" grid look
  const particleCount = 6000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const radius = 4.5;
    
    let idx = 0;
    const parallels = 60; // Latitude lines
    const meridians = 80; // Longitude lines
    
    for (let i = 0; i <= parallels; i++) {
      const v = i / parallels;
      const phi = v * Math.PI; // 0 to PI
      
      for (let j = 0; j <= meridians; j++) {
        const u = j / meridians;
        const theta = u * Math.PI * 2; // 0 to 2PI
        
        // Spherical to Cartesian
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        if (idx < particleCount * 3) {
           pos[idx] = x;
           pos[idx + 1] = y;
           pos[idx + 2] = z;
           idx += 3;
        }
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow, majestic rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03; // Spin horizontally
      pointsRef.current.rotation.z = Math.sin(time * 0.1) * 0.05; // Slight tilt wobble
    }

    // Breathing glow effect
    // Safely access via materialRef
    if (materialRef.current && materialRef.current.uniforms) {
       materialRef.current.uniforms.uTime.value = time;
       materialRef.current.uniforms.viewVector.value = state.camera.position;
    }
  });

  // Custom Shader for the Atmospheric Glow (Fresnel effect)
  // MEMOIZED to prevent recreation on every frame
  const glowMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      glowColor: { value: new THREE.Color('#C0C0C0') }, // Silver
      viewVector: { value: new THREE.Vector3(0, 0, 10) },
      fresnelBias: { value: 0.1 },
      fresnelScale: { value: 2.0 },
      fresnelPower: { value: 3.0 },
    },
    vertexShader: `
      uniform vec3 viewVector;
      varying float vIntensity;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        
        vIntensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0); // Simple rim approximation
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float uTime;
      varying float vIntensity;
      
      void main() {
        // Pulsating glow
        float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
        vec3 glow = glowColor * vIntensity * pulse;
        
        // Fade out significantly towards center to show black core
        float alpha = smoothstep(0.0, 1.0, vIntensity);
        
        gl_FragColor = vec4(glow, alpha * 0.8);
      }
    `,
    side: THREE.BackSide, // Render on back to create "atmosphere" behind/around
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }), []);

  return (
    // Positioned low to create the "Horizon" effect
    // Moved Y from -3.8 to -4.5 to lower it
    <group position={[0, -4.5, 0]} rotation={[0.2, 0, 0]}>
      
      {/* 1. The Particle Grid Sphere */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FFFFFF"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* 2. The Inner Black Hole (Occludes the back particles) */}
      <mesh>
        <sphereGeometry args={[4.45, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 3. The Atmospheric Glow Ring */}
      <mesh scale={1.05}>
        <sphereGeometry args={[4.5, 64, 64]} />
        {/* Attach ref to the material primitive so we can access uniforms directly */}
        <primitive 
          ref={materialRef} 
          object={glowMaterial} 
          attach="material" 
        />
      </mesh>

    </group>
  );
};

export default HeroSphere;