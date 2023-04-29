// Set how many miliseconds between each time the beavers move
let beaverTimePerMove = 300;
// Defining the beavers paramters.
// Used in algorithams to move beavers and Immigrant
const width = 20;
// Possible moves for beaver
const directions = [-1, -width, 1, width];
// Set starting values:
// Immigrant position
let ImmigrantIndex = 250;
// players points
let scoreNumber = 329;
// scoreTargetpoints
let scoreTarget = 799;
// The time played
let timeAgeYear = 27;
let timeAgeMonth = 1;
let timeAgeDay = 15;
let timeVisa = 30;
let timeGame = 120;
let immune = false;
let boxInfo = "Collect Power-ups that Appear!";
let boxInfo2 = "--";
let boxBanner = "CAN YOU BE CANADIAN ENOUGH, EMERY?";

// Id to end timers
let CountUpAgeYearId;
let CountUpAgeDayId;
let CountDownGameId;
//let CountDownVisaId;

// Ids to stop the beavers from moving
let beaverMoveIdOne;
let beaverMoveIdTwo;
let beaverMoveIdThree;
let beaverMoveIdFour;
let beaverMoveIdFive;
// Id to stop the Immigrant audio sounds
let ImmigrantSoundId;
const winAudio = new Audio("Immigrant_win.wav");
const loseAudio = new Audio("Immigrant_loss.wav");
const cheerAudio = new Audio("Immigrant_cheer.mp3");
const booAudio = new Audio("Immigrant_boo.mp3");
const startAudio = new Audio("canadatheme.mp3");
function ImmigrantSound() {
  const chomp = new Audio("Immigrant_chomp.mp3");
  chomp.play();
}
function powerUpSound() {
  const theme = new Audio("powerup.mp3");
  theme.play();
}
function hitSound() {
  var theme = new Audio("hit.mp3");
  theme.play();
}
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
// An array of the beavers
const beavers = [beaverOne, beaverTwo, beaverThree, beaverFour, beaverFive];

