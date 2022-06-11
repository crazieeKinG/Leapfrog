const CONTAINER_WIDTH = 1440;
const CONTAINER_HEIGHT = 900;
const COLORS = ["red", "blue", "green", "yellow", "brown", "orange", "white", "purple"];

function to_pixel(value) {
    return `${value}px`;
}

function to_rad(degree) {
    return degree * (Math.PI / 180);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function distance(p, b) {
    return parseInt(Math.sqrt(Math.pow(p, 2) + Math.pow(b, 2)));
}


const container = document.getElementById("boundary");
container.style.width = to_pixel(CONTAINER_WIDTH);
container.style.height = to_pixel(CONTAINER_HEIGHT);
container.style.backgroundColor = "black";

class Circle {
    constructor(x, y, radius, velocityX, velocityY, color, mass) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.radius = radius;
        this.speedX = velocityX;
        this.speedY = velocityY;
        this.color = color;

        this.create();
    }

    create() {
        this.element = document.createElement('div');
        this.element.style.width = to_pixel(this.radius * 2);
        this.element.style.height = to_pixel(this.radius * 2);
        this.element.style.borderRadius = "50%";
        this.element.style.border = "2px solid";
        this.element.style.borderColor = this.color;
        this.element.style.position = "absolute";
        this.element.style.top = to_pixel(this.y);
        this.element.style.left = to_pixel(this.x);
        this.element.style.transform = "translate(-50%, -50%)";

        container.appendChild(this.element);
    }

    move() {
        this.element.style.top = to_pixel(this.y);
        this.element.style.left = to_pixel(this.x);
    }

    check_border_collision() {
        if (this.x - this.radius < 0) this.speedX = Math.abs(this.speedX + 1);
        else if (this.x > CONTAINER_WIDTH - this.radius) this.speedX = -Math.abs(this.speedX + 1);
        if (this.y - this.radius < 0) this.speedY = Math.abs(this.speedY + 1);
        else if (this.y > CONTAINER_HEIGHT - this.radius) this.speedY = -Math.abs(this.speedY + 1);
    }

    update = (balls) => {
        this.move();

        balls.forEach(single_ball => {
            if (this === single_ball) return;

            let distance_x = single_ball.x - this.x;
            let distance_y = single_ball.y - this.y;

            let distance_between = distance(distance_x, distance_y);

            let overlap_detction = ((this.speedX - single_ball.speedX) * distance_x + (this.speedY - single_ball.speedY) * distance_y) >= 0

            if (distance_between <= (this.radius + single_ball.radius) && overlap_detction) {
                let angle = -Math.atan2(distance_y, distance_x);

                let cos_value = Math.cos(angle);
                let sin_value = Math.sin(angle);

                this.speedX = this.speedX * cos_value - this.speedY * sin_value;
                this.speedY = this.speedX * sin_value + this.speedY * cos_value;

                let mass_difference = this.mass - single_ball.mass;
                if (this.mass >= single_ball.mass) {
                    mass_difference = -mass_difference
                }

                let vx1 = (this.speedX * mass_difference + single_ball.speedX * 2 * single_ball.mass) / (this.mass + single_ball.mass);
                let vy1 = this.speedY;
                // let vy1 = (this.speedY + (this.speedY * mass_difference + single_ball.speedY * 2 * single_ball.mass) / (this.mass + single_ball.mass)) / 2;

                let vx2 = (single_ball.speedX * mass_difference + this.speedX * 2 * this.mass) / (this.mass + single_ball.mass);
                let vy2 = single_ball.speedY;
                // let vy2 = (single_ball.speedY + (single_ball.speedY * mass_difference + this.speedY * 2 * this.mass) / (this.mass + single_ball.mass)) / 2;

                cos_value = Math.cos(-angle);
                sin_value = Math.sin(-angle);

                this.speedX = vx1 * cos_value - vy1 * sin_value;
                this.speedY = vx1 * sin_value + vy1 * cos_value;

                single_ball.speedX = vx2 * cos_value - vy2 * sin_value;
                single_ball.speedY = vx2 * sin_value + vy2 * cos_value;
            }
        });

        this.check_border_collision();

        this.x += this.speedX;
        this.y += this.speedY;
    }
}


const NUMBER_OF_BALLS = 200;
let ball_array = [];


for (let i = 0; i < NUMBER_OF_BALLS; i++) {
    const radius = getRandomInt(5, 20);
    let x = getRandomInt(radius, (CONTAINER_WIDTH - radius));
    let y = getRandomInt(radius, (CONTAINER_HEIGHT - radius));
    const sX = getRandomInt(-4, 4);
    const sY = getRandomInt(-4, 4);
    const m = radius / 5;
    const color = COLORS[getRandomInt(0, COLORS.length)];

    if (i != 0) {
        for (let j = 0; j < ball_array.length; j++) {
            let dist_x = x - ball_array[j].x;
            let dist_y = y - ball_array[j].y;

            if (distance(dist_x, dist_y) <= (radius + ball_array[j].radius)) {
                x = getRandomInt(radius, (CONTAINER_WIDTH - radius));
                y = getRandomInt(radius, (CONTAINER_HEIGHT - radius));

                j = -1;
            }
        }
    }

    ball_array.push(new Circle(x, y, radius, sX, sY, color, m));
}


function play() {
    window.requestAnimationFrame(play);

    ball_array.forEach((ball) => {
        ball.update(ball_array);
    });

}

play();