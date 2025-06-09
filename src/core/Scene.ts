import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ScaleAnimation {
    object: THREE.Object3D;
    from: number;
    to: number;
    duration: number;
    elapsed: number;
    onComplete?: () => void;
}

class Scene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera | null = null;
    gltfLoader = new GLTFLoader();
    mixer: THREE.AnimationMixer | null = null;  // Add mixer property to store animation mixer
    htmlCanvas: HTMLElement | null = null;

    collection = {
        name: "DefaultScene",
        base: "default-scene",
    };

    private scaleAnimations: ScaleAnimation[] = [];
    private clock = new THREE.Clock();

    public scaleTo(
        object: THREE.Object3D,
        targetScale: number,
        duration: number = 2,
        onComplete?: () => void
    ): void {
        const currentScale = object.scale.x; // Assumes uniform scale
        this.scaleAnimations.push({
            object,
            from: currentScale,
            to: targetScale,
            duration,
            elapsed: 0,
            onComplete
        });
    }

    scaleUpModel(
        object: THREE.Object3D,
        targetScale: number = 1.0,
        duration: number = 2,
        onComplete?: () => void
    ): void {
        this.scaleTo(object, targetScale, duration, onComplete);
    }

    scaleDownModel(
        object: THREE.Object3D,
        targetScale: number = 0.5,
        duration: number = 2,
        onComplete?: () => void
    ): void {
        this.scaleTo(object, targetScale, duration, onComplete);
    }

    load(): void {
        this.htmlCanvas = document.getElementById('html-canvas');
    }

    update(): void {
        const delta = this.clock.getDelta();

        if (this.mixer) {
            this.mixer.update(delta);
        }

        for (let i = this.scaleAnimations.length - 1; i >= 0; i--) {
            const anim = this.scaleAnimations[i];
            anim.elapsed += delta;

            const progress = Math.min(anim.elapsed / anim.duration, 1);
            const scale = THREE.MathUtils.lerp(anim.from, anim.to, progress);
            anim.object.scale.setScalar(scale);

            if (progress >= 1) {
                if (anim.onComplete) anim.onComplete();
                this.scaleAnimations.splice(i, 1);
            }
        }
    }

    constructor() {
        // Initialize the scene and properties
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    addMesh(url: string): Promise<GLTF> {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                url,
                (gltf: GLTF) => {
                    const model: THREE.Group = gltf.scene;

                    model.traverse((node: THREE.Object3D) => {
                        if ((node as THREE.Mesh).isMesh) {
                            const mesh = node as THREE.Mesh;
                            mesh.castShadow = true;
                            mesh.receiveShadow = true;
                            mesh.frustumCulled = true;
                            // mesh.material = toonMaterial; zie toonMaterial hieronder
                            // mesh.material.needsUpdate = true;
                        }
                    });
                    this.scene.add(model);

                    // Save the GLTF model and animations in the scene
                    this.mixer = new THREE.AnimationMixer(gltf.scene); // Initialize the mixer
                    resolve(gltf);
                },
                undefined,
                (error) => reject(error)
            );
        });
    }

    clearScene() {
        this.scene.traverse((object: THREE.Object3D) => {
            if (!(object as THREE.Mesh).isMesh) return;
            const mesh = object as THREE.Mesh;
            mesh.geometry.dispose();

            if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material: THREE.Material) => material?.dispose());
            } else {
                (mesh.material as THREE.Material).dispose();
            }
        });

        for (let index = 0; index < this.scene.children.length; index++) {
            this.scene.remove(this.scene.children[index]);
        }
    }
}
export default Scene;
