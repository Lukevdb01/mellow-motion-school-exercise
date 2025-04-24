import Scene from "@/core/Scene";
import sceneManager from "@/core/SceneManager";
import Game from '@/scenes/game.scene';

class Entry extends Scene {
    /**
     *
     */
    constructor() {
        super();
        this.addMesh('models/Sponza/Sponza.gltf');
        this.collection.name = "EntryPoint";
        setInterval(() => {
            // Actie die je om de 30 seconden wilt uitvoeren
            console.log('Actie uitgevoerd om de 30 seconden');
            this.clearScene();
            sceneManager.addScene(new Game('GameScene'));
            sceneManager.setActiveSceneByName('GameScene');
          }, 30000); // 30.000 milliseconden = 30 seconden
    }
}
export default Entry;