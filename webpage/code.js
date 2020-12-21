// canvas variables

let context;
let canvas;
let width;
let height;

let offsetX = 50;
let offsetY = 50;

// game variables

let trials = 20;
let points = 0;
let gameStarted = false;
let arrow = 'none';
let catfishAnimation = false;
let explosionAnimation = false;

// fetch images

let bg = document.getElementById('bg');
let progress_bar = document.getElementById('progress_bar');
let catfish1 = document.getElementById('catfish1');
let catfish2 = document.getElementById('catfish2');
let arrowUp = document.getElementById('arrowUp');
let arrowDown = document.getElementById('arrowDown');
let arrowLeft = document.getElementById('arrowLeft');
let arrowRight = document.getElementById('arrowRight');


const keyEvent = (event) => {

    // prevents browser screen from moving when pressing arrow keys

    event.preventDefault();

    const pressedKey = event.key;

    if (gameStarted) {

        if (pressedKey == arrow) { // right key has been hit
            points++;
            if (points == trials) { // end game if all the keys have been pressed

                gameStarted = false;
                console.log('geschafft');

            }
            arrow = randomArrow();
            reDraw();

        } else { // wrong key; stop game and show score


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

    // redraw

    context.drawImage(bg, 0, 0);
    context.drawImage(progress_bar, 0, 0, Math.ceil((830 * (points/trials))), 100, 6, 6, Math.ceil((830 * (points/trials))), 100);


    //drawCatfish();
    drawExplosion();
    drawArrow();
}

// set important variables

const initDraw = () => {

    canvas = document.getElementById('trainer');
    context = canvas.getContext('2d');
    canvas.width = width = window.screen.width;
    canvas.height = height = window.screen.height;

}

// set every variable and start the timer

const startGame = () => {

    if (!gameStarted) {

        gameStarted = true;
        points = 0;
        arrow = randomArrow();
    }
}

// draws the catfish

const drawCatfish = () => {

    if (catfishAnimation)
        context.drawImage(catfish1, 0, 0, catfish1.width, catfish1.height, 0, 2, catfish1.width * 1.5, catfish1.height * 1.5 + 2);
    else
        context.drawImage(catfish2, 0, 0, catfish2.width, catfish2.height, 0, 2, catfish2.width * 1.5, catfish2.height * 1.5 + 2);

}

// draws the explosion

const drawExplosion = () => {

    if (gameStarted) {

        if (explosionAnimation)
            context.drawImage(explosion1, 0, 0, explosion1.width, explosion1.height, Math.ceil((points/trials) * progress_bar.width) - 110, -60, explosion1.width, explosion1.height);
        else
            context.drawImage(explosion2, 0, 0, explosion2.width, explosion2.height, Math.ceil((points/trials) * progress_bar.width) - 110, -60, explosion2.width, explosion2.height);
    }
}

// draws the arrows

const drawArrow = () => {

    if (arrow == 'ArrowUp')
        context.drawImage(arrowUp, 0, 0, arrowUp.width, arrowUp.height, Math.ceil((points/trials) * progress_bar.width), 2, arrowUp.width, arrowUp.height);
    else if (arrow == 'ArrowDown')
        context.drawImage(arrowDown, 0, 0, arrowDown.width, arrowDown.height, Math.ceil((points/trials) * progress_bar.width), 2, arrowDown.width, arrowDown.height);
    else if (arrow == 'ArrowLeft')
        context.drawImage(arrowLeft, 0, 0, arrowLeft.width, arrowLeft.height, Math.ceil((points/trials) * progress_bar.width), 2, arrowLeft.width, arrowLeft.height);
    else if (arrow == 'ArrowRight')
        context.drawImage(arrowRight, 0, 0, arrowRight.width, arrowRight.height, Math.ceil((points/trials) * progress_bar.width), 2, arrowRight.width, arrowRight.height);

}

// animation every 150ms

setInterval(() => { catfishAnimation = !catfishAnimation; }, 150);

setInterval(() => { explosionAnimation = !explosionAnimation; }, 80);

initDraw();

// draw the frames every 10ms => 100fps

setInterval(reDraw, 10);