import Scene from "@/core/Scene";

class Game extends Scene {
    /**
     *
     */
    constructor() {
        super("GameScene");
    }

    load() {
        this.addMesh('models/Sponza/Sponza.gltf');
    }
}
export default Game;