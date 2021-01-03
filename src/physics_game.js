import Game from '../engine/game';
import SandScene from './scenes/sand';

export default class PhysicsGame extends Game {
    constructor(canvasId) {
        super(canvasId);

        this.setActiveScene(new SandScene());
    }

    tick () {
        super.tick();
    }

    handleUserInput (timePassedMs) {
        super.handleUserInput(timePassedMs);
        if (this.keyPressed[90]) {
            if (this.keyOff) {
                this.setActiveScene(new SandScene());
            }
            this.keyOff = false;
        } else {
            this.keyOff = true;
        }
    }
}

