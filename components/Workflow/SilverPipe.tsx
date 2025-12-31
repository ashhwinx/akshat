// @ts-nocheck
import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Tube, Sphere, MeshTransmissionMaterial, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import '../../types';

// Custom shader material to handle the "Growth" reveal along the tube UVs
const GrowthMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uColor: { value: new THREE.Color('#C0C0C0') }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uProgress;
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // Tube UV.x usually wraps, UV.y goes along length (or vice versa depending on generation)
      // For TubeGeometry, x is usually along the tube length if constructed carefully, 
      // but standard is x=around, y=length? We check visually.
      // Usually vUv.x is U (around), vUv.y is V (length) or swapped.
      
      // Let's assume vUv.x is length for now, we will flip if needed.
      float progress = vUv.x; 

      // Hard cut for growth
      if (progress > uProgress) discard;

      // Chrome/Silver Liquid Effect
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);
      
      // Fresnel
      float fresnel = pow(1.0 - dot(viewDir, normal), 3.0);
      
      // Base Metal
      vec3 col = uColor * 0.2;
      
      // Specular / Reflection approximation
      vec3 reflected = reflect(-viewDir, normal);
      float spec = pow(max(dot(viewDir, reflected), 0.0), 30.0);
      
      // Add "Liquid" ripple
      float ripple = sin(progress * 20.0 - uTime * 2.0) * 0.05;
      
      gl_FragColor = vec4(col + fresnel * 0.8 + spec + ripple, 1.0);
    }
  `
};

// Create the curve path
const createPath = () => {
  const points = [
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(0, 5, 0),
    new THREE.Vector3(-2, 2, 0), // Dip Left
    new THREE.Vector3(2, -2, 0), // Dip Right
    new THREE.Vector3(-2, -6, 0), // Dip Left
    new THREE.Vector3(0, -10, 0)
  ];
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
};

interface SilverPipeProps {
  progress: number;
}

const SilverPipe: React.FC<SilverPipeProps> = ({ progress }) => {
  const path = useMemo(() => createPath(), []);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const instancesRef = useRef<THREE.InstancedMesh>(null);
  
  // Data Packets state
  const packetCount = 20;
  const packetSpeed = 0.005;
  // We store current 't' position for each packet
  const packetPositions = useMemo(() => new Float32Array(packetCount).map(() => Math.random()), []);

  useFrame((state) => {
    // Update Tube Growth
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        progress,
        0.1
      );
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }

    // Update Packets
    if (instancesRef.current) {
      const time = state.clock.getElapsedTime();
      const dummy = new THREE.Object3D();
      const currentProgress = materialRef.current?.uniforms.uProgress.value || 0;

      for (let i = 0; i < packetCount; i++) {
        // Move packet
        packetPositions[i] += packetSpeed * (1 + i * 0.1); // Vary speeds
        
        // Loop or limit to current tube growth
        if (packetPositions[i] > currentProgress) {
          packetPositions[i] = 0;
        }

        // Get position on curve
        const point = path.getPointAt(packetPositions[i]);
        const tangent = path.getTangentAt(packetPositions[i]);
        
        dummy.position.copy(point);
        dummy.lookAt(point.clone().add(tangent));
        dummy.scale.setScalar(0.15); // Size of packet
        dummy.updateMatrix();
        
        instancesRef.current.setMatrixAt(i, dummy.matrix);
      }
      instancesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* The Liquid Silver Pipe */}
      <Tube args={[path, 128, 0.4, 16, false]}>
        {/* @ts-ignore */}
        <shaderMaterial 
          ref={materialRef}
          uniforms={GrowthMaterial.uniforms}
          vertexShader={GrowthMaterial.vertexShader}
          fragmentShader={GrowthMaterial.fragmentShader}
          transparent
          side={THREE.DoubleSide}
        />
      </Tube>

      {/* The Inner "Wireframe" or Core for depth */}
      <Tube args={[path, 128, 0.1, 8, false]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} wireframe />
      </Tube>

      {/* Data Packets */}
      <instancedMesh ref={instancesRef} args={[undefined, undefined, packetCount]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </instancedMesh>
    </group>
  );
};

export default SilverPipe;