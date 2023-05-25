import Paho from "paho-mqtt";
import { drawMap, drawRoad } from "./map.js";

// console.log(new Paho.Client);

const client = new Paho.Client("10.22.4.31", 8883, "clientIdWeb");
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({ onSuccess: onConnect });


export function sendMsg (topic, msg) {
    let message = new Paho.Message(msg);
    message.destinationName = topic;
    client.send(message);
}

// called when the client connects
function onConnect () {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("World");
    client.subscribe("/newRoad");
    client.subscribe("/car0");
    client.subscribe("/car1");

    // let message = new Paho.Message("Hello");
    // message.destinationName = "World";
    // client.send(message);
    // sendMsg("Hello", "World")
}

// called when the client loses its connection
function onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived (message) {
    // console.log("onMessageArrived:" + message.payloadString);
    // console.log(message.topic)
    let payload
    switch (message.topic) {
        case "/newRoad":
            payload = JSON.parse(message.payloadString);
            window.mapConnections[payload.y][payload.x] = payload.connections
            // drawMap(window.mapConnections)
            sendMsg("/map", JSON.parse(window.mapConnections))
            drawRoad(payload.x, payload.y, payload.connections)
            break;
        case "/car0":
            payload = JSON.parse(message.payloadString);
            window.car0.x = payload.x
            window.car0.y = payload.y
            window.car0.facing = payload.rotation
            window.car0.draw()
            // drawRoad(payload.x, payload.y, payload.connections)
            break;
        case "/car1":
            payload = JSON.parse(message.payloadString);
            window.car1.x = payload.x
            window.car1.y = payload.y
            window.car1.facing = payload.rotation
            window.car1.draw()
            // drawRoad(payload.x, payload.y, payload.connections)
            break;

        default:
            console.log("got message on topic that is not handled")
            console.log(message.topic)
            break;
    }
}
