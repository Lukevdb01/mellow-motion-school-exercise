class sceneManager {
    _sceneArray = [];

    constructor() {
    
    }

    addScene(scene) {
        this._sceneArray.push(scene);
    }

    getActiveScene() {
        return this._sceneArray[this._sceneArray.length - 1];
    }
}
export default sceneManager;