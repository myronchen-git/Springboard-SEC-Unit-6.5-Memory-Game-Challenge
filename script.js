const gameContainer = document.getElementById("game");

const UNIQUE_COLORS = ["red", "blue", "green", "orange", "purple"];
// https://quickref.me/repeat-an-array.html
const COLORS = [].concat(...Array(2).fill(UNIQUE_COLORS));

let card1 = null;
let card2 = null;
let pairsFound = 0;

let score;
let bestScore;

// Here is a helper function to shuffle an array.
// It returns the same array with values shuffled.
// It is based on an algorithm called Fisher Yates, if you want to research more.
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// This function loops over the array of colors.
// It creates a new div and gives it a class with the value of the color.
// It also adds an event listener for a click for each card.
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // Create a new div
    const newDiv = document.createElement("div");

    // Give it a class attribute for the value we are looping over
    newDiv.setAttribute("color", color);

    // Call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // Append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  const t = event.target;
  // You can use event.target to see which element was clicked
  console.log("You just clicked", t);

  // If card1 is not set, then just set card1.  If card1 is set, then set card2, wait, and check if card1 matches card2.
  // Lastly, check if the game is over.
  if (!t.classList.contains("revealed") && card2 === null) {
    t.classList.add("revealed");
    t.style.backgroundColor = t.getAttribute("color");
    setScore(++score);

    if (card1 === null) {
      card1 = t;
    } else {
      card2 = t;

      setTimeout(() => {
        compareCards();

        card1 = null;
        card2 = null;

        checkWin();
      }, 1000);
    }
  }
}

// If cards match, then leave them face up and increment the number of matching pairs found, else return them face down.
function compareCards() {
  if (card1.getAttribute("color") === card2.getAttribute("color")) {
    pairsFound++;
  } else {
    for (let card of [card1, card2]) {
      card.style.backgroundColor = "";
      card.classList.remove("revealed");
    }
  }
}

function checkWin() {
  if (pairsFound >= UNIQUE_COLORS.length) {
    alert("WIN");
    storeBestScore();
    gameContainer.append(createRestartButton());
  }
}

function setScore(newScore) {
  document.getElementById("score").innerText = newScore;
}

function storeBestScore() {
  if (bestScore === null || score < bestScore)
    localStorage.setItem("lowestScore", score);
}

function displayBestScore() {
  bestScore = localStorage.getItem("lowestScore");
  document.getElementById("bestScore").innerText = bestScore;
}

function startGame() {
  pairsFound = 0;
  score = 0;
  setScore(score);
  displayBestScore();

  gameContainer.innerHTML = "";
  createDivsForColors(shuffle(COLORS));
}

function createRestartButton() {
  const b = document.createElement("button");
  b.type = "button";
  b.innerText = "Restart";
  b.addEventListener("click", startGame);
  return b;
}

document.getElementById("startButton").addEventListener("click", startGame);
