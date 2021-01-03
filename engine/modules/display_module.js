import Module from './module';

export default class DisplayModule extends Module {
    constructor (gameObject) {
        super(gameObject);
        this.displayObject = null;
    }

    onPositionAndAngleChanged () {
        const go = this.gameObject;
        if (this.displayObject) {
            this.displayObject.x = go.position.values[0];
            this.displayObject.y = go.position.values[1];
            this.displayObject.rotation = go.angle;
        }
    }
}

