// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
// import '../../types'; // Keeping this if you need it, otherwise can be removed

const HeroSphere: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // 1. Access Viewport for Responsiveness
  const { viewport } = useThree();

  // Responsive Logic:
  // We calculate a ratio based on width. If width < 6 (typical mobile/portrait), we scale down.
  const isMobile = viewport.width < 6;
  
  // Scale: 100% on desktop, ~60% on mobile to fit screen
  const scaleFactor = isMobile ? viewport.width / 5.5 : 1; 
  
  // Y Position: As sphere gets smaller, we need to raise it slightly 
  // so the curve remains visible, otherwise it sinks too deep.
  // Original Y was -4.5. On mobile we raise it to around -2.5 or dynamic based on scale.
  const positionY = isMobile ? -2.5 : -4.5;

  // 2. Grid Coordinates (unchanged logic, just memoized)
  const particleCount = 6000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const radius = 4.5;
    
    let idx = 0;
    const parallels = 60; 
    const meridians = 80; 
    
    for (let i = 0; i <= parallels; i++) {
      const v = i / parallels;
      const phi = v * Math.PI; 
      
      for (let j = 0; j <= meridians; j++) {
        const u = j / meridians;
        const theta = u * Math.PI * 2; 
        
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
    
    // 3. Animation Speed Reduction
    // Previous: 0.03
    // New: 0.03 * 0.8 = 0.024 (20% slower)
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.024; 
    }

    // Breathing glow effect
    if (materialRef.current && materialRef.current.uniforms) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.viewVector.value = state.camera.position;
    }
  });

  const glowMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      glowColor: { value: new THREE.Color('#C0C0C0') },
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
        // Adjusted fresnel logic slightly for better visibility at different scales
        vIntensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float uTime;
      varying float vIntensity;
      
      void main() {
        float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
        vec3 glow = glowColor * vIntensity * pulse;
        float alpha = smoothstep(0.0, 1.0, vIntensity);
        gl_FragColor = vec4(glow, alpha * 0.8);
      }
    `,
    side: THREE.BackSide, 
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  }), []);

  return (
    // 4. ADJUSTED VIEW FOR RESPONSIVENESS:
    // We apply the dynamic scale and position calculated above.
    <group 
      position={[0, positionY, 0]} 
      scale={[scaleFactor, scaleFactor, scaleFactor]} 
      rotation={[0.25, 0, 0]}
    >
      
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

      {/* 2. The Inner Black Hole */}
      <mesh>
        <sphereGeometry args={[4.45, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 3. The Atmospheric Glow Ring */}
      <mesh scale={1.05}>
        <sphereGeometry args={[4.5, 64, 64]} />
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