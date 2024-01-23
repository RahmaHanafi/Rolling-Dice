/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var reachScore = 100;
var winnername = "WINNER!";

//buttons
var newGame = document.getElementsByClassName("btn-new")[0];
var rollDice = document.getElementsByClassName("btn-roll")[0];
var hold = document.getElementsByClassName("btn-hold")[0];

var playersName = document.getElementsByClassName("player-name");
var playersScore = document.getElementsByClassName("player-score");
var playersCurrScore = document.getElementsByClassName("player-current-score");

//panel
var playerPanel1 = document.getElementsByClassName("player-0-panel")[0];
var playerPanel2 = document.getElementsByClassName("player-1-panel")[0];

var currentPlayer = 0;

var dice = document.getElementsByClassName("dice")[0];

var toggle = () => {
  playerPanel1.classList.toggle("active");
  playerPanel2.classList.toggle("active");
  currentPlayer = currentPlayer === 0 ? 1 : 0;
};

newGame.addEventListener("click", (e) => {
  playersScore[0].innerHTML = 0;
  playersScore[1].innerHTML = 0;

  playersCurrScore[0].innerHTML = 0;
  playersCurrScore[1].innerHTML = 0;

  playerPanel1.classList.add("active");
  playerPanel2.classList.remove("active");

  playersName[0].innerHTML = "Player 1";
  playersName[1].innerHTML = "Player 2";

  playerPanel1.classList.remove("winner");
  playerPanel2.classList.remove("winner");

  currentPlayer = 0;
});

rollDice.addEventListener("click", (e) => {
  if (
    playerPanel1.classList.contains("active") ||
    playerPanel2.classList.contains("active")
  ) {
    let number = Math.ceil(Math.random() * 6);
    dice.src = `./dice/dice-${number}.png`;

    if (number !== 1) {
      let score = number + Number(playersCurrScore[currentPlayer].innerHTML);
      playersCurrScore[currentPlayer].innerHTML = score;
    } else {
      playersCurrScore[currentPlayer].innerHTML = 0;
      toggle();
    }
  }
});

hold.addEventListener("click", (e) => {
  let score =
    Number(playersScore[currentPlayer].innerHTML) +
    Number(playersCurrScore[currentPlayer].innerHTML);
  playersScore[currentPlayer].innerHTML = score;
  playersCurrScore[currentPlayer].innerHTML = 0;

  if (playersScore[0].innerHTML >= reachScore) {
    playerPanel1.classList.add("winner");
    playersName[0].innerHTML = winnername;
    playerPanel1.classList.remove("active");
  } else if (playersScore[1].innerHTML >= reachScore) {
    playerPanel2.classList.add("winner");
    playersName[1].innerHTML = winnername;
    playerPanel2.classList.remove("active");
  } else {
    toggle();
  }
});
