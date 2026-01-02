// @ts-nocheck
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ==========================================
// 1. EXISTING GRIDS (UNTOUCHED)
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
// 2. HELPER: BITCOIN SHAPE
// ==========================================
const createBitcoinShape = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.4, -1.2);
  shape.lineTo(-0.4, 1.2); 
  shape.lineTo(0.2, 1.2);  
  shape.bezierCurveTo(1.0, 1.2, 1.0, 0.1, 0.2, 0.1);
  shape.lineTo(-0.1, 0.1); 
  shape.lineTo(0.3, 0.1);
  shape.bezierCurveTo(1.2, 0.1, 1.2, -1.2, 0.3, -1.2);
  shape.lineTo(-0.4, -1.2);

  const topHole = new THREE.Path();
  topHole.moveTo(-0.1, 0.9);
  topHole.lineTo(0.2, 0.9);
  topHole.bezierCurveTo(0.6, 0.9, 0.6, 0.4, 0.2, 0.4);
  topHole.lineTo(-0.1, 0.4);
  shape.holes.push(topHole);

  const bottomHole = new THREE.Path();
  bottomHole.moveTo(-0.1, -0.2);
  bottomHole.lineTo(0.3, -0.2);
  bottomHole.bezierCurveTo(0.8, -0.2, 0.8, -0.9, 0.3, -0.9);
  bottomHole.lineTo(-0.1, -0.9);
  shape.holes.push(bottomHole);
  return shape;
};

// ==========================================
// 3. OPTIMIZED BITCOIN COMPONENT
// ==========================================
const BitcoinStyleCoin: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ridgeRef = useRef<THREE.InstancedMesh>(null);

  // Materials created once
  const goldMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#FFD700",
    metalness: 1.0,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.2, 
    emissive: "#FFD700",
    emissiveIntensity: 0.05,
  }), []);

  const matteGoldMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#FFC300",
    metalness: 1.0,
    roughness: 0.4,
    envMapIntensity: 0.8,
  }), []);

  const whiteEnamelMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#FFFFFF",
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 1.0,
  }), []);

  const bitcoinGeometry = useMemo(() => new THREE.ExtrudeGeometry(createBitcoinShape(), {
    depth: 0.4, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4 // Reduced segments
  }), []);

  // OPTIMIZATION: Setup InstancedMesh for ridges (1 Draw call instead of 60)
  useEffect(() => {
    if (ridgeRef.current) {
      const tempObj = new THREE.Object3D();
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 2.02;
        tempObj.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        tempObj.rotation.set(0, -angle, 0);
        tempObj.updateMatrix();
        ridgeRef.current.setMatrixAt(i, tempObj.matrix);
      }
      ridgeRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow, static rotation
      groupRef.current.rotation.y += 0.005; 
      // Gentle floating without expensive calculations
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[1.3, 1.3, 1.3]} rotation={[Math.PI / 2 + 0.2, 0, 0]}>
      {/* Main Core */}
      <mesh material={goldMaterial}>
        <cylinderGeometry args={[2, 2, 0.35, 48]} /> {/* Reduced segments */}
      </mesh>

      {/* OPTIMIZED RIDGES: Instanced Mesh */}
      <instancedMesh ref={ridgeRef} args={[null, null, 50]} material={goldMaterial}>
        <boxGeometry args={[0.12, 0.4, 0.08]} />
      </instancedMesh>

      {/* Rims */}
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
        <torusGeometry args={[1.8, 0.15, 16, 64]} />
      </mesh>
      <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
        <torusGeometry args={[1.8, 0.15, 16, 64]} />
      </mesh>

      {/* Faces */}
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={matteGoldMaterial}>
         <circleGeometry args={[1.8, 32]} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={matteGoldMaterial}>
         <circleGeometry args={[1.8, 32]} />
      </mesh>

      {/* Logo */}
      <group rotation={[Math.PI/2, Math.PI, 0]} position={[0.1, 0.2, 0]}>
          <mesh geometry={bitcoinGeometry} material={whiteEnamelMaterial} scale={0.85} />
      </group>
      <group rotation={[Math.PI/2, 0, 0]} position={[-0.1, -0.2, 0]}>
          <mesh geometry={bitcoinGeometry} material={whiteEnamelMaterial} scale={0.85} />
      </group>
    </group>
  );
};

