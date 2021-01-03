export default class GameObject {
    constructor () {
        this.game = null;
        this.goId = null;
        this._position = null;
        this._angle = 0;
        this.inactive = false;
        this.modules = {};
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
