import Scene from "@/core/Scene";

class Game extends Scene {
    /**
     *
     */
    constructor() {
        super();
        this.collection.name = "GameScene";
        console.log("New active scene");
        this.addMesh('models/Sponza/Sponza.gltf');
    }
}
export default Game;