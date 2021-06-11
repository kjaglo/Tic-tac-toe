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

const boxes = [...document.querySelectorAll('.box')]; //spread operator
boxes.forEach(box => box.addEventListener('click', pick));

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
    if(endGame === true){
        playAgainButton();
    }
    else if (endGame === false) {
        console.log(event.target.dataset) //DOMStringMap {row: "0", column: "0"}
        const { row, column } = event.target.dataset; // read data
        console.log(row, column) //0 0
        const turn = round_number % 2 === 1 ? player1 : player2;
        if (board[row][column] !== '') return; // if false go forward if true stop function
        picks++;
        event.target.classList.add(turn);
        board[row][column] = turn;
        round_number++;
        console.log(check());
        if (endGame === false && picks === 9) {
            alert("Draw");
            picks = 0;
        }
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
    console.log(result);
    let winner = null;
    let moves = {
        'fa-circle-o': [],
        'fa-times': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);//if key exists push
    console.log(moves); //fa-circle-o: (3) [0, 4, 6]    fa-times: (2) [3, 7]
    winning_combinations.forEach(combination => {
        if (combination.every(index => moves[player1].indexOf(index) > -1)) {
            winner = "Winner: Player 1";
            points1++;
            alert(winner);
            endGame = true;
            score1.innerHTML = points1;
        } else if (combination.every(index => moves[player2].indexOf(index) > -1)) {
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
    if(playAgain){
        console.log("Play again");
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        round_number = 1;
        picks = 0;
        endGame = false;
        boxes.forEach(box => box.classList="box fa");

    }
}