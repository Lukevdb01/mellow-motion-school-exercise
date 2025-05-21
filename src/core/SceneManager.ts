import { ref } from 'vue'
import Scene from './Scene'

class SceneManager {
  private _sceneArray: Scene[] = []
  private static _instance: SceneManager | null = null
  public activeSceneName = ref<string | null>(null) // ✅ Reactief veld

  constructor() {
    if (SceneManager._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.")
    }
    SceneManager._instance = this
  }

  addScene(newScene: Scene, activeScene = false) {
    if (this._sceneArray.some(scene => scene.collection.name === newScene.collection.name)) {
      throw new Error(`Scene "${newScene.collection.name}" already exists.`)
    }

    this._sceneArray.push(newScene)
    if (activeScene) {
      this.activeSceneName.value = newScene.collection.name
    }
  }

  setActiveSceneByName(name: string) {
    const scene = this._sceneArray.find(scene => scene.collection.name === name)
    if (!scene) throw new Error(`Scene "${name}" not found.`)
    this.activeSceneName.value = name
  }

  deleteSceneByName(name: string) {
    const i = this._sceneArray.findIndex(scene => scene.collection.name === name);
    if (i === -1) {
      throw new Error(`Scene with name "${name}" not found.`);
    }
    this._sceneArray[i].clearScene();
  }

  getActiveScene() {
    return this._sceneArray.find(scene => scene.collection.name === this.activeSceneName.value)
  }

  getActiveSceneCollection() {
    return this.getActiveScene()?.collection ?? null
  }

  getSceneCollections() {
    return this._sceneArray.map(scene => scene.collection)
  }
}
const sceneManager = new SceneManager()
export default sceneManager