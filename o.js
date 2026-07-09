const basket = document.getElementById("basket");
const scoreBoard = document.getElementById("scoreBoard");
const message = document.getElementById("message");

let score = 0;
let gameOver = false;
let basketLeft = 200; // track basket position

// Keyboard controls (laptop)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveBasket(-30);
  if (e.key === "ArrowRight") moveBasket(30);
});

// Swipe controls (phone)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = touchEndX - touchStartX;
  if (Math.abs(diff) > 50) { // threshold
    if (diff < 0) {
      moveBasket(-50); // swipe left
    } else {
      moveBasket(50); // swipe right
    }
  }
}

function moveBasket(offset) {
  if (gameOver) return;

  basketLeft += offset;

  // keep basket inside screen
  if (basketLeft < 0) basketLeft = 0;
  if (basketLeft > window.innerWidth - basket.offsetWidth) {
    basketLeft = window.innerWidth - basket.offsetWidth;
  }

  basket.style.left = basketLeft + "px";
}

// Create falling emoji
function createEmoji() {
  if (gameOver) return;

  const emoji = document.createElement("div");
  const emojis = ["💖","🍕","🎉","🌸","✨","💣"];
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.className = "emoji";
  emoji.style.left = Math.random() * (window.innerWidth - 30) + "px";
  emoji.style.top = "0px";
  document.getElementById("gameArea").appendChild(emoji);

  let fallInterval = setInterval(() => {
    let currentTop = parseInt(emoji.style.top.replace("px",""));
    emoji.style.top = currentTop + 5 + "px";

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
        score--;
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
