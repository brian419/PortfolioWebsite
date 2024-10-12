"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const GalaxyScene = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current! });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = false;
        renderer.setClearColor(0x000000, 0); // transparent background

        const controls = new OrbitControls(camera as THREE.Camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.5;

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
            randomness: 0.2, //0.12
            randomnessPower: 6,
            insideColor: '#ff6030',
            outsideColor: '#00bfff',
        };

        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        });

        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const velocities = new Float32Array(parameters.count); // Speeds for each star
        const activeShootingStars = new Set<number>(); // To track flying stars

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

            velocities[i] = 0; // Default speed is zero (stationary)

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const points = new THREE.Points(geometry, material);
        points.rotation.x = Math.PI / 2;
        scene.add(points);

        // launching shooting stars to user
        const launchShootingStar = () => {
            const randomIndex = Math.floor(Math.random() * parameters.count);
            if (!activeShootingStars.has(randomIndex)) {
                activeShootingStars.add(randomIndex);
                velocities[randomIndex] = Math.random() * 0.2 + 0.05; // random speed for star coming to user
            }
        };

        setInterval(launchShootingStar, 2000);

        // Set the camera position
        camera.position.z = 30;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            points.rotation.y += 0.001;

            for (let i = 0; i < parameters.count; i++) {
                if (velocities[i] > 0) {
                    const i3 = i * 3;
                    positions[i3 + 1] += velocities[i]; // moving star towards the camera

                    // star reaches camera
                    if (positions[i3 + 2] > camera.position.z) {
                        velocities[i] = 0; // stop the star
                        activeShootingStars.delete(i); // remove from active shooting stars
                        // reset to original position
                        positions[i3 + 2] = Math.sin((i % parameters.branches) / parameters.branches * Math.PI * 2 + parameters.spin * Math.random() * parameters.radius) * parameters.radius;
                    }
                }
            }

            // Update positions in geometry
            geometry.attributes.position.needsUpdate = true;

            controls.update(); // user interaction
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
