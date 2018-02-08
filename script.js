 const canvas = document.querySelector('canvas');
 const ctx = canvas.getContext('2d');
 canvas.width = screen.width;
 canvas.height = screen.height;
 var cw = canvas.width;
 var ch = canvas.height;
 window.addEventListener("keydown", control,false);

 var snake = {
     x: cw / 2,
     y: ch / 2,
     width: 20,
     height: 20,
     backgroundColor: "blue",
     direction:1,
     speed:5
 };

 setInterval(game, 1000 / 60);

 function control(e) {
    console.log(e.keyCode);
     var key = e.keyCode;
     if(key == 37) snake.direction=1; //left
     if(key == 38) snake.direction=2; //up
     if(key == 39) snake.direction=3; //right
     if(key == 40) snake.direction=4; //down
 }


 function game() {
     gameBoard();
     snakeMove();



 }
 
 function snakeMove()
     {
         ctx.fillStyle = snake.backgroundColor;
     ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
     if(snake.direction ==1) snake.x-=snake.speed;
     if(snake.direction ==2) snake.y-=snake.speed;
     if(snake.direction ==3) snake.x+=snake.speed;
     if(snake.direction ==4) snake.y+=snake.speed;
         
     if(snake.x< -snake.width) snake.x = cw;
     if(snake.x> cw) snake.x = -snake.width;
     if(snake.y< -snake.height) snake.y = ch-snake.height;
     if(snake.y> ch) snake.y = -snake.height;
     }

 function gameBoard() {
     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, cw, ch);
 }
