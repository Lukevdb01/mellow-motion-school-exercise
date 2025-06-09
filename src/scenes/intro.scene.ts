import Scene from "@/core/Scene";
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

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

        // this.splineFollowCamera = new splineCamera(this.curve, this.camera);
        // this.splineFollowCamera.set(0, 0, 5);

        const gltf = await this.addMesh('models/Memo.glb');
        gltf.scene.position.set(0, 10, 0);

        if (this.mixer && gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
                this.mixer!.clipAction(clip).play();
            });
        }

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

        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        this.scene.add(plane);

        this.curve = new THREE.CatmullRomCurve3(this.points, true); // true = closed loop
        const curveGeometry = new THREE.BufferGeometry().setFromPoints(this.curve.getPoints(50));
        const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const line = new THREE.Line(curveGeometry, curveMaterial);
        this.scene.add(line);

        // Reflector example
        const mirrorGeometry = new THREE.PlaneGeometry(20, 20);

        // Reflector instantie
        const mirror = new Reflector(mirrorGeometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            color: 0x889999
        });

        // Spiegel positioneren en draaien zodat hij richting camera kijkt
        mirror.position.set(0, 10, -20); // Voor de camera op Z-as
        mirror.rotateY(0);               // Zorg dat de voorkant naar +Z kijkt (richting camera)
        mirror.rotateX(0);               // Geen kanteling
        this.scene.add(mirror);

        // Toevoegen aan de scene
        this.scene.add(mirror);
    }

}
export default Game;