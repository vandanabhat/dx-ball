var canvas = document.getElementById('myCanvas');
canvas.height = window.innerHeight * (3/4);
canvas.width = window.innerWidth * (3/4);

//initialize variables for ball
var x = 500,
    y = 300,
    dx = 2,
    dy = 10,
    ctx,
    r = 10,
    intervalId,
    canvasW = canvas.width;
//initialize paddle
    paddlex = canvas.width / 2,
    paddlew = 150,
    paddleh = 20,
    paddley = canvas.height - paddleh,
    canvasMinX = canvas.offsetLeft;
    canvasMaxX =canvasMinX + canvas.width,
    bricksRows = 15,
    bricksCols = 15;
    brickH = 15,
    brickW = canvasW/bricksCols -1,
    padding =1
    bricks = new Array(bricksRows);

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    var grd = ctx.createRadialGradient(x,y,5,x,y,r);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1,"#004CB3");
    ctx.fillStyle = grd;
    ctx.fill();
}

function createRect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

//create keyboard event fot moving paddle from keyboard
//function movePaddle()
function keyDown(e){
//       if(paddlex  >= canvasMinX && (paddlex + paddlew) <= canvasMaxX){
//           console.log(canvasMinX);
//           console.log(canvasMaxX);
//           console.log(paddlex);
           if(e.keyCode == 39)
               paddlex += 40;
           else if(e.keyCode == 37)
               paddlex -= 40;
//       }

}
function onMouseMove(e){
    if(e.pageX > canvasMinX && e.pageX+paddlew < canvasMaxX){
        paddlex = e.pageX - canvasMinX;
    }
}

window.onmousemove = onMouseMove;
window.onkeydown = keyDown;

// draw bricks
function drawBricks(){
    for(var i = 0 ; i < bricksRows ; i++){
        for(var j = 0; j < bricksCols ; j++){
            if(bricks[i][j] == 1){
                createRect( j*(brickW+padding)+padding, i*(brickH+padding)+padding, brickW, brickH);
            }
        }
    }
}

function initBricks(){
    for(var i = 0 ; i < bricksRows ; i++){
        bricks[i] = new Array(bricksCols);
        for(var j = 0 ; j < bricksCols ; j++){
            bricks[i][j] = 1;
        }
    }

}

//main draw function, alla functions begins here
function draw() {
   clearCanvas();
   circle(x,y,r);
   createRect(paddlex,paddley,paddlew,paddleh);
    //have we hit a brick?
    var rowheight = brickH + padding;
    var colwidth = brickW + padding;
    var row = Math.floor(y/rowheight);
    var col = Math.floor(x/colwidth);
    //if so, reverse the ball and mark the brick as broken
    if (y < bricksRows * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
        dy = -dy;
        bricks[row][col] = 0;
    }
   drawBricks(bricks)
    //ball bounce when it touches canvas edge
    if(x+r+dx > canvas.width || x-r+dx < 0)
        dx = -dx;
    if(y-r+dy < 0)
        dy = -dy;
    else if(y+r+dy > canvas.height){
        if(x > paddlex && x < paddlex + paddlew )
            dy = -dy;
        else
            clearInterval(intervalId);
    }
//increment x and y co-ordinates to move the ball
    x+=dx;
    y+=dy;
}
intervalId = init();
function init() {
    ctx = canvas.getContext("2d");
    initBricks();
    return setInterval(draw, 100);

}