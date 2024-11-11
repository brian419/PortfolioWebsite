// src/types/shaders.d.ts

import { ShaderMaterial } from 'three';

declare module '@react-three/fiber' {
    interface ThreeElements {
        waveMaterial: JSX.IntrinsicElements['meshStandardMaterial'] & { material: ShaderMaterial };
    }
}
