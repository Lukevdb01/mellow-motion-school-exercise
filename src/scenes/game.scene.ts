import Scene from "@/core/Scene";

class Game extends Scene {
    /**
     *
     */
    constructor() {
        super("GameScene");
    }

    override load(): void {
        this.addMesh('models/Sponza/Sponza.gltf');
        console.log("test");
    }
}
export default Game;