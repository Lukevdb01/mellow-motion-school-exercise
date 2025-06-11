import Scene from "@/core/Scene";
import Environment from "@/objects/environment";
import * as THREE from 'three';

// import splineCamera from "@/core/SplineCamera";

class Game extends Scene {
    points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 2),
        new THREE.Vector3(10, 0, 4),
        new THREE.Vector3(15, 0, 6),
    ];
    curve?: THREE.CatmullRomCurve3;

    // splineFollowCamera: splineCamera | undefined;
    // curve: THREE.CatmullRomCurve3 | undefined;

    constructor() {
        super();
        this.collection.name = "IntroScene";
        this.collection.base = "intro";
    }

    override async load(): Promise<void> {
        super.load();
        this.environment();

        if (!this.camera /* || !this.curve */) return;
        this.camera.position.y = 10;
        // this.splineFollowCamera = new splineCamera(this.curve, this.camera);
        // this.splineFollowCamera.set(0, 0, 5);

        const room = await this.addMesh('models/Memo.glb');
        room.scene.position.set(0, 6, 5);

        // setTimeout(() => {
        //     sceneManager.deleteSceneByName('IntroScene');
        //     sceneManager.setActiveSceneByName('Scene1');
        // }, 5000);
    }

    override async update(): Promise<void> {
        super.update();

        // if (this.splineFollowCamera) {
        //     this.splineFollowCamera.update(0.001, true);
        // }
    }

    environment() {
        this.scene.background = new THREE.Color(0x87CEEB);
        if (this.camera) {
            this.camera.position.set(0, 20, 40);
            this.camera.lookAt(0, 15, 0);
        }

        Environment.use(this.scene);
    }
}
export default Game;