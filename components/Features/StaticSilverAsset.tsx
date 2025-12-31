// @ts-nocheck
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshTransmissionMaterial, Float, Icosahedron, TorusKnot, Sphere, Octahedron } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import '../../types';

interface StaticSilverAssetProps {
  type: 'shield' | 'bolt' | 'liquid' | 'sphere';
  hovered: boolean;
}

const StaticSilverAsset: React.FC<StaticSilverAssetProps> = ({ type, hovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Smooth scale animation on hover
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { mass: 1, tension: 170, friction: 26 }
  });

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Rotate slowly
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
  });

  // Chrome Material Props
  const chromeProps = {
    color: "#FFFFFF",
    metalness: 1,
    roughness: 0.15,
    envMapIntensity: 2,
  };

  const renderGeometry = () => {
    switch (type) {
      case 'shield':
        return (
          <group>
            {/* Core Shield */}
            {/* @ts-ignore */}
            <animated.mesh ref={meshRef} scale={scale}>
              <Octahedron args={[1.5, 0]}>
                {/* @ts-ignore */}
                <meshStandardMaterial {...chromeProps} flatShading />
              </Octahedron>
            </animated.mesh>
            {/* Orbiting Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.2, 0.05, 16, 100]} />
               {/* @ts-ignore */}
              <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </mesh>
          </group>
        );

      case 'bolt':
        return (
           /* @ts-ignore */
          <animated.mesh ref={meshRef} scale={scale}>
            <TorusKnot args={[1, 0.3, 128, 16, 2, 5]}>
               {/* @ts-ignore */}
              <meshStandardMaterial {...chromeProps} color="#E0E0E0" />
            </TorusKnot>
          </animated.mesh>
        );

      case 'liquid':
        return (
           /* @ts-ignore */
          <animated.mesh ref={meshRef} scale={scale}>
            <Sphere args={[1.4, 64, 64]}>
              <MeshDistortMaterial
                color="#C0C0C0"
                envMapIntensity={2}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={1}
                roughness={0}
                distort={0.6}
                speed={2}
              />
            </Sphere>
          </animated.mesh>
        );

      case 'sphere':
        return (
          <group>
             {/* @ts-ignore */}
            <animated.mesh ref={meshRef} scale={scale}>
              <Sphere args={[1.5, 32, 32]}>
                {/* Frosted Glass Look */}
                <MeshTransmissionMaterial
                  backside
                  samples={4}
                  thickness={2}
                  chromaticAberration={0.05}
                  anisotropy={0.1}
                  distortion={0.1}
                  distortionScale={0.1}
                  temporalDistortion={0.1}
                  iridescence={0.5}
                  iridescenceIOR={1}
                  iridescenceThicknessRange={[0, 1400]}
                  roughness={0.2}
                  color="#ffffff"
                />
              </Sphere>
            </animated.mesh>
            {/* Inner Glowing Core */}
             {/* @ts-ignore */}
            <mesh scale={0.5}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  };

  return (
    <Float rotationIntensity={0.5} floatIntensity={0.5} speed={2}>
      {renderGeometry()}
    </Float>
  );
};

export default StaticSilverAsset;