import * as THREE from 'three';

const collection = {
    name: null,
};

class Scene {
    _scene = null;
    _camera = null;
    _name = "defaultScene";

    constructor(name) {
        this._name = name || this._name;
        collection.name = this._name;
        
        // Intialize the scene and properties of the scene
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    get collection() {
        return collection;
    }
}
export default Scene;