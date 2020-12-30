import GameObject from '../../engine/game_object';

export default class Box extends GameObject {
    constructor (canvasWidth, canvasHeight, width) {
        super();
        if (!width) {
            width = 0.5;
        }
        this.width = width;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        const hw = width / 2;
        this.displayObject = new createjs.Shape();

        const rand3 = Math.floor(Math.random() * 3);
        let color;
        if (rand3 === 0) {
            color = "Red";
        } else if (rand3 === 1) {
            color = "Cyan";
        } else {
            color = "Yellow";
        }
        this.displayObject.graphics.beginFill(color).drawRect(-hw, -hw, width, width);
        this.x = Math.floor(Math.random() * canvasWidth) / 16 + canvasWidth / 2;
        this.y = -Math.floor(Math.random() * canvasHeight * 3);

        const physics = this.physics = {};
        const vec = new B2D.b2Vec2(this.x, this.y);
        const bd = this.physics.bodyDef = new B2D.b2BodyDef();
        bd.set_type(B2D.b2_dynamicBody);
        bd.set_position(vec);
        this.physics.shape = this.getShape();

        this.totalTimePassed = 0;
    }

    tick (timePassed) {
        this.totalTimePassed += timePassed;
        return;
        if (this.totalTimePassed > 5000) {
            const canvasWidth = this.canvasWidth;
            const canvasHeight = this.canvasHeight;
            this.x = Math.floor(Math.random() * canvasWidth) / 16 + canvasWidth / 2;
            this.y = - Math.random() * canvasHeight * 3;
            this.totalTimePassed = 0;
            //this.game.removeChild(this);
        }
    }

    removeFromGame() {
        this.game.removeChild(this);
    }

    getShape () {
        const hw = this.width / 2;
        const shape = new B2D.b2PolygonShape();
        shape.SetAsBox(hw, hw);
        return shape;
    }
}

