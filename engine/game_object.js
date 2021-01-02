export default class GameObject {
    constructor () {
        this.displayObject = null;
        this.game = null;
        this._x = 0;
        this._y = 0;
        this._angle = 0;
        this.inactive = false;
        this.modules = {};
        this._position = null;
    }

    get x () {
        return this._x;
    }

    set x (value) {
        this._x = value;
        for (const key in this.modules) {
            this.modules[key].onPositionAndAngleChanged();
        }
    }

    get y () {
        return this._y;
    }

    set y (value) {
        this._y = value;
        for (const key in this.modules) {
            this.modules[key].onPositionAndAngleChanged();
        }
    }

    get angle () {
        return this._angle;
    }

    set angle (value) {
        this._angle = value;
        for (const key in this.modules) {
            this.modules[key].onPositionAndAngleChanged();
        }
    }

    get position () {
        return this._position;
    }

    set position (value) {
        this._position = value;
        // TODO: Notify all modules about position change
        for (const key in this.modules) {
            this.modules[key].onPositionAndAngleChanged();
        }
    }

    tick (timePassed) {
    }
}
