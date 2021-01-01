import Game from '../engine/game';
import Star from './game_objects/star';
import Bullet from './game_objects/bullet';
import Plane from './game_objects/plane';
import Box from './game_objects/box';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

export default class PhysicsGame extends Game {
    constructor(canvasId) {
        super(canvasId);

        this.enablePhysics();
        this.setViewportScale(10);
        this.setViewportPosition(0, 0);
        this.setupStage();
        this.tickCount = 0;
    }

    setupStage () {
        const width = 64;
        const height = 48;
        const bg = new createjs.Shape();
        bg.graphics.beginFill("#111").drawRect(0, 0, width, height);

        this.stage.addChild(bg);

        for (let i = 0; i < 0; i++) {
            const box = new Box(width, height);
            this.addChild(box);
        }

    }

    _centerX (displayObject) {
        return (this.stage.canvas.width - displayObject.getMeasuredWidth()) / 2;
    }

    tick () {
        super.tick();
        this.tickCount += 1;
        const width = 64;
        const height = 48;
        if ((this.tickCount % 1) === 0 && this.tickCount < 100000) {
            const box = new Box(width, height);
            this.addChild(box);
        }
    }

    handlePlayerControl () {
        super.handlePlayerControl();
    }
}

