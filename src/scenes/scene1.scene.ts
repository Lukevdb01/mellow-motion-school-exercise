import Scene from "@/core/Scene";
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
        this.collection.name = "Scene1";
        this.collection.base = "scene-1";
    }

    override async load(): Promise<void> {
        super.load();
        this.environment();

        if (!this.camera) return;

        this.camera.position.y = 15;
        this.camera.position.x = 15;
        this.camera.position.z = 15;

        // Load arms
        const armGltf = await this.addMesh('models/Armen.glb');
        this.arms = armGltf.scene;
        this.arms.scale.set(15, 15, 15);
        this.scene.add(this.arms); // ← make sure it's added to the scene

        // Load phone
        const phoneGltf = await this.addMesh('models/Telefoon.glb');
        this.phone = phoneGltf.scene;
        this.phone.scale.set(15, 15, 15);

        // Attach phone to arms
        this.arms.add(this.phone);
        this.phone.position.set(0, -0.05, 0.15); // adjust to look like it's held

        // Optional: Play any animations in phone model
        if (this.mixer && phoneGltf.animations.length > 0) {
            phoneGltf.animations.forEach((clip) => {
                this.mixer!.clipAction(clip).play();
            });
        }
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

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 20, 10);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0x404040, 0.5)); // zacht licht

        this.curve = new THREE.CatmullRomCurve3(this.points, true); // true = closed loop
        const curveGeometry = new THREE.BufferGeometry().setFromPoints(this.curve.getPoints(50));
        const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const line = new THREE.Line(curveGeometry, curveMaterial);
        this.scene.add(line);
    }
}
export default Game;