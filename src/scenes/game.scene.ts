import Scene from "@/core/Scene";
import * as THREE from 'three';
import {gasp} from 'gasp';
import sceneManager from "@/core/SceneManager";

class Game extends Scene {
    points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(15, -5, 0),
    ]
    curve: THREE.CatmullRomCurve3 | undefined;
    relativeTime = 0;

    /**
     *
     */
    constructor() {
        super("GameScene");
    }

    environment() {
        this.scene.background = new THREE.Color(0x87CEEB);

        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);

        this.curve = new THREE.CatmullRomCurve3(this.points);
        const curveGeometry = new THREE.BufferGeometry().setFromPoints(this.curve.getPoints(50));
        const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const line = new THREE.Line(curveGeometry, curveMaterial);

        line.rotation.x = -Math.PI / 2;
        plane.rotation.x = -Math.PI / 2;

        this.scene.add(line);
        this.scene.add(plane);

        this.camera.position.set(0, 0, 5);

    }

    override async load(): Promise<void> {
        super.load();
        this.environment();


        // Wait for the model to be loaded
        const gltf = await this.addMesh('models/Memo.glb');

        // Check if animations exist and create a mixer for them
        if (this.mixer && gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
                this.mixer.clipAction(clip).play();
            });
        }
    }

    override async update(): Promise<void> {
        super.load();
        
        const pos = this.curve?.getPointAt((this.relativeTime + 0.01) % 1);
        this.camera?.position.copy(pos);

        const nextPos = this.curve?.getPointAt((this.relativeTime + 0.01) % 1);
        this.camera?.lookAt(nextPos);

        this.relativeTime += 0.001;
        if(this.relativeTime > 1) this.relativeTime = 0;
    }
}
export default Game;