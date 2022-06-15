
const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight,
});
let circle, state;

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

function setup() {
    document.body.appendChild(app.view);
    circle = new PIXI.Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, 20);
    circle.endFill();
    circle.x = 100;
    circle.y = 100;
    circle.vx = 0;
    circle.vy = 0;
    app.stage.addChild(circle);

    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");
    //Up
    up.press = () => {
        circle.vy = -5;
        circle.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && circle.vx === 0) {
            circle.vy = 0;
        }
    };
    //Right
    right.press = () => {
        circle.vx = 5;
        circle.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && circle.vy === 0) {
            circle.vx = 0;
        }
    };
    //Left
    left.press = () => {
        circle.vx = -5;
        circle.vy = 0;
    };
    left.release = () => {
        if (!right.isDown && circle.vy === 0) {
            circle.vx = 0;
        }
    };
    //Down
    down.press = () => {
        circle.vy = 5;
        circle.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && circle.vx === 0) {
            circle.vy = 0;
        }
    };

    //Set the game state
    state = play;
    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
    state(delta);
}

function play(delta) {
    circle.x += circle.vx;
    circle.y += circle.vy;
}
