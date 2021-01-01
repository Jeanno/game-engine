/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./engine/game.js":
/*!************************!*\
  !*** ./engine/game.js ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _physics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics */ \"./engine/physics.js\");\n\nconst TARGET_FRAME_RATE = 60;\nconst TARGET_TICK_INTERVAL = 1000 / TARGET_FRAME_RATE;\n\nclass Game {\n    constructor (canvasId) {\n        this.canvasId = canvasId;\n        this.rootStage = new createjs.Stage(canvasId);\n        this.stage = new createjs.Container();\n        this.rootStage.addChild(this.stage);\n\n        this.gameObjects = {};\n        this.goIdCounter = 1;\n        this.keyPressed = [];\n        this.lastTickTime = null;\n        this.physics = null;\n\n        document.onkeydown = function (e) {\n            e = e || window.event;\n            this.keyPressed[e.keyCode] = true;\n        }.bind(this);\n        document.onkeyup = function (e) {\n            e = e || window.event;\n            this.keyPressed[e.keyCode] = false;\n        }.bind(this);\n    }\n\n    tearDown () {\n        // TODO: Remove key listeners\n    }\n\n    start () {\n        this.lastTickTime = Date.now();\n        this.tick();\n    }\n\n    addChild (gameObject) {\n        const go = gameObject;\n        go.game = this;\n        go.goId = this.goIdCounter++;\n        this.gameObjects[go.goId] = go;\n        if (this.physics) {\n            this.physics.addChild(go);\n        }\n        this.stage.addChild(go.displayObject);\n    }\n\n    removeChild (gameObject) {\n        const go = this.gameObjects[gameObject.goId];\n        if (go) {\n            this.stage.removeChild(go.displayObject);\n            if (this.physics) {\n                this.physics.removeChild(go);\n            }\n            delete this.gameObjects[go.goId];\n            go.goId = null;\n        }\n    }\n\n    handlePlayerControl () {\n    }\n\n    tick () {\n        const tickStartTime = Date.now();\n        const timeBetweenTicks = tickStartTime - this.lastTickTime;\n        //console.debug(\"timeBetweenTicks\", timeBetweenTicks);\n\n        this.handlePlayerControl();\n        if (this.physics) {\n            this.physics.tick(timeBetweenTicks);\n        }\n        for (const key in this.gameObjects) {\n            const obj = this.gameObjects[key];\n            if (!obj.inactive) {\n                obj.tick(timeBetweenTicks);\n            }\n        }\n\n        this.rootStage.update();\n        const currentTime = Date.now();\n        const tickElapsedTime = currentTime - tickStartTime;\n        setTimeout(this.tick.bind(this), TARGET_TICK_INTERVAL - tickElapsedTime);\n        this.lastTickTime = tickStartTime;\n        //console.debug(\"tickElapsed\", tickElapsedTime);\n    }\n\n    enablePhysics () {\n        this.physics = new _physics__WEBPACK_IMPORTED_MODULE_0__.default();\n    }\n\n    setViewportScale (scale) {\n        this.stage.x *= scale / this.stage.scale;\n        this.stage.y *= scale / this.stage.scale;\n        this.stage.scale = scale;\n    }\n\n    setViewportPosition (x, y) {\n        this.stage.x = -x * this.stage.scale;\n        this.stage.y = -y * this.stage.scale;;\n    }\n}\n\n\n\n//# sourceURL=webpack://game/./engine/game.js?");

/***/ }),

