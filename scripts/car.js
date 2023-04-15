console.log("car module loaded");
const mapHolderRef = document.getElementById("mapHolder");

function createCarElem (x, y, facing, id) {
    let car = document.createElement("img");
    car.className = "car";
    car.id = `car${id}`;

    let carImgs = ["simple-travel-car-top_view", "SimpleDarkBlueCarTopView"];
    let carImg = carImgs[id];
    car.setAttribute("src", `./public/cars/${carImg}.svg`);

    mapHolderRef.appendChild(car);

    return car;
}

function carClicked () {
    console.log("CAR CLICKED!!");
}

export default class Car {
    constructor(x, y, facing, id) {
        this.id = id;
        this.facing = facing;
        this.x = x;
        this.y = y;

        this.elRef = createCarElem(x, y, facing, id);
        this.draw();

        this.elRef.addEventListener('click', carClicked);

        console.log("constructed car!");
    }

    draw () {
        let x = this.x * 100;
        let y = this.y * 100;
        let rotation = 90 * this.facing - 90;
        this.elRef.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    }

    /**
     * @param {int} direction 0=north, 1=east, 2=south, 3=west
     */
    move (direction) {
        let x = { 0: 0, 1: 1, 2: 0, 3: -1 }[direction];
        let y = { 0: -1, 1: 0, 2: 1, 3: 0 }[direction];

        this.x += x;
        this.y += y;

        this.draw();
    }

    /**
     * @param {int} facing 0=north, 1=east, 2=south, 3=west
     */
    rotate (facing) {
        this.facing = facing;
        this.draw();
    }


    /** makes car path to absolute coordinates */
    goTo (x, y) {
        console.log(window.mapConnections);

    }


}
