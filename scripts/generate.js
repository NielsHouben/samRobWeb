// only now that we temporarily draw a default map

const mapWidthRef = document.getElementById("width");
const mapHeightRef = document.getElementById("height");
const setupInput = document.getElementById("setup-input");
const mapRef = document.getElementById("map");

export default function generate () {
    let width = parseInt(mapWidthRef.value);
    let height = parseInt(mapHeightRef.value);

    for (let i = 0; i < width * height; i++) {
        // gridItem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        mapRef.appendChild(gridItem);
    }

    mapRef.style.gridTemplateColumns = "1fr ".repeat(width);

    setupInput.style.display = "none";
}
window.generate = generate;