/***/ "./engine/game_object.js":
/*!*******************************!*\
  !*** ./engine/game_object.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ GameObject\n/* harmony export */ });\nclass GameObject {\n    constructor () {\n        this.displayObject = null;\n        this.game = null;\n        this._x = 0;\n        this._y = 0;\n        this._angle = 0;\n        this.inactive = false;\n    }\n\n    get x () {\n        return this._x;\n    }\n\n    set x (value) {\n        this._x = value;\n        if (this.displayObject) {\n            this.displayObject.x = value;\n        }\n        if (this.physics) {\n            const body = this.physics.body;\n            if (body) {\n                const pos = body.GetPosition();\n                pos.x = value;\n                body.SetTransform(pos, body.GetAngle());\n            }\n        }\n    }\n\n    get y () {\n        return this._y;\n    }\n\n    set y (value) {\n        this._y = value;\n        if (this.displayObject) {\n            this.displayObject.y = value;\n        }\n        if (this.physics) {\n            const body = this.physics.body;\n            if (body) {\n                const pos = body.GetPosition();\n                pos.y = value;\n                body.SetTransform(pos, body.GetAngle());\n            }\n        }\n    }\n\n    get angle () {\n        return this._angle;\n    }\n\n    set angle (value) {\n        this._angle = value;\n        if (this.displayObject) {\n            this.displayObject.rotation = value;\n        }\n        if (this.physics) {\n            const body = this.physics.body;\n            if (body) {\n                const pos = body.GetPosition();\n                body.SetTransform(pos, value / 180 * Math.PI);\n            }\n        }\n    }\n\n    tick (timePassed) {\n    }\n}\n\n\n//# sourceURL=webpack://game/./engine/game_object.js?");

/***/ }),

/***/ "./engine/physics.js":
/*!***************************!*\
  !*** ./engine/physics.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Physics\n/* harmony export */ });\n/* harmony import */ var _src_game_objects_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/game_objects/box */ \"./src/game_objects/box.js\");\n\n\nclass Physics {\n    constructor () {\n        this.gravity = new B2D.b2Vec2(0.0, 10.0);\n        this.world = new B2D.b2World(this.gravity);\n        this.bodies = {};\n        this.collisions = [];\n\n        const bd_ground = new B2D.b2BodyDef();\n        const ground = this.world.CreateBody(bd_ground);\n\n        const shape0 = new B2D.b2EdgeShape();\n        const floor = 48;\n        shape0.Set(new B2D.b2Vec2(-200.0, floor), new B2D.b2Vec2(1000.0, floor));\n        ground.CreateFixture(shape0, 0.0);\n\n        const listener = new B2D.JSContactListener();\n        listener.BeginContact = function (contactPtr) {\n            const contact = B2D.wrapPointer(contactPtr, B2D.b2Contact);\n            const fixtureA = contact.GetFixtureA();\n            const fixtureB = contact.GetFixtureB();\n            const bodyA = fixtureA.GetBody();\n            const bodyB = fixtureB.GetBody();\n            const goIdA = bodyA.goId;\n            const goIdB = bodyB.goId;\n            if (goIdA && goIdB) {\n                this.collisions.push([goIdA, goIdB]);\n            }\n        }.bind(this);\n\n        listener.EndContact = function () {};\n        listener.PreSolve = function () {};\n        listener.PostSolve = function () {};\n\n        this.world.SetContactListener(listener);\n    }\n\n    addChild (gameObject) {\n        const go = gameObject;\n        const physics = go.physics;\n        if (!physics) {\n            return;\n        }\n        if (physics.bodyDef && physics.shape) {\n            const bodyDef = physics.bodyDef;\n            bodyDef.position.x = go.x;\n            bodyDef.position.y = go.y;\n            const body = this.world.CreateBody(physics.bodyDef);\n            body.CreateFixture(physics.shape, 5.0);\n            body.SetAwake(1);\n            body.SetActive(1);\n            const ZERO = new B2D.b2Vec2(0.0, 0.0);\n            body.SetLinearVelocity(ZERO);\n            this.bodies[go.goId] = [body, go];\n            physics.body = body;\n            body.goId = go.goId;\n        }\n    }\n\n    removeChild (gameObject) {\n        const pair = this.bodies[gameObject.goId];\n        if (pair) {\n            this.world.DestroyBody(pair[0]);\n            delete this.bodies[gameObject.goId];\n            gameObject.physics.body = null;\n        }\n    }\n\n    tick (timePassed) {\n        const iterations = Math.floor(timePassed / 10);\n        this.world.Step(timePassed / 1000, iterations, iterations);\n        for (const pair of this.collisions) {\n            const id1 = pair[0];\n            const id2 = pair[1];\n            const pair1 = this.bodies[id1];\n            const pair2 = this.bodies[id2];\n            if (pair1 && pair2) {\n                const box1 = pair1[1];\n                const box2 = pair2[1];\n                if (box1.width === box2.width) {\n                    const newWidth = Math.sqrt(box1.width * box1.width + box2.width * box2.width);\n                    const newBox = new _src_game_objects_box__WEBPACK_IMPORTED_MODULE_0__.default(0, 0, newWidth);\n                    newBox.x = (box1.x + box2.x) / 2;\n                    newBox.y = (box1.y + box2.y) / 2;\n                    newBox.rotation = (box1.rotation + box2.rotation) / 2;\n                    box1.game.addChild(newBox);\n                    box1.removeFromGame();\n                    box2.removeFromGame();\n                }\n            }\n        }\n        this.collisions = [];\n        for (const key in this.bodies) {\n            const pair = this.bodies[key];\n            const body = pair[0];\n            const go = pair[1];\n            const pos = body.GetPosition();\n            go.x = pos.get_x();\n            go.y = pos.get_y();\n            go.angle = body.GetAngle() / Math.PI * 180;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://game/./engine/physics.js?");

