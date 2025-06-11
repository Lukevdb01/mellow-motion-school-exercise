import Scene from "@/core/Scene";
import * as THREE from 'three';
import Mirror from "@/objects/mirror";

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
        this.collection.name = "Scene2";
        this.collection.base = "scene-2";
    }

    override async load(): Promise<void> {
        super.load();
        this.environment();

        if (!this.camera /* || !this.curve */) return;
        this.camera.position.y = 10;
        // this.splineFollowCamera = new splineCamera(this.curve, this.camera);
        // this.splineFollowCamera.set(0, 0, 5);

        const gltf = await this.addMesh('models/popetje.glb');
        this.poppetje = gltf.scene;
        if (this.mixer && gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
                this.mixer!.clipAction(clip).play();
            });
        }

        gltf.scene.scale.set(15, 15, 15);
    }

    poppetje: THREE.Object3D | null = null;
    curveProgress = 0;
    targetPosition?: THREE.Vector3;

    walkToMirrorStart() {
        if (!this.poppetje || !this.curve || !this.camera) return;

        this.curveProgress = 0;
        this.targetPosition = this.curve.getPointAt(this.curveProgress);
        this.poppetje.position.copy(this.targetPosition);

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(this.poppetje.quaternion);
        const backwards = this.poppetje.position.clone().sub(forward);
        this.poppetje.lookAt(backwards);

        this.camera.position.y = 20;
        this.camera.position.z = 20;
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

        Mirror.use(this.scene);
    }
}
export default Game;