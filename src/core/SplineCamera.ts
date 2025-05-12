import * as THREE from 'three';

class SplineCamera {
    private camera: THREE.PerspectiveCamera;
    private spline: THREE.Curve<THREE.Vector3>;
    private relativeTime: number = 0;

    constructor(spline: THREE.Curve<THREE.Vector3>, camera: THREE.PerspectiveCamera) {
        this.spline = spline;
        this.camera = camera;
    }

    set(x: number, y: number, z: number): void {
        this.camera.position.set(x, y, z);
    }

    update(deltaTime: number = 0.001, shouldStopAtEnd: boolean = false): void {
        if (shouldStopAtEnd && this.relativeTime >= 1) return;
        if (shouldStopAtEnd) {
            this.relativeTime = Math.min(this.relativeTime + deltaTime, 1);
        } else {
            this.relativeTime = (this.relativeTime + deltaTime) % 1;
        }

        const currentPos = this.spline.getPointAt(this.relativeTime);
        let lookAheadPos;

        if (this.relativeTime >= 1 && shouldStopAtEnd) {
            lookAheadPos = this.spline.getPointAt(1);
        } else {
            lookAheadPos = this.spline.getPointAt(Math.min(this.relativeTime + 0.01, 1));
        }

        this.camera.position.copy(currentPos);
        this.camera.lookAt(lookAheadPos);
    }
}
export default SplineCamera;
