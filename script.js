const player1 = 'fa-circle-o';
const player2 = 'fa-times';
let round_number = 1; //odd - player 1, even - player2

const boxes = [...document.querySelectorAll('.box')]; //spread operator
boxes.forEach(box => box.addEventListener('click', pick));

function pick(event){
    const turn = round_number % 2 === 1 ? player1 : player2;
    event.target.classList.add(turn);
    round_number++;
}