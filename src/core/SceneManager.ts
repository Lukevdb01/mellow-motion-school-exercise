import Scene from "./Scene";

class SceneManager {
  _sceneArray: Scene[] = [];
  static _instance: SceneManager | null = null;

  constructor() {
    if (SceneManager._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
    SceneManager._instance = this;
  }

  addScene(scene: Scene) {
    this._sceneArray.push(scene);
  }

  getActiveScene() {
    return this._sceneArray[this._sceneArray.length - 1];
  }

  getActiveSceneCollection() {
    return this.getActiveScene().collection;
  }

  getSceneCollections() {
    return this._sceneArray.map(scene => scene.collection);
  }

  setActiveSceneByName(name: string) {
    const i = this._sceneArray.findIndex(scene => scene.collection.name === name);
    if (i === -1) {
      throw new Error(`Scene with name "${name}" not found.`);
    }
    const [scene] = this._sceneArray.splice(i, 1);
    this._sceneArray.push(scene);
  }

  deleteSceneByName(name: string) {
    const i = this._sceneArray.findIndex(scene => scene.collection.name === name);
    if (i === -1) {
      throw new Error(`Scene with name "${name}" not found.`);
    }
    this._sceneArray[i].clearScene();
  }
}

const sceneManager = new SceneManager();
export default sceneManager;