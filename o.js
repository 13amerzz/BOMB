const basket = document.getElementById("basket");
const gameArea = document.getElementById("gameArea");
const scoreBoard = document.getElementById("scoreBoard");
const message = document.getElementById("message");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let score = 0;
let gameOver = false;

// Move basket
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveBasket(-30);
  if (e.key === "ArrowRight") moveBasket(30);
});
leftBtn.addEventListener("click", () => moveBasket(-30));
rightBtn.addEventListener("click", () => moveBasket(30));

function moveBasket(offset) {
  if (gameOver) return;
  const basketRect = basket.getBoundingClientRect();
  if (offset < 0 && basketRect.left > 0) {
    basket.style.left = basket.offsetLeft + offset + "px";
  }
  if (offset > 0 && basketRect.right < window.innerWidth) {
    basket.style.left = basket.offsetLeft + offset + "px";
  }
}

// Create falling emoji
function createEmoji() {
  if (gameOver) return;

  const emoji = document.createElement("div");
  const emojis = ["💖","🍕","🎉","🌸","✨","💣"]; // bomb included
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.className = "emoji";
  emoji.style.left = Math.random() * (window.innerWidth - 30) + "px";
  gameArea.appendChild(emoji);

  let fallInterval = setInterval(() => {
    emoji.style.top = emoji.offsetTop + 5 + "px";

    const basketRect = basket.getBoundingClient
