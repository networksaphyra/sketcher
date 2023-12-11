const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;
const PIXEL_GRID_SIZE = 700;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setGridSize() {
  grid.style.height = `${PIXEL_GRID_SIZE}px`;
  grid.style.width = `${PIXEL_GRID_SIZE}px`;
}

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
  reloadGrid();
}

function getCellSize() {
  return PIXEL_GRID_SIZE / currentSize;
}

function createCell(CELL_SIZE) {
  let div = document.createElement("div");

  div.classList.add("grid-cell");
  div.style.width = `${CELL_SIZE}px`;
  div.style.height = `${CELL_SIZE}px`;

  div.addEventListener("mouseover", () => changeCellColor(div));
  
  return div;
}

function createCellRow(cells) {
  let cellRow = document.createElement("div");
  cells.forEach(element => cellRow.appendChild(element));
  
  cellRow.style.display = "flex";
  cellRow.style.flexDirection = "row";

  return cellRow 
}

function changeCellColor(cell) {
  if (!mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);

    cell.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    cell.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser"){
    cell.style.backgroundColor = "#fefefe";
  } else {
    const dimAmount = 30;
    let [r, g, b] = cell.style.backgroundColor.match(/\d+/g);

    r = Math.max(0, parseInt(r, 10) - dimAmount);
    g = Math.max(0, parseInt(g, 10) - dimAmount);
    b = Math.max(0, parseInt(b, 10) - dimAmount);

    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}


function setupGrid() {
  const CELL_SIZE = getCellSize();

  for (let i=0; i<currentSize; ++i) {
    let cells = [];

    for (let j=0; j<currentSize; ++j) {
      cells.push(createCell(CELL_SIZE));
    }

    grid.appendChild(createCellRow(cells));
  }
}

function clearGrid() {
  grid.innerHTML = "";
}

function reloadGrid() {
  clearGrid();
  setupGrid();
}

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

const colorPicker = document.getElementById('colorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const toggleRainbow = document.getElementById("toggleRainbow");
const toggleColor = document.getElementById("toggleColor");
const toggleShader = document.getElementById("toggleShader");
const toggleEraser = document.getElementById("toggleEraser");
const clearButton = document.getElementById("clearButton");
const grid = document.getElementById("grid");

colorPicker.oninput = () => setCurrentColor(colorPicker.value);
sizeSlider.oninput = () => setCurrentSize(sizeSlider.value);
toggleRainbow.onclick = () => setCurrentMode("rainbow");
toggleColor.onclick = () => setCurrentMode("color");
toggleShader.onclick = () => setCurrentMode("shader");
toggleEraser.onclick = () => setCurrentMode("eraser");
clearButton.onclick = () => reloadGrid();

setGridSize();
setupGrid();

