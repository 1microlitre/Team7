// Set how many miliseconds between each time the beavers move
const beaverTimePerMove = 450;
// Defining the beavers paramters.
//---------------------------------------------------------------------
// Used in algorithams to move beavers and Immigrant
const width = 20;
// Possible moves for beaver
const directions = [-1, -width, 1, width];
// Set starting values:
// Immigrant position
let ImmigrantIndex = 250;
// players points
let scoreNumber = 700;
// scoreTargetpoints
let scoreTarget = 2000;
// The time played
let time = 26;
let time2 = 1;
let time3 = 15;
let timeVisaExpire = 28;
let timeGameItself = 120;
let time6 = 120;

// Id to ended the timer
let CountUpid;
/*let CountUp2id;*/
let CountUp3id;
let timerGameItselfId;
let timerVisaExpireId;
// Ids to stop the beavers from moving
let beaverMoveIdOne;
let beaverMoveIdTwo;
let beaverMoveIdThree;
let beaverMoveIdFour;
let beaverMoveIdFive;
// Id to stop the Immigrant audio sounds
let ImmigrantSoundId;
/*// Used to set the games highscore
let highScoreNumber = 0;
// the   time to go along with the high score
let highScoreTime = 0;*/
const winAudio = new Audio("Immigrant_win.wav");
const death = new Audio("Immigrant_death.wav");

