const player1 = "fa-circle-o";
const player2 = "fa-times";
let round_number = 1;
let endGame = false;
let picks = 0;
let points1 = 0;
let points2 = 0;
const score1 = document.getElementById("score_player1");
score1.innerHTML = points1;
const score2 = document.getElementById("score_player2");
score2.innerHTML = points2;
const next = document.getElementById("next");
next.classList.add(player1);
const boxes = [...document.querySelectorAll(".box")];
boxes.forEach((box) => box.addEventListener("click", pick));
const playAgainstComputer = true;
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function pick(event) {
  if (endGame === true) {
    playAgainButton();
  } else if (endGame === false) {
    const { row, column } = event.target.dataset;
    let turn = round_number % 2 === 1 ? player1 : player2;
    const next_turn = round_number % 2 === 0 ? player1 : player2;
    if (board[row][column] !== "") return;
    picks++;
    event.target.classList.add(turn);
    next.classList.add(next_turn);
    board[row][column] = turn;
    [endGame, points1] = check("player1", "fa-circle-o", points1);
    if (playAgainstComputer === true && endGame === false) {
      setTimeout(function () {
        pickRandom();
        turn = player1;
        [endGame, points2] = check("player2", "fa-times", points2);
        picks++;
      }, 200);
    }
  }
  if (endGame === false && picks === 9) {
    alert("Draw");
    picks = 0;
    points1++;
    points2++;
    score1.innerHTML = points1;
    score2.innerHTML = points2;
    endGame = true;
  }
}

function check(player, fa, points) {
  const result = board.reduce((total, row) => total.concat(row));
  let winner = null;
  let moves = [];
  result.forEach((field, index) => (field == fa ? moves.push(index) : null));
  winning_combinations.forEach((combination) => {
    if (combination.every((index) => moves.indexOf(index) > -1)) {
      combination.forEach((c) =>
        boxes[c].classList.add("box-winning_" + player)
      );
      winner = "Winner: " + player;
      points++;
      endGame = true;
      setTimeout(function () {alert(winner);}, 10);
      document.getElementById("score_" + player).innerHTML = points;
      return [endGame, points];
    }
  });
  return [endGame, points];
}

function playAgainButton() {
  const playAgain = confirm("Play again?");
  if (playAgain) {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    picks = 0;
    endGame = false;
    boxes.forEach((box) => (box.classList = "box fa"));
  }
}

function pickRandom() {
  if (endGame === false) {
    if (playAgainstComputer === true) {
      r1 = Math.floor(Math.random() * 3);
      r2 = Math.floor(Math.random() * 3);
      while (board[r1][r2] !== "") {
        r1 = Math.floor(Math.random() * 3);
        r2 = Math.floor(Math.random() * 3);
      }
      board[r1][r2] = player2;
      boxes[3 * r1 + r2].classList.add(player2);
    }
  }
}
