import Scene from "@/core/Scene";
import sceneManager from "@/core/SceneManager";

class Entry extends Scene {
    /**
     *
     */
    constructor() {
        super('EntryPointScene');
    }

    load() {
        this.addMesh('models/ToyCar/ToyCar.gltf');

        setInterval(() => {
            // Actie die je om de 30 seconden wilt uitvoeren
            console.log('Actie uitgevoerd om de 30 seconden');
            this.clearScene();
            sceneManager.setActiveSceneByName('GameScene');
          }, 30000); // 30.000 milliseconden = 30 seconden
    }
}
export default Entry;