"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentMountRef = mountRef.current; // Save the ref value to a local variable
    
    if (!currentMountRef) return; // Ensure the ref exists

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMountRef.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (currentMountRef) {
        currentMountRef.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return <div ref={mountRef} />;
}
