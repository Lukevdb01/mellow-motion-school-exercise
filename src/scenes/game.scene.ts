import Scene from "@/core/Scene";
import * as THREE from 'three';
import SplineCamera from "@/core/SplineCamera";

class Game extends Scene {
    points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(15, -5, 0),
    ]

    splineFollowCamera: SplineCamera | undefined;
    curve: THREE.CatmullRomCurve3 | undefined;

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
    }

    override async load(): Promise<void> {
        super.load();
        this.environment();

        if(!this.camera) return;

        this.splineFollowCamera = new SplineCamera(this.curve, this.camera);
        this.splineFollowCamera.set(0, 0, 5);

        // Wait for the model to be loaded
        const gltf = await this.addMesh('models/Memo.glb');

        // Check if animations exist and create a mixer for them
        if (this.mixer && gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
                if (this.mixer) {
                    this.mixer.clipAction(clip).play();
                }
            });
        }
    }

    override async update(): Promise<void> {
        super.load();
        if(this.splineFollowCamera) {
            this.splineFollowCamera.update();
        }
    }
}
export default Game;