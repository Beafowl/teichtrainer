let context;
let canvas;
let width;
let height;

const keyEvent = (event) => {

    const pressedKey = event.key;
    //console.log('Pressed key: ' + pressedKey);
}

const initDraw = () => {

    canvas = document.getElementById('trainer');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    console.log(context);

    console.log(document.getElementById('trainer').width);

    let bg = document.getElementById('bg');
    let progress_bar = document.getElementById('progress_bar');
    let button = document.getElementById('button');

    context.drawImage(bg, 0, 0);
    context.drawImage(progress_bar, 6, 6);
    context.drawImage(button, width * 0.5 - button.width * 0.5, 80);
}

const startGame = () => {

    console.log('Hamegululu');
}
initDraw();