/*let win = new Audio("Immigrant_win.wav");
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
// Immigrant = 3
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
  const VisaExpire = document.querySelector(".VisaExpireTimer");
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
      document.addEventListener("keydown", moveImmigrant);
      start.innerHTML = "RUN!";
      infoBox.innerHTML = "nice m8";
      start.style.backgroundColor = "red";
    }
  });

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
        gridSquare[i].classList.add("ImmigrantRight");
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
      clearInterval(ImmigrantSoundId);
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
      clearInterval(timerGameItselfid);
      /*clearInterval(timerVisaExpireid);
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
      start.innerHTML = "Play Again?";
      infoBox.innerHTML = "YOU WIN!";
      if (scoreNumber > highScoreNumber) {
        highScoreNumber = scoreNumber;
        highScoreTime = time;
      }
      highScore.innerHTML = `${highScoreNumber}ps in ${highScoreTime}s`;
      time = time + 0;
    }
  }*/

  // Function to play the beaver sounds
  function ImmigrantSound() {
    const move = new Audio("Immigrant_chomp.wav");
    move.play();
  }

  //Function that moves Immigrantkman using the arrow keys
  function moveImmigrant(e) {
    scoreTarget = scoreTarget;
    targetScore.innerHTML = scoreTarget;
    gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
    gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
    gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
    gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
    switch (e.keyCode) {
      case 37: // left arrow
        left.classList.add("active");
        setTimeout(() => left.classList.remove("active"), 100);
        if (gridSquare[ImmigrantIndex - 1].classList.contains("wall"))
          ImmigrantIndex += 0;
        else if (ImmigrantIndex % width !== 0) ImmigrantIndex -= 1;
        gridSquare[ImmigrantIndex].classList.add("ImmigrantLeft");
        break;
      case 38: // upp arrow
        up.classList.add("active");
        setTimeout(() => up.classList.remove("active"), 100);
        if (gridSquare[ImmigrantIndex - width].classList.contains("wall"))
          ImmigrantIndex += 0;
        else if (ImmigrantIndex - width >= 0) ImmigrantIndex -= width;
        gridSquare[ImmigrantIndex].classList.add("ImmigrantUp");
        break;
      case 39: // right arrow
        right.classList.add("active");
        setTimeout(() => right.classList.remove("active"), 100);
        if (gridSquare[ImmigrantIndex + 1].classList.contains("wall"))
          ImmigrantIndex += 0;
        else if (ImmigrantIndex % width < width - 1) ImmigrantIndex += 1;
        gridSquare[ImmigrantIndex].classList.add("ImmigrantRight");
        break;
      case 40: //down arrow
        down.classList.add("active");
        setTimeout(() => down.classList.remove("active"), 100);
        if (gridSquare[ImmigrantIndex + width].classList.contains("wall"))
          ImmigrantIndex += 0;
        else if (ImmigrantIndex + width < width * width)
          ImmigrantIndex += width;
        gridSquare[ImmigrantIndex].classList.add("ImmigrantDown");
        break;
    }
    // colliding with food -----------------------
    if (gridSquare[ImmigrantIndex].classList.contains("food")) {
      gridSquare[ImmigrantIndex].classList.remove("food");
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
    }
    // colliding with powerups -----------------------
    if (gridSquare[ImmigrantIndex].classList.contains("book")) {
      gridSquare[ImmigrantIndex].classList.remove("book");
      scoreNumber = scoreNumber + 30;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[ImmigrantIndex].classList.contains("paperdoc")) {
      gridSquare[ImmigrantIndex].classList.remove("paperdoc");
      scoreNumber = scoreNumber + 40;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[ImmigrantIndex].classList.contains("letter1")) {
      gridSquare[ImmigrantIndex].classList.remove("letter1");
      scoreNumber = scoreNumber + 40;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[ImmigrantIndex].classList.contains("heart1")) {
      gridSquare[ImmigrantIndex].classList.remove("heart1");
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[ImmigrantIndex].classList.contains("heart2")) {
      gridSquare[ImmigrantIndex].classList.remove("heart2");
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[ImmigrantIndex].classList.contains("badge1")) {
      gridSquare[ImmigrantIndex].classList.remove("badge1");
      scoreNumber = scoreNumber + 600;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[ImmigrantIndex].classList.contains("letter2")) {
      gridSquare[ImmigrantIndex].classList.remove("letter2");
      scoreNumber = scoreNumber + 200;
      score.innerHTML = scoreNumber;
    }

    if (gridSquare[ImmigrantIndex].classList.contains("lottery")) {
      gridSquare[ImmigrantIndex].classList.remove("lottery");
      scoreTarget = 75; //scoreTarget - 1925;
      targetScore.innerHTML = scoreTarget;
      //document.getElementsByClassName("targetScore")[0].innerHTML = scoreTarget;
    }

    // colliding with heart ------------------------------------------
    if (gridSquare[ImmigrantIndex].classList.contains("heart")) {
      gridSquare[ImmigrantIndex].classList.remove("heart");
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
          ImmigrantCaught(beaverOne);
        }, 60);
        caughtIdTwo = setInterval(function () {
          ImmigrantCaught(beaverTwo);
        }, 60);
        caughtIdThree = setInterval(function () {
          ImmigrantCaught(beaverThree);
        }, 60);
        caughtIdFour = setInterval(function () {
          ImmigrantCaught(beaverFour);
        }, 60);
        caughtIdFive = setInterval(function () {
          ImmigrantCaught(beaverFive);
        }, 60);
      }, hearttime);
    }
    // The next 2 if statments allow for warping from each side of the map
    /*if (ImmigrantIndex === 141) {
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
      ImmigrantIndex = 157;
      gridSquare[ImmigrantIndex].classList.add("ImmigrantLeft");
    }
    if (ImmigrantIndex === 158) {
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
      ImmigrantIndex = 142;
      gridSquare[ImmigrantIndex].classList.add("ImmigrantRight");
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
    // and Immigrant locations
    ImmigrantBias(beaver);
    // This calls the function that actually makes the move
    makeTheMove(beaver);
  }
  // This function is only used once to start the game and set the beavers moving.
  function startGame() {
    ImmigrantSoundId = setInterval(ImmigrantSound, 650);
    CountUpid = setInterval(CountUp, 24000);
    /*CountUp2id = setInterval(CountUp2, 5000);*/
    CountUp3id = setInterval(CountUp3, 1000);
    timerGameItselfId = setInterval(timerGameItself, 1000);
    //timerVisaExpireId = setInterval(timerVisaExpire, 1000);
    //timerVisaExpire6Id = setInterval(timerVisaExpire6, 1000);

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
  // ------------------- Immigrant move direction BIAS ----------------
  // fucntion used by the ghists to find an appropiate route to chase Immigrant
  function towardsImmigrant(beaver) {
    // return all the possible new position indexs the beaver can move.
    beaver.goodPositions = beaver.goodDirections.map(
      (x) => x + beaver.beaverIndex
    );
    // all the possible positions are reduced down to the one that bring then
    // beavers position index closest to Immigrants
    const closestIndex = beaver.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - ImmigrantIndex) < Math.abs(prev - ImmigrantIndex)
        ? curr
        : prev;
    });
    // Immigrants Modulas % width.
    const ImmigrantModulas = ImmigrantIndex % width;
    // This takes the possble indexs to move to and chnages them to modulas% width.
    const posPositionsModulas = beaver.goodPositions.map((x) => x % width);
    // This then finds the modulas closest to the modulas of Immigrant
    const closestModulas = posPositionsModulas.reduce(function (prev, curr) {
      return Math.abs(curr - ImmigrantModulas) <
        Math.abs(prev - ImmigrantModulas)
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
  function awayFromImmigrant(beaver) {
    beaver.goodPositions = beaver.goodDirections.map(
      (x) => x + beaver.beaverIndex
    );
    beaver.positionMove = beaver.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - ImmigrantIndex) > Math.abs(prev - ImmigrantIndex)
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
  function ImmigrantBias(beaver) {
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
      towardsImmigrant(beaver);
    } else if (beaver.bias === 2) {
      awayFromImmigrant(beaver);
    } else if (beaver.bias === 3) {
      sendHome(beaver);
    }
  }
  // This function is run many times a second checking if a beaver
  // has caught Immigrant
  /*function ImmigrantCaught(beaver) {
    console.log("is it catching?");
    if (gridSquare[ImmigrantIndex] === gridSquare[beaver.beaverIndex]) {
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
      gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
      ImmigrantDied(beaver);
      death.play();
      clearInterval(ImmigrantSoundId);
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
      infoBox.innerHTML = "Immigrant Died.";
      start.style.backgroundColor = "red";
    }
  }*/

  // Function for reducing score when hit by monsters.
  function ImmigrantCaught(beaverOne) {
    /*console.log("is it catching?");*/
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverOne.beaverIndex]) {
      scoreNumber = scoreNumber - 40;
      score.innerHTML = scoreNumber;
    }
  }
  function ImmigrantCaught(beaverTwo) {
    /*console.log("is it catching?");*/
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverTwo.beaverIndex]) {
      scoreNumber = scoreNumber - 60;
      score.innerHTML = scoreNumber;
    }
  }
  function ImmigrantCaught(beaverThree) {
    /*console.log("is it catching?");*/
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverThree.beaverIndex]) {
      scoreNumber = scoreNumber - 90;
      score.innerHTML = scoreNumber;
    }
  }
  function ImmigrantCaught(beaverFour) {
    /*console.log("is it catching?");*/
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverFour.beaverIndex]) {
      scoreNumber = scoreNumber - 450;
      score.innerHTML = scoreNumber;
    }
  }
  function ImmigrantCaught(beaverFive) {
    /*console.log("is it catching?");*/
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverFive.beaverIndex]) {
      scoreNumber = scoreNumber - 10;
      score.innerHTML = scoreNumber;
    }
  }
  // Calling the caught function for each beaver
  let caughtIdOne = setInterval(function () {
    ImmigrantCaught(beaverOne);
  }, 60);
  let caughtIdTwo = setInterval(function () {
    ImmigrantCaught(beaverTwo);
  }, 60);
  let caughtIdThree = setInterval(function () {
    ImmigrantCaught(beaverThree);
  }, 60);
  let caughtIdFour = setInterval(function () {
    ImmigrantCaught(beaverFour);
  }, 60);
  let caughtIdFive = setInterval(function () {
    ImmigrantCaught(beaverFive);
  }, 60);
  //This function if run when Immigrant is caught by a beaver and dies
  function ImmigrantDied() {
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
    ImmigrantIndex = null;
    clearInterval(CountUpid);
    /*clearInterval(CountUp2id);*/
    clearInterval(CountUp3id);
    clearInterval(timerGameItselfid);
    clearInterval(timerVisaExpireid);
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
    clearInterval(ImmigrantSoundId);
    ImmigrantSoundId = setInterval(ImmigrantSound, 650);
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
  // This function is run when Immigrant takes a heart
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
    const ImmigrantKillIdOne = setInterval(function () {
      ImmigrantKill(beaverOne);
    }, 60);
    const ImmigrantKillIdTwo = setInterval(function () {
      ImmigrantKill(beaverTwo);
    }, 60);
    const ImmigrantKillIdThree = setInterval(function () {
      ImmigrantKill(beaverThree);
    }, 60);
    const ImmigrantKillIdFour = setInterval(function () {
      ImmigrantKill(beaverFour);
    }, 60);
    setTimeout(function () {
      for (let i = 0; i < 4; i++) {
        clearInterval(ImmigrantKillIdOne);
        clearInterval(ImmigrantKillIdTwo);
        clearInterval(ImmigrantKillIdThree);
        clearInterval(ImmigrantKillIdFour);
      }
      heartWareoff(beaver);
    }, hearttime);
  }
  // When a heart is taken the function is run a number of times a second
  // to check to see if Immigrant has killed a beaver
  /*function ImmigrantKill(beaver) {
    console.log("can Immigrant kill");
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
    }*/
    // so Immigrant can kill beaver
    /*if (gridSquare[ImmigrantIndex] === gridSquare[beaver.beaverIndex]) {
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
  // this resets the beavers to hunt Immigrant and stop Immigrant man from killing
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
  function timerGameItself() {
    timeGameItself = timeGameItself - 1;
    console.log(timeGameItself);
    timer5.innerHTML = timeGameItself;
    if (timeGameItself == 110) {
      gridSquare[29].classList.add("book");
    }
    if (timeGameItself == 100) {
      gridSquare[29].classList.remove("book");
      gridSquare[78].classList.add("book");
    }
    if (timeGameItself == 90) {
      gridSquare[78].classList.remove("book");
      gridSquare[358].classList.add("paperdoc");
    }
    if (timeGameItself == 80) {
      gridSquare[358].classList.remove("paperdoc");
      gridSquare[277].classList.add("letter1");
    }
    if (timeGameItself == 70) {
      gridSquare[277].classList.remove("letter1");
      gridSquare[185].classList.add("heart1");
    }
    if (timeGameItself == 60) {
      gridSquare[185].classList.remove("heart1");
      gridSquare[253].classList.add("heart2");
    }
    if (timeGameItself == 50) {
      gridSquare[253].classList.remove("heart2");
      gridSquare[367].classList.add("heart2");
    }
    if (timeGameItself == 40) {
      gridSquare[367].classList.remove("heart2");
      gridSquare[289].classList.add("badge1");
    }
    if (timeGameItself == 30) {
      gridSquare[289].classList.remove("badge1");
      gridSquare[336].classList.add("letter2");
    }
    if (timeGameItself == 20) {
      gridSquare[336].classList.remove("letter2");
      gridSquare[262].classList.add("lottery");
    }
    if (timeGameItself == 10) {
      gridSquare[262].classList.remove("lottery");
    }
    if (timeGameItself == 8) {
      gridSquare[170].classList.add("gate");
    }
    /*if (timeGameItself == 8) {
      gridSquare[170].classList.remove("gate");
    }*/
    // KARLO: specifically for visa expiration.
    if (timeGameItself == 28) {
      document.getElementById("VisaExpireTimer").className = "VisaExpireTimer";
      timeVisaExpire = timeVisaExpire;
      VisaExpireTimer.innerHTML = timeVisaExpire;
      timerVisaExpireId = setInterval(timerVisaExpire, 1000);
      function timerVisaExpire() {
        timeVisaExpire = timeVisaExpire - 1;
        VisaExpireTimer.innerHTML = timeVisaExpire;
        if (timeVisaExpire > 0) {
          //scoreTarget = scoreTarget;
          //targetScore.innerHTML = scoreTarget;
          if (gridSquare[170].classList.contains("gate")) {
            scoreTarget = scoreTarget;
            targetScore.innerHTML = scoreTarget;
            if (
              scoreNumber >= scoreTarget &&
              gridSquare[ImmigrantIndex].classList.contains("gate")
            ) {
              winAudio.play();
              infoBox.innerHTML = "YOU GET TO LIVE IN CANADA!";
              scoreNumber = scoreNumber;
              time = 0;
              clearInterval(ImmigrantSoundId);
              clearInterval(beaverMoveIdOne);
              clearInterval(beaverMoveIdTwo);
              clearInterval(beaverMoveIdThree);
              clearInterval(beaverMoveIdFour);
              clearInterval(beaverMoveIdFive);
              clearInterval(CountUpid);
              //clearInterval(CountUp2id);
              clearInterval(CountUp3id);
              clearInterval(timerGameItselfId);
              clearInterval(timerVisaExpireId);
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
              //beaver.directionStore = [];
              //beaver.goodDirections = [];
              //beaver.directionMove = -1;
              //beaver.lastDirection = 0;
              gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
              gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
              gridSquare[beaverThree.beaverIndex].classList.remove(
                "beaverThree"
              );
              gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
              gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
            } else if (
              scoreNumber < scoreTarget &&
              gridSquare[ImmigrantIndex].classList.contains("gate")
            ) {
              infoBox.innerHTML = "YOU DON'T HAVE ENOUGH POINTS YET!"; //DESERVE TO BE IN CANADA!";
              /*winAudio.play();
              scoreNumber = scoreNumber;
              time = 0;
              clearInterval(ImmigrantSoundId);
              clearInterval(beaverMoveIdOne);
              clearInterval(beaverMoveIdTwo);
              clearInterval(beaverMoveIdThree);
              clearInterval(beaverMoveIdFour);
              clearInterval(beaverMoveIdFive);
              clearInterval(CountUpid);
              //clearInterval(CountUp2id);
              clearInterval(CountUp3id);
              clearInterval(timerGameItselfId);
              clearInterval(timerVisaExpireId);
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
              //beaver.directionStore = [];
              //beaver.goodDirections = [];
              //beaver.directionMove = -1;
              //beaver.lastDirection = 0;
              gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
              gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
              gridSquare[beaverThree.beaverIndex].classList.remove(
                "beaverThree"
              );
              gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
              gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
            }*/
            }
          }

          if (timeVisaExpire == 0) {
            scoreTarget = scoreTarget;
            targetScore.innerHTML = scoreTarget;
            timeVisaExpire = 0;
            VisaExpireTimer.innerHTML = timeVisaExpire;
            //if (timeVisaExpire == 0) {
            scoreNumber = scoreNumber;
            time = 0;
            clearInterval(timerGameItselfId);
            clearInterval(timerVisaExpireId);
            clearInterval(ImmigrantSoundId);
            clearInterval(beaverMoveIdOne);
            clearInterval(beaverMoveIdTwo);
            clearInterval(beaverMoveIdThree);
            clearInterval(beaverMoveIdFour);
            clearInterval(beaverMoveIdFive);
            clearInterval(CountUpid);
            //clearInterval(CountUp2id);
            clearInterval(CountUp3id);
            clearInterval(timerGameItselfId);
            clearInterval(timerVisaExpireId);
            //clearInterval(timerVisaExpire6Id);
            gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
            gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
            gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
            gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
            //beaver.directionStore = [];
            //beaver.goodDirections = [];
            //beaver.directionMove = -1;
            //beaver.lastDirection = 0;
            gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
            gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
            gridSquare[beaverThree.beaverIndex].classList.remove("beaverThree");
            gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
            gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
            if (
              !gridSquare[ImmigrantIndex].classList.contains("gate") ||
              (gridSquare[ImmigrantIndex].classList.contains("gate") &&
                scoreNumber < scoreTarget)
            ) {
              winAudio.play();
              infoBox.innerHTML = "YOU DON'T DESERVE CANADA!";
            }
          }
        }
      }
    }

    /*timerVisaExpire6Id = setInterval(timerVisaExpire6, 1000);
  function timerVisaExpire6() {
    time6 = time6 - 1;
    timer6.innerHTML = time6;
    if (time6 <= 0) {
      clearInterval(timerVisaExpire6Id);
      clearInterval(ImmigrantSoundId);
      clearInterval(beaverMoveIdOne);
      clearInterval(beaverMoveIdTwo);
      clearInterval(beaverMoveIdThree);
      clearInterval(beaverMoveIdFour);
      clearInterval(beaverMoveIdFive);
      clearInterval(CountUpid);
      clearInterval(CountUp3id);
      clearInterval(timerGameItselfId);
      clearInterval(timerVisaExpireId);
    }
    console.log(time6);
  }*/

    /*function checkWin() {
    let scoreTarget = 2000;
    targetScore.innerHTML = scoreTarget;

    if (gridSquare[170].classList.contains("gate")) {
      if (
        scoreNumber >= scoreTarget &&
        gridSquare[ImmigrantIndex].classList.contains("gate")
      ) {
        scoreNumber = scoreNumber;
        time = 0;
        clearInterval(ImmigrantSoundId);
        clearInterval(beaverMoveIdOne);
        clearInterval(beaverMoveIdTwo);
        clearInterval(beaverMoveIdThree);
        clearInterval(beaverMoveIdFour);
        clearInterval(beaverMoveIdFive);
        clearInterval(CountUpid);
        //clearInterval(CountUp2id);
        clearInterval(CountUp3id);
        clearInterval(timerGameItselfId);
        clearInterval(timerVisaExpireId);
        gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
        gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
        gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
        gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
        beaver.directionStore = [];
        beaver.goodDirections = [];
        beaver.directionMove = -1;
        beaver.lastDirection = 0;
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
        gridSquare[ImmigrantIndex].classList.contains("gate")
      ) {
        scoreNumber = scoreNumber;
        time = 0;
        clearInterval(ImmigrantSoundId);
        clearInterval(beaverMoveIdOne);
        clearInterval(beaverMoveIdTwo);
        clearInterval(beaverMoveIdThree);
        clearInterval(beaverMoveIdFour);
        clearInterval(beaverMoveIdFive);
        clearInterval(CountUpid);
        //clearInterval(CountUp2id);
        clearInterval(CountUp3id);
        clearInterval(timerGameItselfId);
        clearInterval(timerVisaExpireId);
        gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
        gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
        gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
        gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
        beaver.directionStore = [];
        beaver.goodDirections = [];
        beaver.directionMove = -1;
        beaver.lastDirection = 0;
        gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
        gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
        gridSquare[beaverThree.beaverIndex].classList.remove("beaverThree");
        gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
        gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
        infoBox.innerHTML = "YOU DON'T DESERVE TO BE IN CANADA!";
      }
    }*/

    //Calling the checkWin to run at a set interval 200ms
    //setInterval(checkWin, 200);

    // this runs a hard reset on eveything clearing all the timers
    /*function reset(beaver) {
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
      VisaExpireTimer.innerHTML = timeVisaExpire;
      timer5.innerHTML = timeGameItself;
      timer6.innerHTML = time6;
      gridSquare[beaver.beaverIndex].classList.remove("beaverDead");
      gridSquare[beaver.beaverIndex].classList.remove("beaverFlee");
      gridSquare[beaver.beaverIndex].classList.remove(beaver.beaverClass);
      ImmigrantIndex = 250;
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
    }*/
  }
});
