import MovingDirection from "./MovingDirection.js";

export default class Pacman {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.pacmanAnimationTimerDefault = 10;
    this.pacmanAnimationTimer = null;

    document.addEventListener("keydown", this.#keydown);

    this.#loadPacmanImages();
  }
  /*KARLO: The above was based on the info listed in lines 81 to 86 of TileMap.js See below:
  Pacman(
  column * this.tileSize,
  row * this.tileSize,
  this.tileSize,
  velocity,
  this
  */

  draw(ctx) {
    this.#move();
    this.#animate();
    ctx.drawImage(
      this.pacmanImages[this.pacmanImageIndex],
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
  }

  #loadPacmanImages() {
    const pacmanImage1 = new Image();
    pacmanImage1.src = "../images/pac0.png";

    const pacmanImage2 = new Image();
    pacmanImage2.src = "../images/pac1.png";

    const pacmanImage3 = new Image();
    pacmanImage3.src = "../images/pac2.png";

    const pacmanImage4 = new Image();
    pacmanImage4.src = "../images/pac1.png";
    //KARLO: This 4th image is for looping purposes. Remember that Pacman's mouth doesn't go straight from open to close. Having it partially open before closing makes the animation smoother.

    this.pacmanImages = [
      pacmanImage1,
      pacmanImage2,
      pacmanImage3,
      pacmanImage4,
    ];

    this.pacmanImageIndex = 0;
  }

  //CHARACTER CONTROL
  #keydown = (event) => {
    //up
    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
    }
    //down
    if (event.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
    }
    //left
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
    }
    //right
    if (event.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
    }
  };

  //CHARACTER MOVEMENT
  //KARLO: The character moves on its own, and only the direction can be controlled by the player.
  #move() {
    if (this.currentMovingDirection != this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        //COLLISSION CONTROL:
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection
          )
        )
          this.currentMovingDirection = this.requestedMovingDirection;
      }
    }

    if (
      this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.currentMovingDirection
      )
    ) {
      this.pacmanAnimationTimer = null;
      this.pacmanAnimationIndex = 1;
      return;
    } else if (
      this.currentMovingDirection != null &&
      this.pacmanAnimationTimer == null
    ) {
      this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.velocity;
        break;
      case MovingDirection.down:
        this.y += this.velocity;
        break;
      case MovingDirection.left:
        this.x -= this.velocity;
        break;
      case MovingDirection.right:
        this.x += this.velocity;
        break;
    }
  }

  #animate() {
    if (this.pacmanAnimationTimer == null) {
      return;
    }
    this.pacmanAnimationTimer--;
    if (this.pacmanAnimationTimer == 0) {
      this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
      this.pacmanImageIndex++;
      if (this.pacmanImageIndex == this.pacmanImages.length)
        this.pacmanImageIndex = 0;
    }
  }
}

/*KARLO: Explore the below instead so that character moves only upon keyboard request.
function keyPressed() {
  if(keyCode === RIGHT_ARROW) {
    if(maze.maze[angrypacman.instance.y/standarSize][angrypacman.instance.x/standarSize + 1] !== '*') {
      angrypacman.instance.movePac(0);
    }
  }
  else if(keyCode === DOWN_ARROW) {
    if(maze.maze[angrypacman.instance.y/standarSize + 1][angrypacman.instance.x/standarSize] !== '*') {
      angrypacman.instance.movePac(1);
    }
  }
  else if(keyCode === LEFT_ARROW) {
    if(maze.maze[angrypacman.instance.y/standarSize][angrypacman.instance.x/standarSize - 1] !== '*') {
      angrypacman.instance.movePac(2);
    }
  }
  else if(keyCode === UP_ARROW) {
    if(maze.maze[angrypacman.instance.y/standarSize - 1][angrypacman.instance.x/standarSize] !== '*') {
      angrypacman.instance.movePac(3);
    }
  }
}*/
