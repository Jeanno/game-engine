import Module from './module';

export default class PhysicsModule extends Module {
    constructor (gameObject) {
        super(gameObject);
        this.bodyDef = null;
        this.shape = null;
        this.body = null;
    }

    onPositionAndAngleChanged () {
        const go = this.gameObject;
        if (this.body) {
            const pos = this.body.GetPosition();
            pos.x = go.position.values[0];
            pos.y = go.position.values[1];
            this.body.SetTransform(pos, go.angle / 180 * Math.PI);
        }
    }
}


