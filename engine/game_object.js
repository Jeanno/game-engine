export default class GameObject {
    constructor () {
        this.displayObject = null;
        this.game = null;
        this._x = 0;
        this._y = 0;
        this._angle = 0;
        this.inactive = false;
    }

    get x () {
        return this._x;
    }

    set x (value) {
        this._x = value;
        if (this.displayObject) {
            this.displayObject.x = value;
        }
        if (this.physics) {
            const body = this.physics.body;
            if (body) {
                const pos = body.GetPosition();
                pos.x = value;
                body.SetTransform(pos, body.GetAngle());
            }
        }
    }

    get y () {
        return this._y;
    }

    set y (value) {
        this._y = value;
        if (this.displayObject) {
            this.displayObject.y = value;
        }
        if (this.physics) {
            const body = this.physics.body;
            if (body) {
                const pos = body.GetPosition();
                pos.y = value;
                body.SetTransform(pos, body.GetAngle());
            }
        }
    }

    get angle () {
        return this._angle;
    }

    set angle (value) {
        this._angle = value;
        if (this.displayObject) {
            this.displayObject.rotation = value;
        }
        if (this.physics) {
            const body = this.physics.body;
            if (body) {
                const pos = body.GetPosition();
                body.SetTransform(pos, value / 180 * Math.PI);
            }
        }
    }

    tick (timePassed) {
    }
}
