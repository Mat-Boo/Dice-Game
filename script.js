/* Create variables from DOM */
let body = document.querySelector('body');
let main = document.querySelector('main');
let rowNewGame = document.querySelector('.row-newGame');
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
let modalInfo = document.querySelector('#modalInfo');
let textModalInfo = document.querySelector('#modalInfo p');
let modalInfoCrossClose = document.querySelector('#modalInfo .btn-close');
let modalInfoButtonClose = document.querySelector('#modalInfo .btn');
let modalConfirm = document.querySelector('#modalConfirm');
let modalConfirmCrossClose = document.querySelector('#modalConfirm .btn-close');
let modalConfirmButtonNo = document.querySelector('#modalConfirm .btn-no');
let modalConfirmButtonYes = document.querySelector('#modalConfirm .btn-yes');
let modalInfoContent = document.querySelector('#modalInfo .modal-content');
/* END of Create variables from DOM */

/* Others variables */
let modalConfirmValue = null;
let newGameTag = false;
let player = null;
/* END of Others variables */

/* Modal Window with information */
function showModalInfo(textToDisplay) {//Function to display the information modal window according to the available space below the game
    let mainHeight = main.clientHeight;
    let styleRowNewGame = rowNewGame.currentStyle || window.getComputedStyle(rowNewGame);
    let topModalInfo = parseInt(mainHeight) + parseInt(styleRowNewGame.marginTop)
    if (window.innerHeight - mainHeight > 276) {
        topModalInfo = `${topModalInfo}px`;
    }
    modalInfo.style.top = topModalInfo;
    newGameButton.removeEventListener('click', newGame);
    rollDiceButton.removeEventListener('click', rollDice);
    holdButton.removeEventListener('click', hold);
    textModalInfo.innerText = textToDisplay;
    modalInfoButtonClose.style.animation = '2s ease 2s infinite running moveButtonClose';
}

function hideModalInfo() {//Function to hide the information modal window
    newGameButton.addEventListener('click', newGame);
    rollDiceButton.addEventListener('click', rollDice);
    holdButton.addEventListener('click', hold);
    modalInfo.style.display = 'none';
}

function ModalInfoCloseCrossButtons() {//Function which removes listener on cross et close buttons on information modal window and add new by calling the hideModalInfo function
    modalInfoCrossClose.removeEventListener('click', hideModalInfoAfter1);
    modalInfoCrossClose.addEventListener('click', hideModalInfo)
    modalInfoButtonClose.removeEventListener('click', hideModalInfoAfter1);
    modalInfoButtonClose.addEventListener('click', hideModalInfo);
}

function hideModalInfoAfter1() {//Function to hide the information modal window after playing 1 with dice but current score et dice still displayed
    newGameButton.addEventListener('click', newGame);
    rollDiceButton.addEventListener('click', rollDice);
    holdButton.addEventListener('click', hold);
    modalInfo.style.display = 'none';
    if (player === 1) {
        player1CurrentScore.innerText = 0;
        newPlayer(2);
    } else {
        player2CurrentScore.innerText = 0;
        newPlayer(1);
    }
}

function ModalInfoAfter1CloseCrossButtons() {//Function which removes listener on cross et close buttons on information modal window and add new by calling the hideModalInfoAfter1 function
    modalInfoCrossClose.removeEventListener('click', hideModalInfo);
    modalInfoCrossClose.addEventListener('click', hideModalInfoAfter1);
    modalInfoButtonClose.removeEventListener('click', hideModalInfo);
    modalInfoButtonClose.addEventListener('click', hideModalInfoAfter1);
}
/* END of Modal Window with information */

