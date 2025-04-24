import * as THREE from 'three';
import sceneManager from './SceneManager';

let activeScene = null;

/**
 * @param {THREE.WebGLRenderer} renderer
 */
class Renderer {
    renderer = null;

    init() {
        // Initialize the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        activeScene = sceneManager.getActiveScene();

        activeScene.load();
    }

    target(element) {
        element.value.appendChild(this.renderer.domElement);
        this.renderer.setSize(element.value.offsetWidth, element.value.offsetHeight)
    }

    deleteSceneByName(name) {
        sceneManager.deleteSceneByName(name);
        this.renderer.clear();
    }

    render() {
        requestAnimationFrame(() => this.render());
        if(activeScene !== sceneManager.getActiveScene()) {
            activeScene = sceneManager.getActiveScene();
            activeScene.load();
        }
        this.renderer.render(activeScene.scene, activeScene.camera);  
    }
}
export default Renderer;
