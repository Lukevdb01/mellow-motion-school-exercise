import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

export default class Mirror {
    /**
     *
     */
    static use(scene: THREE.Scene): void {
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
        scene.add(mirror);
    }
}