import GameObject from '../../engine/game_object';

export default class Star extends GameObject {
    constructor (canvasWidth, canvasHeight) {
        super();
        const br = this.radius = 1;
        this.dy = 300 / (Math.random() * 9 + 1);
        this.x = Math.floor(Math.random() * canvasWidth);
        this.y = Math.floor(Math.random() * canvasHeight);
        this.displayObject = new createjs.Shape();
        this.displayObject.graphics.beginFill("#999").drawCircle(0, 0, br);
        this.displayObject.x = this.x;
        this.displayObject.y = this.y;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
    }

    tick (timePassed) {
        this.y += this.dy * timePassed / 1000;
        if (this.y > this.canvasHeight) {
            this.y = -Math.floor(Math.random() * 30);
            this.x = Math.floor(Math.random() * this.canvasWidth);
            this.displayObject.x = this.x;
        }
        this.displayObject.y = this.y;
    }
}
