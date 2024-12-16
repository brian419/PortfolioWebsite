"use client";

import React, { useRef, useEffect } from "react";
import initializeScene from "../../components/ProceduralTerrainTestScene.js"; 
// import ProceduralTerrainLayout from "../procedural-terrain-page/layout.jsx";

export default function ProceduralTerrainPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const cleanup = initializeScene(canvasRef.current);

        return () => cleanup();
    }, []);

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
