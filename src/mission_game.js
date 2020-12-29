import Game from '../engine/game';
import Star from './game_objects/star';
import Bullet from './game_objects/bullet';
import Plane from './game_objects/plane';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

export default class MissionGame extends Game {
    constructor(canvasId) {
        super(canvasId);
        this.bullets = [];
        this.startTime = Date.now();
        this.endTime = null;
        this.gameRunning = true;
        this.firstStart = true;

        this.gameRecords = null;

        this.setupStage();
        this._showStartScreen();
    }

    setupStage () {
        const bg = new createjs.Shape();
        bg.graphics.beginFill("#111").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
        this.stage.addChild(bg);
        for (let i = 0; i < 100; i++) {
            const star = new Star(this.stage.canvas.width, this.stage.canvas.height);
            this.addChild(star);
        }
        this.timer = new createjs.Text("", "15px Arial", "#fff");

        for (let i = 0; i < 70; i++) {
            const bullet = new Bullet;
            this.bullets.push(bullet);
        }

        this.plane = new Plane;
        this.plane.x = this.stage.canvas.width / 2;
        this.plane.y = this.stage.canvas.height / 2;
        this.plane.setBound([this.stage.canvas.width, this.stage.canvas.height]);
    }

    _centerX (displayObject) {
        return (this.stage.canvas.width - displayObject.getMeasuredWidth()) / 2;
    }

    _showStartScreen () {
        this.gameRunning = false;
        const topMargin = 170;
        this.startText = new createjs.Text("MISSION99", "100px Arial", "#fff");
        this.startText.x = this._centerX(this.startText);
        this.startText.y = topMargin;
        this.stage.addChild(this.startText);

        this.actionText = new createjs.Text("Press arrow key to start", "20px Arial", "#fff");
        this.actionText.x = this._centerX(this.actionText);
        this.actionText.y = topMargin + 150;
        this.stage.addChild(this.actionText);
    }

    _gameStart () {
        this.startTime = Date.now();
        this.gameRunning = true;

        for (const b of this.bullets) {
            b.inactive = false;
            if (this.firstStart) {
                this.addChild(b);
            }
            b.randomizeStartPos();
        }

        this.plane.x = this.stage.canvas.width / 2;
        this.plane.y = this.stage.canvas.height / 2;
        this.plane.inactive = false;
        if (this.firstStart) {
            this.addChild(this.plane);
        }
        this.stage.addChild(this.timer);

        if (this.startText) {
            this.stage.removeChild(this.startText);
            this.startText = null;
        }
        if (this.actionText) {
            this.stage.removeChild(this.actionText);
            this.actionText = null;
        }
        if (this.endText) {
            this.stage.removeChild(this.endText);
            this.endText = null;
        }
        if (this.endTimer) {
            this.stage.removeChild(this.endTimer);
            this.endTimer = null;
        }

        this.firstStart = false;
    }

    _gameEnd () {
        console.log("Boom!");
        this.gameRunning = false;
        this.endTime = Date.now();
        const survivalTime = this.endTime - this.startTime;
        this._saveResult(this.endTime, survivalTime);
        const topMargin = 120;

        this.endText = new createjs.Text("FAILED", "170px Arial", "#fff");
        this.endText.x = this._centerX(this.endText);
        this.endText.y = topMargin;
        this.stage.addChild(this.endText);

        this.endTimer = new createjs.Text("", "20px Arial", "#fff");
        this.endTimer.text = "Survival Time: " + Math.floor(survivalTime / 10) / 100 + " s";
        this.endTimer.x = this._centerX(this.endTimer);
        this.endTimer.y = topMargin + 200;
        this.stage.addChild(this.endTimer);

        for (const b of this.bullets) {
            b.inactive = true;
        }
        this.plane.inactive = true;
        this.stage.removeChild(this.timer);
    }

    _saveResult(playTime, survivalTime) {
        const storage = window.localStorage;
        if (!this.gameRecords) {
            const recordsStr = storage.getItem('gameRecords');
            if (recordsStr) {
                this.gameRecords = JSON.parse(recordsStr);
            } else {
                this.gameRecords = {};
            }
        }

        this.gameRecords[playTime] = survivalTime;
        console.log(this.gameRecords);
        storage.setItem('gameRecords', JSON.stringify(this.gameRecords));
    }

    tick () {
        if (this.timer) {
            const timeElapsed = Date.now() - this.startTime;
            this.timer.text = Math.floor(timeElapsed / 10) / 100 + " s";
        }
        super.tick();
        if (this.gameRunning) {
            for (const b of this.bullets) {
                if (this.plane.isCollidedWith(b)) {
                    this._gameEnd();
                }
            }
        }
    }

    handlePlayerControl () {
        super.handlePlayerControl();
        const plane = this.plane;
        if (plane) {
            plane.moveY = 0;
            plane.moveX = 0;
        }
        if (this.gameRunning) {
            if (this.keyPressed[KEY_UP]) {
                plane.moveY -= 1;
            }
            if (this.keyPressed[KEY_DOWN]) {
                plane.moveY += 1;
            }
            if (this.keyPressed[KEY_LEFT]) {
                plane.moveX -= 1;
            }
            if (this.keyPressed[KEY_RIGHT]) {
                plane.moveX += 1;
            }
        } else {
            if (this.keyPressed[KEY_UP] || this.keyPressed[KEY_DOWN] ||
                this.keyPressed[KEY_LEFT] || this.keyPressed[KEY_RIGHT]) {
                if (this.hasReleased && Date.now() - this.endTime > 700) {
                    this._gameStart();
                    this.hasReleased = false;
                }
            } else {
                this.hasReleased = true;
            }
        }
    }
}

