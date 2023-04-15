import Car from "./scripts/car.js";
import { drawRoad } from './scripts/map.js';
import { drawDefaultMap } from './scripts/map.js';
import generate from './scripts/generate.js';

// should probably make something that requires map to be generated for things to happen
generate();

drawDefaultMap();



let car0 = new Car(0, 0, 0, 0);
window.car0 = car0;


window.mapConnections = [
  "0110", "0101", "0111", "0111", "0101", "0011",
  "1100", "0011", "1100", "1111", "0011", "1010",
  "0110", "1101", "0101", "1101", "1101", "1001",
];




// find a path to x, y, coordinates
// split path up into instructions
function pathCar (x, y, id) {

}



