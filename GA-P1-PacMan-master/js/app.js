// THESE VALUES CAN BE SET TO ALTER THE GAME
// set how long the hearts work for (ms)
const hearttime = 6000;
// Set how many miliseconds between each time the beavers move
const beaverTimePerMove = 250;
// Defining the beavers paramters.
//---------------------------------------------------------------------
// Used in algorithams to move beavers and pacman
const width = 20;
// Possible moves for beaver
const directions = [-1, -width, 1, width];
// Set starting values:
// pacman position
let pacIndex = 250;
// players points
let scoreNumber = 700;
// scoreTargetpoints
let scoreTarget = 2000;
// The time played
let time = 26;
let time2 = 1;
let time3 = 15;
//let time4 = 28;
let time5 = 120;
let time6 = 120;

// Id to ended the timer
let CountUpid;
/*let CountUp2id;*/
let CountUp3id;
let CountDown2Id;
let CountDownId;
// Ids to stop the beavers from moving
let beaverMoveIdOne;
let beaverMoveIdTwo;
let beaverMoveIdThree;
let beaverMoveIdFour;
let beaverMoveIdFive;
// Id to stop the pac audio sounds
let pacSoundId;
/*// Used to set the games highscore
let highScoreNumber = 0;
// the   time to go along with the high score
let highScoreTime = 0;*/
const winAudio = new Audio("pacman_win.wav");
const death = new Audio("pacman_death.wav");

/*let givenTime = 120000;
let timeLimit;
let clockInterval;
resetClock();
function updateClock() {
  var now = new Date().getTime();
  if (now < timeLimit) {
    //Set the displayed clock to timeLimit-now
  } else {
    //Time has run out
    clearInterval(clockInterval);
  }
}
function resetClock() {
  timeLimit = new Date().getTime() + givenTime;
  clearInterval(clockInterval);
  clockInterval = setInterval(updateClock, 10);
}*/

/*let win = new Audio("pacman_win.wav");
win.loop = false;*/

const beaverOne = {
  //beaver intial starting position
  beaverIndex: 170,
  // beaver class name
  beaverClass: "beaverOne",
  // directions the beaver can move by index after removing walls
  goodDirections: [],
  // The index of those possible moves
  goodPositions: [],
  //storing beaver past moves
  directionStore: [],
  // chosen direction to move beaver (inital start)
  directionMove: -1,
  // chosen Index position to move beaver
  positionMove: null,
  // the last direction used by beaver one.
  lastDirection: 0,
  // Bias determins the way the beavers run 1 towards, 2 awayfrom.
  bias: 1,
};
const beaverTwo = {
  beaverIndex: 169,
  beaverClass: "beaverTwo",
  goodDirections: [],
  goodPositions: [],
  directionStore: [],
  directionMove: -1,
  positionMove: null,
  lastDirection: 0,

  bias: 1,
};
const beaverThree = {
  beaverIndex: 168,
  beaverClass: "beaverThree",
  goodDirections: [],
  goodPositions: [],
  directionStore: [],
  directionMove: -1,
  positionMove: null,
  lastDirection: 0,
  bias: 1,
};
const beaverFour = {
  beaverIndex: 171,
  beaverClass: "beaverFour",
  goodDirections: [],
  goodPositions: [],
  directionStore: [],
  directionMove: -1,
  positionMove: null,
  lastDirection: 0,
  bias: 1,
};
const beaverFive = {
  beaverIndex: 148,
  beaverClass: "beaverFive",
  goodDirections: [],
  goodPositions: [],
  directionStore: [],
  directionMove: -1,
  positionMove: null,
  lastDirection: 0,
  bias: 1,
};
// An array of the 4 beavers
const beavers = [beaverOne, beaverTwo, beaverThree, beaverFour, beaverFive];

// creating the grid and allocating each div a class
// ASSIGN A CLASS A NUMBER.
// empty = 0
// wall = 1
// pacman = 3
// beaver1 = 4
// heart = 5
// Gate = 6
// beaver2 = 7
// beaver3 = 8
// beaver4 = 9
// beaver5 = 9
/* See lines 246 to 289 for the number assignments 
      } else if (layout[i] === 9) {
        gridSquare[i].classList.add("beaverFour");
        beaverFour.beaverIndex = i;
      } else if (layout[i] === 10) {
        gridSquare[i].classList.add("book");
      } else if (layout[i] === 11) {
        gridSquare[i].classList.add("paperdoc");
      } else if (layout[i] === 12) {
        gridSquare[i].classList.add("letter1");
      } else if (layout[i] === 13) {
        gridSquare[i].classList.add("heart1");
      } else if (layout[i] === 14) {
        gridSquare[i].classList.add("heart2");
      } else if (layout[i] === 15) {
        gridSquare[i].classList.add("badge1");
      } else if (layout[i] === 16) {
        gridSquare[i].classList.add("letter2");
      } else if (layout[i] === 17) {
        gridSquare[i].classList.add("letter2");
*/
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  //Next
  1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1,
  //Next
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 2, 1, 2, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 2, 1, 2, 1,
  //Next
  1, 2, 1, 2, 1, 2, 1, 1, 18, 0, 0, 0, 1, 1, 2, 1, 2, 1, 2, 1,
  //Next
  1, 2, 1, 2, 1, 2, 1, 1, 8, 7, 4, 9, 1, 1, 2, 1, 2, 1, 2, 1,
  //Next
  1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  //Next
  1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1,
  //Next
  1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

