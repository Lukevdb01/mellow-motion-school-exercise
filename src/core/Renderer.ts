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
        const scene = sceneManager.getActiveScene();
        if (scene) {
            activeScene = scene;
        } else {
            throw new Error('No active scene found.');
        }

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 20, 10);
        activeScene.scene.add(light);
        activeScene.scene.add(new THREE.AmbientLight(0x404040, 0.5)); // zacht licht

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

    private clock = new THREE.Clock();

    render() {
        requestAnimationFrame(() => this.render());

        const currentScene = sceneManager.getActiveScene();
        if (activeScene !== currentScene && currentScene) {
            activeScene = currentScene;
            activeScene.load();
        }

        // Update animation mixer
        if (activeScene.mixer) {
            const delta = this.clock.getDelta();
            activeScene.mixer.update(delta); // Update animations
        }
        activeScene.update();

        if (activeScene.camera && this.renderer) {
            this.renderer.render(activeScene.scene, activeScene.camera);
        }
    }

}
export default Renderer;
