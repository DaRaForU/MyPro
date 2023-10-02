const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#infomation');
const startCells = [
    '', '', '', '', '', '', '', '', ''
];



let go = 'circle';

infoDisplay.textContent = 'Circle goes first!';


function createBoard(){
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);

        gameBoard.append(cellElement);
    });
}

createBoard();

function addGo(e){
    // console.log(e.target);

    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);

    go = go === 'circle' ? 'cross' : 'circle';
    infoDisplay.textContent = `It is now ${go}'s go`;

    e.target.removeEventListener('click', addGo);

    checkScore();
    
}

function checkScore(){

    const allSquare = document.querySelectorAll('.square');
    // console.log(allSquare);

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquare[cell].firstChild?.classList.contains('circle'));
        
        console.log(circleWins);
        if(circleWins){
            infoDisplay.textContent = 'Circle wins'
            allSquare.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    });

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => allSquare[cell].firstChild?.classList.contains('cross'));
        
        console.log(crossWins);
        if(crossWins){
            infoDisplay.textContent = 'Cross wins';
            allSquare.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    });

}

