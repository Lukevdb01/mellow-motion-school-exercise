import Scene from "@/core/Scene";
import * as THREE from 'three';
import sceneManager from "@/core/SceneManager";
class Game extends Scene {
    /**
     *
     */
    constructor() {
        super("GameScene");
    }

    environment() {
        this.scene.background = new THREE.Color(0x87CEEB);
        this.camera.position.set(0, 75, 75);
        this.camera.lookAt(0, 0, 0);
    
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
    
        plane.rotation.x = -Math.PI / 2;
        this.scene.add(plane);
    }    

    override async load(): Promise<void> {
        super.load();
        this.environment();
    
        // Wait for the model to be loaded
        const gltf = await this.addMesh('models/Crab.glb');

        // Check if animations exist and create a mixer for them
        if (this.mixer && gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
                this.mixer.clipAction(clip).play();
            });
        }
    }    
}
export default Game;