// THESE VALUES CAN BE SET TO ALTER THE GAME
// set how long the hearts work for (ms)
const hearttime = 6000;
// Set how many miliseconds between each time the ghosts move
const ghostTimePerMove = 300;
// Defining the ghosts paramters.
//---------------------------------------------------------------------
// Used in algorithams to move ghosts and pacman
const width = 20;
// Possible moves for ghost
const directions = [-1, -width, 1, width];
// Set starting values:
// pacman position
let pacIndex = 250;
// players points
let scoreNumber = 700;
// target points
let scoreTarget = 2000;
// The time played
let time = 26;
let time2 = 1;
let time3 = 1;
let time5 = 0;
// Id to ended the timer
let CountUpid;
/*let CountUp2id;*/
let CountUp3id;
let CountDown2id;
// Ids to stop the ghosts from moving
let ghostMoveIdOne;
let ghostMoveIdTwo;
let ghostMoveIdThree;
let ghostMoveIdFour;
// Id to stop the pac audio sounds
let pacSoundId;
// Used to set the games highscore
let highScoreNumber = 0;
// the   time to go along with the high score
let highScoreTime = 0;
const death = new Audio("pacman_death.wav");

const ghostOne = {
  //ghost intial starting position
  ghostIndex: 170,
  // ghost class name
  ghostClass: "ghostOne",
  // directions the ghost can move by index after removing walls
  goodDirections: [],
  // The index of those possible moves
  goodPositions: [],
  //storing ghost past moves
  directionStore: [],
  // chosen direction to move ghost (inital start)
  directionMove: -1,
  // chosen Index position to move ghost
  positionMove: null,
  // the last direction used by ghost one.
  lastDirection: 0,
  // Bias determins the way the ghosts run 1 towards, 2 awayfrom.
  bias: 1,
};
const ghostTwo = {
  ghostIndex: 169,
  ghostClass: "ghostTwo",
  goodDirections: [],
  goodPositions: [],
  directionStore: [],
  directionMove: -1,
  positionMove: null,
  lastDirection: 0,

  bias: 1,
};
const ghostThree = {
  ghostIndex: 168,
  ghostClass: "ghostThree",
  goodDirections: [],
  goodPositions: [],
  directionStore: [],
  directionMove: -1,
  positionMove: null,
  lastDirection: 0,
  bias: 1,
};
const ghostFour = {
  ghostIndex: 171,
  ghostClass: "ghostFour",
  goodDirections: [],
  goodPositions: [],
  directionStore: [],
  directionMove: -1,
  positionMove: null,
  lastDirection: 0,
  bias: 1,
};
// An array of the 4 ghosts
const ghosts = [ghostOne, ghostTwo, ghostThree, ghostFour];

