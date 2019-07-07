window.addEventListener("load", pong, false);
function pong() {
    canv = document.getElementById("pong");
    ctx = canv.getContext("2d");
    let unit = 25;
    let p1X = unit;
    let p2X = canv.width - unit - unit;
    var velX = 1;
    var velY = 1;
    let speed = 5;
    var p1up = false;
    var p1down = false;
    var p2up = false;
    var p2down = false;
    var p1Score = 0;
    var p2Score = 0;
    var start;
    reset();
    window.addEventListener("keyup", keyUp);
    function keyUp(evt) {
        if (evt.keyCode == 38) { // up
            p2up = false;
        }
        if (evt.keyCode == 40) { // down
            p2down = false;
        }
        if (evt.keyCode == 87) { // up w
            p1up = false;
        }
        if (evt.keyCode == 83) { // down s
            p1down = false;
        }
    }
    window.addEventListener("keydown", keyDown);
    function keyDown(evt) {
        if (evt.keyCode == 38) { // up
            p2up = true;
        }
        if (evt.keyCode == 40) { // down
            p2down = true;
        }
        if (evt.keyCode == 87) { // up w
            p1up = true;
        }
        if (evt.keyCode == 83) { // down s
            p1down = true;
        }
        if (evt.keyCode == 32) { // space
            if (lose) {
                console.log("start");
                start = setInterval(function() {
                    move();
                }, 1000/60);
                lose = false;
            }
        }
    }
    function reset() {
        posX = canv.width / 2;
        posY = canv.height / 2;
        p1Y = canv.height / 2 - (3 * unit);
        p2Y = canv.height / 2 - (3 * unit);
        translation = 0;
        clearInterval(start);
        lose = true;
        randomX = Math.floor(Math.random() * 2);
        randomY = Math.floor(Math.random() * 2);
        if (randomX == 1) {
            velX *= -1;
        }
        if (randomY == 1) {
            velY *= -1;
        }
    }
    function playerMove() {
        if (p1up) {
            if (p1Y > 0) {
                p1Y -= 5;
            }  
        }
        if (p1down) {
            if (p1Y + (5 * unit) < canv.height) {
                p1Y += 5;
            }  
        }
        if (p2up) {
            if (p2Y > 0) {
                p2Y -= 5;
            } 
        }
        if (p2down) {
            if (p2Y + (5 * unit) < canv.height) {
                p2Y += 5;
            }
        }   
    }
    function move() {
        translation = 0;
        while (translation < speed) {
            collision();
            posX += velX;
            translation++;
        }
        translation = 0;
        while (translation < speed) {
            collision();
            posY += velY;
            translation++;
        }
    }
    function collision() {
        if (posX == canv.width - unit) {
            p1Score++;
            reset();
        }
        if (posX == 0) {
            p2Score++;
            reset();
        }
        if ((posY == canv.height - unit) || (posY == 0)) {
            velY *= -1;
            posY += velY;
        }
        if ((posX > p1X) && (posX < p1X + unit)) {
            if ((posY > p1Y) && (posY < p1Y + (unit * 5))) {
                velX *= -1;
                posX = p1X + unit;
            }
        }
        if ((posX + unit > p2X) && (posX + unit < p2X + unit)) {
            if ((posY + unit > p2Y) && (posY + unit < p2Y + (unit * 5))) {
                velX *= -1;
                posX = p2X - unit;
            }
        }
    }
    function draw() {
        playerMove();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "white";
        ctx.fillRect(posX, posY, unit, unit);
        ctx.fillRect(p1X, p1Y, unit, unit * 5);
        ctx.fillRect(p2X, p2Y, unit, unit * 5);
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(p1Score, canv.width / 6, canv.height / 6);
        ctx.fillText(p2Score, canv.width / 6 * 5, canv.height / 6);
        if (lose) {
            ctx.fillText('Press "space" to start!', canv.width / 2, canv.height / 3);
        }
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}