import * as THREE from 'three';
import sceneManager from './SceneManager.js';
import Scene from './Scene.js';

class Renderer {
    /**
     *
     */
    _sceneManager = null;

    constructor() {
        this._sceneManager = new sceneManager();
    }

    init() {
        // Initialize the renderer
        this._sceneManager.addScene(new Scene("MyTestScene"));
        console.log(this._sceneManager.getActiveScene().collection.name);
    }

    render() {

    }
}
export default Renderer;