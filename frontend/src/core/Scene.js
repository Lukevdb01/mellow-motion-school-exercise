import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();

class Scene {
    /**
     * @description Scene class to manage the 3D scene and its properties
     * @param {string} name - Name of the scene
     * @property {THREE.Scene} _scene - The Three.js scene object
     * @property {THREE.PerspectiveCamera} _camera - The camera used to view the scene
     * @property {Object} collection - Collection of objects in the scene
     */
    scene = null;
    camera = null;

    collection = {
        name: "DefaultScene"
    };

    constructor(name) {
        this.collection.name = name;

        // Intialize the scene and properties of the scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        this.scene.add(light);

    }

    get collection() {
        return this.collection;
    }

    addObject() {
        gltfLoader.load('models/Sponza/Sponza.gltf', (gltf) => {
            const model = gltf.scene;

            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    node.frustumCulled = true;
                }
            });

            this.scene.add(model);
        });
    }
}
export default Scene;