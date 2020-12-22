// canvas variables

let context;
let canvas;
let width;
let height;

let offsetX = 50;
let offsetY = 50;

const MENU_Y = 350;

// game variables

let trials = document.getElementById('tasten').value;
let points = 0;
let arrow = 'none';
let catfishAnimation = false;
let explosionAnimation = false;
let time;
let maxTime;
let usedTime;
let wrongKey = false;
let gamePlayed = false;
let gameStarted = false;

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

    resizeWindow();
});

const resizeWindow = () => {

    canvas.width = width = window.innerWidth;

    if (!gameStarted) // do not stretch the canvas; leave space for buttons etc
        canvas.height = height = MENU_Y;
    else
        canvas.height = height = window.innerHeight;

    offsetX = Math.ceil(width / 2) - (bg.width / 2);
    offsetY = Math.ceil(height / 2 - 200);
}

const keyEvent = (event) => {

    // prevents browser screen from moving when pressing arrow keys

    if (gameStarted) {

        event.preventDefault();

    }

    const pressedKey = event.key;

    // start the game

    if (pressedKey == 'Enter') {

        startGame();
    }

    // if it already started, check for arrow keys

    if (gameStarted) {

        resizeWindow();

        if (pressedKey == arrow) { // right key has been hit
            points++;
            if (points == trials) { // end game if all the keys have been pressed

                gameStarted = false;
                gamePlayed = true;
                wrongKey = false;

                usedTime = maxTime - time;

                resizeWindow();

            }
            arrow = randomArrow();
            reDraw();

        } else { // wrong key; stop game and show score

            if (pressedKey != 'Enter') {

                gameStarted = false;
                wrongKey = true;
                gamePlayed = true;

                resizeWindow();
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

        document.getElementById('input').style.visibility = 'hidden'; // hide input if game started

    } else { // game menu

        context.font = '100px Arial';
        context.fillText('Fischteich Trainer' , (width / 2) - 400, 100);

        context.font = '20px Arial';
        context.fillText('Enter drücken um zu starten', (width / 2) - 135, 140);

        if (gamePlayed) { // show stats if one round has been played

            if (!wrongKey) { // player won

            const seconds = Math.floor(usedTime / 100);
            const milliseconds = usedTime % 100;

            context.font = '30px Arial';
            context.fillText(`Geschafft!`, (width / 2) - 70, 200);
            context.fillText(`Zeit: ${seconds}.${('0' + milliseconds).slice(-2)}`, (width / 2) - 60, 235);
            context.fillText(`Tasten: ${trials}`, (width / 2) - 60, 270);
            context.fillText(`Tasten pro Sekunde: ${(100 * (trials/usedTime)).toFixed(2)}`, (width / 2) - 170, 305);


            } else { // player failed

                context.font = '30px Arial';
                context.fillText(`Falsche Taste! Versuche es nochmal.`, (width / 2) - 250, 180);
            }
        }

        document.getElementById('input').style.visibility = 'visible'; // show input
    }
}

// set important variables

const initDraw = () => {

    canvas = document.getElementById('trainer');
    context = canvas.getContext('2d');

    resizeWindow();
}

// set every variable and start the timer

const startGame = () => {

    if (!gameStarted) {

        gameStarted = true;
        trials = document.getElementById('tasten').value;
        points = 0;
        maxTime = time = document.getElementById('zeit').value * 100;
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

// explosion animation

setInterval(() => { explosionAnimation = !explosionAnimation; }, 80);

// countdown

const countdown = setInterval(() => {
    
    if (time <= 0) {

        trials = points;
        usedTime = maxTime;
        gameStarted = false;
        gamePlayed = true;
        wrongKey = false;
        
        resizeWindow();
        clearInterval(countdown);
    }

    if (gameStarted)
        time--;

}, 10);

// set important variables

initDraw();

// draw the frames every 10ms => 100fps

setInterval(reDraw, 10);