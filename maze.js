var onGame = false;
var cheat = false;
var wall = document.getElementsByClassName("errWall");


function init() {
    if (event.target.style.opacity == "1") {
        fade(event.target, -10);
    }
}

function displayTime(timer) {
    timer.textContent = "Time: " + (timer.time/100).toFixed(2) + "s";
    timer.time += 1;
}

function getStart() {
    if (!onGame) {
        onGame = true;
        var notification = document.getElementById("notification");
        fade(notification, -10);
        for (var i = 0; i < wall.length; i++) {
            if (wall[i].style.opacity == 1) {
                fade(wall[i], -50);
            }
        }
        var timer = document.getElementById("timer");
        timer.time = 0;
        timer.timer = setInterval(displayTime, 10, timer);
    }
}

function lose() {
    if (onGame) {
        var targ = event.target;
        onGame = false;
        var timer = document.getElementById("timer");
        clearInterval(timer.timer);
        if (targ.id == "_sampleWall") {
            notification.textContent = ("Be careful, especially when cheating!");
        } else {
            notification.textContent = "You Lose";
        }
        fade(notification);
        fade(targ, 50);
    }
}

function win() {
    if (onGame) {
        onGame = false;
        var timer = document.getElementById("timer");
        var record = document.getElementById("record");
        clearInterval(timer.timer);
        var notification = document.getElementById("notification");
        if (cheat) {
            notification.textContent = "Don't cheat, you should start from the \"S\" and move to the \"E\" inside the maze!";
        } else {
            notification.textContent = "You Win. Okey, you made it.";
            if (record.time > timer.time) {
                record.time = timer.time;
                record.textContent = "Best: " + (timer.time/100 - 0.01).toFixed(2) + "s";
            }
            if (timer.time > 100) {
                notification.textContent = "You Win. Can you make it within 1.00s?";
            }
        }
        fade(notification);
    }
}

function fade(obj) {
    clearInterval(obj.timer);
    var speed = arguments[1] ? arguments[1] : 10;
    if (speed > 0) {
        var alpha = 0;
        obj.timer = setInterval(function() {
            if (alpha >= 100) {
                clearInterval(obj.timer);
            } else {
                alpha += speed;
                obj.style.opacity = alpha/100;
            }
        }, 30);
    } else {
        if (speed < 0) {
            var alpha = 100;
            obj.timer = setInterval(function() {
                if (alpha <= 0) {
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
    document.getElementById("record").time = 999999;
    start.addEventListener("mouseover", getStart);
    end.addEventListener("mouseover", win);
    for (var i = 0; i < wall.length; i++) {
        wall[i].addEventListener("mouseover", lose);
        genuine.addEventListener("mouseover", function() {cheat = false;});
        cheating.addEventListener("mouseover", function() {cheat = true;});
    }
}