/***/ }),

/***/ "./src/game_objects/box.js":
/*!*********************************!*\
  !*** ./src/game_objects/box.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Box\n/* harmony export */ });\n/* harmony import */ var _engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/game_object */ \"./engine/game_object.js\");\n\n\nclass Box extends _engine_game_object__WEBPACK_IMPORTED_MODULE_0__.default {\n    constructor (canvasWidth, canvasHeight, width) {\n        super();\n        if (!width) {\n            width = 0.2;\n        }\n        this.width = width;\n        this.canvasWidth = canvasWidth;\n        this.canvasHeight = canvasHeight;\n        const hw = width / 2;\n        this.displayObject = new createjs.Shape();\n\n        const rand3 = Math.floor(Math.random() * 3);\n        let color;\n        if (rand3 === 0) {\n            color = \"Red\";\n        } else if (rand3 === 1) {\n            color = \"Cyan\";\n        } else {\n            color = \"Yellow\";\n        }\n        this.displayObject.graphics.beginFill(color).drawRect(-hw, -hw, width, width);\n        this.x = Math.floor(Math.random() * canvasWidth) / 16 + canvasWidth / 2;\n        this.y = -Math.floor(Math.random() * canvasHeight * 3);\n\n        const physics = this.physics = {};\n        const vec = new B2D.b2Vec2(this.x, this.y);\n        const bd = this.physics.bodyDef = new B2D.b2BodyDef();\n        bd.set_type(B2D.b2_dynamicBody);\n        bd.set_position(vec);\n        this.physics.shape = this.getShape();\n\n        this.totalTimePassed = 0;\n    }\n\n    tick (timePassed) {\n        this.totalTimePassed += timePassed;\n        return;\n        if (this.totalTimePassed > 5000) {\n            const canvasWidth = this.canvasWidth;\n            const canvasHeight = this.canvasHeight;\n            this.x = Math.floor(Math.random() * canvasWidth) / 16 + canvasWidth / 2;\n            this.y = - Math.random() * canvasHeight * 3;\n            this.totalTimePassed = 0;\n            //this.game.removeChild(this);\n        }\n    }\n\n    removeFromGame() {\n        this.game.removeChild(this);\n    }\n\n    getShape () {\n        const hw = this.width / 2;\n        const shape = new B2D.b2PolygonShape();\n        shape.SetAsBox(hw, hw);\n        return shape;\n    }\n}\n\n\n\n//# sourceURL=webpack://game/./src/game_objects/box.js?");

/***/ }),