document.addEventListener("DOMContentLoaded", () => {
  //Below this all code relies on the Dom
  //accssing the grid
  const grid = document.querySelector(".grid");
  //creating all the small squares within the grid
  for (let i = 0; i < layout.length; i++) {
    const div = document.createElement("div");
    div.classList.add("gridSquare");
    grid.appendChild(div);
  }
  // Acessing the DOM
  const gridSquare = document.querySelectorAll(".gridSquare");
  const infoBox = document.querySelector(".infoBox");
  const score = document.querySelector(".score");
  //const scoreTarget = document.querySelector(".scoreTarget");
  const timer = document.querySelector(".timer");
  const timer2 = document.querySelector(".timer2");
  const timer3 = document.querySelector(".timer3");
  const timer4 = document.querySelector(".timer4");
  const timer5 = document.querySelector(".timer5");
  const timer6 = document.querySelector(".timer6");
  const start = document.querySelector(".start");
  const targetScore = document.querySelector(".targetScore");
  /*const highScore = document.querySelector(".highScore");*/
  const left = document.querySelector(".left");
  const up = document.querySelector(".up");
  const right = document.querySelector(".right");
  const down = document.querySelector(".down");
  //This event listener prevents the arrow keys from scrolling
  document.addEventListener("keydown", preventDefultScroll);
  // eventlistner to start the game
  start.addEventListener("click", () => {
    // if it says start run the game for the first time.
    if (start.innerHTML === "Start") {
      startGame();
      document.addEventListener("keydown", movePacMan);
      start.innerHTML = "RUN!";
      infoBox.innerHTML = "nice m8";
      start.style.backgroundColor = "red";
      // if it says play again? run the game 1st > time
    } /*else if (start.innerHTML === "Play Again?") {
      CountUpid = setInterval(CountUp, 1000);
      for (let i = 0; i < 16; i++) {
        clearInterval(caughtIdOne);
        clearInterval(caughtIdTwo);
        clearInterval(caughtIdThree);
        clearInterval(caughtIdFour);
      }
      for (let i = 0; i < beavers.length; i++) {
        for (let i = 0; i < 16; i++) {
          clearInterval(caughtIdOne);
          clearInterval(caughtIdTwo);
          clearInterval(caughtIdThree);
          clearInterval(caughtIdFour);
        }
        startReset(beavers[i]);
        caughtIdOne = setInterval(function () {
          pacCaught(beaverOne);
        }, 60);
        caughtIdTwo = setInterval(function () {
          pacCaught(beaverTwo);
        }, 60);
        caughtIdThree = setInterval(function () {
          pacCaught(beaverThree);
        }, 60);
        caughtIdFour = setInterval(function () {
          pacCaught(beaverFour);
        }, 60);
        start.innerHTML = "RUN!";
        start.style.backgroundColor = "red";
      }
   }*/
  });

  // const layoutClasses = ['', 'wall', 'food', 'pacmanRight', 'heart', 'warp', 'beaverOne', 'beaverTwo', 'beaverThree', 'beaverFour']
  //This function assings the correct classes depending on the layout above.
  function assignGrid(
    beaverOne,
    beaverTwo,
    beaverThree,
    beaverFour,
    beaverFive
  ) {
    infoBox.innerHTML = "Press button to begin";
    for (let i = 0; i < layout.length; i++) {
      // gridSquare[i].classList.add(layoutClasses[layout[i]])
      if (layout[i] === 1) {
        gridSquare[i].classList.add("wall");
      } else if (layout[i] === 2) {
        gridSquare[i].classList.add("food");
      } else if (layout[i] === 3) {
        gridSquare[i].classList.add("pacmanRight");
      } else if (layout[i] === 6) {
        gridSquare[i].classList.add("gate");
      } else if (layout[i] === 4) {
        gridSquare[i].classList.add("beaverOne");
        beaverOne.beaverIndex = i;
      } else if (layout[i] === 7) {
        gridSquare[i].classList.add("beaverTwo");
        beaverTwo.beaverIndex = i;
      } else if (layout[i] === 8) {
        gridSquare[i].classList.add("beaverThree");
        beaverThree.beaverIndex = i;
      } else if (layout[i] === 9) {
        gridSquare[i].classList.add("beaverFour");
        beaverFour.beaverIndex = i;
      } else if (layout[i] === 18) {
        gridSquare[i].classList.add("beaverFive");
        beaverFive.beaverIndex = i;
      } else if (layout[i] === 10) {
        gridSquare[i].classList.add("book");
      } else if (layout[i] === 11) {
        gridSquare[i].classList.add("paperdoc");
      } else if (layout[i] === 12) {
        gridSquare[i].classList.add("letter1");
      } else if (layout[i] === 13) {
        gridSquare[i].classList.add("heart1");
      } else if (layout[i] === 14) {
        gridSquare[i].classList.add("heart2");
      } else if (layout[i] === 15) {
        gridSquare[i].classList.add("badge1");
      } else if (layout[i] === 16) {
        gridSquare[i].classList.add("letter2");
      } else if (layout[i] === 17) {
        gridSquare[i].classList.add("letter2");
      }
    }
  }
  // Calling the assignGrid function
  assignGrid(beaverOne, beaverTwo, beaverThree, beaverFour, beaverFive);

  // This counts to see how much food is left before you complete the level
  /*function checkWin() {
    // let foodAmount = (layout.filter(x => x === 2)).length
    let foodAmount = 0;
    for (let i = 0; i < 400; i++) {
      if (gridSquare[i].classList.contains("food")) {
        foodAmount = foodAmount + 1;
      }
    }
    if (foodAmount === 0) {
      clearInterval(pacSoundId);
      for (let i = 0; i < 16; i++) {
        clearInterval(caughtIdOne);
        clearInterval(caughtIdTwo);
        clearInterval(caughtIdThree);
        clearInterval(caughtIdFour);
        clearInterval(caughtIdFive);
      }
      clearInterval(beaverMoveIdOne);
      clearInterval(beaverMoveIdTwo);
      clearInterval(beaverMoveIdThree);
      clearInterval(beaverMoveIdFour);
      clearInterval(beaverMoveIdFive);
      clearInterval(CountUpid);
      /*clearInterval(CountUp2id);
      clearInterval(CountUp3id);
      clearInterval(CountDown2id);
      /*clearInterval(CountDownid);
      gridSquare[pacIndex].classList.remove("pacmanUp");
      gridSquare[pacIndex].classList.remove("pacmanRight");
      gridSquare[pacIndex].classList.remove("pacmanDown");
      gridSquare[pacIndex].classList.remove("pacmanLeft");
      start.innerHTML = "Play Again?";
      infoBox.innerHTML = "YOU WIN!";
      if (scoreNumber > highScoreNumber) {
        highScoreNumber = scoreNumber;
        highScoreTime = time;
      }
      highScore.innerHTML = `${highScoreNumber}ps in ${highScoreTime}s`;
      time = time + 0;
    }
  }/*

  //KARLO: Condition for winning the game
  function checkWin() {
    if (scoreNumber >= scoreTarget&& gridSquare[pacIndex].classList.contains("gate") {
      highScoreNumber = scoreNumber;
      highScoreTime = time;
      infoBox.innerHTML = "YOU WIN!";
    }
    /*if (foodAmount === 0) {
      clearInterval(pacSoundId);
      for (let i = 0; i < 16; i++) {
        clearInterval(caughtIdOne);
        clearInterval(caughtIdTwo);
        clearInterval(caughtIdThree);
        clearInterval(caughtIdFour);
      }
      clearInterval(beaverMoveIdOne);
      clearInterval(beaverMoveIdTwo);
      clearInterval(beaverMoveIdThree);
      clearInterval(beaverMoveIdFour);
      clearInterval(CountUpid);
      clearInterval(CountUp2id);
      gridSquare[pacIndex].classList.remove("pacmanUp");
      gridSquare[pacIndex].classList.remove("pacmanRight");
      gridSquare[pacIndex].classList.remove("pacmanDown");
      gridSquare[pacIndex].classList.remove("pacmanLeft");
      start.innerHTML = "Play Again?";
      infoBox.innerHTML = "YOU WIN!";
  
    }
  }*/

  // Function to play the beaver sounds
  function pacSound() {
    const move = new Audio("pacman_chomp.wav");
    move.play();
  }

  //Function that moves packman using the arrow keys
  function movePacMan(e) {
    let scoreTarget = 2000;
    targetScore.innerHTML = scoreTarget;
    gridSquare[pacIndex].classList.remove("pacmanUp");
    gridSquare[pacIndex].classList.remove("pacmanRight");
    gridSquare[pacIndex].classList.remove("pacmanDown");
    gridSquare[pacIndex].classList.remove("pacmanLeft");
    switch (e.keyCode) {
      case 37: // left arrow
        left.classList.add("active");
        setTimeout(() => left.classList.remove("active"), 100);
        if (gridSquare[pacIndex - 1].classList.contains("wall")) pacIndex += 0;
        else if (pacIndex % width !== 0) pacIndex -= 1;
        gridSquare[pacIndex].classList.add("pacmanLeft");
        break;
      case 38: // upp arrow
        up.classList.add("active");
        setTimeout(() => up.classList.remove("active"), 100);
        if (gridSquare[pacIndex - width].classList.contains("wall"))
          pacIndex += 0;
        else if (pacIndex - width >= 0) pacIndex -= width;
        gridSquare[pacIndex].classList.add("pacmanUp");
        break;
      case 39: // right arrow
        right.classList.add("active");
        setTimeout(() => right.classList.remove("active"), 100);
        if (gridSquare[pacIndex + 1].classList.contains("wall")) pacIndex += 0;
        else if (pacIndex % width < width - 1) pacIndex += 1;
        gridSquare[pacIndex].classList.add("pacmanRight");
        break;
      case 40: //down arrow
        down.classList.add("active");
        setTimeout(() => down.classList.remove("active"), 100);
        if (gridSquare[pacIndex + width].classList.contains("wall"))
          pacIndex += 0;
        else if (pacIndex + width < width * width) pacIndex += width;
        gridSquare[pacIndex].classList.add("pacmanDown");
        break;
    }
    // colliding with food -----------------------
    if (gridSquare[pacIndex].classList.contains("food")) {
      gridSquare[pacIndex].classList.remove("food");
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
    }
    // colliding with powerups -----------------------
    if (gridSquare[pacIndex].classList.contains("book")) {
      gridSquare[pacIndex].classList.remove("book");
      scoreNumber = scoreNumber + 30;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[pacIndex].classList.contains("paperdoc")) {
      gridSquare[pacIndex].classList.remove("paperdoc");
      scoreNumber = scoreNumber + 40;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[pacIndex].classList.contains("letter1")) {
      gridSquare[pacIndex].classList.remove("letter1");
      scoreNumber = scoreNumber + 40;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[pacIndex].classList.contains("heart1")) {
      gridSquare[pacIndex].classList.remove("heart1");
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[pacIndex].classList.contains("heart2")) {
      gridSquare[pacIndex].classList.remove("heart2");
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[pacIndex].classList.contains("badge1")) {
      gridSquare[pacIndex].classList.remove("badge1");
      scoreNumber = scoreNumber + 600;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[pacIndex].classList.contains("letter2")) {
      gridSquare[pacIndex].classList.remove("letter2");
      scoreNumber = scoreNumber + 200;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[pacIndex].classList.contains("lottery")) {
      gridSquare[pacIndex].classList.remove("lottery");
      scoreTarget = scoreTarget - 1925;
      document.getElementsByClassName("scoreTarget")[0].innerHTML = scoreTarget;
    }

    // colliding with heart ------------------------------------------
    if (gridSquare[pacIndex].classList.contains("heart")) {
      gridSquare[pacIndex].classList.remove("heart");
      for (let i = 0; i < beavers.length; i++) {
        hearttaken(beavers[i]);
      }
      setTimeout(function () {
        for (let i = 0; i < 16; i++) {
          clearInterval(caughtIdOne);
          clearInterval(caughtIdTwo);
          clearInterval(caughtIdThree);
          clearInterval(caughtIdFour);
          clearInterval(caughtIdFive);
        }
        caughtIdOne = setInterval(function () {
          pacCaught(beaverOne);
        }, 60);
        caughtIdTwo = setInterval(function () {
          pacCaught(beaverTwo);
        }, 60);
        caughtIdThree = setInterval(function () {
          pacCaught(beaverThree);
        }, 60);
        caughtIdFour = setInterval(function () {
          pacCaught(beaverFour);
        }, 60);
        caughtIdFive = setInterval(function () {
          pacCaught(beaverFive);
        }, 60);
      }, hearttime);
    }
    // The next 2 if statments allow for warping from each side of the map
    /*if (pacIndex === 141) {
      gridSquare[pacIndex].classList.remove("pacmanUp");
      gridSquare[pacIndex].classList.remove("pacmanRight");
      gridSquare[pacIndex].classList.remove("pacmanDown");
      gridSquare[pacIndex].classList.remove("pacmanLeft");
      pacIndex = 157;
      gridSquare[pacIndex].classList.add("pacmanLeft");
    }
    if (pacIndex === 158) {
      gridSquare[pacIndex].classList.remove("pacmanUp");
      gridSquare[pacIndex].classList.remove("pacmanRight");
      gridSquare[pacIndex].classList.remove("pacmanDown");
      gridSquare[pacIndex].classList.remove("pacmanLeft");
      pacIndex = 142;
      gridSquare[pacIndex].classList.add("pacmanRight");
    }*/
  }
  // Preventing arrow keys from scrolling
  function preventDefultScroll(e) {
    if ([32, 37, 38, 39, 40, 16].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }
  // -------------------- beaver LOGIC  --------------------------------------------
  //This function evaluates all directions the beaver can move in.
  // It then removes all the moves that are into a walls
  // and the moves into other beavers and into warping
  function chooseAndMove(beaver) {
    //  EVALUATES ALL THE CHOICES DONT CHOOSE WALL OR BACK ON ITS SELF
    beaver.goodDirections = [];
    for (let i = 0; i < directions.length; i++) {
      if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "wall"
        )
      ) {
        beaver.goodDirections.push(null);
      } else if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "warp"
        )
      ) {
        beaver.goodDirections.push(null);
      } else if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "beaverOne"
        ) &&
        beaver.goodDirections.length > 2
      ) {
        beaver.goodDirections.push(null);
      } else if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "beaverTwo"
        ) &&
        beaver.goodDirections.length > 2
      ) {
        beaver.goodDirections.push(null);
      } else if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "beaverThree"
        ) &&
        beaver.goodDirections.length > 2
      ) {
        beaver.goodDirections.push(null);
      } else if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "beaverFour"
        ) &&
        beaver.goodDirections.length > 2
      ) {
        beaver.goodDirections.push(null);
      } else if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "beaverFive"
        ) &&
        beaver.goodDirections.length > 2
      ) {
        beaver.goodDirections.push(null);
      } else if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "beaverFlee"
        ) &&
        beaver.goodDirections.length > 2
      ) {
        beaver.goodDirections.push(null);
      } else if (
        gridSquare[beaver.beaverIndex + directions[i]].classList.contains(
          "beaverDead"
        ) &&
        beaver.goodDirections.length > 2
      ) {
        beaver.goodDirections.push(null);
      } else if (directions[i] === -beaver.lastDirection) {
        beaver.goodDirections.push(null);
      } else {
        beaver.goodDirections.push(directions[i]);
      }
    }
    beaver.goodDirections = beaver.goodDirections.filter((x) => x !== null);
    // choses a direction to move depending on what the bais is set to
    // and pacman locations
    pacManBias(beaver);
    // This calls the function that actually makes the move
    makeTheMove(beaver);
  }
  // This function is only used once to start the game and set the beavers moving.
  function startGame() {
    pacSoundId = setInterval(pacSound, 650);
    CountUpid = setInterval(CountUp, 24000);
    /*CountUp2id = setInterval(CountUp2, 5000);*/
    CountUp3id = setInterval(CountUp3, 1000);
    CountDown2Id = setInterval(CountDown2, 1000);
    CountDownId = setInterval(CountDown2, 1000);
    //CountDown6Id = setInterval(CountDown6, 1000);

    beaverMoveIdOne = setInterval(function () {
      chooseAndMove(beaverOne);
    }, beaverTimePerMove);
    beaverMoveIdTwo = setInterval(function () {
      chooseAndMove(beaverTwo);
    }, beaverTimePerMove);
    beaverMoveIdThree = setInterval(function () {
      chooseAndMove(beaverThree);
    }, beaverTimePerMove);
    beaverMoveIdFour = setInterval(function () {
      chooseAndMove(beaverFour);
    }, beaverTimePerMove);
    beaverMoveIdFive = setInterval(function () {
      chooseAndMove(beaverFive);
    }, beaverTimePerMove);
  }
  // this functions moves the beavers by removing the class chaning the beaver
  // position index and the re adding the class to the new index
  // it is used to store all the previous moves of the beavers
  function makeTheMove(beaver) {
    //this find the change of index so that it is not repeated
    beaver.directionMove = beaver.positionMove - beaver.beaverIndex;
    //Stores all previous moves
    beaver.directionStore.push(beaver.directionMove);
    //last direction is stored so that it doesn't go back on itself
    beaver.lastDirection =
      beaver.directionStore[beaver.directionStore.length - 1];
    // the class changes depending on if the beavers is fleeing chasing or dead
    if (beaver.bias === 2) {
      gridSquare[beaver.beaverIndex].classList.remove("beaverFlee");
      beaver.beaverIndex = beaver.beaverIndex + beaver.directionMove;
      gridSquare[beaver.beaverIndex].classList.add("beaverFlee");
    } else if (beaver.bias === 3) {
      gridSquare[beaver.beaverIndex].classList.remove("beaverDead");
      beaver.beaverIndex = beaver.beaverIndex + beaver.directionMove;
      gridSquare[beaver.beaverIndex].classList.add("beaverDead");
    } else {
      gridSquare[beaver.beaverIndex].classList.remove(beaver.beaverClass);
      beaver.beaverIndex = beaver.beaverIndex + beaver.directionMove;
      gridSquare[beaver.beaverIndex].classList.add(beaver.beaverClass);
    }
  }
  // ------------------- pac move direction BIAS ----------------
  // fucntion used by the ghists to find an appropiate route to chase pacman
  function towardsPacMan(beaver) {
    // return all the possible new position indexs the beaver can move.
    beaver.goodPositions = beaver.goodDirections.map(
      (x) => x + beaver.beaverIndex
    );
    // all the possible positions are reduced down to the one that bring then
    // beavers position index closest to pacmans
    const closestIndex = beaver.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - pacIndex) < Math.abs(prev - pacIndex)
        ? curr
        : prev;
    });
    // Pacmans Modulas % width.
    const pacModulas = pacIndex % width;
    // This takes the possble indexs to move to and chnages them to modulas% width.
    const posPositionsModulas = beaver.goodPositions.map((x) => x % width);
    // This then finds the modulas closest to the modulas of Pacman
    const closestModulas = posPositionsModulas.reduce(function (prev, curr) {
      return Math.abs(curr - pacModulas) < Math.abs(prev - pacModulas)
        ? curr
        : prev;
    });
    const closestModulasIndex = posPositionsModulas.findIndex(
      (x) => x === closestModulas
    );
    const closestModulasREAL = beaver.goodPositions[closestModulasIndex];
    // and array is made with the index and mod closest
    // one is randomly chosen at each junction where there is a choice.
    const idealmoves = [closestIndex, closestModulasREAL];
    beaver.positionMove =
      idealmoves[Math.floor(Math.random() * idealmoves.length)];
    return beaver.positionMove;
  }
  // modulas is not used for the other 3 bais choices just closest pos index
  function awayFromPacMan(beaver) {
    beaver.goodPositions = beaver.goodDirections.map(
      (x) => x + beaver.beaverIndex
    );
    beaver.positionMove = beaver.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - pacIndex) > Math.abs(prev - pacIndex)
        ? curr
        : prev;
    });
    return beaver.positionMove;
  }
  function outOfBox(beaver) {
    beaver.goodPositions = beaver.goodDirections.map(
      (x) => x + beaver.beaverIndex
    );
    beaver.positionMove = beaver.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - 111) < Math.abs(prev - 111) ? curr : prev;
    });
    return beaver.positionMove;
  }
  function sendHome(beaver) {
    beaver.goodPositions = beaver.goodDirections.map(
      (x) => x + beaver.beaverIndex
    );
    beaver.positionMove = beaver.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - 170) < Math.abs(prev - 170) ? curr : prev;
    });
    return beaver.positionMove;
  }
  // this function runs the approprate function based on the current bias.
  function pacManBias(beaver) {
    // this function get the beavers out of the box they start in
    if (
      beaver.beaverIndex === 168 ||
      beaver.beaverIndex === 169 ||
      beaver.beaverIndex === 170 ||
      beaver.beaverIndex === 171 ||
      beaver.beaverIndex === 148 ||
      beaver.beaverIndex === 149 ||
      beaver.beaverIndex === 150 ||
      beaver.beaverIndex === 151
    ) {
      outOfBox(beaver);
    } else if (beaver.bias === 1) {
      towardsPacMan(beaver);
    } else if (beaver.bias === 2) {
      awayFromPacMan(beaver);
    } else if (beaver.bias === 3) {
      sendHome(beaver);
    }
  }
  // This function is run many times a second checking if a beaver
  // has caught pacman
  /*function pacCaught(beaver) {
    console.log("is it catching?");
    if (gridSquare[pacIndex] === gridSquare[beaver.beaverIndex]) {
      gridSquare[pacIndex].classList.remove("pacmanRight");
      gridSquare[pacIndex].classList.remove("pacmanLeft");
      gridSquare[pacIndex].classList.remove("pacmanUp");
      gridSquare[pacIndex].classList.remove("pacmanDown");
      pacDied(beaver);
      death.play();
      clearInterval(pacSoundId);
      clearInterval(CountUpid);
      for (let i = 0; i < 16; i++) {
        clearInterval(caughtIdOne);
        clearInterval(caughtIdTwo);
        clearInterval(caughtIdThree);
        clearInterval(caughtIdFour);
      }
      if (scoreNumber > highScoreNumber) {
        highScoreNumber = scoreNumber;
        highScoreTime = time;
      }
      highScore.innerHTML = `${highScoreNumber}ps in ${highScoreTime}s`;
      time = time + 0;
      start.innerHTML = "Play Again?";
      infoBox.innerHTML = "PacMan Died.";
      start.style.backgroundColor = "red";
    }
  }*/

  // Function for reducing score when hit by monsters.
  function pacCaught(beaverOne) {
    /*console.log("is it catching?");*/
    if (gridSquare[pacIndex] === gridSquare[beaverOne.beaverIndex]) {
      scoreNumber = scoreNumber - 40;
    }
  }
  function pacCaught(beaverTwo) {
    /*console.log("is it catching?");*/
    if (gridSquare[pacIndex] === gridSquare[beaverTwo.beaverIndex]) {
      scoreNumber = scoreNumber - 60;
    }
  }
  function pacCaught(beaverThree) {
    /*console.log("is it catching?");*/
    if (gridSquare[pacIndex] === gridSquare[beaverThree.beaverIndex]) {
      scoreNumber = scoreNumber - 90;
    }
  }
  function pacCaught(beaverFour) {
    /*console.log("is it catching?");*/
    if (gridSquare[pacIndex] === gridSquare[beaverFour.beaverIndex]) {
      scoreNumber = scoreNumber - 450;
    }
  }
  function pacCaught(beaverFive) {
    /*console.log("is it catching?");*/
    if (gridSquare[pacIndex] === gridSquare[beaverFive.beaverIndex]) {
      scoreNumber = scoreNumber - 10;
    }
  }
  // Calling the caught function for each beaver
  let caughtIdOne = setInterval(function () {
    pacCaught(beaverOne);
  }, 60);
  let caughtIdTwo = setInterval(function () {
    pacCaught(beaverTwo);
  }, 60);
  let caughtIdThree = setInterval(function () {
    pacCaught(beaverThree);
  }, 60);
  let caughtIdFour = setInterval(function () {
    pacCaught(beaverFour);
  }, 60);
  let caughtIdFive = setInterval(function () {
    pacCaught(beaverFive);
  }, 60);
  //This function if run when pacman is caught by a beaver and dies
  function pacDied() {
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
      clearInterval(caughtIdFive);
    }
    clearInterval(beaverMoveIdOne);
    clearInterval(beaverMoveIdTwo);
    clearInterval(beaverMoveIdThree);
    clearInterval(beaverMoveIdFour);
    clearInterval(beaverMoveIdFive);
    pacIndex = null;
    clearInterval(CountUpid);
    /*clearInterval(CountUp2id);*/
    clearInterval(CountUp3id);
    clearInterval(CountDown2id);
    clearInterval(CountDownid);
  }
  // this function is run after everything is set back to 0 inorder to play again
  function startReset(beaver) {
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
      clearInterval(caughtIdFive);
    }
    reset(beaver);
    clearInterval(pacSoundId);
    pacSoundId = setInterval(pacSound, 650);
    //restart beavers moving
    clearInterval(beaverMoveIdOne);
    clearInterval(beaverMoveIdTwo);
    clearInterval(beaverMoveIdThree);
    clearInterval(beaverMoveIdFour);
    clearInterval(beaverMoveIdFive);
    beaverMoveIdOne = setInterval(function () {
      chooseAndMove(beaverOne);
    }, beaverTimePerMove);
    beaverMoveIdTwo = setInterval(function () {
      chooseAndMove(beaverTwo);
    }, beaverTimePerMove);
    beaverMoveIdThree = setInterval(function () {
      chooseAndMove(beaverThree);
    }, beaverTimePerMove);
    beaverMoveIdFour = setInterval(function () {
      chooseAndMove(beaverFour);
    }, beaverTimePerMove);
    beaverMoveIdFive = setInterval(function () {
      chooseAndMove(beaverFive);
    }, beaverTimePerMove);
  }
  // This function is run when pacman takes a heart
  function hearttaken(beaver) {
    beaver.bias = 2;
    gridSquare[beaver.beaverIndex].classList.remove("beaverDead");
    gridSquare[beaver.beaverIndex].classList.remove(beaver.beaverClass);
    gridSquare[beaver.beaverIndex].classList.add("beaverFlee");
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
      clearInterval(caughtIdFive);
    }
    // this reverses the beavers direction once Pman has taken the hearts
    /*beaver.lastDirection = -beaver.lastDirection;
    gridSquare[beaver.beaverIndex].classList.remove("beaverFlee");
    beaver.beaverIndex = beaver.beaverIndex - beaver.directionMove;
    gridSquare[beaver.beaverIndex].classList.add("beaverFlee");
    const pacKillIdOne = setInterval(function () {
      pacKill(beaverOne);
    }, 60);
    const pacKillIdTwo = setInterval(function () {
      pacKill(beaverTwo);
    }, 60);
    const pacKillIdThree = setInterval(function () {
      pacKill(beaverThree);
    }, 60);
    const pacKillIdFour = setInterval(function () {
      pacKill(beaverFour);
    }, 60);
    setTimeout(function () {
      for (let i = 0; i < 4; i++) {
        clearInterval(pacKillIdOne);
        clearInterval(pacKillIdTwo);
        clearInterval(pacKillIdThree);
        clearInterval(pacKillIdFour);
      }
      heartWareoff(beaver);
    }, hearttime);
  }
  // When a heart is taken the function is run a number of times a second
  // to check to see if pacman has killed a beaver
  /*function pacKill(beaver) {
    console.log("can pac kill");
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
    }*/
    // so pacMan can kill beaver
    /*if (gridSquare[pacIndex] === gridSquare[beaver.beaverIndex]) {
      scoreNumber = scoreNumber + 200;
      infoBox.innerHTML = "beaver \n +200 Points";
      gridSquare[beaver.beaverIndex].classList.remove("beaverFlee");
      gridSquare[beaver.beaverIndex].classList.remove(beaver.beaverClass);
      gridSquare[beaver.beaverIndex].classList.remove("beaverDead");
      beaver.lastDirection = -beaver.lastDirection;
      gridSquare[beaver.beaverIndex].classList.remove("beaverDead");
      beaver.beaverIndex = beaver.beaverIndex - beaver.directionMove;
      gridSquare[beaver.beaverIndex].classList.add("beaverDead");
      beaver.bias = 3;
    }*/
  }
  // this resets the beavers to hunt pacman and stop pac man from killing
  /*function heartWareoff(beaver) {
    beaver.bias = 1;
    gridSquare[beaver.beaverIndex].classList.remove("beaverDead");
    gridSquare[beaver.beaverIndex].classList.remove("beaverFlee");
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
    }
  }*/
  // KARLO: Counts up the Year in Age, affects score by change in year.
  function CountUp() {
    if (time < 28) {
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
    } else if (time >= 28) {
      scoreNumber = scoreNumber - 10;
      score.innerHTML = scoreNumber;
    }
  }

  // KARLO: Counts up the time for the Days (which affects Months) in Age, resets its everytime it reaches 12.
  function CountUp3() {
    if (time3 == 15) {
      time3 = time3 + 15;
    } else if ((time3 = 30)) {
      time3 = 15;
      if (time2 < 12) {
        time2 = time2 + 1;
        timer2.innerHTML = time2;
      } else {
        time2 = 1;
        timer2.innerHTML = time2;
        time = time + 1;
        timer.innerHTML = time;
      }
    }
    timer3.innerHTML = time3;
  }

  // KARLO: Timer for powerup appearance.
  function CountDown2() {
    time5 = time5 - 1;
    console.log(time5);
    timer5.innerHTML = time5;
    if (time5 == 110) {
      gridSquare[29].classList.add("book");
    }
    if (time5 == 100) {
      gridSquare[29].classList.remove("book");
      gridSquare[78].classList.add("book");
    }
    if (time5 == 90) {
      gridSquare[78].classList.remove("book");
      gridSquare[358].classList.add("paperdoc");
    }
    if (time5 == 80) {
      gridSquare[358].classList.remove("paperdoc");
      gridSquare[277].classList.add("letter1");
    }
    if (time5 == 70) {
      gridSquare[277].classList.remove("letter1");
      gridSquare[185].classList.add("heart1");
    }
    if (time5 == 60) {
      gridSquare[185].classList.remove("heart1");
      gridSquare[253].classList.add("heart2");
    }
    if (time5 == 50) {
      gridSquare[253].classList.remove("heart2");
      gridSquare[367].classList.add("heart2");
    }
    if (time5 == 40) {
      gridSquare[367].classList.remove("heart2");
      gridSquare[289].classList.add("badge1");
    }
    if (time5 == 30) {
      gridSquare[289].classList.remove("badge1");
      gridSquare[336].classList.add("letter2");
    }
    if (time5 == 20) {
      gridSquare[336].classList.remove("letter2");
      gridSquare[106].classList.add("lottery");
    }
    if (time5 == 10) {
      gridSquare[106].classList.remove("lottery");
      gridSquare[170].classList.add("gate");
    }
    /*if (time5 == 8) {
      gridSquare[170].classList.remove("gate");
    }*/
    // KARLO: specifically for visa expiration.
    if (time5 == 28) {
      document.getElementById("timer4").className = "timer4";
      let time4 = 28;
      let CountDownId;
      CountDownId = setInterval(CountDown, 1000);
      function CountDown() {
        time4 = time4 - 1;
        timer4.innerHTML = time4;
        if (time4 == 0) {
          clearInterval(CountDownId);
          time4 = 0;
          timer4.innerHTML = time4;
        }
      }
    }
  }
  CountDown6Id = setInterval(CountDown6, 1000);
  function CountDown6() {
    time6 = time6 - 1;
    timer6.innerHTML = time6;
    if (time6 <= 0) {
      clearInterval(CountDown6Id);
      clearInterval(pacSoundId);
      clearInterval(beaverMoveIdOne);
      clearInterval(beaverMoveIdTwo);
      clearInterval(beaverMoveIdThree);
      clearInterval(beaverMoveIdFour);
      clearInterval(beaverMoveIdFive);
      clearInterval(CountUpid);
      clearInterval(CountUp3id);
      clearInterval(CountDown2Id);
      clearInterval(CountDownId);
    }
    console.log(time6);
  }

  function checkWin() {
    let scoreTarget = 2000;
    targetScore.innerHTML = scoreTarget;

    if (gridSquare[170].classList.contains("gate")) {
      if (
        scoreNumber >= scoreTarget &&
        gridSquare[pacIndex].classList.contains("gate")
      ) {
        scoreNumber = scoreNumber;
        time = 0;
        clearInterval(pacSoundId);
        clearInterval(beaverMoveIdOne);
        clearInterval(beaverMoveIdTwo);
        clearInterval(beaverMoveIdThree);
        clearInterval(beaverMoveIdFour);
        clearInterval(beaverMoveIdFive);
        clearInterval(CountUpid);
        //clearInterval(CountUp2id);
        clearInterval(CountUp3id);
        clearInterval(CountDown2Id);
        clearInterval(CountDownId);
        clearInterval(CountDown6Id);
        gridSquare[pacIndex].classList.remove("pacmanUp");
        gridSquare[pacIndex].classList.remove("pacmanRight");
        gridSquare[pacIndex].classList.remove("pacmanDown");
        gridSquare[pacIndex].classList.remove("pacmanLeft");
        //beaver.directionStore = [];
        //beaver.goodDirections = [];
        //beaver.directionMove = -1;
        //beaver.lastDirection = 0;
        gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
        gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
        gridSquare[beaverThree.beaverIndex].classList.remove("beaverThree");
        gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
        gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
        infoBox.innerHTML = "YOU GET TO LIVE IN CANADA!";
        //winAudio.loop = false;
        winAudio.play();
      } else if (
        scoreNumber < scoreTarget &&
        gridSquare[pacIndex].classList.contains("gate")
      ) {
        scoreNumber = scoreNumber;
        time = 0;
        clearInterval(pacSoundId);
        clearInterval(beaverMoveIdOne);
        clearInterval(beaverMoveIdTwo);
        clearInterval(beaverMoveIdThree);
        clearInterval(beaverMoveIdFour);
        clearInterval(beaverMoveIdFive);
        clearInterval(CountUpid);
        //clearInterval(CountUp2id);
        clearInterval(CountUp3id);
        clearInterval(CountDown2Id);
        clearInterval(CountDownId);
        clearInterval(CountDown6Id);
        gridSquare[pacIndex].classList.remove("pacmanUp");
        gridSquare[pacIndex].classList.remove("pacmanRight");
        gridSquare[pacIndex].classList.remove("pacmanDown");
        gridSquare[pacIndex].classList.remove("pacmanLeft");
        //beaver.directionStore = [];
        //beaver.goodDirections = [];
        //beaver.directionMove = -1;
        //beaver.lastDirection = 0;
        gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
        gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
        gridSquare[beaverThree.beaverIndex].classList.remove("beaverThree");
        gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
        gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
        infoBox.innerHTML = "YOU DON'T DESERVE TO BE IN CANADA!";
      } /*else if (
        scoreNumber > 0 &&
        !gridSquare[pacIndex].classList.contains("gate") &&
        time6 == 0
      ) {
        clearInterval(CountDown6Id);
        scoreNumber = scoreNumber;
        time = 0;
        clearInterval(pacSoundId);
        clearInterval(beaverMoveIdOne);
        clearInterval(beaverMoveIdTwo);
        clearInterval(beaverMoveIdThree);
        clearInterval(beaverMoveIdFour);
        clearInterval(beaverMoveIdFive);
        clearInterval(CountUpid);
        //clearInterval(CountUp2id);
        clearInterval(CountUp3id);
        clearInterval(CountDown2Id);
        clearInterval(CountDownId);
        clearInterval(CountDown6Id);
        gridSquare[pacIndex].classList.remove("pacmanUp");
        gridSquare[pacIndex].classList.remove("pacmanRight");
        gridSquare[pacIndex].classList.remove("pacmanDown");
        gridSquare[pacIndex].classList.remove("pacmanLeft");
        //beaver.directionStore = [];
        //beaver.goodDirections = [];
        //beaver.directionMove = -1;
        //beaver.lastDirection = 0;
        gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
        gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
        gridSquare[beaverThree.beaverIndex].classList.remove("beaverThree");
        gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
        gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
        infoBox.innerHTML = "YOU DON'T DESERVE TO BE IN CANADA!";
      }*/
    }

    //Calling the checkWin to run at a set interval 200ms
    setInterval(checkWin, 200);

    // this runs a hard reset on eveything clearing all the timers
    function reset(beaver) {
      for (let i = 0; i < 4; i++) {
        clearInterval(caughtIdOne);
        clearInterval(caughtIdTwo);
        clearInterval(caughtIdThree);
        clearInterval(caughtIdFour);
        clearInterval(caughtIdFive);
      }
      scoreNumber = 0;
      time = 0;
      score.innerHTML = scoreNumber;
      timer.innerHTML = time;
      timer2.innerHTML = time2;
      timer3.innerHTML = time3;
      timer4.innerHTML = time4;
      timer5.innerHTML = time5;
      timer6.innerHTML = time6;
      gridSquare[beaver.beaverIndex].classList.remove("beaverDead");
      gridSquare[beaver.beaverIndex].classList.remove("beaverFlee");
      gridSquare[beaver.beaverIndex].classList.remove(beaver.beaverClass);
      pacIndex = 250;
      beaver.directionStore = [];
      beaver.goodDirections = [];
      beaver.directionMove = -1;
      beaver.lastDirection = 0;
      gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
      gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
      gridSquare[beaverThree.beaverIndex].classList.remove("beaverThree");
      gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
      gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
      beaverOne.beaverIndex = 170;
      beaverTwo.beaverIndex = 169;
      beaverOne.beaverIndex = 168;
      beaverTwo.beaverIndex = 171;
      beaverOne.beaverIndex = 148;
      beaver.bias = 1;
      assignGrid(beaverOne, beaverTwo, beaverThree, beaverFour, beaverFive);
    }
  }
});
