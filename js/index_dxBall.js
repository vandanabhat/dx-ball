var canvas = document.getElementById('myCanvas');
canvas.height = window.innerHeight * (3/4);
canvas.width = window.innerWidth * (3/4);

//initialize variables for ball
var x = 500,
    y = 300,
    dx = 1,
    dy = 1,
    ctx,
    r = 10,
    intervalId,
    canvasW = canvas.width;
//initialize paddle
    paddlex = canvasW / 2,
    paddlew = 150,
    paddleh = 20,
    paddley = canvas.height - paddleh,
    canvasMinX = canvas.offsetLeft,
    canvasMaxX = canvasMinX + canvasW,
//    canvasMaxX = canvas.offsetWidth,
    canvasMaxY = canvas.offsetHeight,
//initialize bricks
    bricksRows = 15,
    bricksCols = 13,
    brickH = 15,
    brickW = canvasW/bricksCols -2.2,
    padding = 2,
    bricks = new Array(bricksRows),
    rowheight = brickH + padding ,
    colwidth = brickW + padding;

//function to clear the canvas
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

function bounce(){
    //ball bounce when it touches canvas edge
    if(x+r+dx > canvas.width || x-r+dx < 0)
        dx = -dx;
    if(y-r+dy < 0)
        dy = -dy;
    else if( (canvas.height-20) == y+r){
        if(x > paddlex && x < paddlex + paddlew)
            dy = -dy;}
    else if(y+r+dy > canvas.height)
        clearInterval(intervalId);

}

function createRect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    var grd = ctx.createLinearGradient(canvasW/2, 0, canvasW/2, canvas.height);
    grd.addColorStop(0,'#FF3F0A');
    grd.addColorStop(0.6,'#FFDDD1');
    grd.addColorStop(1,'#FF3F0A');
    ctx.fillStyle = grd;
    ctx.fillRect(x,y,w,h)
}
function createPaddle(x,y,w,h){
//    ctx.drawImage(imgeObj, 0,30);
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    var grd = ctx.createLinearGradient(canvasW/2, 0, canvasW/2, canvas.height);
    grd.addColorStop(0,'#FF3F0A');
    grd.addColorStop(0.6,'#FFDDD1');
    grd.addColorStop(1,'#FF3F0A');
    ctx.fillStyle = grd;
    ctx.fillRect(x,y,w,h);
}
//create keyboard event fot moving paddle from keyboard
//function movePaddle()
function keyDown(e){
//       if(paddlex  >= canvasMinX && (paddlex + paddlew) <= canvasMaxX){
//           console.log(canvasMinX);
//           console.log(canvasMaxX);
//           console.log(paddlex);
           if(e.keyCode == 39 && paddlex+paddlew < canvasMaxX-paddlew)
               paddlex += 40;
           else if(e.keyCode == 37 && paddlex > canvasMinX-paddlew)
               paddlex -= 40;
//       }

}
function onMouseMove(e){
    if(e.pageX > canvasMinX && e.pageX+paddlew < canvasMaxX && e.pageY > canvasMaxY - paddleh - 50 && e.pageY < canvasMaxY){
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
//if ball hit a brick?
function hitBrick(){
   var row = Math.floor((y - r)/rowheight),
       col = Math.floor((x + r)/colwidth);
//if so, reverse the ball and mark the brick as broken
   if ( y < (bricksRows * rowheight) + r &&
        row >= 0 && row <=15 &&
        col >= 0 && col <=15 &&
        bricks[row][col] == 1) {
        dy = -dy;
        bricks[row][col] = 0;
    }
}

//main draw function, all functions begins here
function draw() {
   clearCanvas();
   circle(x,y,r);
   createPaddle(paddlex,paddley,paddlew,paddleh);
   drawBricks();
   hitBrick();
   bounce();

//increment x and y co-ordinates to move the ball
    x+=dx;
    y+=dy;

}

intervalId = init();
function init() {
    ctx = canvas.getContext("2d");
    initBricks();
    return setInterval(draw, 10);
}