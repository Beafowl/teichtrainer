// canvas variables

let context;
let canvas;
let width;
let height;

let offsetX = 50;
let offsetY = 50;

// game variables

let trials = 8;
let points = 0;
let gameStarted = false;
let arrow = 'none';
let catfishAnimation = false;
let explosionAnimation = false;
let time = 1000; // 10 ms => 10 seconds
let wrongKey = false;
let gamePlayed = false;

// fetch images

let bg = document.getElementById('bg');
let progress_bar = document.getElementById('progress_bar');
let catfish1 = document.getElementById('catfish1');
let catfish2 = document.getElementById('catfish2');
let arrowUp = document.getElementById('arrowUp');
let arrowDown = document.getElementById('arrowDown');
let arrowLeft = document.getElementById('arrowLeft');
let arrowRight = document.getElementById('arrowRight');

// stretch canvas to whole window

window.addEventListener('resize', (event) => {

    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;

    offsetX = Math.ceil(width / 2) - (bg.width / 2);
    offsetY = Math.ceil(height / 2);
});


const keyEvent = (event) => {

    // prevents browser screen from moving when pressing arrow keys

    event.preventDefault();

    const pressedKey = event.key;

    // start the game

    if (pressedKey == 'Enter') {

        startGame();
    }

    // if it already started, check for arrow keys

    if (gameStarted) {

        if (pressedKey == arrow) { // right key has been hit
            points++;
            if (points == trials) { // end game if all the keys have been pressed

                gameStarted = false;

            }
            arrow = randomArrow();
            reDraw();

        } else { // wrong key; stop game and show score

            if (pressedKey != 'Enter') {

                wrongKey = true;
                gameStarted = false;
            }
        }
    }
}

// returns a random arrow key

const randomArrow = () => {

    const randomInt = Math.floor((Math.random() * 4));
    
    if (randomInt == 0)
        return 'ArrowLeft';
    else if (randomInt == 1)
        return 'ArrowRight';
    else if (randomInt == 2)
        return 'ArrowUp';
    else
        return 'ArrowDown';
}

// clear canvas and redraw

const reDraw = () => {

    // clear

    context.clearRect(0, 0, width, height);

    if (gameStarted) { // draw the game elements if the user starts the game

        // redraw

        context.drawImage(bg, offsetX, offsetY);
        context.drawImage(progress_bar, 0, 0, Math.ceil((830 * (points/trials))), 100, 6 + offsetX, 6 + offsetY, Math.ceil((830 * (points/trials))), 100);


        drawCatfish();
        drawExplosion();
        drawArrow();
        drawTime();

    } else { // game menu

        context.font = '100px Arial';
        context.fillText('Fischteich Trainer' , (width / 2) - 450, 100);

        context.font = '20px Arial';
        context.fillText('Enter drücken um zu starten', (width / 2) - 200, 140);

        if (gamePlayed) { // show stats if one round has been played

            // TODO
            
        }
    }
}

// set important variables

const initDraw = () => {

    canvas = document.getElementById('trainer');
    context = canvas.getContext('2d');

    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;

    offsetX = Math.ceil(width / 2) - (bg.width / 2);
    offsetY = Math.ceil(height / 2);
}

// set every variable and start the timer

const startGame = () => {

    if (!gameStarted) {

        gameStarted = true;
        points = 0;
        time = 1000;
        arrow = randomArrow();
    }
}

// draws the catfish

const drawCatfish = () => {

    if (catfishAnimation)
        context.drawImage(catfish1, 0, 0, catfish1.width, catfish1.height, -110 + offsetX, 2 + offsetY, catfish1.width * 1.5, catfish1.height * 1.5 + 2);
    else
        context.drawImage(catfish2, 0, 0, catfish2.width, catfish2.height, -110 + offsetX, 2 + offsetY, catfish2.width * 1.5, catfish2.height * 1.5 + 2);
}

// draws the explosion

const drawExplosion = () => {

    if (gameStarted) {

        if (explosionAnimation)
            context.drawImage(explosion1, 0, 0, explosion1.width, explosion1.height, Math.ceil((points/trials) * progress_bar.width) - 110 + offsetX, -60 + offsetY, explosion1.width, explosion1.height);
        else
            context.drawImage(explosion2, 0, 0, explosion2.width, explosion2.height, Math.ceil((points/trials) * progress_bar.width) - 110 + offsetX, -60 + offsetY, explosion2.width, explosion2.height);
    }
}

// draws the arrows

const drawArrow = () => {

    if (gameStarted) {

        if (arrow == 'ArrowUp')
            context.drawImage(arrowUp, 0, 0, arrowUp.width, arrowUp.height, Math.ceil((points/trials) * progress_bar.width) + offsetX, 2 + offsetY, arrowUp.width, arrowUp.height);
        else if (arrow == 'ArrowDown')
            context.drawImage(arrowDown, 0, 0, arrowDown.width, arrowDown.height, Math.ceil((points/trials) * progress_bar.width) + offsetX, 2 + offsetY, arrowDown.width, arrowDown.height);
        else if (arrow == 'ArrowLeft')
            context.drawImage(arrowLeft, 0, 0, arrowLeft.width, arrowLeft.height, Math.ceil((points/trials) * progress_bar.width) + offsetX, 2 + offsetY, arrowLeft.width, arrowLeft.height);
        else if (arrow == 'ArrowRight')
            context.drawImage(arrowRight, 0, 0, arrowRight.width, arrowRight.height, Math.ceil((points/trials) * progress_bar.width) + offsetX, 2 + offsetY, arrowRight.width, arrowRight.height);
    }
}

// draw the time left

const drawTime = () => {

    // get the time in a readable format

    const seconds = Math.floor(time / 100);
    const milliseconds = time % 100;

    // append 0 to milliseconds

    const timeText = `${seconds}.${('0' + milliseconds).slice(-2)}`;

    context.font = '50px Arial';
    context.fillText(timeText, offsetX + bg.width + 40, offsetY + 50);
}

// animation every 150ms

setInterval(() => { catfishAnimation = !catfishAnimation; }, 150);

setInterval(() => { explosionAnimation = !explosionAnimation; }, 80);

setInterval(() => {
    
    if (gameStarted)
        time--;

}, 10);

initDraw();

// draw the frames every 10ms => 100fps

setInterval(reDraw, 10);