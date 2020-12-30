import Physics from './physics';
const TARGET_FRAME_RATE = 60;
const TARGET_TICK_INTERVAL = 1000 / TARGET_FRAME_RATE;

export default class Game {
    constructor (canvasId) {
        this.canvasId = canvasId;
        this.rootStage = new createjs.Stage(canvasId);
        this.stage = new createjs.Container();
        this.rootStage.addChild(this.stage);

        this.gameObjects = {};
        this.goIdCounter = 1;
        this.keyPressed = [];
        this.lastTickTime = null;
        this.physics = null;

        document.onkeydown = function (e) {
            e = e || window.event;
            this.keyPressed[e.keyCode] = true;
        }.bind(this);
        document.onkeyup = function (e) {
            e = e || window.event;
            this.keyPressed[e.keyCode] = false;
        }.bind(this);
    }

    tearDown () {
        // TODO: Remove key listeners
    }

    start () {
        this.lastTickTime = Date.now();
        this.tick();
    }

    addChild (gameObject) {
        const go = gameObject;
        go.game = this;
        go.goId = this.goIdCounter++;
        this.gameObjects[go.goId] = go;
        if (this.physics) {
            this.physics.addChild(go);
        }
        this.stage.addChild(go.displayObject);
    }

    removeChild (gameObject) {
        const go = this.gameObjects[gameObject.goId];
        if (go) {
            this.stage.removeChild(go.displayObject);
            if (this.physics) {
                this.physics.removeChild(go);
            }
            delete this.gameObjects[go.goId];
            go.goId = null;
        }
    }

    handlePlayerControl () {
    }

    tick () {
        const tickStartTime = Date.now();
        const timeBetweenTicks = tickStartTime - this.lastTickTime;
        //console.debug("timeBetweenTicks", timeBetweenTicks);

        this.handlePlayerControl();
        if (this.physics) {
            this.physics.tick(timeBetweenTicks);
        }
        for (const key in this.gameObjects) {
            const obj = this.gameObjects[key];
            if (!obj.inactive) {
                obj.tick(timeBetweenTicks);
            }
        }

        this.rootStage.update();
        const currentTime = Date.now();
        const tickElapsedTime = currentTime - tickStartTime;
        setTimeout(this.tick.bind(this), TARGET_TICK_INTERVAL - tickElapsedTime);
        this.lastTickTime = tickStartTime;
        //console.debug("tickElapsed", tickElapsedTime);
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

