import Physics from './physics';

export default class Scene {
    constructor () {
        this.gameObjects = {};
        this.goIdCounter = 1;
        this.stage = new createjs.Container();
        this.physics = null;
    }

    addChild (gameObject) {
        const go = gameObject;
        go.game = this;
        go.goId = this.goIdCounter++;
        this.gameObjects[go.goId] = go;
        if (this.physics) {
            this.physics.addChild(go);
        }
        if (go.modules.display) {
            const displayObj = go.modules.display.displayObject;
            if (displayObj) {
                this.stage.addChild(displayObj);
            }
        }
    }

    removeChild (gameObject) {
        const go = this.gameObjects[gameObject.goId];
        if (go) {
            if (go.modules.display) {
                const displayObj = go.modules.display.displayObject;
                if (displayObj) {
                    this.stage.removeChild(displayObj);
                }
            }
            if (this.physics) {
                this.physics.removeChild(go);
            }
            delete this.gameObjects[go.goId];
            go.goId = null;
        }
    }

    tick (timePassedMs) {
        if (this.physics) {
            try {
                this.physics.tick(timePassedMs);
            } catch (e) {
                this.physics = null;
            }
        }
        for (const key in this.gameObjects) {
            const obj = this.gameObjects[key];
            if (!obj.inactive) {
                obj.tick(timePassedMs);
            }
        }
    }

    enablePhysics () {
        this.physics = new Physics();
    }

    setViewportScale (scale) {
        this.stage.x *= scale / this.stage.scale;
        this.stage.y *= scale / this.stage.scale;
        this.stage.scale = scale;
    }

    setViewportPosition (x, y) {
        this.stage.x = -x * this.stage.scale;
        this.stage.y = -y * this.stage.scale;;
    }
}

