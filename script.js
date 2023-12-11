let container = document.getElementById("container");
let gridCount = 30;
let currentBackgroundColor = "#fff";
let currentGridColor = "#000";
const gridSize = 600;

function setContainerSize() {
  container.style.height = `${gridSize}px`;
  container.style.width = `${gridSize}px`;
}


function setStyleColors() {
  let gridElements = document.getElementsByClassName("grid-elemnt");
  gridElements.forEach(element => {
    element.style.backgroundColor = currentBackgroundColor;
    if (element.style.borderColor != currentGridColor) {
      element.style.borderColor = currentGridColor;
    }
  });
}

function colorGridElement(gridElement, color) {
  gridElement.style.backgroundColor = color;
}


function generateGrid() {
  let width = gridSize / gridCount; 
  let height = gridSize / gridCount;

  for (let i=0; i<gridCount; ++i) {
    let currentDivs = [];
    for (let j=0; j<gridCount; ++j) {
      div = document.createElement("div");
      div.classList.add("grid-element");
      div.style.width = `${width}px`;
      div.style.height = `${height}px`;
      div.addEventListener("click", colorGridElement(div, currentBackgroundColor));
      currentDivs.push(div);
    }
    let divContainer = document.createElement("div");
    currentDivs.forEach(div => {
      divContainer.appendChild(div);
    });
    divContainer.style.display = "flex";
    divContainer.style.flexDirection = "row";
    container.appendChild(divContainer);
  }
  container.style.height = gridSize;
  container.style.width = gridSize;
}

function hideGridlines() {
  let gridElements = document.getElementsByClassName("grid-element");
  gridElements.forEach(element => {
    element.style.border = "none";
    });
}

setContainerSize();
generateGrid();

