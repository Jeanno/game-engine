import Box from '../src/game_objects/box';

export default class Physics {
    constructor () {
        this.gravity = new B2D.b2Vec2(0.0, 10.0);
        this.world = new B2D.b2World(this.gravity);
        this.bodies = {};
        this.collisions = [];

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
                this.collisions.push([goIdA, goIdB]);
            }
        }.bind(this);

        listener.EndContact = function () {};
        listener.PreSolve = function () {};
        listener.PostSolve = function () {};

        this.world.SetContactListener(listener);
    }

    addChild (gameObject) {
        const go = gameObject;
        const physics = go.modules.physics;
        if (!physics) {
            return;
        }
        if (physics.bodyDef && physics.shape) {
            const bodyDef = physics.bodyDef;
            bodyDef.position.x = go.x;
            bodyDef.position.y = go.y;
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
            gameObject.modules.physics.body = null;
        }
    }

    tick (timePassed) {
        const iterations = Math.floor(timePassed / 10);
        this.world.Step(timePassed / 1000, iterations, iterations);
        for (const pair of this.collisions) {
            const id1 = pair[0];
            const id2 = pair[1];
            const pair1 = this.bodies[id1];
            const pair2 = this.bodies[id2];
            if (pair1 && pair2) {
                const box1 = pair1[1];
                const box2 = pair2[1];
                if (box1.width === box2.width) {
                    const newWidth = Math.sqrt(box1.width * box1.width + box2.width * box2.width);
                    const newBox = new Box(0, 0, newWidth);
                    newBox.x = (box1.x + box2.x) / 2;
                    newBox.y = (box1.y + box2.y) / 2;
                    newBox.rotation = (box1.rotation + box2.rotation) / 2;
                    box1.game.addChild(newBox);
                    box1.removeFromGame();
                    box2.removeFromGame();
                }
            }
        }
        this.collisions = [];
        for (const key in this.bodies) {
            const pair = this.bodies[key];
            const body = pair[0];
            const go = pair[1];
            const pos = body.GetPosition();

            // Copying the value out in advanced to avoid gameObject
            // onPositionAndAngleChange overwrites body properties
            const posx = pos.x;
            const posy = pos.y;
            const angle = body.GetAngle();
            go.x = posx;
            go.y = posy;
            go.angle = angle / Math.PI * 180;
        }
    }
}