// ==========================================
// 4. OPTIMIZED ETHER COMPONENT
// ==========================================
const EtherStyleCoin: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ridgeRef = useRef<THREE.InstancedMesh>(null);

  // Materials
  const platinumMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#E5E4E2",
    metalness: 1.0,
    roughness: 0.15,
    clearcoat: 1.0,
    envMapIntensity: 1.5,
    emissive: "#E5E4E2",
    emissiveIntensity: 0.05,
  }), []);

  const darkPlatinumMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#2C2C2C",
    metalness: 1.0,
    roughness: 0.4,
    envMapIntensity: 1.0,
  }), []);

  const gemMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#0066FF",
    metalness: 0.0,
    roughness: 0.0,
    transmission: 0.6, // Reduced transmission for performance
    thickness: 1.0,
    ior: 1.5,
    emissive: "#0022AA",
    emissiveIntensity: 0.4,
  }), []);

  // OPTIMIZATION: Setup InstancedMesh for ridges
  useEffect(() => {
    if (ridgeRef.current) {
      const tempObj = new THREE.Object3D();
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 2.02;
        tempObj.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        tempObj.rotation.set(0, -angle, 0);
        tempObj.updateMatrix();
        ridgeRef.current.setMatrixAt(i, tempObj.matrix);
      }
      ridgeRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow rotation
      groupRef.current.rotation.y += 0.005; 
      // Gentle floating
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[1.3, 1.3, 1.3]} rotation={[Math.PI / 2 + 0.2, 0, 0]}>
      {/* Body */}
      <mesh material={platinumMaterial}>
        <cylinderGeometry args={[2, 2, 0.35, 48]} />
      </mesh>

      {/* OPTIMIZED RIDGES */}
      <instancedMesh ref={ridgeRef} args={[null, null, 50]} material={platinumMaterial}>
        <boxGeometry args={[0.12, 0.4, 0.08]} />
      </instancedMesh>

      {/* Rims */}
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={platinumMaterial}>
        <torusGeometry args={[1.8, 0.15, 16, 64]} />
      </mesh>
      <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={platinumMaterial}>
        <torusGeometry args={[1.8, 0.15, 16, 64]} />
      </mesh>

      {/* Face */}
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={darkPlatinumMaterial}>
         <circleGeometry args={[1.8, 32]} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={darkPlatinumMaterial}>
         <circleGeometry args={[1.8, 32]} />
      </mesh>

      {/* Logo */}
      <group rotation={[-Math.PI/2, 0, 0]} position={[0, 0.2, 0]}>
        <mesh position={[0, 0.4, 0]} material={gemMaterial}>
          <coneGeometry args={[0.7, 0.8, 4]} />
        </mesh>
        <mesh position={[0, -0.4, 0]} rotation={[Math.PI, 0, 0]} material={gemMaterial}>
          <coneGeometry args={[0.7, 0.8, 4]} />
        </mesh>
        {/* Backside */}
         <mesh position={[0, 0.4, -0.4]} rotation={[Math.PI, 0, 0]} material={gemMaterial}>
          <coneGeometry args={[0.7, 0.8, 4]} />
        </mesh>
      </group>
    </group>
  );
};

// ==========================================
// MAIN COMPONENT (Optimized Lighting)
// ==========================================
const HeroBackground: React.FC = () => {
  return (
    <group>
      {/* OPTIMIZED LIGHTING: Shared lights instead of local coin lights */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={4} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={2} color="#4444ff" />

      {/* 1. Deep Fog */}
      <fog attach="fog" args={['#000000', 5, 55]} />
      
      {/* 2. Grids */}
      <CornerGrid position={[-20, 12, -15]} rotation={[0.5, 0.8, 0.2]} />
      <CornerGrid position={[20, 12, -15]} rotation={[0.5, -0.8, -0.2]} />
      
      {/* 3. Coins (No Float component wrapper) */}
      <BitcoinStyleCoin position={[-14, 5.5, -20]} />
      <EtherStyleCoin position={[18, -4, -22]} />

      {/* Global Sparkles */}
      <Sparkles count={25} scale={20} size={3} speed={0.4} opacity={0.4} color="#FFD700" />
    </group>
  );
};

export default HeroBackground;