/***/ "./src/game_objects/bullet.js":
/*!************************************!*\
  !*** ./src/game_objects/bullet.js ***!
  \************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Bullet\n/* harmony export */ });\n/* harmony import */ var _engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/game_object */ \"./engine/game_object.js\");\n\n\nclass Bullet extends _engine_game_object__WEBPACK_IMPORTED_MODULE_0__.default {\n    constructor () {\n        super();\n        const br = this.radius = 3;\n        this.dx = 0;\n        this.dy = 0;\n        this.canvasWidth = 640;\n        this.canvasHeight = 480;\n        this.randomizeStartPos();\n        this.displayObject = new createjs.Shape();\n        this.displayObject.graphics.beginFill(\"Orange\").drawCircle(0, 0, br);\n        this.displayObject.x = this.x;\n        this.displayObject.y = this.y;\n    }\n\n    randomizeStartPos () {\n        this.isOnScreen = false;\n        const speed = 120;\n        const direction = Math.random() * 2 * Math.PI;\n        this.dx = Math.sin(direction) * speed;\n        this.dy = Math.cos(direction) * speed;\n        const cutX = Math.random() * this.canvasWidth;\n        const cutY = Math.random() * this.canvasHeight;\n        const numTickX = Math.max(cutX / this.dx, (cutX - this.canvasWidth) / this.dx);\n        const numTickY = Math.max(cutY / this.dy, (cutY - this.canvasHeight) / this.dy);\n        const numTick = Math.min(numTickX, numTickY);\n        this.x = cutX - this.dx * numTick;\n        this.y = cutY - this.dy * numTick;\n    }\n\n    tick (timePassed) {\n        this.x += this.dx * timePassed / 1000;\n        this.y += this.dy * timePassed / 1000;\n        const threshold = 50;\n        if (this.x >= -threshold && this.x < this.canvasWidth + threshold &&\n            this.y >= -threshold && this.y < this.canvasHeight + threshold) {\n            this.isOnScreen = true;\n        } else if (this.isOnScreen) {\n            this.randomizeStartPos();\n        }\n\n        this.displayObject.x = this.x;\n        this.displayObject.y = this.y;\n    }\n}\n\n\n\n//# sourceURL=webpack://game/./src/game_objects/bullet.js?");

/***/ }),

/***/ "./src/game_objects/plane.js":
/*!***********************************!*\
  !*** ./src/game_objects/plane.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Plane\n/* harmony export */ });\n/* harmony import */ var _engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/game_object */ \"./engine/game_object.js\");\n\n\nclass Plane extends _engine_game_object__WEBPACK_IMPORTED_MODULE_0__.default {\n    constructor () {\n        super();\n        this.speed = 200;\n        this.dx = 0;\n        this.dy = 0;\n        this.bound = null;\n        const pw = this.width = 24;\n        const pl = this.length = 18;\n        const graphics = new createjs.Graphics();\n        graphics.beginFill(\"DeepSkyBlue\");\n        graphics.moveTo(-2, -pl/2);\n        graphics.lineTo(-pw/2, pl/2);\n        graphics.lineTo(pw/2, pl/2);\n        graphics.lineTo(2, -pl/2);\n        graphics.lineTo(-2, -pl/2);\n        this.displayObject = new createjs.Shape(graphics);\n        this.x = 0;\n        this.y = 0;\n        this.displayObject.x = this.x;\n        this.displayObject.y = this.y;\n\n        this.moveX = 0;\n        this.moveY = 0;\n    }\n\n    tick (timePassed) {\n        this.dx = this.moveX * this.speed;\n        this.dy = this.moveY * this.speed;\n        this.x += this.dx * timePassed / 1000;\n        this.y += this.dy * timePassed / 1000;\n        if (this.bound) {\n            this.x = Math.max(0, this.x);\n            this.x = Math.min(this.bound[0], this.x);\n            this.y = Math.max(0, this.y);\n            this.y = Math.min(this.bound[1], this.y);\n        }\n    }\n\n    setBound (bound) {\n        this.bound = bound;\n    }\n\n    _hitBox (x, y, l, r, t, b) {\n        return x >= l && x < r && y >= t && y < b;\n    }\n\n    isCollidedWith (bullet) {\n        const w = this.width;\n        const h = this.length;\n        const l = this.x - w / 2;\n        const r = this.x + w / 2;\n        const t = this.y;\n        const b = this.y + h / 2;\n\n        const l2 = this.x - w / 4;\n        const r2 = this.x + w / 4;\n        const t2 = this.y - h / 2;\n        const b2 = this.y + h / 2;\n\n        return this._hitBox(bullet.x, bullet.y, l, r, t, b) ||\n            this._hitBox(bullet.x, bullet.y, l2, r2, t2, b2);\n    }\n}\n\n\n//# sourceURL=webpack://game/./src/game_objects/plane.js?");

