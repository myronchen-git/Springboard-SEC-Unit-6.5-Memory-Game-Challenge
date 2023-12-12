const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

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

let shuffledColors = shuffle(COLORS);

// This function loops over the array of colors.
// It creates a new div and gives it a class with the value of the color.
// It also adds an event listener for a click for each card.
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // Create a new div
    const newDiv = document.createElement("div");

    // Give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // Call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // Append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // You can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// When the DOM loads
createDivsForColors(shuffledColors);
