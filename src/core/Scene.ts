import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();

class Scene {
    /**
     * @description Scene class to manage the 3D scene and its properties
     * @param {string} name - Name of the scene
     * @property {THREE.Scene} _scene - The Three.js scene object
     * @property {THREE.PerspectiveCamera} _camera - The camera used to view the scene
     * @property {Object} collection - Collection of objects in the scene
     */
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera | null = null;

    _collection = {
        name: "DefaultScene"
    };

    // For reference, this is a define for on the active scene
    load(): void { }

    constructor(name: string) {
        this.collection.name = name;

        // Intialize the scene and properties of the scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        this.scene.add(light);
    }

    get collection() {
        return this._collection;
    }

    addMesh(url: string) {
        gltfLoader.load(url, (gltf: GLTF) => {
            const model: THREE.Group = gltf.scene;

            model.traverse((node: THREE.Object3D) => {
            if ((node as THREE.Mesh).isMesh) {
                const mesh = node as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;
            }
            });

            this.scene.add(model);
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