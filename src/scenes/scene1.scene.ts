import Scene from "@/core/Scene";
import Environment from "@/objects/environment";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";

class Game extends Scene {
    points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 2),
        new THREE.Vector3(10, 0, 4),
        new THREE.Vector3(15, 0, 6),
    ];
    curve?: THREE.CatmullRomCurve3;

    constructor() {
        super();
        this.collection.name = "Scene1";
        this.collection.base = "scene-1";
    }

    override async load(): Promise<void> {
        super.load();
        this.environment();

        if (!this.camera) return;
        this.camera.position.y = 10;

        const room = await this.addMesh("models/Memo.glb");
        room.scene.position.set(0, 6, 5);
        if (!this.camera) return;

        const mirrorGLB = await this.addMesh("models/Mirror.glb");
        const model = mirrorGLB.scene;
        this.scene.add(model);

        let mirrorSurfaceMesh: THREE.Mesh | null = null;
        // Zoek naar materiaal met naam "MirrorSurface"
        model.traverse((node: THREE.Object3D) => {
            if ((node as THREE.Mesh).isMesh) {
                const mesh = node as THREE.Mesh;
                const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                for (const material of materials) {
                    if (material && material.name === "MirrorSurface") {
                        mirrorSurfaceMesh = mesh;
                        break;
                    }
                }
            }
        });

        if (!mirrorSurfaceMesh) {
            console.error("❌ Material with name 'MirrorSurface' not found in model.");
            return;
        }

        // Maak Reflector met witte achtergrondkleur
        const reflector = new Reflector(mirrorSurfaceMesh.geometry.clone(), {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            color: 0xffffff,
        });

        reflector.material.side = THREE.BackSide;
        this.camera.position.y = 3;
        this.camera.position.x = 1;
        this.camera.position.z = 5;

        // Wereldmatrix gebruiken voor juiste plaatsing
        mirrorSurfaceMesh.updateMatrixWorld(true);
        reflector.position.setFromMatrixPosition(mirrorSurfaceMesh.matrixWorld);
        reflector.quaternion.setFromRotationMatrix(mirrorSurfaceMesh.matrixWorld);
        reflector.scale.copy(mirrorSurfaceMesh.scale);

        // Vervang originele mesh
        mirrorSurfaceMesh.visible = false;
        this.scene.add(reflector);

        const gltf = await this.addMesh("models/popetje.glb");
        if (this.mixer && gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
                this.mixer!.clipAction(clip).play();
            });
        }

        gltf.scene.scale.set(15, 15, 15);
        const phone = await this.addMesh('models/FirstPerson.glb');
    }

    override async update(): Promise<void> {
        super.update();
    }

    environment() {
        this.scene.background = new THREE.Color(0x87ceeb);

        if (this.camera) {
            this.camera.position.set(0, 20, 40);
            this.camera.lookAt(0, 15, 0);
        }

        Environment.use(this.scene);
    }
}

export default Game;
