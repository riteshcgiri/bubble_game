const gameScreen = document.querySelector('#pBtm');
const timeBox = document.querySelector('#timer');
const hitVal = document.querySelector('#hitVal');
const scoreBox = document.querySelector('#score');
const game_over = document.querySelector('.game_over');
const startGame = document.querySelector('.start-game');
const play = document.querySelector('.play');
const finalScore = document.querySelector('#fScore');
let time = 60, score = 0, hit = 0;

const startAudio = './game-start.mp3';
const musicAudio = './bgm.mp3';
const touchAudio = './click.mp3';
const endAudio = './game-end.mp3';

// random number genarator
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

// this function run a loop and and add a element avery time it run from bubbler function
function creator() {
    for (let i = 1; i < 169; i++) {
        bubbler();
    }
}

// bubble creator, this fnc create a element and add add class and a random number as many time as it called
function bubbler() {
    let bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = `${random(1, 10)}`;
    gameScreen.append(bubble);
}

// setting up the timer 
function timer() {
    let tf = setInterval(() => {
        if (time > 0) {
            time--;
            timeBox.textContent = time;
        } else {
            clearInterval(tf);
            gameOver();
            hitVal.removeEventListener('click', hitter)
        }
    }, 1000);
}
function hitter() {
    hit = random(1, 10);
    hitVal.textContent = hit;
}
// this fnc run every time a user select the correct number which showen in the hit section
function scoreUp() {
    score += 10;
    scoreBox.textContent = score;
}
// this will show the game over screen to user
function gameOver() {
    audio(endAudio);
    // let stopAudio = new Audio(musicAudio);
    // stopAudio.pause();
    gameScreen.classList.add('gameEnd');
    gameScreen.innerHTML = `
    <div class="game_over">
    <h3>Game Over</h3>
    <h4>Final Score : <span id="fScore">${scoreBox.textContent}</span></h4>
    <span class="btn" onclick="restart();">Restart</span>
    </div>
    `;
}
// set every value to default
function defaultVals() {
    gameScreen.innerHTML = '';
    time = 60;
    score = 0;
    scoreBox.textContent = score;
    gameScreen.classList.remove('gameEnd');    
}
// this will reset and restart the game
function restart() {
    audio(startAudio)
    defaultVals();
    timer();
    creator();
}
function start() {
    timer();
    hitter();
    creator();
    audio(musicAudio, true, 0.1);
}

play.addEventListener('click', ()=>{
    audio(startAudio)
    startGame.style.zIndex = "-1";
    startGame.style.visibility = "hidden";
    start();
})

// function to pass props to every audio when it run
function audio(audioLink, isLoop = false, vol = 1, stopAud) {
    let aud  = new Audio();
    var srcIs  = document.createElement("source");
    srcIs.type = "audio/mpeg";
    srcIs.src  = audioLink;
    aud.appendChild(srcIs);
    aud.play();
    aud.loop = isLoop;
    aud.volume = vol;  
}




// function to select bubble
// this is also called event bubbling where it checked in which a event is fired is it available there if not it will go to the parent element and check is there any event listner available or not.
gameScreen.addEventListener('click', (det) => {
    let touched = Number(det.target.textContent)
    if (touched === hit) {
        audio(touchAudio);
        scoreUp();
        hitter();
        det.target.remove();
    }
});
// function if hit num isn't available in the bubble to change the hit number
hitVal.addEventListener('click', hitter);

