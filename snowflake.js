class SnowFlake {

    // Optionnal parameters, random if not set
    constructor(sx, sy) {
        // position
        let x = sx || random(0, width);
        let y = sy || random(-100, -10);
        this.pos = createVector(x, y);
        // velocity
        this.vel = createVector(0, 0);
        // acceleration
        this.acc = createVector();
        // random property for snowflake size
        this.r = getRandomSize();
        this.offset = 0;
        this.angle = random(TWO_PI);
        this.dir = (random(1) > 0.5) ? 1 : -1;
    }

    render() {
        push();
        translate(this.pos.x + this.offset, this.pos.y);
        // white color
        stroke(255);
        strokeWeight(this.r);
        point(0, 0);
        pop();
    }

    applyForce(force) {
        // Parallax Effect hack
        let f = force.copy();
        f.mult(this.r);

        // let f = force.copy();
        // f.div(this.mass);
        this.acc.add(f);
    }

    update() {

        this.offset = sin(this.angle) * this.r * 7;

        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.3);

        if (this.vel.mag() < 1) {
            this.vel.normalize();
        }

        this.pos.add(this.vel);
        this.acc.mult(0);

        this.angle += this.vel.mag() / 100;

        if (this.pos.x < 0) {
            this.pos.x += width;
        }

        if (this.pos.x > width) {
            this.pos.x -= width;
        }

    }

    offScreenBottom() {
        return (this.pos.y > height);
    }

    offScreenRight() {
        return (this.pos.x > width);
    }

    offScreenLeft() {
        return (this.pos.x < 0);
    }
}

function getRandomSize() {
    let r = randomGaussian() * 4;
    return constrain(abs(r), 2, 8);
}
