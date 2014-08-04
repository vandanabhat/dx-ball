
var canvas = document.getElementById('myCanvas');

canvas.height = window.innerHeight /2;
canvas.width = window.innerWidth /2;
//initialize variables
var x=canvas.width/2,
    y=30,
    dx= 2,
    dy= 10,
    ctx,
    r=20,
    paddlex,
    paddlew,
    paddleh,
    paddley,
    intervalId,
//fir left and right arrow keydown
    rightDown = false,
    leftDown = false;

function init_Paddle(){
     paddlex = canvas.width / 2,
     paddlew = 150,
     paddleh = 20,
     paddley = canvas.height - paddleh;
}

function init(){
    ctx = canvas.getContext("2d");
    return setInterval(draw, 100);
}

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

function createPaddle() {
    ctx.beginPath();
    ctx.rect(paddlex,paddley,paddlew,paddleh);
    ctx.closePath();
    ctx.fill();
}

//create keyboard event fot moving paddle from keyboard
//function keyUp(e){
//    if(e.keyCode == 39)
//       rightDown = false;
//    else if(e.keyCode == 37)
//       leftDown = false;
//}
function keyDown(e){
    if(e.keyCode == 39)
        paddlex += 40;
    else if(e.keyCode == 37)
        paddlex -= 40;
    console.log(e.keyCode);
}
//trigger respective events when left and right arrow  key Up or down
//window.onkeyup = keyUp;
window.onkeydown = keyDown;

//function movePaddle(){
//    //move paddle by Left and Right arrow keys
//    if(leftDown)
//        paddlex -= 40;
//    else if(rightDown)
//        paddlex += 40;
//}

//draw ball function
function draw() {
   clearCanvas();
   circle(x,y,r);
   createPaddle();
//   movePaddle();
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
init_Paddle();
intervalId = init();