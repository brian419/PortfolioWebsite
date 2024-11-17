"use client";

import React, { useRef, useEffect } from "react";
import initializeScene from "../../components/ProceduralTerrainTestScene.js"; 

export default function ProceduralTerrainPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const cleanup = initializeScene(canvasRef.current);

        return () => cleanup();
    }, []);

    return (
        <div className="min-h-screen">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
    );
}
