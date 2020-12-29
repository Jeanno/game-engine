import GameObject from '../../engine/game_object';

export default class Bullet extends GameObject {
    constructor () {
        super();
        const br = this.radius = 3;
        this.dx = 0;
        this.dy = 0;
        this.canvasWidth = 640;
        this.canvasHeight = 480;
        this.randomizeStartPos();
        this.displayObject = new createjs.Shape();
        this.displayObject.graphics.beginFill("Orange").drawCircle(0, 0, br);
        this.displayObject.x = this.x;
        this.displayObject.y = this.y;
    }

    randomizeStartPos () {
        this.isOnScreen = false;
        const speed = 120;
        const direction = Math.random() * 2 * Math.PI;
        this.dx = Math.sin(direction) * speed;
        this.dy = Math.cos(direction) * speed;
        const cutX = Math.random() * this.canvasWidth;
        const cutY = Math.random() * this.canvasHeight;
        const numTickX = Math.max(cutX / this.dx, (cutX - this.canvasWidth) / this.dx);
        const numTickY = Math.max(cutY / this.dy, (cutY - this.canvasHeight) / this.dy);
        const numTick = Math.min(numTickX, numTickY);
        this.x = cutX - this.dx * numTick;
        this.y = cutY - this.dy * numTick;
    }

    tick (timePassed) {
        this.x += this.dx * timePassed / 1000;
        this.y += this.dy * timePassed / 1000;
        const threshold = 50;
        if (this.x >= -threshold && this.x < this.canvasWidth + threshold &&
            this.y >= -threshold && this.y < this.canvasHeight + threshold) {
            this.isOnScreen = true;
        } else if (this.isOnScreen) {
            this.randomizeStartPos();
        }

        this.displayObject.x = this.x;
        this.displayObject.y = this.y;
    }
}

