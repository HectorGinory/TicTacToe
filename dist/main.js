let table = [];
let boardHTML = document.getElementById('board');
let boxArray = boardHTML.getElementsByClassName('box');
let verticalTable = [];
let diagonalTable = [];
let mainMenuPage = document.getElementById("mainMenu");
let newGamePage = document.getElementById("newGame");
let gamePage = document.getElementById("game");
let rulesPage = document.getElementById("rules");
let characterPlaying = "X";
const createTable = (n) => {
    for (let i = 0; i < n; i++) {
        table.push([]);
        for (let j = 0; j < n; j++) {
            table[i].push(" ");
        }
    }
    updateTables();
};
const updateTables = () => {
    verticalTable = [];
    diagonalTable = [];
    for (let i = 0; i < table.length; i++) {
        verticalTable.push([]);
        for (let j = 0; j < table.length; j++) {
            verticalTable[i].push(table[j][i]);
        }
    }
    diagonalTable = [[table[0][0], table[1][1], table[2][2]],
        [table[0][2], table[1][1], table[2][0]]];
    checkWin(table);
};
const checkWin = (array) => {
    array.map((row, index) => {
        row.map((e, i) => {
            if (e === "X" || e === "O") {
                if (index === 0) {
                    if (e === table[1][i] && e === table[2][i]) {
                        console.log(`partida terminada`);
                    }
                }
                if (i === 0) {
                    if (e === table[index][1] && e === table[index][2]) {
                        console.log(`partida terminada`);
                    }
                }
                if (i === 1 && index === 1) {
                    if ((e === table[0][0] && (e === table[2][2])) || (e === table[0][2] && e === table[2][0])) {
                        console.log(`partida terminada`);
                    }
                }
            }
        });
    });
    // console.log([win, winCharacter]);
};
const setPiece = (row, column, n) => {
    table[row][column] = characterPlaying;
    boardHTML;
    let contain = document.createElement('p');
    contain.innerHTML = characterPlaying;
    boxArray[n].appendChild(contain);
    console.log(`${characterPlaying} placed`);
    (characterPlaying === "X") ? characterPlaying = "O" : characterPlaying = "X";
    updateTables();
};
// EVENTS LISTENERS
// Chancging pages
document.getElementById("newGameBtn").addEventListener("click", () => {
    newGamePage.classList.remove("off");
    mainMenuPage.classList.add("off");
});
document.getElementById("rulesBtn").addEventListener("click", () => {
    rulesPage.classList.remove("off");
    mainMenuPage.classList.add("off");
});
document.getElementById("startGameBtn").addEventListener("click", () => {
    newGamePage.classList.add("off");
    gamePage.classList.remove("off");
});
// Coin in boxes
document.getElementById("box1").addEventListener("click", () => {
    setPiece(0, 0, 0);
    updateTables();
});
document.getElementById("box2").addEventListener("click", () => {
    setPiece(0, 1, 1);
    updateTables();
});
document.getElementById("box3").addEventListener("click", () => {
    setPiece(0, 2, 2);
    updateTables();
});
document.getElementById("box4").addEventListener("click", () => {
    setPiece(1, 0, 3);
    updateTables();
});
document.getElementById("box5").addEventListener("click", () => {
    setPiece(1, 1, 4);
    updateTables();
});
document.getElementById("box6").addEventListener("click", () => {
    setPiece(1, 2, 5);
    updateTables();
});
document.getElementById("box7").addEventListener("click", () => {
    setPiece(2, 0, 6);
    updateTables();
});
document.getElementById("box8").addEventListener("click", () => {
    setPiece(2, 1, 7);
    updateTables();
});
document.getElementById("box9").addEventListener("click", () => {
    setPiece(2, 2, 8);
    updateTables();
});
createTable(3);
console.log(table);
//# sourceMappingURL=main.js.map