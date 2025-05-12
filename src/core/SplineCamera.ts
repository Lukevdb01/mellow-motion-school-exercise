import * as THREE from 'three';

class Camera {
    camera: THREE.PerspectiveCamera | undefined;
    private followActor: any | undefined;

    positionX: number = 0;
    positionY: number = 0;
    positionZ: number = 0;

    private relativeTime: number = 0;
    
    /**
     * This constructor is used for when a follow camera
     * @param points 
     * @param followActor 
     */
    constructor(_followActor: any, _camera: THREE.PerspectiveCamera) {
        this.camera = _camera;
        this.followActor = _followActor;
    }

    set(x: number, y: number, z: number): void {
        this.camera?.position.set(x,y,z);
    }

    update() {
        const pos = this.followActor?.getPointAt((this.relativeTime + 0.01) % 1);
        this.camera?.position.copy(pos);

        const nextPos = this.followActor?.getPointAt((this.relativeTime + 0.01) % 1);
        this.camera?.lookAt(nextPos);

        this.relativeTime += 0.001;
        if(this.relativeTime > 1) this.relativeTime = 0;
    }
}
export default Camera;