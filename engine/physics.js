import Box from '../src/game_objects/box';

export default class Physics {
    constructor () {
        this.gravity = new B2D.b2Vec2(0.0, 10.0);
        this.world = new B2D.b2World(this.gravity);
        this.bodies = {};
        this.shouldRemove = [];

        const bd_ground = new B2D.b2BodyDef();
        const ground = this.world.CreateBody(bd_ground);

        const shape0 = new B2D.b2EdgeShape();
        const floor = 48;
        shape0.Set(new B2D.b2Vec2(-200.0, floor), new B2D.b2Vec2(1000.0, floor));
        ground.CreateFixture(shape0, 0.0);

        const listener = new B2D.JSContactListener();
        listener.BeginContact = function (contactPtr) {
            const contact = B2D.wrapPointer(contactPtr, B2D.b2Contact);
            const fixtureA = contact.GetFixtureA();
            const fixtureB = contact.GetFixtureB();
            const bodyA = fixtureA.GetBody();
            const bodyB = fixtureB.GetBody();
            const goIdA = bodyA.goId;
            const goIdB = bodyB.goId;
            if (goIdA && goIdB) {
                this.shouldRemove.push(goIdA);
                this.shouldRemove.push(goIdB);
            }
        }.bind(this);

        listener.EndContact = function () {};
        listener.PreSolve = function () {};
        listener.PostSolve = function () {};

        this.world.SetContactListener(listener);
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
            body.goId = go.goId;
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
        for (const goId of this.shouldRemove) {
            const pair = this.bodies[goId];
            if (pair) {
                pair[1].removeFromGame();
            }
        }
        this.shouldRemove = [];
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
