 const canvas = document.querySelector('canvas');
 const ctx = canvas.getContext('2d');
 canvas.width = screen.width;
 canvas.height = screen.height;
 var cw = canvas.width;
 var ch = canvas.height;
 window.addEventListener("keydown", control, false);

 var snake = {
     x: cw / 2,
     y: ch / 2,
     width: 20,
     height: 20,
     backgroundColor: "blue",
     direction: 3,
     speed: 5,
     length: 4,

 };

 var apple = {
     x: 1,
     y: 1,
     width: 10,
     height: 10,

 }

 var apples = [];

 var path = [[cw / 2, ch / 2], [cw / 2 - snake.width, ch / 2], [cw / 2 - 2 * snake.width, ch / 2], [cw / 2 - 3 * snake.width, ch / 2]];

 setInterval(game, 1000 / 60);
 setInterval(addApple, 5000);

 function control(e) {

     var key = e.keyCode;
     if (key == 37) snake.direction = 1; //left
     if (key == 38) snake.direction = 2; //up
     if (key == 39) snake.direction = 3; //right
     if (key == 40) snake.direction = 4; //down
 }


 function game() {
     gameBoard();
     snakeMove();
     
     drawApple();
     drawSnake();

 }

 function snakeMove() {



     if (snake.x < -snake.width) path[0][0] = cw;
     if (snake.x > cw) path[0][0] = -snake.width;
     if (snake.y < -snake.height) path[0][1] = ch - snake.height;
     if (snake.y > ch) path[0][1] = -snake.height;


     for (var i = snake.length - 1; i > 0; i--) {
         path[i][0] = path[i - 1][0];
         path[i][1] = path[i - 1][1];
     }


     if (snake.direction == 1) path[0][0] -= snake.speed;
     if (snake.direction == 2) path[0][1] -= snake.speed;
     if (snake.direction == 3) path[0][0] += snake.speed;
     if (snake.direction == 4) path[0][1] += snake.speed;
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

function drawApple()
{
     ctx.fillStyle = "#ff0000";
    for(var i=0;i<apples.length;i++)
        ctx.fillRect(apples[i][0], apples[i][1], apple.width, apple.height);
        
}
