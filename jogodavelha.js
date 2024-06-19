const board = document.getElementById("board");
const casinhas = board.getElementsByClassName("casinha");
const boxVencedor = document.getElementById("vencedor");
const resetButton = document.getElementById("reset");
const historyList = document.getElementById("history");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const startButton = document.getElementById("start");

let jogadas = 0;
let currentPlayer = 'X';
let gameWon = false;
let currentPlayerStarts = 'X';
let player1Name = '';
let player2Name = '';

startButton.addEventListener('click', startGame);

for (let i = 0; i < casinhas.length; i++) {
    casinhas[i].addEventListener('click', casinhaclick);
}

resetButton.addEventListener('click', resetGame);

function startGame() {
    player1Name = player1Input.value || 'Jogador 1';
    player2Name = player2Input.value || 'Jogador 2';
    document.getElementById("player-names").classList.add('hidden');
    board.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    resetGame();
}

function casinhaclick() {
    if (!gameWon && this.innerHTML == "") {
        this.innerHTML = currentPlayer;
        jogadas += 1;
        if (jogadas >= 5) {
            const winnerPattern = verificaGanhador();
            if (winnerPattern) {
                highlightWinningCells(winnerPattern);
                const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
                boxVencedor.innerHTML = `O jogador '${winnerName}' venceu!`;
                addWinnerToHistory(winnerName);
                gameWon = true;
                return;
            } else if (jogadas === 9) {
                boxVencedor.innerHTML = "Empate!";
                addWinnerToHistory("Empate");
                return;
            }
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function verificaGanhador() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (casinhas[a].innerHTML &&
            casinhas[a].innerHTML === casinhas[b].innerHTML &&
            casinhas[a].innerHTML === casinhas[c].innerHTML) {
            return pattern;
        }
    }
    return null;
}

function highlightWinningCells(pattern) {
    for (const index of pattern) {
        casinhas[index].classList.add('highlight');
    }
}

function resetGame() {
    jogadas = 0;
    gameWon = false;
    boxVencedor.innerHTML = "";
    for (const casinha of casinhas) {
        casinha.innerHTML = "";
        casinha.classList.remove('highlight');
        casinha.addEventListener('click', casinhaclick);
    }
    currentPlayer = currentPlayerStarts === 'X' ? 'O' : 'X';
    currentPlayerStarts = currentPlayer;
}

function addWinnerToHistory(winner) {
    const newHistoryItem = document.createElement('li');
    newHistoryItem.textContent = `Rodada ${historyList.childElementCount + 1}: ${winner}`;
    historyList.appendChild(newHistoryItem);
}
