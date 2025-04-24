import * as THREE from 'three';
import sceneManager from './SceneManager.js';

let activeScene = null;

/**
 * @param {THREE.WebGLRenderer} renderer
 */
class Renderer {
    sceneManager = null;
    renderer = null;

    constructor() {
        this.sceneManager = new sceneManager();
    }
    init() {
        // Initialize the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        activeScene = this.sceneManager.getActiveScene();
    }

    target(element) {
        element.value.appendChild(this.renderer.domElement);
        this.renderer.setSize(element.value.offsetWidth, element.value.offsetHeight)
    }

    deleteSceneByName(name) {
        this.sceneManager.deleteSceneByName(name);
        this.renderer.clear();
    }

    render() {
        requestAnimationFrame(() => this.render());
        this.renderer.render(activeScene.scene, activeScene.camera);  
    }
}
export default Renderer;
