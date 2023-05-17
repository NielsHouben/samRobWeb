import Car from "./scripts/car.js";
import { drawRoad } from "./scripts/map.js";
import { drawDefaultMap } from "./scripts/map.js";
import generate from "./scripts/generate.js";
import { getMapCost, calculatePath } from "./scripts/navigate.js";

import Paho from "paho-mqtt";

// console.log(new Paho.Client);

const client = new Paho.Client("10.22.3.219", 8883, "clientIdWeb");
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({ onSuccess: onConnect });

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
  let message = new Paho.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
}

// should probably make something that requires map to be generated for things to happen
generate();

drawDefaultMap();

let car0 = new Car(0, 0, 0, 0);

window.car0 = car0;

window.mapConnections = [
  ["0110", "0101", "0111", "0111", "0101", "0011"],
  ["1100", "0011", "1100", "1111", "0011", "1010"],
  ["0110", "1101", "0101", "1101", "1101", "1001"],
];

let path = calculatePath(car0, 5, 2);

console.log(path);

// thius sh
