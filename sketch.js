let snow= [];
let gravity;
let wind;

function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 0.01);
}

function draw() {
    background(37);

    let wx = map(mouseX, 0, width, -0.01, 0.01);
    wind = createVector(wx, 0);

    snow.push(new SnowFlake());

    for (let flake of snow) {
        flake.applyForce(gravity);
        flake.applyForce(wind);
        flake.update();
        flake.render();
    }

    for (let i = snow.length-1; i>= 0; i--) {
        if (snow[i].offScreenBottom()) {
            snow.splice(i, 1);
        }
    }
}
