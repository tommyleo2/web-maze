var onGame = false;
var cheat = false;
var body = document.getElementById("mazeBody");
var wall = document.getElementsByClassName("errWall");



function init() {
    if (event.target.style.opacity == "1") {
        fade(event.target, -10);
    }
}

function getStart() {
    if (!onGame) {
        onGame = true;
        var notification = document.getElementById("notification");
        fade(notification, -10);
        for (var i = 0; i < wall.length; i++) {
            if (wall[i].style.opacity == 1) {
                fade(wall[i], -10);
            }
        }
    }
}

function lose() {
    if (onGame) {
        var targ = event.target;
        onGame = false;
        if (targ.id == "_sampleWall") {
            notification.textContent = ("Be careful, especially when cheating!");
        } else {
            notification.textContent = "You Lose";
        }
        fade(notification);
        fade(targ);
    }
}

function win() {
    if (onGame) {
        onGame = false;
        var notification = document.getElementById("notification");
        if (cheat) {
            notification.textContent = "Cheating!";
        } else {
            notification.textContent = "You Win";
        }
        fade(notification);
    }
}

function fade(obj) {
    clearInterval(obj.timer);
    var speed = arguments[1] ? arguments[1] : 10;
    if (speed == 10) {
        var alpha = 0;
        obj.timer = setInterval(function() {
            if (alpha == 100) {
                clearInterval(obj.timer);
            } else {
                alpha += speed;
                obj.style.opacity = alpha/100;
            }
        }, 30);
    } else {
        if (speed == -10) {
            var alpha = 100;
            obj.timer = setInterval(function() {
                if (alpha == 0) {
                    clearInterval(obj.timer);
                } else {
                    alpha += speed;
                    obj.style.opacity = alpha/100;
                }
            }, 30);
        }
    }
}

window.onload = function() {
    var start = document.getElementById("start");
    var end = document.getElementById("end");
    var genuine = document.getElementById("genuine");
    var cheating = document.getElementById("cheating");
    start.addEventListener("mouseover", getStart);
    end.addEventListener("mouseover", win);
    for (var i = 0; i < wall.length; i++) {
        wall[i].addEventListener("mouseover", lose);
        wall[i].addEventListener("mouseout", init);
        genuine.addEventListener("mouseover", function() {cheat = false;});
        cheating.addEventListener("mouseover", function() {cheat = true;});
    }
}

