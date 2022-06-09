const ball_container = document.querySelector("#ball-bounce");
let container_width = 500;


class Ball {
    constructor(x, y) {
        this.ball_width = 50;
        this.ball_pos_x = x;
        this.ball_pos_y = y;
        this.create();
    }

    create() {
        this.ball = document.createElement('div');
        this.ball.style.width = `${this.ball_width}px`;
        this.ball.style.height = `${this.ball_width}px`;
        this.ball.style.borderRadius = "50%";
        this.ball.style.backgroundColor = "#47B5FF";
        this.ball.style.position = "absolute";
        this.ball.style.left = `${this.ball_pos_x}px`;
        this.ball.style.top = `${this.ball_pos_y}px`;

        ball_container.appendChild(this.ball);

        this.change_factor_x = 2;
        this.change_factor_y = 2;

        this.ball_interval_id = setInterval(function () {
            if (this.ball_pos_y < 0 || this.ball_pos_y > (container_width - this.ball_width))
                this.change_factor_y = -this.change_factor_y;
            if (this.ball_pos_x < 0 || this.ball_pos_x > (container_width - this.ball_width))
                this.change_factor_x = -this.change_factor_x;

            this.ball_pos_y += this.change_factor_y;
            this.ball.style.top = `${this.ball_pos_y}px`;
            this.ball_pos_x += this.change_factor_x;
            this.ball.style.left = `${this.ball_pos_x}px`;
        }.bind(this), 1000 / 60);

        this.ball.addEventListener('click', function () {
            clearInterval(this.ball_interval_id);
            ball_container.removeChild(this.ball);
        }.bind(this));
    }
}

ball_container.style.width = `${container_width}px`;
ball_container.style.height = `${container_width}px`;
new Ball(100, 10);
