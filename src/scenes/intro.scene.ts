import Scene from "@/core/Scene";
import * as THREE from 'three';
import GameSceneView from '@/scenes/GameSceneView.vue';
import {render, h} from "vue";
import app from "@/main";
import sceneManager from "@/core/SceneManager";

// import splineCamera from "@/core/SplineCamera";

class Game extends Scene {
    points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 2),
        new THREE.Vector3(10, 0, 4),
        new THREE.Vector3(15, 0, 6),
    ];

    // splineFollowCamera: splineCamera | undefined;
    // curve: THREE.CatmullRomCurve3 | undefined;

    constructor() {
        super();
        this.collection.name = "IntroScene";
        this.collection.base = "intro";
    }

    override async load(): Promise<void> {
        super.load();
        this.mountUI();
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
        this.camera.position.set(0, 20, 40);
        this.camera.lookAt(0, 15, 0);

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
    }

    mountUI() {
        const existingContainer = document.getElementById('vue-ui');
        if (existingContainer) {
            existingContainer.remove();
        }

        const container = document.createElement('div');
        container.id = 'vue-ui';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '10px';
        container.style.zIndex = '100';

        document.body.appendChild(container);

        const vnode = h(GameSceneView);
        vnode.appContext = app._context;

        render(vnode, container);
    }
}
export default Game;