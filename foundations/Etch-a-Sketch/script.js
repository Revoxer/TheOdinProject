const container = document.querySelector(".container");

function getGrid(number) {
  container.innerHTML = "";
  let userChoice = prompt("Choose number of squares in side:");
  let selectedNumber;
  if (Number.isFinite(+userChoice)) {
    selectedNumber = Number(userChoice);
  } else {
    selectedNumber = 16;
  }

  if (selectedNumber > 100) {
    selectedNumber = 100;
  }

  const gridNumber = selectedNumber * selectedNumber + 1;
  const squareSize = 100 / selectedNumber;

  for (let i = 1; i < gridNumber; i++) {
    const div = document.createElement("div");
    div.style.width = squareSize + "%";
    div.style.height = squareSize + "%";
    container.appendChild(div);
  }

  function getRandomRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b})`;
  }

  container.addEventListener("mouseover", (e) => {
    e.target.style.background = getRandomRgb();
  });
}
