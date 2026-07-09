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

  let currentLeft = parseInt(basket.style.left.replace("px","")) || 200;
  let newLeft = currentLeft + offset;

  // keep basket inside screen
  if (newLeft < 0) newLeft = 0;
  if (newLeft > window.innerWidth - basket.offsetWidth) {
    newLeft = window.innerWidth - basket.offsetWidth;
  }

  basket.style.left = newLeft + "px";
}



// Create falling emoji
function createEmoji() {
  if (gameOver) return;

  const emoji = document.createElement("div");
  const emojis = ["💖","🍕","🎉","🌸","✨","💣"]; // bomb included
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.className = "emoji";
  emoji.style.position = "absolute";   // ✅ ensure absolute positioning
  emoji.style.left = Math.random() * (window.innerWidth - 30) + "px";
  emoji.style.top = "0px";             // ✅ start at top
  gameArea.appendChild(emoji);

  let fallInterval = setInterval(() => {
    let currentTop = parseInt(emoji.style.top.replace("px",""));
    emoji.style.top = currentTop + 5 + "px"; // ✅ move down

    const basketRect = basket.getBoundingClientRect();
    const emojiRect = emoji.getBoundingClientRect();

    // collision detection
    if (
      emojiRect.bottom >= basketRect.top &&
      emojiRect.left >= basketRect.left &&
      emojiRect.right <= basketRect.right
    ) {
      if (emoji.textContent === "💣") {
        endGame();
      } else {
        score++;
        scoreBoard.textContent = "Score: " + score;
      }
      emoji.remove();
      clearInterval(fallInterval);
    }

    // missed emoji
    if (currentTop > window.innerHeight) {
      if (emoji.textContent !== "💣") {
        score--; // deduct if missed
        if (score < 0) score = 0;
        scoreBoard.textContent = "Score: " + score;
      }
      emoji.remove();
      clearInterval(fallInterval);
    }
  }, 30);
}

// End game
function endGame() {
  gameOver = true;
  message.style.display = "block";
  message.textContent = "💣 Game Over!";
}

// spawn emojis every second
setInterval(createEmoji, 1000);
