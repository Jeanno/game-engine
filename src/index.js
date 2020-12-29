import MissionGame from './mission_game';
import PhysicsGame from './physics_game';

async function init () {
    window.Module = { TOTAL_MEMORY: 256*1024*1024 };
    window.B2D = await Box2D()
    const game = new PhysicsGame("myCanvas");
    game.start();
}

window.onload = init;

