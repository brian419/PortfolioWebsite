"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const GalaxyScene = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // Initialize the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current! });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = false;
        renderer.autoClear = false; // allows overlay

        // OrbitControls: Enable camera movement via mouse controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth movement when panning/rotating
        controls.dampingFactor = 0.05; // Damping for smoother motion
        controls.enableZoom = true; // Enable zoom with the mouse scroll
        controls.autoRotate = false; // Optional: Enable automatic rotation
        controls.autoRotateSpeed = 0.5; // Speed of the auto-rotation if enabled

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        // Create the galaxy
        const parameters = {
            count: 8000,
            size: 0.1,
            radius: 20,
            branches: 2,
            spin: 2,
            randomness: 0.12,
            randomnessPower: 6,
            insideColor: '#ff6030',
            outsideColor: '#1b3984',
        };

        let geometry = null;
        let material = null;
        let points = null;

        const generateGalaxy = () => {
            geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(parameters.count * 3);
            const colors = new Float32Array(parameters.count * 3);
            const colorInside = new THREE.Color(parameters.insideColor);
            const colorOutside = new THREE.Color(parameters.outsideColor);

            for (let i = 0; i < parameters.count; i++) {
                const i3 = i * 3;
                const radius = Math.random() * parameters.radius;
                const spinAngle = radius * parameters.spin;
                const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

                positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
                positions[i3 + 1] = randomY;
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

                const mixedColor = colorInside.clone();
                mixedColor.lerp(colorOutside, radius / parameters.radius);

                colors[i3] = mixedColor.r;
                colors[i3 + 1] = mixedColor.g;
                colors[i3 + 2] = mixedColor.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            material = new THREE.PointsMaterial({
                size: parameters.size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true,
            });

            points = new THREE.Points(geometry, material);
            points.rotation.x = Math.PI / 2;
            scene.add(points);
        };

        generateGalaxy();

        // Set the camera position
        camera.position.z = 30; // Adjust based on how zoomed out you want to start

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (points) {
                points.rotation.y += 0.001; // Slow rotation
            }
            controls.update(); // Update controls to allow user interaction
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('resize', () => { });
            controls.dispose(); // Clean up controls on component unmount
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    );
};

export default GalaxyScene;
