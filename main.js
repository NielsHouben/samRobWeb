import Car from "./scripts/car.js";

import { drawDefaultMap, drawMap } from "./scripts/map.js";
import generate from "./scripts/generate.js";
import { getMapCost, calculatePath } from "./scripts/navigate.js";
import { sendMsg } from "./scripts/mqtt.js";

setTimeout(() => {
  // sendMsg("World", "he")
  sendMsg("/newRoad", JSON.stringify({ x: 0, y: 0, connections: "0110" }))
  sendMsg("/car0", JSON.stringify({ x: 1, y: 1, rotation: 90 }))
  sendMsg("/car1", JSON.stringify({ x: 0, y: 1, rotation: 180 }))
}, 2000);
// should probably make something that requires map to be generated for things to happen
generate();

window.mapConnections = [
  [undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined],
];
// window.mapConnections = [
//   ["0110", "0101", "0111", "0111", "0101", "0011"],
//   ["1100", "0011", "1100", "1111", "0011", "1010"],
//   ["0110", "1101", "0101", "1101", "1101", "1001"],
// ];

// drawMap(window.mapConnections)
// drawDefaultMap();
// drawRoad(0, 0, "0110");

let car0 = new Car(2, 2, 0, 0);
window.car0 = car0;

let car1 = new Car(0, 0, 0, 1);
window.car1 = car1;
// car0.x = 1
// car0.y = 1
// car0.draw()
// car0.move(1)


// let path = calculatePath(car0, 5, 2);
// console.log(path);

// thius sh
