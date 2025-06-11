import * as THREE from 'three';

export default class Environment {
    static use(scene: THREE.Scene): void {
        const loader = new THREE.TextureLoader();

        loader.load('images/background.png', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.encoding = THREE.sRGBEncoding;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            // Gebruik de texture als achtergrond én reflectieomgeving
            scene.background = texture;
            scene.environment = texture;
        });

        // Gedempte ambient lighting voor meer balans
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    }
}
