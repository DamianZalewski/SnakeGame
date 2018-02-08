 const canvas = document.querySelector('canvas');
 const ctx = canvas.getContext('2d');
 canvas.width = screen.width;
 canvas.height = screen.height;
 var cw = canvas.width;
 var ch = canvas.height;

 var snake = {
     x:cw/2,
     y:ch/2,
     width: 20,
     height: 20,
     backgroundColor: "blue"
 };

 setInterval(game, 1000 / 60);

 function game() {
               gameBoard();
     ctx.fillStyle = snake.backgroundColor;
     ctx.fillRect(snake.x,snake.y, snake.width, snake.height);
     snake.x++;



 }

 function gameBoard() {
     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, cw, ch);
 }