// creating the grid and allocating each div a class
// ASSIGN A CLASS A NUMBER.
// empty = 0
// wall = 1
// pacman = 3
// ghost1 = 4
// heart = 5
// Gate = 6
// ghost2 = 7
// ghost3 = 8
// ghost4 = 9
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
  1, 2, 1, 2, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 2, 1, 2, 1, 2, 1,
  //Next
  1, 2, 1, 2, 1, 2, 1, 1, 8, 7, 4, 9, 1, 1, 2, 1, 2, 1, 2, 1,
  //Next
  1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1,
  //Next
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //Next
  1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
  //Next
  1, 2, 1, 2, 5, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 5, 2, 1, 2, 1,
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
  const timer = document.querySelector(".timer");
  const timer2 = document.querySelector(".timer2");
  const timer3 = document.querySelector(".timer3");
  const timer4 = document.querySelector(".timer4");
  const timer5 = document.querySelector(".timer5");
  const start = document.querySelector(".start");
  const highScore = document.querySelector(".highScore");
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
      for (let i = 0; i < ghosts.length; i++) {
        for (let i = 0; i < 16; i++) {
          clearInterval(caughtIdOne);
          clearInterval(caughtIdTwo);
          clearInterval(caughtIdThree);
          clearInterval(caughtIdFour);
        }
        startReset(ghosts[i]);
        caughtIdOne = setInterval(function () {
          pacCaught(ghostOne);
        }, 60);
        caughtIdTwo = setInterval(function () {
          pacCaught(ghostTwo);
        }, 60);
        caughtIdThree = setInterval(function () {
          pacCaught(ghostThree);
        }, 60);
        caughtIdFour = setInterval(function () {
          pacCaught(ghostFour);
        }, 60);
        start.innerHTML = "RUN!";
        start.style.backgroundColor = "red";
      }
   }*/
  });

  // const layoutClasses = ['', 'wall', 'food', 'pacmanRight', 'heart', 'warp', 'ghostOne', 'ghostTwo', 'ghostThree', 'ghostFour']
  //This function assings the correct classes depending on the layout above.
  function assignGrid(ghostOne, ghostTwo, ghostThree, ghostFour) {
    infoBox.innerHTML = "Click ↑";
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
        gridSquare[i].classList.add("ghostOne");
        ghostOne.ghostIndex = i;
      } else if (layout[i] === 7) {
        gridSquare[i].classList.add("ghostTwo");
        ghostTwo.ghostIndex = i;
      } else if (layout[i] === 8) {
        gridSquare[i].classList.add("ghostThree");
        ghostThree.ghostIndex = i;
      } else if (layout[i] === 9) {
        gridSquare[i].classList.add("ghostFour");
        ghostFour.ghostIndex = i;
      } else if (layout[i] === 10) {
        gridSquare[i].classList.add("heart");
      } else if (layout[i] === 11) {
        gridSquare[i].classList.add("letter");
      } else if (layout[i] === 12) {
        gridSquare[i].classList.add("letter2");
      } else if (layout[i] === 13) {
        gridSquare[i].classList.add("lottery");
      } else if (layout[i] === 14) {
        gridSquare[i].classList.add("paperdoc");
      } else if (layout[i] === 15) {
        gridSquare[i].classList.add("book");
      }
    }
  }
  // Calling the assignGrid function
  assignGrid(ghostOne, ghostTwo, ghostThree, ghostFour);

  // This counts to see how much food is left before you complete the level
  function checkWin() {
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
      }
      clearInterval(ghostMoveIdOne);
      clearInterval(ghostMoveIdTwo);
      clearInterval(ghostMoveIdThree);
      clearInterval(ghostMoveIdFour);
      clearInterval(CountUpid);
      /*clearInterval(CountUp2id);*/
      clearInterval(CountUp3id);
      clearInterval(CountDown2id);
      /*clearInterval(CountDownid);*/
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
  }

  //KARLO: Condition for winning the game
  /*function checkWin() {
    if (scoreNumber >= scoreTarget && gridSquare[pacIndex].classList.contains("gate") {
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
      clearInterval(ghostMoveIdOne);
      clearInterval(ghostMoveIdTwo);
      clearInterval(ghostMoveIdThree);
      clearInterval(ghostMoveIdFour);
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

  //Calling the checkWin to run at a set interval 200ms
  setInterval(checkWin, 200);
  // Function to play the Ghost sounds
  function pacSound() {
    const move = new Audio("pacman_chomp.wav");
    move.play();
  }
  //Function that moves packman using the arrow keys
  function movePacMan(e) {
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
    // colliding with heart ------------------------------------------
    if (gridSquare[pacIndex].classList.contains("heart")) {
      gridSquare[pacIndex].classList.remove("heart");
      for (let i = 0; i < ghosts.length; i++) {
        hearttaken(ghosts[i]);
      }
      setTimeout(function () {
        for (let i = 0; i < 16; i++) {
          clearInterval(caughtIdOne);
          clearInterval(caughtIdTwo);
          clearInterval(caughtIdThree);
          clearInterval(caughtIdFour);
        }
        caughtIdOne = setInterval(function () {
          pacCaught(ghostOne);
        }, 60);
        caughtIdTwo = setInterval(function () {
          pacCaught(ghostTwo);
        }, 60);
        caughtIdThree = setInterval(function () {
          pacCaught(ghostThree);
        }, 60);
        caughtIdFour = setInterval(function () {
          pacCaught(ghostFour);
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
  // -------------------- GHOST LOGIC  --------------------------------------------
  //This function evaluates all directions the ghost can move in.
  // It then removes all the moves that are into a walls
  // and the moves into other ghosts and into warping
  function chooseAndMove(ghost) {
    //  EVALUATES ALL THE CHOICES DONT CHOOSE WALL OR BACK ON ITS SELF
    ghost.goodDirections = [];
    for (let i = 0; i < directions.length; i++) {
      if (
        gridSquare[ghost.ghostIndex + directions[i]].classList.contains("wall")
      ) {
        ghost.goodDirections.push(null);
      } else if (
        gridSquare[ghost.ghostIndex + directions[i]].classList.contains("warp")
      ) {
        ghost.goodDirections.push(null);
      } else if (
        gridSquare[ghost.ghostIndex + directions[i]].classList.contains(
          "ghostOne"
        ) &&
        ghost.goodDirections.length > 2
      ) {
        ghost.goodDirections.push(null);
      } else if (
        gridSquare[ghost.ghostIndex + directions[i]].classList.contains(
          "ghostTwo"
        ) &&
        ghost.goodDirections.length > 2
      ) {
        ghost.goodDirections.push(null);
      } else if (
        gridSquare[ghost.ghostIndex + directions[i]].classList.contains(
          "ghostThree"
        ) &&
        ghost.goodDirections.length > 2
      ) {
        ghost.goodDirections.push(null);
      } else if (
        gridSquare[ghost.ghostIndex + directions[i]].classList.contains(
          "ghostFour"
        ) &&
        ghost.goodDirections.length > 2
      ) {
        ghost.goodDirections.push(null);
      } else if (
        gridSquare[ghost.ghostIndex + directions[i]].classList.contains(
          "ghostFlee"
        ) &&
        ghost.goodDirections.length > 2
      ) {
        ghost.goodDirections.push(null);
      } else if (
        gridSquare[ghost.ghostIndex + directions[i]].classList.contains(
          "ghostDead"
        ) &&
        ghost.goodDirections.length > 2
      ) {
        ghost.goodDirections.push(null);
      } else if (directions[i] === -ghost.lastDirection) {
        ghost.goodDirections.push(null);
      } else {
        ghost.goodDirections.push(directions[i]);
      }
    }
    ghost.goodDirections = ghost.goodDirections.filter((x) => x !== null);
    // choses a direction to move depending on what the bais is set to
    // and pacman locations
    pacManBias(ghost);
    // This calls the function that actually makes the move
    makeTheMove(ghost);
  }
  // This function is only used once to start the game and set the ghosts moving.
  function startGame() {
    pacSoundId = setInterval(pacSound, 650);
    CountUpid = setInterval(CountUp, 72000);
    /*CountUp2id = setInterval(CountUp2, 5000);*/
    CountUp3id = setInterval(CountUp3, 1000);
    CountDown2id = setInterval(CountDown2, 1000);

    ghostMoveIdOne = setInterval(function () {
      chooseAndMove(ghostOne);
    }, ghostTimePerMove);
    ghostMoveIdTwo = setInterval(function () {
      chooseAndMove(ghostTwo);
    }, ghostTimePerMove);
    ghostMoveIdThree = setInterval(function () {
      chooseAndMove(ghostThree);
    }, ghostTimePerMove);
    ghostMoveIdFour = setInterval(function () {
      chooseAndMove(ghostFour);
    }, ghostTimePerMove);
  }
  // this functions moves the ghosts by removing the class chaning the ghost
  // position index and the re adding the class to the new index
  // it is used to store all the previous moves of the ghosts
  function makeTheMove(ghost) {
    //this find the change of index so that it is not repeated
    ghost.directionMove = ghost.positionMove - ghost.ghostIndex;
    //Stores all previous moves
    ghost.directionStore.push(ghost.directionMove);
    //last direction is stored so that it doesn't go back on itself
    ghost.lastDirection = ghost.directionStore[ghost.directionStore.length - 1];
    // the class changes depending on if the ghosts is fleeing chasing or dead
    if (ghost.bias === 2) {
      gridSquare[ghost.ghostIndex].classList.remove("ghostFlee");
      ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove;
      gridSquare[ghost.ghostIndex].classList.add("ghostFlee");
    } else if (ghost.bias === 3) {
      gridSquare[ghost.ghostIndex].classList.remove("ghostDead");
      ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove;
      gridSquare[ghost.ghostIndex].classList.add("ghostDead");
    } else {
      gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass);
      ghost.ghostIndex = ghost.ghostIndex + ghost.directionMove;
      gridSquare[ghost.ghostIndex].classList.add(ghost.ghostClass);
    }
  }
  // ------------------- pac move direction BIAS ----------------
  // fucntion used by the ghists to find an appropiate route to chase pacman
  function towardsPacMan(ghost) {
    // return all the possible new position indexs the ghost can move.
    ghost.goodPositions = ghost.goodDirections.map((x) => x + ghost.ghostIndex);
    // all the possible positions are reduced down to the one that bring then
    // ghosts position index closest to pacmans
    const closestIndex = ghost.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - pacIndex) < Math.abs(prev - pacIndex)
        ? curr
        : prev;
    });
    // Pacmans Modulas % width.
    const pacModulas = pacIndex % width;
    // This takes the possble indexs to move to and chnages them to modulas% width.
    const posPositionsModulas = ghost.goodPositions.map((x) => x % width);
    // This then finds the modulas closest to the modulas of Pacman
    const closestModulas = posPositionsModulas.reduce(function (prev, curr) {
      return Math.abs(curr - pacModulas) < Math.abs(prev - pacModulas)
        ? curr
        : prev;
    });
    const closestModulasIndex = posPositionsModulas.findIndex(
      (x) => x === closestModulas
    );
    const closestModulasREAL = ghost.goodPositions[closestModulasIndex];
    // and array is made with the index and mod closest
    // one is randomly chosen at each junction where there is a choice.
    const idealmoves = [closestIndex, closestModulasREAL];
    ghost.positionMove =
      idealmoves[Math.floor(Math.random() * idealmoves.length)];
    return ghost.positionMove;
  }
  // modulas is not used for the other 3 bais choices just closest pos index
  function awayFromPacMan(ghost) {
    ghost.goodPositions = ghost.goodDirections.map((x) => x + ghost.ghostIndex);
    ghost.positionMove = ghost.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - pacIndex) > Math.abs(prev - pacIndex)
        ? curr
        : prev;
    });
    return ghost.positionMove;
  }
  function outOfBox(ghost) {
    ghost.goodPositions = ghost.goodDirections.map((x) => x + ghost.ghostIndex);
    ghost.positionMove = ghost.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - 111) < Math.abs(prev - 111) ? curr : prev;
    });
    return ghost.positionMove;
  }
  function sendHome(ghost) {
    ghost.goodPositions = ghost.goodDirections.map((x) => x + ghost.ghostIndex);
    ghost.positionMove = ghost.goodPositions.reduce(function (prev, curr) {
      return Math.abs(curr - 170) < Math.abs(prev - 170) ? curr : prev;
    });
    return ghost.positionMove;
  }
  // this function runs the approprate function based on the current bias.
  function pacManBias(ghost) {
    // this function get the ghosts out of the box they start in
    if (
      ghost.ghostIndex === 168 ||
      ghost.ghostIndex === 169 ||
      ghost.ghostIndex === 170 ||
      ghost.ghostIndex === 171 ||
      ghost.ghostIndex === 148 ||
      ghost.ghostIndex === 149 ||
      ghost.ghostIndex === 150 ||
      ghost.ghostIndex === 151
    ) {
      outOfBox(ghost);
    } else if (ghost.bias === 1) {
      towardsPacMan(ghost);
    } else if (ghost.bias === 2) {
      awayFromPacMan(ghost);
    } else if (ghost.bias === 3) {
      sendHome(ghost);
    }
  }
  // This function is run many times a second checking if a ghost
  // has caught pacman
  /*function pacCaught(ghost) {
    console.log("is it catching?");
    if (gridSquare[pacIndex] === gridSquare[ghost.ghostIndex]) {
      gridSquare[pacIndex].classList.remove("pacmanRight");
      gridSquare[pacIndex].classList.remove("pacmanLeft");
      gridSquare[pacIndex].classList.remove("pacmanUp");
      gridSquare[pacIndex].classList.remove("pacmanDown");
      pacDied(ghost);
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
  function pacCaught(ghostOne) {
    console.log("is it catching?");
    if (gridSquare[pacIndex] === gridSquare[ghostOne.ghostIndex]) {
      scoreNumber = scoreNumber - 40;
    }
  }

  function pacCaught(ghostTwo) {
    console.log("is it catching?");
    if (gridSquare[pacIndex] === gridSquare[ghostTwo.ghostIndex]) {
      scoreNumber = scoreNumber - 60;
    }
  }

  function pacCaught(ghostThree) {
    console.log("is it catching?");
    if (gridSquare[pacIndex] === gridSquare[ghostThree.ghostIndex]) {
      scoreNumber = scoreNumber - 90;
    }
  }

  function pacCaught(ghostFour) {
    console.log("is it catching?");
    if (gridSquare[pacIndex] === gridSquare[ghostFour.ghostIndex]) {
      scoreNumber = scoreNumber - 10;
    }
  }

  // Calling the caught function for each ghost
  let caughtIdOne = setInterval(function () {
    pacCaught(ghostOne);
  }, 60);
  let caughtIdTwo = setInterval(function () {
    pacCaught(ghostTwo);
  }, 60);
  let caughtIdThree = setInterval(function () {
    pacCaught(ghostThree);
  }, 60);
  let caughtIdFour = setInterval(function () {
    pacCaught(ghostFour);
  }, 60);
  //This function if run when pacman is caught by a ghost and dies
  function pacDied() {
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
    }
    clearInterval(ghostMoveIdOne);
    clearInterval(ghostMoveIdTwo);
    clearInterval(ghostMoveIdThree);
    clearInterval(ghostMoveIdFour);
    pacIndex = null;
    clearInterval(CountUpid);
    /*clearInterval(CountUp2id);*/
    clearInterval(CountUp3id);
    clearInterval(CountDown2id);
    /*clearInterval(CountDownid);*/
  }
  // this function is run after everything is set back to 0 inorder to play again
  function startReset(ghost) {
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
    }
    reset(ghost);
    clearInterval(pacSoundId);
    pacSoundId = setInterval(pacSound, 650);
    //restart ghosts moving
    clearInterval(ghostMoveIdOne);
    clearInterval(ghostMoveIdTwo);
    clearInterval(ghostMoveIdThree);
    clearInterval(ghostMoveIdFour);
    ghostMoveIdOne = setInterval(function () {
      chooseAndMove(ghostOne);
    }, ghostTimePerMove);
    ghostMoveIdTwo = setInterval(function () {
      chooseAndMove(ghostTwo);
    }, ghostTimePerMove);
    ghostMoveIdThree = setInterval(function () {
      chooseAndMove(ghostThree);
    }, ghostTimePerMove);
    ghostMoveIdFour = setInterval(function () {
      chooseAndMove(ghostFour);
    }, ghostTimePerMove);
  }
  // This function is run when pacman takes a heart
  function hearttaken(ghost) {
    ghost.bias = 2;
    gridSquare[ghost.ghostIndex].classList.remove("ghostDead");
    gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass);
    gridSquare[ghost.ghostIndex].classList.add("ghostFlee");
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
    }
    // this reverses the ghosts direction once Pman has taken the hearts
    /*ghost.lastDirection = -ghost.lastDirection;
    gridSquare[ghost.ghostIndex].classList.remove("ghostFlee");
    ghost.ghostIndex = ghost.ghostIndex - ghost.directionMove;
    gridSquare[ghost.ghostIndex].classList.add("ghostFlee");
    const pacKillIdOne = setInterval(function () {
      pacKill(ghostOne);
    }, 60);
    const pacKillIdTwo = setInterval(function () {
      pacKill(ghostTwo);
    }, 60);
    const pacKillIdThree = setInterval(function () {
      pacKill(ghostThree);
    }, 60);
    const pacKillIdFour = setInterval(function () {
      pacKill(ghostFour);
    }, 60);
    setTimeout(function () {
      for (let i = 0; i < 4; i++) {
        clearInterval(pacKillIdOne);
        clearInterval(pacKillIdTwo);
        clearInterval(pacKillIdThree);
        clearInterval(pacKillIdFour);
      }
      heartWareoff(ghost);
    }, hearttime);
  }
  // When a heart is taken the function is run a number of times a second
  // to check to see if pacman has killed a ghost
  /*function pacKill(ghost) {
    console.log("can pac kill");
    for (let i = 0; i < 16; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
    }*/
    // so pacMan can kill ghost
    /*if (gridSquare[pacIndex] === gridSquare[ghost.ghostIndex]) {
      scoreNumber = scoreNumber + 200;
      infoBox.innerHTML = "Ghost \n +200 Points";
      gridSquare[ghost.ghostIndex].classList.remove("ghostFlee");
      gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass);
      gridSquare[ghost.ghostIndex].classList.remove("ghostDead");
      ghost.lastDirection = -ghost.lastDirection;
      gridSquare[ghost.ghostIndex].classList.remove("ghostDead");
      ghost.ghostIndex = ghost.ghostIndex - ghost.directionMove;
      gridSquare[ghost.ghostIndex].classList.add("ghostDead");
      ghost.bias = 3;
    }*/
  }
  // this resets the ghosts to hunt pacman and stop pac man from killing
  /*function heartWareoff(ghost) {
    ghost.bias = 1;
    gridSquare[ghost.ghostIndex].classList.remove("ghostDead");
    gridSquare[ghost.ghostIndex].classList.remove("ghostFlee");
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
    if (time3 == 1) {
      time3 = time3 + 5;
    } else if (time3 < 30) {
      time3 = time3 + 6;
    } else if ((time3 = 30)) {
      time3 = 1;
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

  // KARLO: Separate timer for powerup appearance.
  function CountDown2() {
    time5 = time5 + 1;
    if (time5 == 71) {
      gridSquare[30].classList.add("book");
    }
    if (time5 == 165) {
      gridSquare[30].classList.remove("book");
      gridSquare[61].classList.add("paperdoc");
    }
    if (time5 == 237) {
      gridSquare[30].classList.remove("paperdoc");
      gridSquare[61].classList.add("letter");
    }
    if (time5 == 251) {
      gridSquare[61].classList.add("heart");
    }
    if (time5 == 323) {
      gridSquare[61].classList.remove("heart");
    }
    if (time5 == 309) {
      gridSquare[30].classList.remove("letter");
      gridSquare[61].classList.add("letter2");
    }
    if (time5 == 381) {
      gridSquare[30].classList.remove("letter2");
      gridSquare[61].classList.add("lottery");
    }
    if (time5 == 417) {
      gridSquare[30].classList.remove("lottery");
    }

    // KARLO: This set specifically for visa expiration.
    if (time5 == 71) {
      let time4 = 28;
      let CountDownid;
      CountDownid = setInterval(CountDown, 1000);
      function CountDown() {
        time4 = time4 - 1;
        timer4.innerHTML = time4;
      }
    }
  }

  // this runs a hard reset on eveything clearing all the timers
  function reset(ghost) {
    for (let i = 0; i < 4; i++) {
      clearInterval(caughtIdOne);
      clearInterval(caughtIdTwo);
      clearInterval(caughtIdThree);
      clearInterval(caughtIdFour);
    }
    scoreNumber = 0;
    time = 0;
    score.innerHTML = scoreNumber;
    timer.innerHTML = time;
    timer2.innerHTML = time2;
    timer3.innerHTML = time3;
    gridSquare[ghost.ghostIndex].classList.remove("ghostDead");
    gridSquare[ghost.ghostIndex].classList.remove("ghostFlee");
    gridSquare[ghost.ghostIndex].classList.remove(ghost.ghostClass);
    pacIndex = 250;
    ghost.directionStore = [];
    ghost.goodDirections = [];
    ghost.directionMove = -1;
    ghost.lastDirection = 0;
    gridSquare[ghostOne.ghostIndex].classList.remove("ghostOne");
    gridSquare[ghostTwo.ghostIndex].classList.remove("ghostTwo");
    gridSquare[ghostThree.ghostIndex].classList.remove("ghostThree");
    gridSquare[ghostFour.ghostIndex].classList.remove("ghostFour");
    ghostOne.ghostIndex = 170;
    ghostTwo.ghostIndex = 169;
    ghostOne.ghostIndex = 168;
    ghostTwo.ghostIndex = 171;
    ghost.bias = 1;
    assignGrid(ghostOne, ghostTwo, ghostThree, ghostFour);
  }
});
