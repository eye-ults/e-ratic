// variables
let rollButton = document.getElementById("button");
var die = document.querySelectorAll(".die");
let coin = new Dice(2);
let d4 = new Dice(4);
let d6 = new Dice(6);
let d8 = new Dice(8);
let d10 = new Dice(10);
let d12 = new Dice(12);
let d20 = new Dice(20);

// Sound function 3.0
const play = (topNumber, currentNumber) => {
  if (currentNumber === topNumber) {
    let audio = document.getElementById("victory");
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
  } else if (currentNumber > 1 ) {
    let audio = document.getElementById("shake");
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
  } else {
    let audio = document.getElementById("sad");
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
  } 
};

function printNumber(number) {
  var placeholders = document.getElementsByClassName("placeholder");
  for (var i = 0; i < placeholders.length; i++) {
    placeholders[i].textContent = number;
  }
}

// Event listener for dice images
document.querySelectorAll('.roll').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove the "shake" class from each die to stop any previous animations
    die.forEach(function(die) {
      die.classList.remove("shake");
    });
    
    // Trigger a reflow for each die to restart the animation
    die.forEach(function(die) {
      void die.offsetWidth;
    });
  
    // Add the "shake" class to each die to start the animation
    die.forEach(function(die) {
      die.classList.add("shake");
    });

    // Get the dice type from the "data-dice" attribute of the clicked image
    let diceToRoll = e.target.getAttribute("data-dice");
    let dice;
    switch (diceToRoll) {
      case "coin":
        dice = coin;
        break;
      case "d4":
        dice = d4;
        break;
      case "d6":
        dice = d6;
        break;
      case "d8":
        dice = d8;
        break;
      case "d10":
        dice = d10;
        break;
      case "d12":
        dice = d12;
        break;
      case "d20":
        dice = d20;
        break;
      default:
        dice = d20; // default to rolling a 20-sided dice
    }

    // Roll the dice and display the result
    let result = dice.rollResult();
    printNumber(result);

    // Play the sound effect
    play(dice.sides, result);
  })
}, false);

//Dice constructor function creates instance objects of new dice!
function Dice(sides) {
  this.sides = sides;
  this.rollResult = function()  {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  };
}





