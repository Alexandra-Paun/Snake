let snake = [
    [12, 11],
    [12, 12],
    [12, 13],
];
let matrix = [];
let posx = 12;
let posy = 14;
let gameOver = 0;
let applex;
let appley;
let points = 0;
let time;

function addBoard() {
    let mat = document.getElementById('matrix');
    for (let i = 0; i < 24; i++) {
        matrix[i] = document.createElement('tr');
        mat.append(matrix[i]);
        for (let j = 0; j < 24; j++) {
            matrix[i][j] = document.createElement('td');
            matrix[i].append(matrix[i][j]);
            matrix[i][j].style = "background-color: rgb(175,215,70)";
        }
    }
    drawSnake();
    drawApple();
}

function drawSnake() {
    if (gameOver) {
        return;
    }
    let x = 0,
        y = 0;
    snake.push([posx, posy]);
    for (let i = 0; i < snake.length; ++i) {
        x = snake[i][0];
        y = snake[i][1];
        matrix[x][y].style = "background-color: rgb(41, 116, 228);"; //snake color
    }
    x = snake[0][0];
    y = snake[0][1];
    matrix[x][y].style = "background-color: rgb(175,215,70)"; //grass color
    snake.shift();
}

document.addEventListener('keydown', function (event) {
    if (gameOver) {
        return;
    }
    clearInterval(time);
    if ("w" == event.key || event.keyCode == '38') {
        time = setInterval(moveup, 200);
    } else if ("a" == event.key || event.keyCode == '37') {
        time = setInterval(moveleft, 200);
    } else if ("s" == event.key || event.keyCode == '40') {
        time = setInterval(movedown, 200);
    } else if ("d" == event.key || event.keyCode == '39') {
        time = setInterval(moveright, 200);
    }
});

function moveright() {
    ++posy;
    checkGameOver();
    drawSnake();
    checkApplePos();
}

function moveup() {
    --posx;
    checkGameOver();
    drawSnake();
    checkApplePos();
}

function moveleft() {
    --posy;
    checkGameOver();
    drawSnake();
    checkApplePos();
}

function movedown() {
    ++posx;
    checkGameOver();
    drawSnake();
    checkApplePos();
}

function drawApple() {
    do {
        applex = Math.floor(Math.random() * 24);
        appley = Math.floor(Math.random() * 24);
        matrix[applex][appley].style = "background-color: red";
    } while (applex == posx && appley == posy)
}

function checkApplePos() {
    if (posx == applex && posy == appley) {
        ++points;
        drawApple();
        snake.push([posx, posy]);
        document.getElementById('msg').innerHTML = "Apples: " + points;
        document.getElementById('msg').style = "font-size: larger";
    }
}

function checkGameOver() {
    if (posx < 0 || posy < 0 || posx > 23 || posy > 23) {
        gameOver = 1;
        document.getElementById('msg').innerHTML = "Game Over!! You have " + points + " points!!";
        document.getElementById('msg').style = "font-size: larger";
    }
}
