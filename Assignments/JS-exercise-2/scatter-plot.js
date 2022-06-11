let points = [
    { x: 10, y: 80 },
    { x: 70, y: 20 },
    { x: 40, y: 40 },
    { x: 120, y: 20 },
    { x: 100, y: 60 },
];

const scatter_plot = document.querySelector("#scatter-plot");

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.create();
    }

    create(){
        this.element = document.createElement('div');
        this.element.style.width = "15px";
        this.element.style.height = "15px";
        this.element.style.borderRadius = "50%";
        this.element.style.backgroundColor = "#47B5FF";
        this.element.style.position = "absolute";
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;

        scatter_plot.appendChild(this.element);

        this.element.addEventListener('click', function(){
            scatter_plot.removeChild(this);
        });
    }
}

points.forEach((value)=>{
    new Dot(value.x, value.y);
});