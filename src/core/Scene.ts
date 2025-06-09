import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ShaderLoader {
    (url: string): Promise<string>;
}

const loadShader: ShaderLoader = async function loadShader(url: string): Promise<string> {
    const response: Response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load shader: ${url}`);
    return await response.text();
};

const toonMaterial = new THREE.ShaderMaterial({
    uniforms: {
        lightDirection: { value: new THREE.Vector3(0.5, 1, 0.75).normalize() },
        baseColor: { value: new THREE.Color(0xffffff) } // Wordt overschreven door vertex kleuren of texture
    },
    vertexShader: await loadShader('shaders/vertex.glsl'),
    fragmentShader: await loadShader('shaders/fragment.glsl'),
});

class Scene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera | null = null;
    gltfLoader = new GLTFLoader();
    mixer: THREE.AnimationMixer | null = null;  // Add mixer property to store animation mixer
    htmlCanvas: HTMLElement | null = null;

    collection = {
        name: "DefaultScene",
        base: "default-scene",
    };

    load(): void {
        this.htmlCanvas = document.getElementById('html-canvas');
    }
    update(): void { }

    constructor() {
        // Initialize the scene and properties
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    addMesh(url: string): Promise<GLTF> {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                url,
                (gltf: GLTF) => {
                    const model: THREE.Group = gltf.scene;

                    model.traverse((node: THREE.Object3D) => {
                        if ((node as THREE.Mesh).isMesh) {
                            const mesh = node as THREE.Mesh;
                            mesh.castShadow = true;
                            mesh.receiveShadow = true;
                            mesh.frustumCulled = true;
                            // mesh.material = toonMaterial; zie toonMaterial hieronder
                            // mesh.material.needsUpdate = true;
                        }
                    });
                    this.scene.add(model);

                    // Save the GLTF model and animations in the scene
                    this.mixer = new THREE.AnimationMixer(gltf.scene); // Initialize the mixer
                    resolve(gltf);
                },
                undefined,
                (error) => reject(error)
            );
        });
    }

    clearScene() {
        this.scene.traverse((object: THREE.Object3D) => {
            if (!(object as THREE.Mesh).isMesh) return;
            const mesh = object as THREE.Mesh;
            mesh.geometry.dispose();

            if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material: THREE.Material) => material?.dispose());
            } else {
                (mesh.material as THREE.Material).dispose();
            }
        });

        for (let index = 0; index < this.scene.children.length; index++) {
            this.scene.remove(this.scene.children[index]);
        }
    }
}
export default Scene;
