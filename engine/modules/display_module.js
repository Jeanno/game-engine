import Module from './module';

export default class DisplayModule extends Module {
    constructor (gameObject) {
        super(gameObject);
        this.displayObject = null;
    }

    onPositionAndAngleChanged () {
        const go = this.gameObject;
        if (this.displayObject) {
            this.displayObject.x = go.x;
            this.displayObject.y = go.y;
            this.displayObject.rotation = go.angle;
        }
    }
}