// Creating the grid and allocating each div a class
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  //Next
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //Next
  1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1,
  //Next
  1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,
  //Next
  1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1,
  //Next
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //Next
  1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1,
  //Next
  1, 0, 1, 0, 1, 0, 1, 1, 18, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1,
  //Next
  1, 0, 1, 0, 1, 0, 1, 1, 8, 7, 4, 9, 1, 1, 0, 1, 0, 1, 0, 1,
  //Next
  1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1,
  //Next
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //Next
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //Next
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //Next
  1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1,
  //Next
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //Next
  1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1,
  //Next
  1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,
  //Next
  1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1,
  //Next
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
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
  startAudio.play();

  // Acessing the DOM
  const gridSquare = document.querySelectorAll(".gridSquare");
  const infoBox = document.querySelector(".infoBox");
  const infoBox2 = document.querySelector(".infoBox2");
  const infoBanner = document.querySelector(".infoBanner");
  const score = document.querySelector(".score");
  const targetScore = document.querySelector(".targetScore");
  const timerAgeYear = document.querySelector(".timerAgeYear");
  const timerAgeMonth = document.querySelector(".timerAgeMonth");
  const timerAgeDay = document.querySelector(".timerAgeDay");
  const timerVisa = document.querySelector(".timerVisa");
  const timerGame = document.querySelector(".timerGame");
  const start = document.querySelector(".start");
  const left = document.querySelector(".left");
  const up = document.querySelector(".up");
  const right = document.querySelector(".right");
  const down = document.querySelector(".down");

  //This event listener prevents the arrow keys from scrolling
  document.addEventListener("keydown", preventDefultScroll);
  // eventlistner to start the game
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      // check if Enter key was pressed
      // if it says start run the game for the first time.
      if (start.innerHTML === "PRESS BUTTON TO BEGIN") {
        startGame();
        document.addEventListener("keydown", moveImmigrant);
        start.innerHTML = "GO! GO! GO!";
        //infoBox.innerHTML = "TOIL TOIL TOIL!!!";
        start.style.backgroundColor = "red";
      }
      startAudio.pause();
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
    infoBox.innerHTML = "--";
    infoBox2.innerHTML = boxInfo2;
    infoBanner.innerHTML = "CAN YOU BE CANADIAN ENOUGH, EMERY?";
    infoBanner.innerHTML = boxBanner;
    for (let i = 0; i < layout.length; i++) {
      // gridSquare[i].classList.add(layoutClasses[layout[i]])
      if (layout[i] === 1) {
        gridSquare[i].classList.add("wall");
      } /*else if (layout[i] === 0) {
        gridSquare[i].classList.add("food");
      }*/ else if (layout[i] === 3) {
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
      } else if (layout[i] === 18) {
        gridSquare[i].classList.add("book2");
      } else if (layout[i] === 19) {
        gridSquare[i].classList.add("money");
      }
    }
  }
  // Calling the assignGrid function
  assignGrid(beaverOne, beaverTwo, beaverThree, beaverFour, beaverFive);

  //Function that moves Immigrant using the arrow keys
  function moveImmigrant(e) {
    //infoBox.innerHTML = "TOIL TOIL TOIL!!!";
    ImmigrantSound();
    scoreTarget = scoreTarget;
    targetScore.innerHTML = scoreTarget;
    boxInfo = boxInfo;
    infoBox.innerHTML = boxInfo;
    boxInfo2 = boxInfo2;
    infoBox2.innerHTML = boxInfo2;
    console.log("immune status:", immune);
    gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
    gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
    gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
    gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
    switch (e.keyCode) {
      case 65: // left arrow
        left.classList.add("active");
        setTimeout(() => left.classList.remove("active"), 100);
        if (gridSquare[ImmigrantIndex - 1].classList.contains("wall"))
          ImmigrantIndex += 0;
        else if (ImmigrantIndex % width !== 0) ImmigrantIndex -= 1;
        gridSquare[ImmigrantIndex].classList.add("ImmigrantLeft");
        break;
      case 87: // upp arrow
        up.classList.add("active");
        setTimeout(() => up.classList.remove("active"), 100);
        if (gridSquare[ImmigrantIndex - width].classList.contains("wall"))
          ImmigrantIndex += 0;
        else if (ImmigrantIndex - width >= 0) ImmigrantIndex -= width;
        gridSquare[ImmigrantIndex].classList.add("ImmigrantUp");
        break;
      case 68: // right arrow
        right.classList.add("active");
        setTimeout(() => right.classList.remove("active"), 100);
        if (gridSquare[ImmigrantIndex + 1].classList.contains("wall"))
          ImmigrantIndex += 0;
        else if (ImmigrantIndex % width < width - 1) ImmigrantIndex += 1;
        gridSquare[ImmigrantIndex].classList.add("ImmigrantRight");
        break;
      case 83: //down arrow
        down.classList.add("active");
        setTimeout(() => down.classList.remove("active"), 100);
        if (gridSquare[ImmigrantIndex + width].classList.contains("wall"))
          ImmigrantIndex += 0;
        else if (ImmigrantIndex + width < width * width)
          ImmigrantIndex += width;
        gridSquare[ImmigrantIndex].classList.add("ImmigrantDown");
        break;
    }

    // colliding with powerups -----------------------
    if (gridSquare[ImmigrantIndex].classList.contains("book")) {
      gridSquare[ImmigrantIndex].classList.remove("book");
      powerUpSound();
      scoreNumber = scoreNumber + 30;
      score.innerHTML = scoreNumber;
      boxInfo = "+30 : Canadian degree!";
      boxInfo2 = "You're now smart enough by Canadian standards.";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }

    if (gridSquare[ImmigrantIndex].classList.contains("book2")) {
      gridSquare[ImmigrantIndex].classList.remove("book2");
      powerUpSound();
      scoreNumber = scoreNumber + 30;
      score.innerHTML = scoreNumber;
      boxInfo = "+30: English proficiency!";
      boxInfo2 = "They can now understand you in Canada!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }

    if (gridSquare[ImmigrantIndex].classList.contains("paperdoc")) {
      gridSquare[ImmigrantIndex].classList.remove("paperdoc");
      powerUpSound();
      scoreNumber = scoreNumber + 40;
      score.innerHTML = scoreNumber;
      boxInfo = "+40: Canadian job experience!";
      boxInfo2 = "You're not useless in Canada!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }

    if (gridSquare[ImmigrantIndex].classList.contains("letter1")) {
      gridSquare[ImmigrantIndex].classList.remove("letter1");
      powerUpSound();
      scoreNumber = scoreNumber + 40;
      score.innerHTML = scoreNumber;
      boxInfo = "+40: Canadian job offer!";
      boxInfo2 = "You're dependable in Canada!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }

    if (gridSquare[ImmigrantIndex].classList.contains("heart1")) {
      gridSquare[ImmigrantIndex].classList.remove("heart1");
      powerUpSound();
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
      boxInfo = "+10: Partner's Canadian job offer!";
      boxInfo2 = "Your partner's dependable in Canada!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }

    if (gridSquare[ImmigrantIndex].classList.contains("heart2")) {
      gridSquare[ImmigrantIndex].classList.remove("heart2");
      powerUpSound();
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
      boxInfo = "+10 : Partner's added experience!";
      boxInfo2 = "Your partner's more dependable now!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }

    if (gridSquare[ImmigrantIndex].classList.contains("badge1")) {
      gridSquare[ImmigrantIndex].classList.remove("badge1");
      powerUpSound();
      scoreNumber = scoreNumber + 600;
      score.innerHTML = scoreNumber;
      boxInfo = "+600 : Nominated by province!";
      boxInfo2 = "1/13 of Canada wants you!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }

    if (gridSquare[ImmigrantIndex].classList.contains("letter2")) {
      gridSquare[ImmigrantIndex].classList.remove("letter2");
      powerUpSound();
      scoreNumber = scoreNumber + 200;
      score.innerHTML = scoreNumber;
      boxInfo = "+200 : LMIA by your Employer!";
      boxInfo2 = "Someone finds you one of a kind!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }

    if (gridSquare[ImmigrantIndex].classList.contains("lottery")) {
      gridSquare[ImmigrantIndex].classList.remove("lottery");
      powerUpSound();
      scoreTarget = 75;
      targetScore.innerHTML = scoreTarget;
      boxInfo = "Historic CRS Low!";
      boxInfo2 = "Lucky you!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }
    if (gridSquare[ImmigrantIndex].classList.contains("money")) {
      gridSquare[ImmigrantIndex].classList.remove("money");
      gridSquare[170].classList.add("gate");
      powerUpSound();
      boxInfo = "Application fees paid!";
      boxInfo2 = "You paid for your opportunity!";
      infoBox.innerHTML = boxInfo;
      infoBox2.innerHTML = boxInfo2;
      immune = true;
      setTimeout(() => {
        immune = false;
      }, 3000);
    }
  }

  // Preventing arrow keys from scrolling
  function preventDefultScroll(e) {
    if ([32, 37, 38, 39, 40, 16].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }
  // -------------------- beaver LOGIC  --------------------------------------------
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

    // Chooses a direction to move depending on what the basis is set to and Immigrant locations
    ImmigrantBias(beaver);

    // This calls the function that actually makes the move
    makeTheMove(beaver);
  }

  // Used once to start the game and set the beavers moving.
  function startGame() {
    //ImmigrantSoundId = setInterval(ImmigrantSound, 650);
    //var theme = new Audio('canadatheme.wav');
    //theme.play();
    CountUpAgeYearId = setInterval(CountUpAgeYear, 24000);
    CountUpAgeDayId = setInterval(CountUpAgeDay, 1000);
    CountDownGameId = setInterval(CountDownGame, 1000);

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
  // fucntion used by the beavers to find an appropiate route to chase Immigrant
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
  // Function for reducing score when hit by monsters.
  function ImmigrantCaughtCyan(beaverOne) {
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverOne.beaverIndex]) {
      if (!immune) {
        hitSound();
        console.log("hit by 1");
        scoreNumber = scoreNumber - 40;
        score.innerHTML = scoreNumber;
        console.log("hit by one");
        boxInfo = "-40 : Got fired!";
        boxInfo2 = "You're worthless in Canada!";
        infoBox.innerHTML = boxInfo;
        infoBox2.innerHTML = boxInfo2;
        immune = true;
        setTimeout(() => {
          immune = false;
        }, 3000);
      }
    }
  }
  function ImmigrantCaughtOrange(beaverTwo) {
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverTwo.beaverIndex]) {
      if (!immune) {
        hitSound();
        console.log("hit by 2");
        scoreNumber = scoreNumber - 60;
        score.innerHTML = scoreNumber;
        boxInfo = "-60 : Education rejected!";
        boxInfo2 = "You're not smart enough in Canada!";
        infoBox.innerHTML = boxInfo;
        infoBox2.innerHTML = boxInfo2;
        immune = true;
        setTimeout(() => {
          immune = false;
        }, 3000);
      }
    }
  }
  function ImmigrantCaughtPink(beaverThree) {
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverThree.beaverIndex]) {
      if (!immune) {
        hitSound();
        console.log("hit by 3");
        scoreNumber = scoreNumber - 10;
        score.innerHTML = scoreNumber;
        boxInfo = "-10 : Partner fired!";
        boxInfo2 = "Your partner's worthless in Canada!";
        infoBox.innerHTML = boxInfo;
        infoBox2.innerHTML = boxInfo2;
        immune = true;
        setTimeout(() => {
          immune = false;
        }, 3000);
      }
    }
  }
  function ImmigrantCaughtKing(beaverFour) {
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverFour.beaverIndex]) {
      if (!immune) {
        hitSound();
        console.log("hit by 4");
        scoreNumber = scoreNumber - 450;
        score.innerHTML = scoreNumber;
        boxInfo = "-450 : Life's unexpected turn!";
        boxInfo2 = "Life doesn't want you in Canada!";
        infoBox.innerHTML = boxInfo;
        infoBox2.innerHTML = boxInfo2;
        immune = true;
        setTimeout(() => {
          immune = false;
        }, 3000);
      }
    }
  }
  function ImmigrantCaughtOriginal(beaverFive) {
    if (gridSquare[ImmigrantIndex] === gridSquare[beaverFive.beaverIndex]) {
      if (!immune) {
        hitSound();
        console.log("hit by 5");
        scoreNumber = scoreNumber - 15;
        score.innerHTML = scoreNumber;
        infoBox2.innerHTML = "-15 : Irrelevant job experience!";
        boxInfo2 = "You're useless in Canada!";
        infoBox.innerHTML = boxInfo;
        infoBox2.innerHTML = boxInfo2;
        immune = true;
        setTimeout(() => {
          immune = false;
        }, 3000);
      }
    }
  }
  // Calling the caught function for each beaver
  let caughtIdOne = setInterval(function () {
    ImmigrantCaughtCyan(beaverOne);
  }, 30);
  let caughtIdTwo = setInterval(function () {
    ImmigrantCaughtOrange(beaverTwo);
  }, 30);
  let caughtIdThree = setInterval(function () {
    ImmigrantCaughtPink(beaverThree);
  }, 30);
  let caughtIdFour = setInterval(function () {
    ImmigrantCaughtKing(beaverFour);
  }, 30);
  let caughtIdFive = setInterval(function () {
    ImmigrantCaughtOriginal(beaverFive);
  }, 30);

  // Counts up the Year in Age, affects score by change in year. Don't change the values because they reflect permanent residency computations for age.
  function CountUpAgeYear() {
    boxInfo = "BIRTHDAY!";
    infoBox.innerHTML = boxInfo;
    boxBanner = "TIME IS TICKING!";
    infoBanner.innerHTML = boxBanner;
    boxInfo2 = "YOU GOT OLDER!";
    infoBox2.innerHTML = boxInfo2;
    if (timeAgeYear < 28) {
      scoreNumber = scoreNumber + 10;
      score.innerHTML = scoreNumber;
    } else if (timeAgeYear >= 28) {
      scoreNumber = scoreNumber - 10;
      score.innerHTML = scoreNumber;
    }
  }

  // Counts up the time for the Days (which affects Months) in Age, resets its everytime it reaches 12.
  function CountUpAgeDay() {
    timeAgeDay = timeAgeDay;
    console.log(timeAgeDay);
    timerAgeDay.innerHTML = timeAgeDay;
    if (timeAgeDay == 15) {
      //timeAgeDay = timeAgeDay;
      timeAgeDay = timeAgeDay + 15;
      timerAgeDay.innerHTML = timeAgeDay;
    } else if (timeAgeDay == 30) {
      timeAgeDay = 15;
      timerAgeDay.innerHTML = timeAgeDay;
      if (timeAgeMonth < 12) {
        timeAgeMonth = timeAgeMonth + 1;
        timerAgeMonth.innerHTML = timeAgeMonth;
      } else {
        timeAgeMonth = 1;
        timerAgeMonth.innerHTML = timeAgeMonth;
        timeAgeYear = timeAgeYear + 1;
        timerAgeYear.innerHTML = timeAgeYear;
      }
    }
  }

  // Timer for powerup appearance.
  function CountDownGame() {
    timeGame = timeGame - 1;
    //console.log(timeGame);
    timerGame.innerHTML = timeGame;
    if (timeGame == 110) {
      gridSquare[29].classList.add("book");
    }
    if (timeGame == 100) {
      gridSquare[29].classList.remove("book");
      gridSquare[78].classList.add("book2");
    }
    if (timeGame == 90) {
      gridSquare[78].classList.remove("book2");
      gridSquare[358].classList.add("paperdoc");
    }
    if (timeGame == 80) {
      gridSquare[358].classList.remove("paperdoc");
      gridSquare[277].classList.add("letter1");
    }
    if (timeGame == 70) {
      gridSquare[277].classList.remove("letter1");
      gridSquare[185].classList.add("heart1");
    }
    if (timeGame == 60) {
      gridSquare[185].classList.remove("heart1");
      gridSquare[253].classList.add("heart2");
    }
    if (timeGame == 50) {
      gridSquare[253].classList.remove("heart2");
      gridSquare[367].classList.add("heart2");
    }
    if (timeGame == 40) {
      gridSquare[367].classList.remove("heart2");
      gridSquare[289].classList.add("badge1");
    }
    if (timeGame == 30) {
      gridSquare[289].classList.remove("badge1");
      gridSquare[336].classList.add("letter2");
      if (scoreNumber >= scoreTarget) {
        boxBanner = "YOU'RE ON TRACK WITH YOUR DREAMS!";
        infoBanner.innerHTML = boxBanner;
      } else if (scoreNumber >= scoreTarget) {
        boxBanner = "ARE YOU WORKING HARD ENOUGH?!";
        infoBanner.innerHTML = boxBanner;
      }
    }
    if (timeGame == 20) {
      gridSquare[336].classList.remove("letter2");
      gridSquare[262].classList.add("lottery");
      gridSquare[218].classList.add("money");
    }
    if (timeGame == 10) {
      gridSquare[262].classList.remove("lottery");
      if (scoreNumber >= scoreTarget) {
        boxBanner = "JUST A LITTLE MORE, EMERY!";
        infoBanner.inneerHTML = boxBanner;
      } else if (scoreNumber >= scoreTarget) {
        boxBanner = "YOU BETTER PRAY FOR A MIRACLE!";
        infoBanner.inneerHTML = boxBanner;
      }
    }
    /*if (timeGame == 8) {
      gridSquare[170].classList.add("gate");
    }*/

    // Specifically for visa expiration and game ending.
    if (timeGame == 30) {
      console.log(timeGame);
      timeVisa = timeVisa;
      timerVisa.innerHTML = 30;
      let CountDownVisaId;
      CountDownVisaId = setInterval(CountDownVisa, 1000);
      function CountDownVisa() {
        timeVisa = timeVisa - 1;
        timerVisa.innerHTML = timeVisa;
        if (timeVisa > 0) {
          scoreTarget = scoreTarget;
          targetScore.innerHTML = scoreTarget;
          if (gridSquare[170].classList.contains("gate")) {
            if (
              scoreNumber >= scoreTarget &&
              gridSquare[ImmigrantIndex].classList.contains("gate")
            ) {
              winAudio.play();
              boxInfo = "RESIDENCY APPLICATION APPROVED!";
              infoBox.innerHTML = boxInfo;
              boxBanner = "YOU GET TO LIVE IN CANADA!";
              infoBanner.innerHTML = boxBanner;
              boxInfo2 = "CONGRATULATIONS!";
              infoBox2.innerHTML = boxInfo2;
              document.body.style.background = "url('images/Canada.gif')";
              setTimeout(function () {
                cheerAudio.play();
              }, 2000);
              scoreNumber = scoreNumber;
              timeAgeYear = 0;
              clearInterval(ImmigrantSoundId);
              clearInterval(beaverMoveIdOne);
              clearInterval(beaverMoveIdTwo);
              clearInterval(beaverMoveIdThree);
              clearInterval(beaverMoveIdFour);
              clearInterval(beaverMoveIdFive);
              clearInterval(CountUpAgeYearId);
              clearInterval(CountUpAgeDayId);
              clearInterval(CountDownGameId);
              clearInterval(CountDownVisaId);
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
              ImmigrantIndex = null;
              gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
              gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
              gridSquare[beaverThree.beaverIndex].classList.remove(
                "beaverThree"
              );
              gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
              gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
              setTimeout(function () {
                window.location.href = "index.html";
              }, 10000);
            } else if (
              scoreNumber < scoreTarget &&
              gridSquare[ImmigrantIndex].classList.contains("gate")
            ) {
              boxInfo = "YOU DON'T HAVE ENOUGH POINTS YET!";
              infoBox.innerHTML = boxInfo;
              boxInfo2 = "YOU NEED TO WORK HARDER!";
              infoBox2.innerHTML = boxInfo2;
            }
          }
        }
        if (timeVisa == 0) {
          clearInterval(CountDownVisaId);
          scoreNumber = scoreNumber;
          timeAgeYear = 0;
          clearInterval(ImmigrantSoundId);
          clearInterval(beaverMoveIdOne);
          clearInterval(beaverMoveIdTwo);
          clearInterval(beaverMoveIdThree);
          clearInterval(beaverMoveIdFour);
          clearInterval(beaverMoveIdFive);
          clearInterval(CountUpAgeYearId);
          clearInterval(CountUpAgeDayId);
          clearInterval(CountDownGameId);
          clearInterval(CountDownVisaId);
        }
      }
    }

    if (timeGame == 0) {
      CountDownGameId = CountDownGameId;
      clearInterval(CountDownGameId);
      timeGame = 0;
      timerGame.innerHTML = timeGame;
      timeVisa = timeVisa;
      timerVisa.innerHTML = timeVisa;
      let CountDownVisaId;
      CountDownVisaId = setInterval(CountDownVisa, 1000);
      function CountDownVisa() {
        console.log(timeGame);
        if (timeVisa == 0) {
          timeVisa = 0;
          timerVisa.innerHTML = timeVisa;
          if (gridSquare[170].classList.contains("gate")) {
            if (
              scoreNumber < scoreTarget &&
              gridSquare[ImmigrantIndex].classList.contains("gate")
            ) {
              loseAudio.play();
              boxInfo = "RESIDENCY APPLICATION REJECTED!";
              infoBox.innerHTML = boxInfo;
              boxBanner = "STAY IN YOUR COUNTRY LOSER!";
              infoBanner.innerHTML = boxBanner;
              boxInfo2 = "YOU DON'T DESERVE CANADA!";
              infoBox2.innerHTML = boxInfo2;
              document.body.style.background =
                "url('images/denied.gif') repeat left top";
              document.body.style.backgroundColor = "black";
              setTimeout(function () {
                window.location.href = "index.html";
              }, 10000);
              clearInterval(CountDownVisaId);
              scoreNumber = scoreNumber;
              timeAgeYear = 0;
              clearInterval(ImmigrantSoundId);
              clearInterval(beaverMoveIdOne);
              clearInterval(beaverMoveIdTwo);
              clearInterval(beaverMoveIdThree);
              clearInterval(beaverMoveIdFour);
              clearInterval(beaverMoveIdFive);
              clearInterval(CountUpAgeYearId);
              clearInterval(CountUpAgeDayId);
              clearInterval(CountDownGameId);
              clearInterval(CountDownVisaId);
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
              ImmigrantIndex = null;
              gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
              gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
              gridSquare[beaverThree.beaverIndex].classList.remove(
                "beaverThree"
              );
              gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
              gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
              setTimeout(function () {
                booAudio.play();
              }, 1500);
            } else if (!gridSquare[ImmigrantIndex].classList.contains("gate")) {
              loseAudio.play();
              boxInfo = "RESIDENCY APPLICATION REJECTED!";
              infoBox.innerHTML = boxInfo;
              boxBanner = "STAY IN YOUR COUNTRY LOSER!";
              infoBanner.innerHTML = boxBanner;
              boxInfo2 = "YOU DON'T DESERVE CANADA!";
              infoBox2.innerHTML = boxInfo2;
              document.body.style.background =
                "url('images/Denied.gif') repeat left top";
              document.body.style.backgroundColor = "black";
              setTimeout(function () {
                window.location.href = "index.html";
              }, 10000);
              clearInterval(CountDownVisaId);
              scoreNumber = scoreNumber;
              timeAgeYear = 0;
              clearInterval(ImmigrantSoundId);
              clearInterval(beaverMoveIdOne);
              clearInterval(beaverMoveIdTwo);
              clearInterval(beaverMoveIdThree);
              clearInterval(beaverMoveIdFour);
              clearInterval(beaverMoveIdFive);
              clearInterval(CountUpAgeYearId);
              clearInterval(CountUpAgeDayId);
              clearInterval(CountDownGameId);
              clearInterval(CountDownVisaId);
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
              ImmigrantIndex = null;
              gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
              gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
              gridSquare[beaverThree.beaverIndex].classList.remove(
                "beaverThree"
              );
              gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
              gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
              gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
              gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
              setTimeout(function () {
                booAudio.play();
              }, 1500);
            } else if (
              gridSquare[ImmigrantIndex].classList.contains("gate") &&
              scoreNumber >= scoreTarget
            ) {
              winAudio.play();
              boxInfo = "RESIDENCY APPLICATION APPROVED!";
              infoBox.innerHTML = boxInfo;
              boxBanner = "YOU GET TO LIVE IN CANADA!";
              infoBanner.innerHTML = boxBanner;
              boxInfo2 = "CONGRATULATIONS!";
              infoBox2.innerHTML = boxInfo2;
              document.body.style.background = "url('images/Canada.gif')";
              setTimeout(function () {
                window.location.href = "index.html";
              }, 10000);
              clearInterval(CountDownVisaId);
              scoreNumber = scoreNumber;
              timeAgeYear = 0;
              clearInterval(ImmigrantSoundId);
              clearInterval(beaverMoveIdOne);
              clearInterval(beaverMoveIdTwo);
              clearInterval(beaverMoveIdThree);
              clearInterval(beaverMoveIdFour);
              clearInterval(beaverMoveIdFive);
              clearInterval(CountUpAgeYearId);
              clearInterval(CountUpAgeDayId);
              clearInterval(CountDownGameId);
              clearInterval(CountDownVisaId);
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantUp");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantRight");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantDown");
              gridSquare[ImmigrantIndex].classList.remove("ImmigrantLeft");
              ImmigrantIndex = null;
              gridSquare[beaverOne.beaverIndex].classList.remove("beaverOne");
              gridSquare[beaverTwo.beaverIndex].classList.remove("beaverTwo");
              gridSquare[beaverThree.beaverIndex].classList.remove(
                "beaverThree"
              );
              gridSquare[beaverFour.beaverIndex].classList.remove("beaverFour");
              gridSquare[beaverFive.beaverIndex].classList.remove("beaverFive");
              setTimeout(function () {
                cheerAudio.play();
              }, 2000);
            }
          }
        }
      }
    }
  }
});
