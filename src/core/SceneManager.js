class SceneManager {
    _sceneArray = [];
    static _instance = null;
  
    constructor() {
      if (SceneManager._instance) {
        throw new Error("Singleton classes can't be instantiated more than once.");
      }
      SceneManager._instance = this;
    }
  
    addScene(scene) {
      this._sceneArray.push(scene);
    }
  
    getActiveScene() {
      return this._sceneArray[this._sceneArray.length - 1];
    }
  
    setActiveSceneByName(name) {
      const i = this._sceneArray.findIndex(scene => scene.collection.name === name);
      if (i === -1) {
        throw new Error(`Scene with name "${name}" not found.`);
      }
      const [scene] = this._sceneArray.splice(i, 1);
      this._sceneArray.push(scene);

      
    }
  
    deleteSceneByName(name) {
      const i = this._sceneArray.findIndex(scene => scene.collection.name === name);
      if (i === -1) {
        throw new Error(`Scene with name "${name}" not found.`);
      }
      this._sceneArray[i].clearScene();
    }
  }
  
  // ⬇️ Hier exporteer je **de instantie**, niet de class zelf
  const sceneManager = new SceneManager();
  export default sceneManager;
  