/* Modal Window with confirmation */
function ModalConfirmAnswer() {//Function to display a modal window with confirmation when you click on New Game Button and a game is running
    modalConfirmCrossClose.addEventListener('click', () => {//function to close the confirmation modal window when clicking on Cross and nothing happens, the game coninue
        modalConfirm.style.display = 'none';
        modalConfirmValue = false;
    })
    
    modalConfirmButtonNo.addEventListener('click', () => {//function to close the confirmation modal window when clicking on No Button and nothing happens, the game coninue
        modalConfirm.style.display = 'none';
        modalConfirmValue = false;
    })
    
    modalConfirmButtonYes.addEventListener('click', () => {//function to close the confirmation modal window when clicking on Yes Button and and function createNewGame is calling
        modalConfirm.style.display = 'none';
        modalConfirmValue = true;
        if (modalConfirmValue) {
            createNewGame();
        }
    })
}
/* END of Modal Window with confirmation */


function createNewGame() {//Function to create a new game
    newGameTag = true;
    player = 1;
    player1GlobalScore.innerText = 0;
    player2GlobalScore.innerText = 0;
    player1CurrentScore.innerText = 0;
    player2CurrentScore.innerText = 0;
    newPlayer(player);
    rollDiceButton.removeEventListener('click', endAlert);
    rollDiceButton.addEventListener('click', rollDice);
    holdButton.removeEventListener('click', endAlert);
    holdButton.addEventListener('click', hold);
    gameRules();
    ModalInfoCloseCrossButtons()
}

function newGame() {//Function to create a new game but control if a gamme is running
    if (newGameTag) {// Control if game is running
        modalConfirm.style.display = 'block';
        ModalConfirmAnswer();
    } else {
        createNewGame();
    }
}

function newPlayer(playerToPlay) {// Function to highlight the current player with the background and cursor
    player = playerToPlay;
    switch (playerToPlay) {
        case 1:
            player1CurrentCursor.style.color = 'rgb(235, 77, 76)';
            player2CurrentCursor.style.color = 'white';
            document.body.style.background = 'linear-gradient(90deg, rgb(247, 247, 247) 50%, rgb(255, 255, 255) 50%)';
            for (let rowDice of rowsDice) {
                rowDice.style.display = 'none';
            }
            break;
        case 2:
            player1CurrentCursor.style.color = 'white';
            player2CurrentCursor.style.color = 'rgb(235, 77, 76)';
            document.body.style.background = 'linear-gradient(90deg, rgb(255, 255, 255) 50%, rgb(247, 247, 247) 50%)';
            for (let rowDice of rowsDice) {
                rowDice.style.display = 'none';
            }
            break;
    }
}

function gameRules() {//Function to display the rules of game when starts a new game
    showModalInfo(`Règles :
        Le jeu comprend 2 joueurs sur un seul et même écran.
        Chaque joueur possède un score temporaire en bas sur fond rouge et un score global, sous le player.

        À chaque tour, le joueur a son score temporaire initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite avec le bouton "ROLL DICE".
        Le résultat d’un lancer est ajouté au score temporaire.

        Lors de son tour, le joueur peut décider à tout moment de :
        - Cliquer sur le bouton "HOLD", qui permet d’envoyer les points du score temporaire vers le score global.
        Ce sera alors le tour de l’autre joueur.
        - Lancer le dé et s’il obtient un 1, son score temporaire est perdu, remis à 0 et c’est la fin de son tour.

        Le premier joueur qui atteint les 100 points sur le score global gagne le jeu.`);
    modalInfo.style.top = 0;
    modalInfo.style.display = 'block';
}

