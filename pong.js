window.addEventListener("load", platformer, false);
function platformer() {
    canv = document.getElementById("platformer");
    ctx = canv.getContext("2d");
    var unit = 25;
    var p1X = unit;
    var p1Y = canv.height / 2 - (3 * unit);
    var p2X = canv.width - unit - unit;
    var p2Y = canv.height / 2 - (3 * unit);
    var posX = canv.width / 2;
    var posY = canv.height / 2;
    var velX = 5;
    var velY = 5;
    var p1up = false;
    var p1down = false;
    var p2up = false;
    var p2down = false;
    var leftEdge = false;
    var rightEdge = false;
    window.addEventListener("keyup", keyUp);
    function keyUp(evt) {
        if (evt.keyCode == 38) { // up
            p2up = false;
        }
        if (evt.keyCode == 40) { // down
            p2down = false;
        }
        if (evt.keyCode == 87) { // up
            p1up = false;
        }
        if (evt.keyCode == 83) { // down
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
        if (evt.keyCode == 87) { // up
            p1up = true;
        }
        if (evt.keyCode == 83) { // down
            p1down = true;
        }
    }
    function move() {
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
        collision();
        posX += velX;
        posY += velY;     
    }
    function collision() {
        if ((posX == canv.width - unit) || (posX == 0)) {
            velX *= -1;
        }
        if ((posY == canv.height - unit) || (posY == 0)) {
            velY *= -1;
        }
        if ((posX >= p1X) && (posX <= p1X + unit)) {
            if ((posY >= p1Y) && (posY <= p1Y + (unit * 5))) {
                velX *= -1;
            }
        }
        if ((posX + unit >= p2X) && (posX + unit <= p2X + unit)) {
            if ((posY + unit >= p2Y) && (posY + unit <= p2Y + (unit * 5))) {
                velX *= -1;
            }
        }
    }
    function draw() {
        move();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "white";
        ctx.fillRect(posX, posY, unit, unit);
        ctx.fillRect(p1X, p1Y, unit, unit * 5);
        ctx.fillRect(p2X, p2Y, unit, unit * 5);
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}