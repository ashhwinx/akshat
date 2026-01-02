// @ts-nocheck
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// ==========================================
// 1. HELPER: BITCOIN SHAPE
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
// 2. BITCOIN COMPONENT
// ==========================================
const BitcoinStyleCoin: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ridgeRef = useRef<THREE.InstancedMesh>(null);

  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFD700",
    metalness: 1.0,
    roughness: 0.2,
    emissive: "#B8860B",
    emissiveIntensity: 0.1,
    envMapIntensity: 1.0,
  }), []);

  const matteGoldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFC300",
    metalness: 0.8,
    roughness: 0.6,
  }), []);

  const whiteEnamelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFFFFF",
    roughness: 0.3,
    metalness: 0.1,
  }), []);

  const bitcoinGeometry = useMemo(() => new THREE.ExtrudeGeometry(createBitcoinShape(), {
    depth: 0.4, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2
  }), []);

  useEffect(() => {
    if (ridgeRef.current) {
      const tempObj = new THREE.Object3D();
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
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
      groupRef.current.rotation.y += 0.005; 
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={[1.3, 1.3, 1.3]} rotation={[Math.PI / 2 + 0.2, 0, 0]}>
      {/* HUGE INVISIBLE HIT BOX */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[5, 5, 2, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      <mesh material={goldMaterial}>
        <cylinderGeometry args={[2, 2, 0.35, 32]} /> 
      </mesh>
      <instancedMesh ref={ridgeRef} args={[null, null, 40]} material={goldMaterial}>
        <boxGeometry args={[0.15, 0.4, 0.08]} />
      </instancedMesh>
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
        <torusGeometry args={[1.8, 0.15, 12, 48]} />
      </mesh>
      <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
        <torusGeometry args={[1.8, 0.15, 12, 48]} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={matteGoldMaterial}>
         <circleGeometry args={[1.8, 24]} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={matteGoldMaterial}>
         <circleGeometry args={[1.8, 24]} />
      </mesh>
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
// 3. HELPER: SOLANA SHAPE
// ==========================================
const createSolanaBar = () => {
  const shape = new THREE.Shape();
  const width = 1.2;
  const height = 0.25;
  const slant = 0.25;
  shape.moveTo(slant, height);
  shape.lineTo(width + slant, height);
  shape.lineTo(width, 0);
  shape.lineTo(0, 0);
  return shape;
};

// ==========================================
// 4. SOLANA COMPONENT
// ==========================================
const SolanaStyleCoin: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ridgeRef = useRef<THREE.InstancedMesh>(null);

  const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#E0E0E0", metalness: 1.0, roughness: 0.2, envMapIntensity: 1.5,
  }), []);

  const darkMatteMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#18181B", metalness: 0.5, roughness: 0.7,
  }), []);

  const solGreenMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#14F195", emissive: "#14F195", emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.1,
  }), []);

  const solPurpleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#9945FF", emissive: "#9945FF", emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.1,
  }), []);

  const barGeometry = useMemo(() => new THREE.ExtrudeGeometry(createSolanaBar(), {
    depth: 0.2, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 1
  }), []);

  useEffect(() => {
    if (ridgeRef.current) {
      const tempObj = new THREE.Object3D();
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
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
      groupRef.current.rotation.y += 0.005; 
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={[1.3, 1.3, 1.3]} rotation={[Math.PI / 2 + 0.2, 0, 0]}>
      {/* HUGE INVISIBLE HIT BOX */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[5, 5, 2, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      <mesh material={chromeMaterial}>
        <cylinderGeometry args={[2, 2, 0.35, 32]} />
      </mesh>
      <instancedMesh ref={ridgeRef} args={[null, null, 40]} material={chromeMaterial}>
        <boxGeometry args={[0.15, 0.4, 0.08]} />
      </instancedMesh>
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial}>
        <torusGeometry args={[1.8, 0.15, 12, 48]} />
      </mesh>
      <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial}>
        <torusGeometry args={[1.8, 0.15, 12, 48]} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={darkMatteMaterial}>
         <circleGeometry args={[1.8, 24]} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={darkMatteMaterial}>
         <circleGeometry args={[1.8, 24]} />
      </mesh>
      <group rotation={[-Math.PI/2, 0, 0]} position={[0, 0.2, 0]} scale={0.9}>
        <mesh position={[-0.6, 0.5, 0]} material={solGreenMaterial} geometry={barGeometry} />
        <mesh position={[0.7, 0.05, 0]} scale={[-1, 1, 1]} material={solPurpleMaterial} geometry={barGeometry} />
        <mesh position={[-0.6, -0.4, 0]} material={solPurpleMaterial} geometry={barGeometry} />
        <group position={[0, 0, -0.4]} rotation={[0, Math.PI, 0]}>
             <mesh position={[-0.6, 0.5, 0]} material={solGreenMaterial} geometry={barGeometry} />
             <mesh position={[0.7, 0.05, 0]} scale={[-1, 1, 1]} material={solPurpleMaterial} geometry={barGeometry} />
             <mesh position={[-0.6, -0.4, 0]} material={solPurpleMaterial} geometry={barGeometry} />
        </group>
      </group>
    </group>
  );
};

// ==========================================
// 5. EXPORTED COMPONENT (Wrapper)
// ==========================================
const HeroCoins: React.FC = () => {
  return (
    <>
      {/* 1. BITCOIN */}
      <group position={[-14, 5.5, -20]}> 
        <PresentationControls
          global={false}        
          cursor={true}
          snap={true}           
          speed={2}             
          zoom={1}
          polar={[-Infinity, Infinity]}
          azimuth={[-Infinity, Infinity]}
          config={{ mass: 1, tension: 170, friction: 26 }}
        >
          <BitcoinStyleCoin /> 
        </PresentationControls>
      </group>

      {/* 2. SOLANA */}
      <group position={[18, -4, -22]}>
        <PresentationControls
          global={false}
          cursor={true}
          snap={true}
          speed={2}
          zoom={1}
          polar={[-Infinity, Infinity]}
          azimuth={[-Infinity, Infinity]}
          config={{ mass: 1, tension: 170, friction: 26 }}
        >
          <SolanaStyleCoin />
        </PresentationControls>
      </group>
    </>
  );
};

export default HeroCoins;