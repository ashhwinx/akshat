// @ts-nocheck
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float } from '@react-three/drei';
import SilverPipe from './SilverPipe';
import '../../types';

interface WorkflowCanvasProps {
  progress: number;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ progress }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
        
        <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#C0C0C0" />
            
            <SilverPipe progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WorkflowCanvas;