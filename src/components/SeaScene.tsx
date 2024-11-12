// // // // need to create a three.js procedural generation scene for a raging sea
// // // // will have waves, foam, and a boat by using glsl files

// import * as THREE from 'three';
// import { useRef, useMemo } from 'react';
// import { Canvas, useFrame, extend } from '@react-three/fiber';
// import { shaderMaterial } from '@react-three/drei';
// import waveVertexShader from '../components/shaders/seaSceneWaveVertex.glsl';
// import waveFragmentShader from '../components/shaders/seaSceneWaveFragment.glsl';

// // create WaveMaterial as a custom shader material with expected uniforms
// const WaveMaterial = shaderMaterial(
//     { time: 0, waveHeight: 1.0, waveFrequency: 0.15, foamColor: new THREE.Color(0xDCEDFF) },
//     waveVertexShader,
//     waveFragmentShader
// );

// extend({ WaveMaterial });

// // cast WaveMaterial to explicitly expect THREE.ShaderMaterial with uniforms
// type WaveMaterialType = THREE.ShaderMaterial & { uniforms: { time: { value: number } } };

// const SeaPlane = () => {
//     const ref = useRef<THREE.Mesh>(null);

//     useFrame((state) => {
//         if (ref.current && (ref.current.material as WaveMaterialType).uniforms) {
//             const material = ref.current.material as WaveMaterialType;
//             material.uniforms.time.value = state.clock.getElapsedTime();
//         }
//     });

//     return (
//         <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//             <planeGeometry args={[100, 100, 256, 256]} />
//             {/* applies type assertion to waveMaterial */}
//             <waveMaterial attach="material" args={[{ time: 0, waveHeight: 1.0, waveFrequency: 0.15, foamColor: new THREE.Color(0xDCEDFF) }]} />
//         </mesh>
//     );
// };

// const Boat = () => {
//     const boatRef = useRef<THREE.Group>(null);
//     useFrame((state) => {
//         const time = state.clock.getElapsedTime();
//         const waveHeight = Math.sin(time) * 0.5;
//         if (boatRef.current) boatRef.current.position.y = waveHeight;
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

// // rain component with splash effect
// const Rain = () => {
//     const rainCount = 1000;
//     const rainRef = useRef<THREE.Points>(null);
//     const splashesRef = useRef<THREE.Points>(null);

//     const rainPositions = useMemo(() => {
//         const positions = [];
//         for (let i = 0; i < rainCount; i++) {
//             positions.push(
//                 (Math.random() - 0.5) * 50,
//                 Math.random() * 15 + 10,
//                 (Math.random() - 0.5) * 50
//             );
//         }
//         return new Float32Array(positions);
//     }, []);

//     const splashPositions = useMemo(() => {
//         const positions = [];
//         for (let i = 0; i < rainCount; i++) {
//             positions.push(0, -10, 0); // initially off-screen
//         }
//         return new Float32Array(positions);
//     }, []);

//     useFrame(() => {
//         const rainArray = rainRef.current?.geometry.attributes.position.array;
//         const splashArray = splashesRef.current?.geometry.attributes.position.array;

//         if (rainArray && splashArray) {
//             for (let i = 1; i < rainArray.length; i += 3) {
//                 rainArray[i] -= 0.3;

//                 if (rainArray[i] < 0) {
//                     splashArray[i - 1] = rainArray[i - 1];
//                     splashArray[i] = 0;
//                     splashArray[i + 1] = rainArray[i + 1];
//                     rainArray[i] = 10 + Math.random() * 10;
//                 } else {
//                     splashArray[i] -= 0.1;
//                 }
//             }
//             rainRef.current.geometry.attributes.position.needsUpdate = true;
//             splashesRef.current.geometry.attributes.position.needsUpdate = true;
//         }
//     });

//     return (
//         <>
//             <points ref={rainRef}>
//                 <bufferGeometry>
//                     <bufferAttribute
//                         attach="attributes-position"
//                         array={rainPositions}
//                         count={rainCount}
//                         itemSize={3}
//                     />
//                 </bufferGeometry>
//                 <pointsMaterial
//                     color="#a0a0a0"
//                     size={0.15}
//                     sizeAttenuation={true}
//                     transparent={true}
//                     opacity={0.6}
//                     depthWrite={false}
//                 />
//             </points>
//             <points ref={splashesRef}>
//                 <bufferGeometry>
//                     <bufferAttribute
//                         attach="attributes-position"
//                         array={splashPositions}
//                         count={rainCount}
//                         itemSize={3}
//                     />
//                 </bufferGeometry>
//                 <pointsMaterial
//                     color="#8ED6FF"
//                     size={0.2}
//                     sizeAttenuation={true}
//                     transparent={true}
//                     opacity={0.3}
//                     depthWrite={false}
//                 />
//             </points>
//         </>
//     );
// };

// const Thunder = () => {
//     // placeholder for thunder effect
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
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import waveVertexShader from '../components/shaders/seaSceneWaveVertex.glsl';
import waveFragmentShader from '../components/shaders/seaSceneWaveFragment.glsl';

// create wave material as a custom shader material with expected uniforms
const WaveMaterial = shaderMaterial(
    { time: 0, waveHeight: 1.0, waveFrequency: 0.15, foamColor: new THREE.Color(0xDCEDFF) },
    waveVertexShader,
    waveFragmentShader
);

extend({ WaveMaterial });

// define props for waveMaterial through module augmentation
declare module '@react-three/fiber' {
    interface ThreeElements {
        waveMaterial: ReactThreeFiber.Node<WaveMaterialType, typeof WaveMaterial> & {
            time?: number;
            waveHeight?: number;
            waveFrequency?: number;
            foamColor?: THREE.Color;
        };
    }
}


// type definition for WaveMaterialType
type WaveMaterialType = THREE.ShaderMaterial & {
    uniforms: {
        time: { value: number };
        waveHeight: { value: number };
        waveFrequency: { value: number };
        foamColor: { value: THREE.Color };
    };
};

const SeaPlane = () => {
    const ref = useRef<THREE.Mesh>(null);
    const materialRef = useRef<WaveMaterialType>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100, 256, 256]} />
            <waveMaterial
                ref={materialRef}
                attach="material"
                time={0}
                waveHeight={1.0}
                waveFrequency={0.15}
                foamColor={new THREE.Color(0xDCEDFF)}
            />
        </mesh>
    );
};

const Boat = () => {
    const boatRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const waveHeight = Math.sin(time) * 0.5;
        if (boatRef.current) boatRef.current.position.y = waveHeight;
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
    const rainRef = useRef<THREE.Points>(null);
    const splashesRef = useRef<THREE.Points>(null);

    const rainPositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < rainCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 50,
                Math.random() * 15 + 10,
                (Math.random() - 0.5) * 50
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
        const rainArray = rainRef.current?.geometry.attributes.position.array as Float32Array;
        const splashArray = splashesRef.current?.geometry.attributes.position.array as Float32Array;

        if (rainArray && splashArray) {
            for (let i = 1; i < rainArray.length; i += 3) {
                rainArray[i] -= 0.3;

                if (rainArray[i] < 0) {
                    splashArray[i - 1] = rainArray[i - 1];
                    splashArray[i] = 0;
                    splashArray[i + 1] = rainArray[i + 1];
                    rainArray[i] = 10 + Math.random() * 10;
                } else {
                    splashArray[i] -= 0.1;
                }
            }
            rainRef.current.geometry.attributes.position.needsUpdate = true;
            splashesRef.current.geometry.attributes.position.needsUpdate = true;
        }
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
