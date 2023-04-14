const mapWidthRef = document.getElementById("width");
const mapHeightRef = document.getElementById("height");
const setupInput = document.getElementById("setup-input");
const mapRef = document.getElementById("map");


// test with lonely road too!
let map = [
  [0, 1, 0, 0], 1, 0, 0,
  0, 0, 1, 0, 0,
  0, 1, 1, 1, 1,
  1, 1, 0, 0, 1,
  1, 0, 0, 0, 1,
];

function getItem (x, y) {
  return document.querySelector(`#map > div:nth-child(${x + mapWidthRef.value * y + 1})`);
}

function generate () {
  width = mapWidthRef.value;
  height = mapHeightRef.value;

  for (let i = 0; i < width * height; i++) {
    // gridItem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    mapRef.appendChild(gridItem);
  }

  mapRef.style.gridTemplateColumns = "1fr ".repeat(width);

  setupInput.style.display = "none";
}

function drawRoad (x, y, connections) {
  // turn

  pos = getItem(x, y);
  road = document.createElement("img");

  // // road.style.transform = "rotate(180deg)";

  rotation = {
    "1100": 90, "0110": 180, "0011": 270,
    "1110": 90, "0111": 180, "1011": 270,
    "1010": 90,

  };

  // Undefined because they shouldn't be possible! ['0000', '0001', '0010', '0100', '1000']
  piece = {
    "1100": "turn", "0110": "turn", "0011": "turn", "1001": "turn",
    "1110": "T", "0111": "T", "1011": "T", "1101": "T",
    "1010": "straight", "0101": "straight",
    "1111": "intersect",
  };


  road.style.transform = `rotate(${rotation[connections]}deg)`;
  road.setAttribute("src", `./public/roads/${piece[connections]}.svg`);

  pos.appendChild(road);



}

function drawMap () {
  drawRoad(0, 0, "0110");
  drawRoad(1, 0, "0101");
  drawRoad(2, 0, "0111");
  drawRoad(3, 0, "0111");
  drawRoad(4, 0, "0101");
  drawRoad(5, 0, "0011");

  drawRoad(0, 1, "1100");
  drawRoad(1, 1, "0011");
  drawRoad(2, 1, "1100");
  drawRoad(3, 1, "1111");
  drawRoad(4, 1, "0011");
  drawRoad(5, 1, "1010");


  drawRoad(0, 2, "0110");
  drawRoad(1, 2, "1101");
  drawRoad(2, 2, "0101");
  drawRoad(3, 2, "1101");
  drawRoad(4, 2, "1101");
  drawRoad(5, 2, "1001");
  // drawRoad(5, 2, "1000");



  // draw car
  // facing = 0;
  // getItem(1, 1).style.borderTop = "5px solid green";
}


generate();

drawMap();