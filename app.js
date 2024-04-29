
let currentPlayer = "Red";
let gameOver = false;
let board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];

function play(column) {
    if (isGameOver()) return;

    let row = 5;
    while (row >= 0 && board[row][column] !== "") {
        row--;
    }

    if (row === -1) return;

    board[row][column] = currentPlayer;

    document.getElementById(`${row}-${column}`).classList.add(currentPlayer === "Red" ? "red-disc" : "yellow-disc");

    if (checkForWinner(row, column)) {
        gameOver = true;
        document.getElementById("winner").innerText = `${currentPlayer} wins!`;
        return;
    }

    currentPlayer = currentPlayer === "Red" ? "Yellow" : "Red";
}

function isGameOver() {
    return gameOver;
}

function checkForWinner(row, column) {
    if (
        checkLine(row, column, 0, 1) ||
        checkLine(row, column, 0, -1)
 ) return true;

    if (checkLine(row, column, 1, 0)) return true;

    if (
        checkLine(row, column, 1, 1) ||
        checkLine(row, column, 1, -1)
    ) return true;

    return false;
}

function checkLine(row, column, deltaRow, deltaColumn) {
    const disc = board[row][column];
    let count = 1; 

    let r = row + deltaRow;
    let c = column + deltaColumn;
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === disc) {
        count++;
        r += deltaRow;
        c += deltaColumn;
    }

    r = row - deltaRow;
    c = column - deltaColumn;
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === disc) {
        count++;
        r -= deltaRow;
        c -= deltaColumn;
    }

    return count >= 4;
}

function resetGame() {
    currentPlayer = "Red";
    gameOver = false;
    board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ];

    document.getElementById("winner").innerText = "";

    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.remove("red-disc", "yellow-disc");
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("resetButton").addEventListener("click", resetGame);

    document.querySelectorAll(".tile").forEach((tile, index) => {
        tile.addEventListener("click", () => {
            if (!isGameOver()) {
                play(index % 7);
            }
        });
    });
});
