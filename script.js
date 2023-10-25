// DONT forget strict
'use strict';

// const button = document.querySelector('.check')
// const inputGuess = document.querySelector('.guess')

// function sleep(ms){
//     return new Promise(resolve => setTimeout(resolve, ms))
// }
// document.querySelector('.message').textContent = '🎉 Correct Number';


// button.addEventListener('click', () => {
   
//     if(inputGuess.value > 0 && inputGuess.value < 20)
// {
//     console.log(inputGuess.value);
// }   else{
//     button.textContent = '🤡 is a joke?', 1000;
//     sleep(500).then(() => button.textContent = 'Check!')
// }

// })


// Logical Variables
let secretNumber = Math.trunc(Math.random()*20) + 1;
let attempts = 20;
let highscore = localStorage.getItem('score') ?? 0;

// Elements DOM
const checkButton = document.querySelector('.check');
const inputGuess = document.querySelector('.guess');
const message = document.querySelector('.message');
const divNumber = document.querySelector('.number')
const divAttempts = document.querySelector('.score')
const againButton = document.querySelector('.again')
const pHighscore = document.querySelector('.highscore');
const bodHTML = document.querySelector('body')
const resetScoreButton = document.querySelector('.reset')

function attemptsCounter(){
    attempts--;
    divAttempts.textContent = attempts
}

function changeColor(co){
    bodHTML.style.backgroundColor = co
    divNumber.style.color = co;
    againButton.style.color = co;
    checkButton.style.color = co
}

function disableCheckButton(){
    checkButton.setAttribute('disabled', '')
    checkButton.style.opacity = '0.7';
    checkButton.style.cursor = 'not-allowed'
    console.log('disable')

}
function enableCheckButton(){
    checkButton.removeAttribute('disabled')
    checkButton.style.opacity = '1';
    checkButton.style.cursor = 'pointer'
    console.log('enable')
}

function checkGuess(guess){
    if(attempts < 1){
        message.textContent = '💥 You Lost the Game!'
        disableCheckButton()
        changeColor('#660000')
        } 
    else if (guess == secretNumber){
        message.textContent = '🎉 Correct Number';
            if(highscore < attempts){
                highscore = attempts;
                localStorage.setItem('score', highscore)
                pHighscore.textContent = highscore
                    }
                divNumber.style.width = '30rem'
                divNumber.textContent = secretNumber
                changeColor('#60b347')
            }
    else if(guess !== secretNumber){
        message.textContent = (guess > secretNumber) ? '📈 Too high!' : '📉 Too low!';
        attemptsCounter()
        }  
    }


function resetValues(){
    window.location.reload();

    // challenge #1 implementation
    // secretNumber = Math.trunc(Math.random()*20) + 1;
    // attempts = 20;
    // divNumber.style.width = '15rem'
    // divNumber.textContent = '?'
    // pHighscore.textContent = highscore
    // message.textContent = 'Start guessing...';
    // divAttempts.textContent = attempts
    // inputGuess.value = ''
    // changeColor('#222')
}

inputGuess.addEventListener('input', () => {
    let guess = inputGuess.value
    console.log(guess)
    if(guess.length > 0) {
        message.textContent = (Number(guess) > 20 || Number(guess) < 1) 
        ?  
        '🛑 Stop, insert a valid number'
        : 
        'Start guessing...'; 

        if((Number(guess) > 20 || Number(guess) < 1)){
            checkButton.hasAttribute('disabled' ) ? '' : disableCheckButton()
        } else{
            checkButton.hasAttribute('disabled') ? enableCheckButton() : ''
        }
    } else{
        message.textContent = 'Start guessing...';
        checkButton.hasAttribute('disabled') ? enableCheckButton() : ''
    }
})



checkButton.addEventListener('click', () => {
    let guess = Number(inputGuess.value);
    checkGuess(guess)
})

againButton.addEventListener('click', resetValues)

resetScoreButton.addEventListener('click', () => {
    localStorage.removeItem('score')
    highscore = 0;
    pHighscore.textContent = 0;
})

pHighscore.textContent = highscore