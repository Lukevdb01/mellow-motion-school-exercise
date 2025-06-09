import * as THREE from 'three';

type ShaderLoader = (url: string) => Promise<string>;

export default class Toon {
    private static loadShader: ShaderLoader = async function loadShader(url: string): Promise<string> {
        const response: Response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load shader: ${url}`);
        return await response.text();
    };

    public static async createToonMaterial(): Promise<THREE.ShaderMaterial> {
        const vertexShader = await this.loadShader('shaders/vertex.glsl');
        const fragmentShader = await this.loadShader('shaders/fragment.glsl');
        return new THREE.ShaderMaterial({
            uniforms: {
                lightDirection: { value: new THREE.Vector3(0.5, 1, 0.75).normalize() },
                baseColor: { value: new THREE.Color(0xffffff) } // Wordt overschreven door vertex kleuren of texture
            },
            vertexShader,
            fragmentShader,
        });
    }
}