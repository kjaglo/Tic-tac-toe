const player1 = 'fa-circle-o';
const player2 = 'fa-times';
let round_number = 1; //odd - player 1, even - player2
let endGame = false;
let picks = 0;
let points1 = 0;
let points2 = 0;
const score1 = document.getElementById("score1");
score1.innerHTML = points1;
const score2 = document.getElementById("score2");
score2.innerHTML = points2;
const next = document.getElementById("next");
next.classList.add(player1);
const boxes = [...document.querySelectorAll('.box')]; //spread operator
boxes.forEach(box => box.addEventListener('click', pick));
const playAgainstComputer = confirm("Do you want to play against computer?");

// const playAgainstComputer =true;
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const winning_combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function pick(event) {
    if (endGame === true) {
        playAgainButton();
    }
    else if (endGame === false) {
        // console.log(event.target.dataset) //DOMStringMap {row: "0", column: "0"}
        const { row, column } = event.target.dataset; // read data
        // console.log(row, column) //0 0
        let turn = round_number % 2 === 1 ? player1 : player2;
        const next_turn = round_number % 2 === 0 ? player1 : player2;
        if (board[row][column] !== '') return; // if false go forward if true stop function

        if (playAgainstComputer === true) {
            pickRandom();
            turn=player1;
        }
        picks++;
        event.target.classList.add(turn);
        next.classList.remove(turn);
        next.classList.add(next_turn);
        board[row][column] = turn;
    }
    round_number++;
    console.log(check());
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

// function two() {
// if (2===1) return; // if true false forward if true stop function
// console.log("trueee");
// console.log("2=2");
// }
// two();
function check() {
    const result = board.reduce((total, row) => total.concat(row)); //["fa-circle-o", "", "", "", "", "", "", "", ""]
    // console.log(result);
    let winner = null;
    let moves = {
        'fa-circle-o': [],
        'fa-times': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);//if key exists push
    winning_combinations.forEach(combination => {
        if (combination.every(index => moves[player1].indexOf(index) > -1)) {
            combination.forEach(c => boxes[c].classList.add('box-winning1'));
            winner = "Winner: Player 1";
            points1++;
            alert(winner);
            endGame = true;
            score1.innerHTML = points1;

        } else if (combination.every(index => moves[player2].indexOf(index) > -1)) {
            combination.forEach(c => boxes[c].classList.add('box-winning2'));
            winner = "Winner: Player 2";
            points2++;
            alert(winner);
            endGame = true;
            score2.innerHTML = points2;
        }
    });
    return winner;
}

function playAgainButton() {
    const playAgain = confirm("Play again?");
    if (playAgain) {
        // console.log("Play again");
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        // round_number = 1;
        picks = 0;
        endGame = false;
        boxes.forEach(box => box.classList = "box fa");

    }
}
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]
function pickRandom() {
    if(endGame===false){
    if (playAgainstComputer === true) {
        r1 = Math.floor(Math.random() * 3)
        r2 = Math.floor(Math.random() * 3)

        while (board[r1][r2] !== '') {
            r1 = Math.floor(Math.random() * 3)
            r2 = Math.floor(Math.random() * 3)
            // console.log("RRRRRRRRRRR", r1, r2);
        }
        board[r1][r2] = player2;
        // console.log("RRRRRRRRRRR", r1, r2);
        boxes[3*r1 + r2].classList.add(player2);
    }
}
}