/***/ }),

/***/ "./src/game_objects/star.js":
/*!**********************************!*\
  !*** ./src/game_objects/star.js ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Star\n/* harmony export */ });\n/* harmony import */ var _engine_game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/game_object */ \"./engine/game_object.js\");\n\n\nclass Star extends _engine_game_object__WEBPACK_IMPORTED_MODULE_0__.default {\n    constructor (canvasWidth, canvasHeight) {\n        super();\n        const br = this.radius = 1;\n        this.dy = 300 / (Math.random() * 9 + 1);\n        this.x = Math.floor(Math.random() * canvasWidth);\n        this.y = Math.floor(Math.random() * canvasHeight);\n        this.displayObject = new createjs.Shape();\n        this.displayObject.graphics.beginFill(\"#999\").drawCircle(0, 0, br);\n        this.displayObject.x = this.x;\n        this.displayObject.y = this.y;\n        this.canvasHeight = canvasHeight;\n        this.canvasWidth = canvasWidth;\n    }\n\n    tick (timePassed) {\n        this.y += this.dy * timePassed / 1000;\n        if (this.y > this.canvasHeight) {\n            this.y = -Math.floor(Math.random() * 30);\n            this.x = Math.floor(Math.random() * this.canvasWidth);\n            this.displayObject.x = this.x;\n        }\n        this.displayObject.y = this.y;\n    }\n}\n\n\n//# sourceURL=webpack://game/./src/game_objects/star.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mission_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mission_game */ \"./src/mission_game.js\");\n/* harmony import */ var _physics_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./physics_game */ \"./src/physics_game.js\");\n\n\n\nasync function init () {\n    window.Module = { TOTAL_MEMORY: 256*1024*1024 };\n    window.B2D = await Box2D()\n    const game = new _physics_game__WEBPACK_IMPORTED_MODULE_1__.default(\"myCanvas\");\n    game.start();\n}\n\nwindow.onload = init;\n\n\n\n//# sourceURL=webpack://game/./src/index.js?");

/***/ }),

