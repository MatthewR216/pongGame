var canvas;
var canvasContext;
var ballX = 390;
var ballXSpeed = 7;
var ballY = 390;
var ballYSpeed = 5;
var paddle1Y = 250;
const paddleHeight = 100;
const paddleWidth = 10;


function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x: mouseX,
        y: mouseY
    };
}

//function below makes sure that all code is ran once the window is loaded at the same time.
window.onload = function(){
    canvas = document.getElementById("gameCanvas");//how to edit the canvas from the html file
    canvasContext = canvas.getContext("2d");//makes sure that co, ordinates are x and y
    
    var framesPerSecond = 60;
    setInterval(function(){//this sets a time interval from when the function is repeatedly called, if two or more functions need to be called, it can be layed out like this
        movement();
        drawnObjects();
    }, 1000/framesPerSecond);//this is how fast the ball will be moving
    
    

    canvas.addEventListener('mousemove',
        function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(paddleHeight/2);

        });

    }

function movement(){
    ballX = ballX + ballXSpeed;
    ballY = ballY + ballYSpeed;

    if (ballX > canvas.width){
        ballXSpeed = -ballXSpeed
    }

    if (ballX < 0){
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight){
            ballXSpeed = -ballXSpeed
        }

        else{
            ballReset();
        }
    }

    if (ballY > canvas.height){
        ballYSpeed = -ballYSpeed;
    }

    if (ballY < 0){
        ballYSpeed = -ballYSpeed;
    }

    

    
}
 
function drawnObjects(){
    // each time colorRect is called the values in the each position corresponds to the property the value is defining i.e the same position as the property in the parameters.
    /* colorRect makes it so this:

    canvasContext.fillStyle = "red";
    canvasContext.fillRect(#,#,#,#);
    can be done on one line like shown*/

    //canvas properties
    colorRect(0,0, canvas.width,canvas.height,"black")

    //left paddle
    colorRect(0,paddle1Y,paddleWidth,paddleHeight,"red");

    //right paddle
    colorRect(790,240,10,80,"red");

    //ball
    colorRect(ballX,ballY,10,10,"white");

}


function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);

}

function ballReset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballXSpeed = -ballXSpeed;
}