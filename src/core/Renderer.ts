import * as THREE from 'three';
import sceneManager from './SceneManager';
import Scene from './Scene';

let activeScene: Scene;

/**
 * @param {THREE.WebGLRenderer} renderer
 */
class Renderer {
    renderer: THREE.WebGLRenderer | null = null;

    init() {
        // Initialize the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        activeScene = sceneManager.getActiveScene();

        activeScene.load();
    }

    target(element: { value: HTMLElement }): void {
        if (!this.renderer) return;

        element.value.appendChild(this.renderer.domElement);
        this.renderer.setSize(element.value.offsetWidth, element.value.offsetHeight);
    }

    deleteSceneByName(name: string): void {
        sceneManager.deleteSceneByName(name);
        this.renderer?.clear();
    }

    render() {
        requestAnimationFrame(() => this.render());

        if (activeScene !== sceneManager.getActiveScene()) {
            activeScene = sceneManager.getActiveScene();
            activeScene.load();
        }

        if (activeScene.camera && this.renderer) {
            this.renderer.render(activeScene.scene, activeScene.camera);
        }
    }
}
export default Renderer;