/***/ "./src/mission_game.js":
/*!*****************************!*\
  !*** ./src/mission_game.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ MissionGame\n/* harmony export */ });\n/* harmony import */ var _engine_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/game */ \"./engine/game.js\");\n/* harmony import */ var _game_objects_star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_objects/star */ \"./src/game_objects/star.js\");\n/* harmony import */ var _game_objects_bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_objects/bullet */ \"./src/game_objects/bullet.js\");\n/* harmony import */ var _game_objects_plane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_objects/plane */ \"./src/game_objects/plane.js\");\n\n\n\n\n\nconst KEY_UP = 38;\nconst KEY_DOWN = 40;\nconst KEY_LEFT = 37;\nconst KEY_RIGHT = 39;\n\nclass MissionGame extends _engine_game__WEBPACK_IMPORTED_MODULE_0__.default {\n    constructor(canvasId) {\n        super(canvasId);\n        this.bullets = [];\n        this.startTime = Date.now();\n        this.endTime = null;\n        this.gameRunning = true;\n        this.firstStart = true;\n\n        this.gameRecords = null;\n\n        this.setupStage();\n        this._showStartScreen();\n    }\n\n    setupStage () {\n        const bg = new createjs.Shape();\n        bg.graphics.beginFill(\"#111\").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);\n        this.stage.addChild(bg);\n        for (let i = 0; i < 100; i++) {\n            const star = new _game_objects_star__WEBPACK_IMPORTED_MODULE_1__.default(this.stage.canvas.width, this.stage.canvas.height);\n            this.addChild(star);\n        }\n        this.timer = new createjs.Text(\"\", \"15px Arial\", \"#fff\");\n\n        for (let i = 0; i < 70; i++) {\n            const bullet = new _game_objects_bullet__WEBPACK_IMPORTED_MODULE_2__.default;\n            this.bullets.push(bullet);\n        }\n\n        this.plane = new _game_objects_plane__WEBPACK_IMPORTED_MODULE_3__.default;\n        this.plane.x = this.stage.canvas.width / 2;\n        this.plane.y = this.stage.canvas.height / 2;\n        this.plane.setBound([this.stage.canvas.width, this.stage.canvas.height]);\n    }\n\n    _centerX (displayObject) {\n        return (this.stage.canvas.width - displayObject.getMeasuredWidth()) / 2;\n    }\n\n    _showStartScreen () {\n        this.gameRunning = false;\n        const topMargin = 170;\n        this.startText = new createjs.Text(\"MISSION99\", \"100px Arial\", \"#fff\");\n        this.startText.x = this._centerX(this.startText);\n        this.startText.y = topMargin;\n        this.stage.addChild(this.startText);\n\n        this.actionText = new createjs.Text(\"Press arrow key to start\", \"20px Arial\", \"#fff\");\n        this.actionText.x = this._centerX(this.actionText);\n        this.actionText.y = topMargin + 150;\n        this.stage.addChild(this.actionText);\n    }\n\n    _gameStart () {\n        this.startTime = Date.now();\n        this.gameRunning = true;\n\n        for (const b of this.bullets) {\n            b.inactive = false;\n            if (this.firstStart) {\n                this.addChild(b);\n            }\n            b.randomizeStartPos();\n        }\n\n        this.plane.x = this.stage.canvas.width / 2;\n        this.plane.y = this.stage.canvas.height / 2;\n        this.plane.inactive = false;\n        if (this.firstStart) {\n            this.addChild(this.plane);\n        }\n        this.stage.addChild(this.timer);\n\n        if (this.startText) {\n            this.stage.removeChild(this.startText);\n            this.startText = null;\n        }\n        if (this.actionText) {\n            this.stage.removeChild(this.actionText);\n            this.actionText = null;\n        }\n        if (this.endText) {\n            this.stage.removeChild(this.endText);\n            this.endText = null;\n        }\n        if (this.endTimer) {\n            this.stage.removeChild(this.endTimer);\n            this.endTimer = null;\n        }\n\n        this.firstStart = false;\n    }\n\n    _gameEnd () {\n        console.log(\"Boom!\");\n        this.gameRunning = false;\n        this.endTime = Date.now();\n        const survivalTime = this.endTime - this.startTime;\n        this._saveResult(this.endTime, survivalTime);\n        const topMargin = 120;\n\n        this.endText = new createjs.Text(\"FAILED\", \"170px Arial\", \"#fff\");\n        this.endText.x = this._centerX(this.endText);\n        this.endText.y = topMargin;\n        this.stage.addChild(this.endText);\n\n        this.endTimer = new createjs.Text(\"\", \"20px Arial\", \"#fff\");\n        this.endTimer.text = \"Survival Time: \" + Math.floor(survivalTime / 10) / 100 + \" s\";\n        this.endTimer.x = this._centerX(this.endTimer);\n        this.endTimer.y = topMargin + 200;\n        this.stage.addChild(this.endTimer);\n\n        for (const b of this.bullets) {\n            b.inactive = true;\n        }\n        this.plane.inactive = true;\n        this.stage.removeChild(this.timer);\n    }\n\n    _saveResult(playTime, survivalTime) {\n        const storage = window.localStorage;\n        if (!this.gameRecords) {\n            const recordsStr = storage.getItem('gameRecords');\n            if (recordsStr) {\n                this.gameRecords = JSON.parse(recordsStr);\n            } else {\n                this.gameRecords = {};\n            }\n        }\n\n        this.gameRecords[playTime] = survivalTime;\n        console.log(this.gameRecords);\n        storage.setItem('gameRecords', JSON.stringify(this.gameRecords));\n    }\n\n    tick () {\n        if (this.timer) {\n            const timeElapsed = Date.now() - this.startTime;\n            this.timer.text = Math.floor(timeElapsed / 10) / 100 + \" s\";\n        }\n        super.tick();\n        if (this.gameRunning) {\n            for (const b of this.bullets) {\n                if (this.plane.isCollidedWith(b)) {\n                    this._gameEnd();\n                }\n            }\n        }\n    }\n\n    handlePlayerControl () {\n        super.handlePlayerControl();\n        const plane = this.plane;\n        if (plane) {\n            plane.moveY = 0;\n            plane.moveX = 0;\n        }\n        if (this.gameRunning) {\n            if (this.keyPressed[KEY_UP]) {\n                plane.moveY -= 1;\n            }\n            if (this.keyPressed[KEY_DOWN]) {\n                plane.moveY += 1;\n            }\n            if (this.keyPressed[KEY_LEFT]) {\n                plane.moveX -= 1;\n            }\n            if (this.keyPressed[KEY_RIGHT]) {\n                plane.moveX += 1;\n            }\n        } else {\n            if (this.keyPressed[KEY_UP] || this.keyPressed[KEY_DOWN] ||\n                this.keyPressed[KEY_LEFT] || this.keyPressed[KEY_RIGHT]) {\n                if (this.hasReleased && Date.now() - this.endTime > 700) {\n                    this._gameStart();\n                    this.hasReleased = false;\n                }\n            } else {\n                this.hasReleased = true;\n            }\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://game/./src/mission_game.js?");

