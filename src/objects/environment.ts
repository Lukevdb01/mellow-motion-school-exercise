import * as THREE from 'three';

export default class Environment {
    /**
     *
     */
    static use(scene: THREE.Scene): void {
        // Reflector example
        
        // Load HDRI background (in this case, PNG fallback)
        const loader = new THREE.TextureLoader();
        loader.load('background.png', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
            scene.background = texture;
        });

        // decreased ambient light intensity
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Reduced intensity
        scene.add(ambientLight);
    }
}