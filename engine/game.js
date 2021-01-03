const TARGET_FRAME_RATE = 60;
const TARGET_TICK_INTERVAL = 1000 / TARGET_FRAME_RATE;

export default class Game {
    constructor (canvasId) {
        this.canvasId = canvasId;
        this.rootStage = new createjs.Stage(canvasId);
        this.activeScene = null;

        this.keyPressed = [];
        this.lastTickTime = null;

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

    setActiveScene (scene) {
        if (this.activeScene) {
            this.rootStage.removeChild(this.activeScene.stage);
        }
        scene.game = this;
        this.rootStage.addChild(scene.stage);
        this.activeScene = scene;
    }

    tick () {
        const tickStartTime = Date.now();
        const timeBetweenTicks = tickStartTime - this.lastTickTime;
        //console.debug("timeBetweenTicks", timeBetweenTicks);

        this.handleUserInput();
        if (this.activeScene) {
            this.activeScene.tick(timeBetweenTicks);
        }

        this.rootStage.update();
        const currentTime = Date.now();
        const tickElapsedTime = currentTime - tickStartTime;
        setTimeout(this.tick.bind(this), TARGET_TICK_INTERVAL - tickElapsedTime);
        this.lastTickTime = tickStartTime;
        //console.debug("tickElapsed", tickElapsedTime);
    }

    handleUserInput (timePassedMs) {
    }

}

