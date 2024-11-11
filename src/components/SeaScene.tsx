// // need to create a three.js procedural generation scene for a raging sea
// // will have waves, foam, and a boat by using glsl files


// import * as THREE from 'three';
// import { useRef, useMemo } from 'react';
// import { Canvas, useFrame, extend } from '@react-three/fiber';
// import { shaderMaterial } from '@react-three/drei';
// import waveVertexShader from '../components/shaders/seaSceneWaveVertex.glsl';
// import waveFragmentShader from '../components/shaders/seaSceneWaveFragment.glsl';

// const WaveMaterial = shaderMaterial(
//     { time: 0, waveHeight: 1.0, waveFrequency: 0.15, foamColor: new THREE.Color(0xDCEDFF) },
//     waveVertexShader,
//     waveFragmentShader
// );

// extend({ WaveMaterial });

// const SeaPlane = () => {
//     const ref = useRef();
//     useFrame((state) => {
//         ref.current.material.uniforms.time.value = state.clock.getElapsedTime();
//     });

//     return (
//         <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//             <planeGeometry args={[100, 100, 256, 256]} />
//             <waveMaterial attach="material" />
//         </mesh>
//     );
// };

// const Boat = () => {
//     const boatRef = useRef();
//     useFrame((state) => {
//         const time = state.clock.getElapsedTime();
//         const waveHeight = Math.sin(time) * 0.5;
//         boatRef.current.position.y = waveHeight;
//     });

//     return (
//         <group ref={boatRef}>
//             <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
//                 <boxGeometry args={[3, 0.5, 1]} />
//                 <meshStandardMaterial color="#8B4513" />
//             </mesh>
//             <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
//                 <cylinderGeometry args={[1.5, 1.5, 3, 8, 1, true]} />
//                 <meshStandardMaterial color="#8B4513" />
//             </mesh>
//             <mesh position={[0, 1, 0]}>
//                 <boxGeometry args={[1, 0.5, 0.8]} />
//                 <meshStandardMaterial color="darkgrey" />
//             </mesh>
//         </group>
//     );
// };

// const Rain = () => {
//     const rainCount = 1000;
//     const rainRef = useRef();

//     const rainPositions = useMemo(() => {
//         const positions = [];
//         for (let i = 0; i < rainCount; i++) {
//             positions.push(
//                 (Math.random() - 0.5) * 50, // x position spread across a wide area
//                 Math.random() * 10 + 10,    // y position high in the air to fall down
//                 (Math.random() - 0.5) * 50  // z position spread across a wide area
//             );
//         }
//         return new Float32Array(positions);
//     }, []);

//     useFrame(() => {
//         const positions = rainRef.current.geometry.attributes.position.array;
//         for (let i = 1; i < positions.length; i += 3) {
//             positions[i] -= 0.2; 

//             // resets raindrop to the top when it falls below the sea level
//             if (positions[i] < 0) {
//                 positions[i] = 10 + Math.random() * 10; 
//             }
//         }
//         rainRef.current.geometry.attributes.position.needsUpdate = true;
//     });

//     return (
//         <points ref={rainRef}>
//             <bufferGeometry>
//                 <bufferAttribute
//                     attach="attributes-position"
//                     array={rainPositions}
//                     count={rainCount}
//                     itemSize={3}
//                 />
//             </bufferGeometry>
//             <pointsMaterial
//                 color="#a0a0a0"
//                 size={0.1}
//                 sizeAttenuation={true}
//                 transparent={true}
//                 opacity={0.6}
//                 depthWrite={false}
//             />
//         </points>
//     );
// };


// const Thunder = () => {
//     //temp
// };

// export default function SeaScene() {
//     return (
//         <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
//             <ambientLight intensity={0.3} />
//             <directionalLight position={[5, 10, 5]} intensity={1.2} />
//             <SeaPlane />
//             <Boat />
//             <Rain />
//             {/* <Thunder /> */}
//         </Canvas>
//     );
// }



import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import waveVertexShader from '../components/shaders/seaSceneWaveVertex.glsl';
import waveFragmentShader from '../components/shaders/seaSceneWaveFragment.glsl';

const WaveMaterial = shaderMaterial(
    { time: 0, waveHeight: 1.0, waveFrequency: 0.15, foamColor: new THREE.Color(0xDCEDFF) },
    waveVertexShader,
    waveFragmentShader
);

extend({ WaveMaterial });

const SeaPlane = () => {
    const ref = useRef();
    useFrame((state) => {
        ref.current.material.uniforms.time.value = state.clock.getElapsedTime();
    });

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[100, 100, 256, 256]} />
            <waveMaterial attach="material" />
        </mesh>
    );
};

const Boat = () => {
    const boatRef = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const waveHeight = Math.sin(time) * 0.5;
        boatRef.current.position.y = waveHeight;
    });

    return (
        <group ref={boatRef}>
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[3, 0.5, 1]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.5, 1.5, 3, 8, 1, true]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[1, 0.5, 0.8]} />
                <meshStandardMaterial color="darkgrey" />
            </mesh>
        </group>
    );
};

// rain component with splash effect
const Rain = () => {
    const rainCount = 1000;
    const rainRef = useRef();
    const splashesRef = useRef();
    
    const rainPositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < rainCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 50, // x position
                Math.random() * 15 + 10,    // y position
                (Math.random() - 0.5) * 50  // z position
            );
        }
        return new Float32Array(positions);
    }, []);

    const splashPositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < rainCount; i++) {
            positions.push(0, -10, 0); // initially off-screen
        }
        return new Float32Array(positions);
    }, []);

    useFrame(() => {
        const rainArray = rainRef.current.geometry.attributes.position.array;
        const splashArray = splashesRef.current.geometry.attributes.position.array;

        for (let i = 1; i < rainArray.length; i += 3) {
            rainArray[i] -= 0.3; 

            // collision check and reset
            if (rainArray[i] < 0) {
                // splash effect when rain reaches the sea level
                splashArray[i - 1] = rainArray[i - 1]; // x position
                splashArray[i] = 0; // y position for splash
                splashArray[i + 1] = rainArray[i + 1]; // z position

                // resets raindrop back to the top
                rainArray[i] = 10 + Math.random() * 10;
            } else {
                // make splash fade by lowering it gradually
                splashArray[i] -= 0.1; 
            }
        }
        rainRef.current.geometry.attributes.position.needsUpdate = true;
        splashesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <>
            <points ref={rainRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={rainPositions}
                        count={rainCount}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#a0a0a0"
                    size={0.15}
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.6}
                    depthWrite={false}
                />
            </points>
            
            {/* Splash effect particles */}
            <points ref={splashesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={splashPositions}
                        count={rainCount}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#8ED6FF"
                    size={0.2}
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.3}
                    depthWrite={false}
                />
            </points>
        </>
    );
};

const Thunder = () => {
    // placeholder for thunder effect
};

export default function SeaScene() {
    return (
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />
            <SeaPlane />
            <Boat />
            <Rain />
            {/* <Thunder /> */}
        </Canvas>
    );
}
