import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SUBTRACTION, Evaluator, Brush } from 'three-bvh-csg'
import GUI from "lil-gui";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import terrainVertexShader from "./shaders/terrain/testProceduralTerrainVertex.glsl";
import terrainFragmentShader from "./shaders/terrain/testProceduralTerrainFragment.glsl";

export default function initializeScene(canvas) {
    // Debug GUI
    const gui = new GUI({ width: 325 });
    const debugObject = {
        colorWaterDeep: "#002b3d",
        colorWaterSurface: "#66a8ff",
        colorSand: "#ffe894",
        colorGrass: "#85d534",
        colorSnow: "#ffffff",
        colorRock: "#bfbd8d",
        ambientLightIntensity: 0.5,
        directionalLightIntensity: 1.5,
        pointLightIntensity: 1.0,
    };

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
    };

    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(-12, 6, 0);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(sizes.pixelRatio);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Terrain
    const geometry = new THREE.PlaneGeometry(10, 10, 500, 500);
    geometry.deleteAttribute("uv");
    geometry.deleteAttribute("normal");
    geometry.rotateX(-Math.PI * 0.5);


    const uniforms = {
        uTime: new THREE.Uniform(0),
        uPositionFrequency: new THREE.Uniform(0.2),
        uStrength: new THREE.Uniform(2.0),
        uWarpFrequency: new THREE.Uniform(5),
        uWarpStrength: new THREE.Uniform(0.5),
        uColorWaterDeep: new THREE.Uniform(new THREE.Color(debugObject.colorWaterDeep)),
        uColorWaterSurface: new THREE.Uniform(new THREE.Color(debugObject.colorWaterSurface)),
        uColorSand: new THREE.Uniform(new THREE.Color(debugObject.colorSand)),
        uColorGrass: new THREE.Uniform(new THREE.Color(debugObject.colorGrass)),
        uColorSnow: new THREE.Uniform(new THREE.Color(debugObject.colorSnow)),
        uColorRock: new THREE.Uniform(new THREE.Color(debugObject.colorRock)),
    };

    const material = new CustomShaderMaterial({
        baseMaterial: THREE.MeshStandardMaterial,
        vertexShader: terrainVertexShader,
        fragmentShader: terrainFragmentShader,
        uniforms: uniforms,
        metalness: 0,
        roughness: 0.5,
        color: "#85d534",
        silent: true,
    });

    const terrain = new THREE.Mesh(geometry, material);
    terrain.receiveShadow = true;
    terrain.castShadow = true;
    scene.add(terrain);

    // Floor for underside of terrain, just box geometry with no shader
    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.5, 10),
        new THREE.MeshStandardMaterial({ color: "#ffffff" })
    );
    floor.position.y = -1.2;
    scene.add(floor);

    // GUI for terrain parameters
    gui.add(uniforms.uPositionFrequency, "value", 0, 1, 0.01).name("Position Frequency");
    gui.add(uniforms.uStrength, "value", 0, 10, 0.1).name("Strength");
    gui.add(uniforms.uWarpFrequency, "value", 0, 10, 0.1).name("Warp Frequency");
    gui.add(uniforms.uWarpStrength, "value", 0, 1, 0.01).name("Warp Strength");
    gui.addColor(debugObject, "colorWaterDeep").onChange(() => uniforms.uColorWaterDeep.value.set(debugObject.colorWaterDeep)).name("Water Deep");
    gui.addColor(debugObject, "colorWaterSurface").onChange(() => uniforms.uColorWaterSurface.value.set(debugObject.colorWaterSurface)).name("Water Surface");
    gui.addColor(debugObject, "colorSand").onChange(() => uniforms.uColorSand.value.set(debugObject.colorSand)).name("Sand");
    gui.addColor(debugObject, "colorGrass").onChange(() => uniforms.uColorGrass.value.set(debugObject.colorGrass)).name("Grass");
    gui.addColor(debugObject, "colorSnow").onChange(() => uniforms.uColorSnow.value.set(debugObject.colorSnow)).name("Snow");
    gui.addColor(debugObject, "colorRock").onChange(() => uniforms.uColorRock.value.set(debugObject.colorRock)).name("Rock");

    // Water
    const water = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 1, 1),
        new THREE.MeshPhysicalMaterial({
            transmission: 1,
            roughness: 0.3,
        })
    );
    water.rotation.x = -Math.PI * 0.5;
    water.position.y = -0.1;
    scene.add(water);    

    /**
        * Board
    */
    // Brushses
    const boardFill = new Brush(new THREE.BoxGeometry(11, 2, 11))
    const boardHole = new Brush(new THREE.BoxGeometry(10, 2.1, 10))

    // move brushes, not used for tutorial
    // boardHole.position.y = 0.2
    // boardHole.updateMatrixWorld()

    // Evalute
    const evaluator = new Evaluator()
    const board = evaluator.evaluate(boardFill, boardHole, SUBTRACTION)
    board.geometry.clearGroups()
    board.material = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0, roughness: 0.3 })
    board.castShadow = true
    board.receiveShadow = true
    scene.add(board)

    // Lights
    const ambientLight = new THREE.AmbientLight("#ffffff", debugObject.ambientLightIntensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("#ffffff", debugObject.directionalLightIntensity);
    directionalLight.position.set(6.25, 5, 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight("#ff69b4", debugObject.pointLightIntensity, 50);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // GUI for lighting parameters
    gui.add(debugObject, "ambientLightIntensity", 0, 2, 0.1).onChange(() => {
        ambientLight.intensity = debugObject.ambientLightIntensity;
    }).name("Ambient Light");
    gui.add(debugObject, "directionalLightIntensity", 0, 5, 0.1).onChange(() => {
        directionalLight.intensity = debugObject.directionalLightIntensity;
    }).name("Directional Light");
    gui.add(debugObject, "pointLightIntensity", 0, 5, 0.1).onChange(() => {
        pointLight.intensity = debugObject.pointLightIntensity;
    }).name("Point Light");

    // Animation
    const clock = new THREE.Clock();
    const tick = () => {
        uniforms.uTime.value = clock.getElapsedTime();
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(tick);

    };
    tick();

    // Cleanup
    return () => {
        gui.destroy();
        renderer.dispose();
        controls.dispose();
        scene.clear();
    };
}