/***/ }),

/***/ "./src/physics_game.js":
/*!*****************************!*\
  !*** ./src/physics_game.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ PhysicsGame\n/* harmony export */ });\n/* harmony import */ var _engine_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/game */ \"./engine/game.js\");\n/* harmony import */ var _game_objects_star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_objects/star */ \"./src/game_objects/star.js\");\n/* harmony import */ var _game_objects_bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_objects/bullet */ \"./src/game_objects/bullet.js\");\n/* harmony import */ var _game_objects_plane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_objects/plane */ \"./src/game_objects/plane.js\");\n/* harmony import */ var _game_objects_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_objects/box */ \"./src/game_objects/box.js\");\n\n\n\n\n\n\nconst KEY_UP = 38;\nconst KEY_DOWN = 40;\nconst KEY_LEFT = 37;\nconst KEY_RIGHT = 39;\n\nclass PhysicsGame extends _engine_game__WEBPACK_IMPORTED_MODULE_0__.default {\n    constructor(canvasId) {\n        super(canvasId);\n\n        this.enablePhysics();\n        this.setViewportScale(10);\n        this.setViewportPosition(0, 0);\n        this.setupStage();\n        this.tickCount = 0;\n    }\n\n    setupStage () {\n        const width = 64;\n        const height = 48;\n        const bg = new createjs.Shape();\n        bg.graphics.beginFill(\"#111\").drawRect(0, 0, width, height);\n\n        this.stage.addChild(bg);\n\n        for (let i = 0; i < 0; i++) {\n            const box = new _game_objects_box__WEBPACK_IMPORTED_MODULE_4__.default(width, height);\n            this.addChild(box);\n        }\n\n    }\n\n    _centerX (displayObject) {\n        return (this.stage.canvas.width - displayObject.getMeasuredWidth()) / 2;\n    }\n\n    tick () {\n        super.tick();\n        this.tickCount += 1;\n        const width = 64;\n        const height = 48;\n        if ((this.tickCount % 1) === 0 && this.tickCount < 100000) {\n            const box = new _game_objects_box__WEBPACK_IMPORTED_MODULE_4__.default(width, height);\n            this.addChild(box);\n        }\n    }\n\n    handlePlayerControl () {\n        super.handlePlayerControl();\n    }\n}\n\n\n\n//# sourceURL=webpack://game/./src/physics_game.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;