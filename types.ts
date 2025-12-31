import React from 'react';
import { ThreeElements } from '@react-three/fiber';

// Augment the global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      group: any;
      mesh: any;
      scene: any;
      fog: any;
      primitive: any;
      sphereGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      cylinderGeometry: any;
      torusGeometry: any;
      icosahedronGeometry: any;
      octahedronGeometry: any;
      bufferGeometry: any;
      bufferAttribute: any;
      instancedBufferAttribute: any;
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      shaderMaterial: any;
      points: any;
      pointsMaterial: any;
      instancedMesh: any;
      texture: any;
      // Catch-all for other R3F elements
      [key: string]: any;
    }
  }
}

// Augment React's JSX namespace (specifically for React 18+ module resolution)
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      group: any;
      mesh: any;
      scene: any;
      fog: any;
      primitive: any;
      sphereGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      cylinderGeometry: any;
      torusGeometry: any;
      icosahedronGeometry: any;
      octahedronGeometry: any;
      bufferGeometry: any;
      bufferAttribute: any;
      instancedBufferAttribute: any;
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      shaderMaterial: any;
      points: any;
      pointsMaterial: any;
      instancedMesh: any;
      texture: any;
      [key: string]: any;
    }
  }
}
