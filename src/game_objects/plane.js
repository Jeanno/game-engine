import GameObject from '../../engine/game_object';

export default class Plane extends GameObject {
    constructor () {
        super();
        this.speed = 200;
        this.dx = 0;
        this.dy = 0;
        this.bound = null;
        const pw = this.width = 24;
        const pl = this.length = 18;
        const graphics = new createjs.Graphics();
        graphics.beginFill("DeepSkyBlue");
        graphics.moveTo(-2, -pl/2);
        graphics.lineTo(-pw/2, pl/2);
        graphics.lineTo(pw/2, pl/2);
        graphics.lineTo(2, -pl/2);
        graphics.lineTo(-2, -pl/2);
        this.displayObject = new createjs.Shape(graphics);
        this.x = 0;
        this.y = 0;
        this.displayObject.x = this.x;
        this.displayObject.y = this.y;

        this.moveX = 0;
        this.moveY = 0;
    }

    tick (timePassed) {
        this.dx = this.moveX * this.speed;
        this.dy = this.moveY * this.speed;
        this.x += this.dx * timePassed / 1000;
        this.y += this.dy * timePassed / 1000;
        if (this.bound) {
            this.x = Math.max(0, this.x);
            this.x = Math.min(this.bound[0], this.x);
            this.y = Math.max(0, this.y);
            this.y = Math.min(this.bound[1], this.y);
        }
    }

    setBound (bound) {
        this.bound = bound;
    }

    _hitBox (x, y, l, r, t, b) {
        return x >= l && x < r && y >= t && y < b;
    }

    isCollidedWith (bullet) {
        const w = this.width;
        const h = this.length;
        const l = this.x - w / 2;
        const r = this.x + w / 2;
        const t = this.y;
        const b = this.y + h / 2;

        const l2 = this.x - w / 4;
        const r2 = this.x + w / 4;
        const t2 = this.y - h / 2;
        const b2 = this.y + h / 2;

        return this._hitBox(bullet.x, bullet.y, l, r, t, b) ||
            this._hitBox(bullet.x, bullet.y, l2, r2, t2, b2);
    }
}
