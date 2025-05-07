import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Scene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera | null = null;
    gltfLoader = new GLTFLoader();
    mixer: THREE.AnimationMixer | null = null;  // Add mixer property to store animation mixer

    _collection = {
        name: "DefaultScene"
    };
    load(): void {}

    constructor(name: string) {
        this.collection.name = name;

        // Initialize the scene and properties
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        this.scene.add(light);
    }

    get collection() {
        return this._collection;
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
                        }
                    });

                    model.scale.set(8, 8, 8);
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

        console.log("removed all assets");
    }
}
export default Scene;
