const player1 = 'fa-circle-o';
const player2 = 'fa-times';
let round_number = 1; //odd - player 1, even - player2

const boxes = [...document.querySelectorAll('.box')]; //spread operator
boxes.forEach(box => box.addEventListener('click', pick));

const board = [
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
    console.log(event.target.dataset)
    const { row, column } = event.target.dataset;
    console.log(row, column)
    const turn = round_number % 2 === 1 ? player1 : player2;
    if(board[row][column]!=='') return;
    event.target.classList.add(turn);
    board[row][column] = turn;
    round_number++;
}