function rollDice() {// Function to simulate the roll of dice
    if (newGameTag) {// Control if game is running
        let result = Math.floor(Math.random() * 6) + 1; //generate a random number between [1 - 6]
        switch (result) {//According to the value of result, display the points on dice
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
                break;
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
                break;
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
                break;
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
                break;     
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
                break;
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
                break;  
        }
        if (result !== 1) {//If the value of result doesn't equal to 1, the value of result is added to current score according to player
            switch (player) {
                case 1:
                    player1CurrentScore.innerText = parseInt(player1CurrentScore.innerText) + result;
                    break;
                case 2:
                    player2CurrentScore.innerText = parseInt(player2CurrentScore.innerText) + result;
                    break;
            }
        } else {
            switch (player) {//If value of result equals to 1, display message in modal window and change player
                case 1:
                    showModalInfo(`Vous avez malheureusement fait 1, votre score courant repasse à 0.\n\nC\'est au tour du joueur 2.`);
                    modalInfo.style.display = 'block';
                    ModalInfoAfter1CloseCrossButtons();
                    break;
                case 2:
                    showModalInfo(`Vous avez malheureusement fait 1, votre score courant repasse à 0.\n\nC\'est au tour du joueur 1.`);
                    modalInfo.style.display = 'block';
                    ModalInfoAfter1CloseCrossButtons();
                    break;
            } 
        }
    } else {
        showModalInfo('Veuillez d\'abord lancer une nouvelle partie en cliquant sur le bouton :\n"NEW GAME"');
        modalInfo.style.display = 'block';
        ModalInfoCloseCrossButtons();
    }
}

function hold() {// function to add the current score to the global score and verify if the 100 points are reached
    if (newGameTag) {// Control if game is running
        if (player1CurrentScore.innerText == 0 && player2CurrentScore.innerText == 0) {// Control if dice rolled at least 1 time before holding
            showModalInfo(`Lancez au moins une fois le dé en cliquant sur le bouton :\n"ROLL DICE"\n\nC\'est au joueur ${player} de jouer.`);
            modalInfo.style.display = 'block';
            ModalInfoCloseCrossButtons();
        } else {
            switch (player) {//function to add current score to global score according to player and put current score to 0
                case 1:
                    player1GlobalScore.innerText = parseInt(player1GlobalScore.innerText) + parseInt(player1CurrentScore.innerText);
                    player1CurrentScore.innerText = 0;
                    if (player1GlobalScore.innerText >= 100) {// Control if 100 points are reached
                        showModalInfo('***** FELICITATION *****\nLe joueur 1 a gagné en atteignant le 1er les 100 points.');
                        modalInfo.style.display = 'block';
                        newGameTag = false;
                        /* Remove events on buttons Roll Dice and Hold and put a new one to show a message for the end of game */
                        rollDiceButton.removeEventListener('click', rollDice);
                        rollDiceButton.addEventListener('click', endAlert);
                        holdButton.removeEventListener('click', hold);
                        holdButton.addEventListener('click', endAlert);
                        ModalInfoCloseCrossButtons();
                    } else {
                        newPlayer(2);
                    }
                    break;
                case 2:
                    player2GlobalScore.innerText = parseInt(player2GlobalScore.innerText) + parseInt(player2CurrentScore.innerText);
                    player2CurrentScore.innerText = 0;
                    if (player2GlobalScore.innerText >= 100) {// Control if 100 points are reached
                        showModalInfo('***** FELICITATION *****\nLe joueur 2 a gagné en atteignant le 1er les 100 points.');
                        modalInfo.style.display = 'block';
                        newGameTag = false;
                        /* Remove events on buttons Roll Dice and Hold and put a new one to show a message for the end of game */
                        rollDiceButton.removeEventListener('click', rollDice);
                        rollDiceButton.addEventListener('click', endAlert);
                        holdButton.removeEventListener('click', hold);
                        holdButton.addEventListener('click', endAlert);
                        ModalInfoCloseCrossButtons();
                    } else {
                        newPlayer(1);
                    }
                    break; 
            }
        }    
    } else {
        showModalInfo('Veuillez d\'abord lancer une nouvelle partie en cliquant sur le bouton :\n"NEW GAME"');
        modalInfo.style.display = 'block';
        ModalInfoCloseCrossButtons();
    }
}

function endAlert() {// Function to display a message about the end of game
    showModalInfo('La partie est terminée.\nSi vous souhaitez faire une nouvelle partie, cliquez sur le bouton :\n"NEW GAME"');
    modalInfo.style.display = 'block';
    ModalInfoCloseCrossButtons();
}

newGameButton.addEventListener('click', newGame);
rollDiceButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', hold);