const mapWidthRef = document.getElementById("width");
const mapHeightRef = document.getElementById("height");

let width = parseInt(mapWidthRef.value);
let height = parseInt(mapHeightRef.value);

function onMap (x, y) {
    if (x < 0) return false;
    if (y < 0) return false;
    if (x > width - 1) return false;
    if (y > height - 1) return false;

    return true;
}

/** get the shortest distance to each node */
export function getMapCost (startX, startY) {
    let mapCost = [];
    for (let i = 0; i < height; i++) {
        mapCost.push(Array(width));
    }
    window.mapCost = mapCost;
    // let mapChecked = Array(height).fill(Array(width))

    //for start at (0,0)
    mapCost[startY][startX] = 0;
    let unchecked = [[startX, startY]];


    function cheaper (x, y, newCost) {
        // cheaper?
        if (mapCost[y] && (mapCost[y][x] || mapCost[y][x] === 0) && mapCost[y][x] <= newCost) {
            return false;
        }

        return true;
    }

    // let cost = 0;
    while (unchecked.length != 0) {
        // cost += 1;
        let current = unchecked.pop();
        let x = current[0];
        let y = current[1];
        let cost = mapCost[y][x] + 1;

        // TODO make sure that connections exist
        let connections = window.mapConnections[y][x];

        if (connections[0] == 1 && onMap(x, y - 1) && cheaper(x, y - 1, cost)) {
            mapCost[y - 1][x] = cost;
            unchecked.push([x, y - 1]);
        }
        if (connections[1] == 1 && onMap(x + 1, y) && cheaper(x + 1, y, cost)) {
            mapCost[y][x + 1] = cost;
            unchecked.push([x + 1, y]);
        }
        if (connections[2] == 1 && onMap(x, y + 1) && cheaper(x, y + 1, cost)) {
            mapCost[y + 1][x] = cost;
            unchecked.push([x, y + 1]);
        }
        if (connections[3] == 1 && onMap(x - 1, y) && cheaper(x - 1, y, cost)) {
            mapCost[y][x - 1] = cost;
            unchecked.push([x - 1, y]);
        }
    }

    return mapCost;
}

/** 
 * get the node series leading to x, y 
 * TODO, make it priorotise less turns
*/
export function calculatePath (car, x, y) {
    mapCost = getMapCost(Math.round(car.x), Math.round(car.y));
    console.log(mapCost);

    let cost = mapCost[y][x];

    let newLocation;
    let locations = [[x, y]];


    //something like while newlocation != start lcoation
    //add new location to list each iteration

    // console.log(cost);

    let i = 0;
    while (x != Math.round(car.x) || y != Math.round(car.y)) {

        let connections = window.mapConnections[y][x];
        if (connections[0] == 1 && onMap(x, y - 1) && mapCost[y - 1][x] == cost - 1) {
            newLocation = [x, y - 1];
        }
        if (connections[1] == 1 && onMap(x + 1, y) && mapCost[y][x + 1] == cost - 1) {
            newLocation = [x + 1, y];
        }
        if (connections[2] == 1 && onMap(x, y + 1) && mapCost[y + 1][x] == cost - 1) {
            newLocation = [x, y + 1];
        }
        if (connections[3] == 1 && onMap(x - 1, y) && mapCost[y][x - 1] == cost - 1) {
            newLocation = [x - 1, y];
        }
        x = newLocation[0];
        y = newLocation[1];
        cost = mapCost[y][x];

        locations.push(newLocation);

        i++;
        if (i == 20) { console.log("i fukced up!"); break; };
    }

    return locations.reverse();
}

window.calculatePath = calculatePath