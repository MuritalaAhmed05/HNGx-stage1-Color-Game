let targetColor = "";
let score = 0;
function generateBaseColor() {
  let hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 50%)`;
}
function generateSimilarColors(baseColor) {
  let hue = parseInt(baseColor.match(/hsl\((\d+)/)[1]);
  let colors = [];
  for (let i = 0; i < 6; i++) {
    let saturation = 65 + Math.random() * 10;
    let lightness = 45 + Math.random() * 10;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}
function restartGame() {
  score = 0;
  document.getElementById("score").innerHTML = score;
  let baseColor = generateBaseColor();
  let options = generateSimilarColors(baseColor);
  let targetIndex = Math.floor(Math.random() * 6);
  targetColor = options[targetIndex];
  const targetElement = document.getElementById("targetColor");
  const scoreElement = document.querySelector("#score");
  const scoreContainer = document.querySelector(".score-container");
  const restartGameBtn = document.querySelector(".restart-game-btn");
  targetElement.style.opacity = "0";
  scoreContainer.style.color = targetColor;
  scoreElement.style.backgroundColor = targetColor;
  restartGameBtn.style.backgroundColor = targetColor;
  setTimeout(() => {
    targetElement.style.backgroundColor = targetColor;
    targetElement.style.opacity = "1";
  }, 200);
  document.getElementById("gameStatus").textContent = "";
  renderColorOptions(options);
}
function startNewGame() {
  let baseColor = generateBaseColor();
  let options = generateSimilarColors(baseColor);
  let targetIndex = Math.floor(Math.random() * 6);
  targetColor = options[targetIndex];
  const targetElement = document.getElementById("targetColor");
  const score = document.querySelector("#score");
  const scoreContainer = document.querySelector(".score-container");
  const newGameButton = document.querySelector(".restart-game-btn");
  targetElement.style.opacity = "0";
  setTimeout(() => {
    targetElement.style.backgroundColor = targetColor;
    scoreContainer.style.color = targetColor;
    score.style.backgroundColor = targetColor;
    newGameButton.style.backgroundColor = targetColor;
    targetElement.style.opacity = "1";
  }, 200);
  document.getElementById("gameStatus").textContent = "";
  renderColorOptions(options);
}
function renderColorOptions(options) {
  let container = document.getElementById("colorsContainer");
  container.innerHTML = "";
  options.forEach((color, index) => {
    let btn = document.createElement("div");
    btn.classList.add("color-option");
    btn.style.backgroundColor = color;
    btn.style.animationDelay = `${index * 0.1}s`;
    btn.onclick = () => handleColorSelect(color, btn);
    container.appendChild(btn);
  });
}
function handleColorSelect(selectedColor, element) {
  if (selectedColor === targetColor) {
    score++;
    element.classList.add("correct");
    document.getElementById("gameStatus").textContent = "Correct! Well done!";
    document.getElementById("gameStatus").style.color = "#059669";
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
    scoreElement.style.transform = "scale(1.2)";
    setTimeout(() => (scoreElement.style.transform = "scale(1)"), 300);
    setTimeout(startNewGame, 1000);
  } else {
    element.classList.add("wrong");
    document.getElementById("gameStatus").textContent = "Wrong! Try again!";
    document.getElementById("gameStatus").style.color = "#dc2626";
    setTimeout(() => element.classList.remove("wrong"), 400);
  }
}
startNewGame();
