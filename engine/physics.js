
export default class Physics {
    constructor () {
        this.gravity = new B2D.b2Vec2(0.0, 10.0);
        this.world = new B2D.b2World(this.gravity);
        this.bodies = {};

        const bd_ground = new B2D.b2BodyDef();
        const ground = this.world.CreateBody(bd_ground);

        const shape0 = new B2D.b2EdgeShape();
        const floor = 48;
        shape0.Set(new B2D.b2Vec2(-200.0, floor), new B2D.b2Vec2(1000.0, floor));
        ground.CreateFixture(shape0, 0.0);
    }

    addChild (gameObject) {
        const go = gameObject;
        const physics = go.physics;
        if (!physics) {
            return;
        }
        if (physics.bodyDef && physics.shape) {
            const body = this.world.CreateBody(physics.bodyDef);
            body.CreateFixture(physics.shape, 5.0);
            body.SetAwake(1);
            body.SetActive(1);
            const ZERO = new B2D.b2Vec2(0.0, 0.0);
            body.SetLinearVelocity(ZERO);
            this.bodies[go.goId] = [body, go];
            physics.body = body;
        }
    }

    removeChild (gameObject) {
        const pair = this.bodies[gameObject.goId];
        if (pair) {
            this.world.DestroyBody(pair[0]);
            delete this.bodies[gameObject.goId];
            gameObject.physics.body = null;
        }
    }

    tick (timePassed) {
        const iterations = Math.floor(timePassed / 10);
        this.world.Step(timePassed / 1000, iterations, iterations);
        for (const key in this.bodies) {
            const pair = this.bodies[key];
            const body = pair[0];
            const go = pair[1];
            const pos = body.GetPosition();
            go.x = pos.get_x();
            go.y = pos.get_y();
            go.angle = body.GetAngle() / Math.PI * 180;
        }
    }
}
