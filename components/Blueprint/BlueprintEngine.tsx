// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import '../../types';

interface BlueprintEngineProps {
  progress: number;
}

// --- Materials ---
// High-performance chrome material
const ChromeMaterial = new THREE.MeshStandardMaterial({
  color: "#FFFFFF",
  metalness: 1.0,
  roughness: 0.15,
  envMapIntensity: 1.5,
});

// Emissive Core Material
const CoreMaterial = new THREE.MeshStandardMaterial({
  color: "#000000",
  metalness: 0.8,
  roughness: 0.2,
  emissive: "#4488ff",
  emissiveIntensity: 2,
});

// Wireframe Material
const WireframeMaterial = new THREE.MeshBasicMaterial({
  color: "#404040",
  wireframe: true,
  transparent: true,
  opacity: 0.1,
});

const BlueprintEngine: React.FC<BlueprintEngineProps> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate random positions for the "panels" (debris field)
  const panelData = useMemo(() => {
    return new Array(12).fill(null).map((_, i) => ({
      // Final exploded position
      targetPos: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ),
      // Random rotation axis
      rotAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
      scale: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  // Generate particles
  const particlePos = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300 * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = progress; // 0 to 1

    // 1. GLOBAL ROTATION (Constant slow spin + Scroll induced spin)
    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y = t * 0.1; 
      
      // Scroll-driven rapid spin layer
      // We lerp current rotation to a target based on scroll
      const targetRotZ = p * Math.PI * 0.5;
      const targetRotX = p * Math.PI * 0.2;
      
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    // 2. CORE PULSE & COLOR
    if (coreRef.current) {
      // Pulse faster as we scroll deeper
      const pulseSpeed = 2 + (p * 5); 
      const scale = 1 + Math.sin(t * pulseSpeed) * 0.05;
      coreRef.current.scale.setScalar(scale);
      
      // Color Shift: Blue -> White -> Red (Warning)
      const color = new THREE.Color();
      if (p < 0.5) {
         color.setHSL(0.6, 1, 0.5); // Blue
      } else {
         color.setHSL(0.6 + (p - 0.5) * 0.8, 1, 0.5 + (p-0.5)); // Shift towards white/reddish
      }
      (coreRef.current.material as THREE.MeshStandardMaterial).emissive.copy(color);
    }

    // 3. OUTER RINGS (Gyroscope effect)
    if (outerRingRef.current) {
       // Expand rings based on progress
       const expansion = 1 + p * 1.5;
       outerRingRef.current.scale.setScalar(expansion);
       
       // Spin rings independently
       outerRingRef.current.children[0].rotation.x = t * 0.5 + p * 5;
       outerRingRef.current.children[1].rotation.y = t * 0.3 + p * 3;
       outerRingRef.current.children[2].rotation.z = t * 0.2 + p * 2;
    }

    // 4. PANELS EXPLOSION
    if (panelsRef.current) {
       panelsRef.current.children.forEach((child, i) => {
          const data = panelData[i];
          // Lerp from center (0,0,0) to targetPos based on progress
          // We use a curve: starts slow, explodes fast in middle
          const explosionFactor = THREE.MathUtils.smoothstep(p, 0.1, 0.8);
          
          child.position.lerp(data.targetPos.clone().multiplyScalar(explosionFactor), 0.1);
          
          // Rotate panels
          child.rotation.x = t * 0.2 + p * data.rotAxis.x * 5;
          child.rotation.y = t * 0.2 + p * data.rotAxis.y * 5;
       });
    }

    // 5. CAMERA MOVEMENT (Subtle dolly zoom feel)
    // Parent handles main camera, but we can drift the group
    if (groupRef.current) {
       groupRef.current.position.z = THREE.MathUtils.lerp(0, 2, p);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Environment for Chrome Reflections */}
      <Environment preset="city" />

      {/* Lights */}
      {/* @ts-ignore */}
      <ambientLight intensity={0.2} />
      {/* @ts-ignore */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      {/* @ts-ignore */}
      <pointLight position={[-10, -10, -5]} intensity={1} color="#4488ff" />

      {/* --- THE CORE --- */}
      {/* @ts-ignore */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 4]} />
        <primitive object={CoreMaterial} attach="material" />
      </mesh>
      {/* Wireframe Overlay on Core */}
      {/* @ts-ignore */}
      <mesh scale={1.05}>
        <icosahedronGeometry args={[1, 1]} />
        <primitive object={WireframeMaterial} attach="material" />
      </mesh>

      {/* --- GYROSCOPE RINGS --- */}
      <group ref={outerRingRef}>
         {/* Ring 1 */}
         {/* @ts-ignore */}
         <mesh>
            <torusGeometry args={[1.8, 0.05, 16, 100]} />
            <primitive object={ChromeMaterial} attach="material" />
         </mesh>
         {/* Ring 2 */}
         {/* @ts-ignore */}
         <mesh rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[2.2, 0.05, 16, 100]} />
            <primitive object={ChromeMaterial} attach="material" />
         </mesh>
         {/* Ring 3 */}
         {/* @ts-ignore */}
         <mesh rotation={[0, Math.PI/2, 0]}>
            <torusGeometry args={[2.6, 0.05, 16, 100]} />
            <primitive object={ChromeMaterial} attach="material" />
         </mesh>
      </group>

      {/* --- EXPLODING PANELS --- */}
      <group ref={panelsRef}>
         {panelData.map((data, i) => (
            /* @ts-ignore */
            <mesh key={i} scale={data.scale}>
               <boxGeometry args={[0.5, 0.5, 0.05]} />
               <primitive object={ChromeMaterial} attach="material" />
            </mesh>
         ))}
      </group>

      {/* --- AMBIENT PARTICLES --- */}
      {/* @ts-ignore */}
      <points ref={particlesRef}>
         <bufferGeometry>
            <bufferAttribute
               attach="attributes-position"
               count={300}
               array={particlePos}
               itemSize={3}
            />
         </bufferGeometry>
         <pointsMaterial 
            size={0.05} 
            color="#C0C0C0" 
            transparent 
            opacity={0.4} 
            sizeAttenuation 
         />
      {/* @ts-ignore */}
      </points>

    </group>
  );
};

export default BlueprintEngine;