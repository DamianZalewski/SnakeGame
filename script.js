 const canvas = document.querySelector('canvas');
 const ctx = canvas.getContext('2d');
 canvas.width = screen.width;
 canvas.height = screen.height;
 var cw = canvas.width;
 var ch = canvas.height;
 var score = 0;
 var stage = 0; // 0 - start, 1 - init, 2 - game, 3 - end
 var snake = {
     x: cw / 2,
     y: ch / 2,
     width: 15,
     height: 15,
     backgroundColor: "green",
     direction: 3,
     length: 5,

 };
 var apple = {
     x: 1,
     y: 1,
     width: 10,
     height: 10,

 }
 var apples = [];
 var path = [[cw / 2 + 2 * snake.width, ch / 2],
             [cw / 2 + snake.width, ch / 2],
             [cw / 2, ch / 2],
             [cw / 2 - snake.width, ch / 2],
             [cw / 2 - 2 * snake.width, ch / 2]];
 var gameOverFontSize = 40;
 var startMenuFontSize = 30;
 var showScoreFontSize = 30;
 var authorFontSize = 16;
 var gameOverText = "PRESS ENTER TO START AGAIN!";
 var startText = "PRESS ANY KEY TO START!";
 //responsive
 if (cw <= 450) {
     startMenuFontSize = 20;
     showScoreFontSize = 22;
     gameOverFontSize = 18;
 }
 if (cw <= 1200) {
     gameOverText = "TOUCH TO START AGAIN!";
     startText = "TOUCH ANYWHERE TO START!";
 }

 setInterval(game, 40);
 addApple();

 function control(e) {
     var key = e.keyCode;
     if (key == 37 && snake.direction != 3) snake.direction = 1;
     else //left
         if (key == 38 && snake.direction != 4) snake.direction = 2;
         else //up
             if (key == 39 && snake.direction != 1) snake.direction = 3;
             else //right
                 if (key == 40 && snake.direction != 2) snake.direction = 4; //down
 }

 function game() {
     switch (stage) {
         case 0:
             window.addEventListener("keydown", startGame, false);
             window.addEventListener("touchstart", startGame, false);
             gameBoard();
             drawSnake();
             startMenuText();
             break;
         case 1:

             window.addEventListener("keydown", control, false);
             window.addEventListener("touchstart", touchControl, false);
             setInterval(addApple, 3000);
             stage = 2;
             break;
         case 2:
             gameBoard();
             snakeMove();
             snakeCollision();
             appleCollision();
             drawApple();
             drawSnake();
             showScore();
             break;
         case 3:
             gameBoard();
             gameOver();
             clearInterval(addApple);
             window.removeEventListener("keydown", control);
             window.removeEventListener("touchstart", touchControl);
             window.addEventListener("keydown", startGameAgain, false);
             window.addEventListener("touchstart", touchGameAgain, false);
             break;
     }
 }

 function touchControl(e) {
     var touchObject = e.changedTouches[0]
     var touchX = touchObject.clientX;
     var touchY = touchObject.clientY;
     if (touchY > snake.y && snake.direction != 2) snake.direction = 4;
     else
     if (touchY < snake.y && snake.direction != 4) snake.direction = 2;
     else
     if (touchX > snake.x && snake.direction != 1) snake.direction = 3;
     else
     if (touchX < snake.x && snake.direction != 3) snake.direction = 1;
 }

 function startGameAgain(e) {
     if (e.keyCode == 13) {
         stage = 0;
         window.removeEventListener("keydown", startGameAgain);
         window.removeEventListener("touchstart", startGameAgain);
         clearStats();
     }
 }

 function touchGameAgain() {
     stage = 0;
     window.removeEventListener("keydown", startGameAgain);
     window.removeEventListener("touchstart", startGameAgain);
     clearStats();
 }

 function clearStats() {
     snake = {
         x: cw / 2,
         y: ch / 2,
         width: 15,
         height: 15,
         backgroundColor: "green",
         direction: 3,
         length: 5,
     };
     apple = {
         x: 1,
         y: 1,
         width: 10,
         height: 10,
     };
     apples = [];
     path = [[cw / 2 + 2 * snake.width, ch / 2],
             [cw / 2 + snake.width, ch / 2],
             [cw / 2, ch / 2],
             [cw / 2 - snake.width, ch / 2],
             [cw / 2 - 2 * snake.width, ch / 2]];
     clearInterval(addApple);
     score = 0;
 }

 function gameOver() {
     ctx.fillStyle = "red";
     ctx.font = gameOverFontSize + "px Arial";
     ctx.textAlign = "center";
     ctx.fillText("GAME OVER", cw / 2, 150);
     ctx.fillText("SCORE : " + score, cw / 2, 250);
     ctx.fillText(gameOverText, cw / 2, ch - 150);
 }

 function startMenuText() {
     ctx.fillStyle = "white";
     ctx.font = startMenuFontSize + "px Arial";
     ctx.textAlign = "center";
     ctx.fillText(startText, cw / 2, 150);
     ctx.font = authorFontSize + "px Arial";
     ctx.textAlign = "left";
     ctx.fillText("DAMIAN ZALEWSKI", 10, 30);
 }

 function showScore() {
     ctx.fillStyle = "white";
     ctx.font = showScoreFontSize + "px Arial";
     ctx.textAlign = "center";
     ctx.fillText("SCORE : " + score, cw / 2, 150);
 }

 function startGame() {
     stage = 1;
     window.removeEventListener("keydown", startGame);
     window.removeEventListener("touchstart", startGame);
 }

 function appleCollision() {
     var rect1 = {
         x: path[0][0],
         y: path[0][1],
         width: snake.width,
         height: snake.height
     }
     for (var i = 0; i <= apples.length - 1; i++) {
         var rect2 = {
             x: apples[i][0],
             y: apples[i][1],
             width: apple.width,
             height: apple.height,
             id: i
         }
         if (rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.height + rect1.y > rect2.y) {
             grow();
             grow();
             apples.splice(rect2.id, 1);
             score += 100;
             break;
         }
     };
 }

 function snakeCollision() {
     var rect1 = {
         x: path[0][0],
         y: path[0][1],
         width: snake.width,
         height: snake.height
     }
     for (var i = 2; i <= path.length - 1; i++) {
         var rect2 = {
             x: path[i][0],
             y: path[i][1],
             width: snake.width,
             height: snake.height,
             id: i
         }
         if (rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.height + rect1.y > rect2.y) stage = 3;

     };
 }

 function snakeMove() {
     if (snake.x < -snake.width) path[0][0] = cw;
     if (snake.x > cw) path[0][0] = -snake.width;
     if (snake.y < -snake.height) path[0][1] = ch - snake.height;
     if (snake.y > ch) path[0][1] = -snake.height;
     if (snake.direction == 1) path[0][0] -= snake.width;
     if (snake.direction == 2) path[0][1] -= snake.width;
     if (snake.direction == 3) path[0][0] += snake.width;
     if (snake.direction == 4) path[0][1] += snake.width;
     for (var i = snake.length - 1; i > 0; i--) {
         path[i][0] = path[i - 1][0];
         path[i][1] = path[i - 1][1];
     }
     snake.x = path[0][0];
     snake.y = path[0][1];
 }

 function drawSnake() {
     ctx.fillStyle = snake.backgroundColor;
     for (var i = 0; i < snake.length; i++)
         ctx.fillRect(path[i][0], path[i][1], snake.width, snake.height);
 }

 function gameBoard() {
     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, cw, ch);
 }

 function addApple() {
     apple.x = Math.floor(Math.random() * cw);
     apple.y = Math.floor(Math.random() * ch);
     var tab = [apple.x, apple.y];
     apples.push(tab);
 }

 function drawApple() {
     ctx.fillStyle = "#ff0000";
     for (var i = 0; i < apples.length; i++)
         ctx.fillRect(apples[i][0], apples[i][1], apple.width, apple.height);
 }

 function grow() {
     snake.length++;
     path.push([path[0][0], path[0][1]])
 }