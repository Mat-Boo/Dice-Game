let body = document.querySelector('body');
let newGameButton = document.querySelector('.newGame-button');
let player1GlobalScore = document.querySelector('.player1 .globalScore');
let player1CurrentCursor = document.querySelector('.player1 .playerTitleCursor .currentPlayerCursor')
let player1CurrentScore = document.querySelector('.roundScoreBox-player1 .roundScore');
let player2GlobalScore = document.querySelector('.player2 .globalScore');
let player2CurrentCursor = document.querySelector('.player2 .playerTitleCursor .currentPlayerCursor')
let player2CurrentScore = document.querySelector('.roundScoreBox-player2 .roundScore');
let rollDiceButton = document.querySelector('.rollDice-button');
let holdButton = document.querySelector('.hold-button');
let rowsDice = document.querySelectorAll('.row-dice');
let dicePoint1 = document.querySelector('.row-dice .point1');
let dicePoint2 = document.querySelector('.row-dice .point2');
let dicePoint3 = document.querySelector('.row-dice .point3');
let dicePoint4 = document.querySelector('.row-dice .point4');
let dicePoint5 = document.querySelector('.row-dice .point5');
let dicePoint6 = document.querySelector('.row-dice .point6');
let dicePoint7 = document.querySelector('.row-dice .point7');
let newGameTag = false;

function newGame() {
    newGameTag = true;
    player1GlobalScore.innerText = 0;
    player2GlobalScore.innerText = 0;
    player1CurrentScore.innerText = 0;
    player2CurrentScore.innerText = 0;
    player1CurrentCursor.style.color = 'rgb(235, 77, 76)';
    document.body.style.background = 'linear-gradient(90deg, rgb(247, 247, 247) 50%, rgb(255, 255, 255) 50%)';
    for (let rowDice of rowsDice) {
        rowDice.style.display = 'none';
    }
}

newGameButton.addEventListener('click', newGame);

function rollDice() {
    if (newGameTag) {
        let result = Math.ceil(Math.abs(Math.random() * 10 - 4));
        switch (result) {
            case 1:
                for (let rowDice of rowsDice) {
                    rowDice.style.display = 'flex';
                }
                dicePoint1.style.color = 'white';
                dicePoint2.style.color = 'white';
                dicePoint3.style.color = 'white';
                dicePoint4.style.color = 'rgb(235, 77, 76)';
                dicePoint5.style.color = 'white';
                dicePoint6.style.color = 'white';
                dicePoint7.style.color = 'white';
                break
            case 2:
                for (let rowDice of rowsDice) {
                    rowDice.style.display = 'flex';
                }
                dicePoint1.style.color = 'white';
                dicePoint2.style.color = 'rgb(235, 77, 76)';
                dicePoint3.style.color = 'white';
                dicePoint4.style.color = 'white';
                dicePoint5.style.color = 'white';
                dicePoint6.style.color = 'rgb(235, 77, 76)';
                dicePoint7.style.color = 'white';
                break
            case 3:
                for (let rowDice of rowsDice) {
                    rowDice.style.display = 'flex';
                }
                dicePoint1.style.color = 'white';
                dicePoint2.style.color = 'rgb(235, 77, 76)';
                dicePoint3.style.color = 'white';
                dicePoint4.style.color = 'rgb(235, 77, 76)';
                dicePoint5.style.color = 'white';
                dicePoint6.style.color = 'rgb(235, 77, 76)';
                dicePoint7.style.color = 'white';
                break
            case 4:
                for (let rowDice of rowsDice) {
                    rowDice.style.display = 'flex';
                }
                dicePoint1.style.color = 'rgb(235, 77, 76)';
                dicePoint2.style.color = 'rgb(235, 77, 76)';
                dicePoint3.style.color = 'white';
                dicePoint4.style.color = 'white';
                dicePoint5.style.color = 'white';
                dicePoint6.style.color = 'rgb(235, 77, 76)';
                dicePoint7.style.color = 'rgb(235, 77, 76)';
                break      
            case 5:
                for (let rowDice of rowsDice) {
                    rowDice.style.display = 'flex';
                }
                dicePoint1.style.color = 'rgb(235, 77, 76)';
                dicePoint2.style.color = 'rgb(235, 77, 76)';
                dicePoint3.style.color = 'white';
                dicePoint4.style.color = 'rgb(235, 77, 76)';
                dicePoint5.style.color = 'white';
                dicePoint6.style.color = 'rgb(235, 77, 76)';
                dicePoint7.style.color = 'rgb(235, 77, 76)';
                break
            case 6:
                for (let rowDice of rowsDice) {
                    rowDice.style.display = 'flex';
                }
                dicePoint1.style.color = 'rgb(235, 77, 76)';
                dicePoint2.style.color = 'rgb(235, 77, 76)';
                dicePoint3.style.color = 'rgb(235, 77, 76)';
                dicePoint4.style.color = 'white';
                dicePoint5.style.color = 'rgb(235, 77, 76)';
                dicePoint6.style.color = 'rgb(235, 77, 76)';
                dicePoint7.style.color = 'rgb(235, 77, 76)';
                break        
        }
    } else {
        alert('Veuillez d\'abord lancer une nouvelle partie en cliquant sur "New Game"')
    }
}

rollDiceButton.addEventListener('click', rollDice);
