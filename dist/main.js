let table = [];
let gamePage = document.getElementById("game");
let rulesPage = document.getElementById("rules");
let boardHTML = document.getElementById('board');
let victoryPage = document.getElementById("victory");
let newGamePage = document.getElementById("newGame");
let mainMenuPage = document.getElementById("mainMenu");
let boxArray = boardHTML.getElementsByClassName('box');
let vsIA = false;
let iaPlaces = [];
let removedPiece = [];
class Player {
    constructor(name, character) {
        this.name = name;
        this.turns = 3;
        this.character = character;
    }
}
let player1 = new Player("undefined", "X");
let player2 = new Player("undefined", "O");
let playerPlaying = player1;
let players = [player1, player2];
let winnerPlayer = new Player("undefined", "O");
const createTable = (n) => {
    for (let i = 0; i < n; i++) {
        table.push([]);
        for (let j = 0; j < n; j++) {
            table[i].push(" ");
        }
    }
};
const checkWin = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] === array[i][1] && array[i][0] === array[i][2]) {
            if (array[i][0] !== " ") {
                return [true, array[i][0]];
            }
        }
        if (array[0][i] === array[1][i] && array[0][i] === array[2][i]) {
            if (array[0][i] !== " ") {
                return [true, array[0][i]];
            }
        }
        if (array[1][1] === array[0][0] && array[1][1] === array[2][2]) {
            if (array[1][1] !== " ") {
                return [true, array[1][1]];
            }
        }
        if (array[1][1] === array[0][2] && array[1][1] === array[2][0]) {
            if (array[1][1] !== " ") {
                return [true, array[1][1]];
            }
        }
    }
    return [false, undefined];
};
const boxOnClick = (rowArr, colArr, i) => {
    if (playerPlaying.turns === 0 && playerPlaying.character === table[rowArr][colArr]) {
        removePiece(rowArr, colArr, i);
        changesGamePage(0);
        changesGamePage(1);
    }
    else if (playerPlaying.turns > 0 && table[rowArr][colArr] === " ") {
        setPiece(rowArr, colArr, i);
        changesGamePage(0);
        changesGamePage(1);
        if (checkWin(table)[0]) {
            if (checkWin(table)[1] === player1.character) {
                winnerPlayer = JSON.parse(JSON.stringify(player1));
            }
            if (checkWin(table)[1] === player2.character) {
                winnerPlayer = JSON.parse(JSON.stringify(player2));
            }
            victory();
        }
        turnsPlayer();
    }
    else if (vsIA === true && playerPlaying === player2) {
        randomIAClick();
    }
};
const randomIAClick = () => {
    console.log("try");
    console.log(iaPlaces.length);
    if (player2.turns === 0) {
        let arrayRemove = [];
        let iRemove;
        for (let i = 0; i < iaPlaces.length; i++) {
            if (iaPlaces[0][i] === iaPlaces[1][i])
                arrayRemove.push(2);
            if (iaPlaces[0][i] === iaPlaces[2][i])
                arrayRemove.push(1);
            if (iaPlaces[1][i] === iaPlaces[2][i])
                arrayRemove.push(0);
        }
        if (iaPlaces[0][2] === iaPlaces[1][2] + 4 || iaPlaces[0][2] === iaPlaces[1][2] - 4 ||
            iaPlaces[0][2] === iaPlaces[1][2] + 8 || iaPlaces[0][2] === iaPlaces[1][2] - 8 ||
            iaPlaces[0][2] === iaPlaces[1][2] + 2 || iaPlaces[0][2] === iaPlaces[1][2] - 2)
            arrayRemove.push(2);
        if (iaPlaces[0][2] === iaPlaces[2][2] + 4 || iaPlaces[0][2] === iaPlaces[2][2] - 4 ||
            iaPlaces[0][2] === iaPlaces[2][2] + 8 || iaPlaces[0][2] === iaPlaces[2][2] - 8 ||
            iaPlaces[0][2] === iaPlaces[2][2] + 2 || iaPlaces[0][2] === iaPlaces[2][2] - 2)
            arrayRemove.push(1);
        if (iaPlaces[1][2] === iaPlaces[1][2] + 4 || iaPlaces[1][2] === iaPlaces[1][2] - 4 ||
            iaPlaces[1][2] === iaPlaces[1][2] + 8 || iaPlaces[1][2] === iaPlaces[1][2] - 8 ||
            iaPlaces[1][2] === iaPlaces[1][2] + 2 || iaPlaces[1][2] === iaPlaces[1][2] - 2)
            arrayRemove.push(0);
        if (arrayRemove.length === 0) {
            iRemove = Math.round(Math.random() * 2);
            boxOnClick(iaPlaces[iRemove][0], iaPlaces[iRemove][1], iaPlaces[iRemove][2]);
        }
        else {
            iRemove = Math.round(Math.random() * (arrayRemove.length - 1));
            boxOnClick(iaPlaces[(arrayRemove[iRemove])][0], iaPlaces[(arrayRemove[iRemove])][1], iaPlaces[(arrayRemove[iRemove])][2]);
        }
    }
    else {
        let places;
        if ((iaChecks(player2.character)[0])) {
            places = iaChecks(player2.character)[1];
            boxOnClick(places[0], places[1], places[2]);
        }
        else if (iaChecks(player1.character)[0]) {
            places = iaChecks(player1.character)[1];
            boxOnClick(places[0], places[1], places[2]);
        }
        else {
            let randomRow = (Math.round(Math.random() * 2));
            let randomCol = (Math.round(Math.random() * 2));
            let randomI = (randomRow * 3) + randomCol;
            console.log(randomRow, randomCol, randomI);
            if (randomRow === removedPiece[0] && randomCol === removedPiece[1] && randomI === removedPiece[2]) {
                randomIAClick();
            }
            else {
                boxOnClick(randomRow, randomCol, randomI);
            }
        }
    }
};
const turnsPlayer = () => {
    if (vsIA) {
        if (playerPlaying === player1) {
            playerPlaying = player2;
            randomIAClick();
        }
        else {
            playerPlaying = player1;
        }
    }
    else {
        if (playerPlaying === player1) {
            playerPlaying = player2;
        }
        else {
            playerPlaying = player1;
        }
    }
};
const iaChecks = (character) => {
    for (let i = 0; i < table.length; i++) {
        let checkTable = JSON.parse(JSON.stringify(table));
        for (let j = 0; j < table[i].length; j++) {
            if (i !== removedPiece[0] || j !== removedPiece[1] || (i * 3 + j) !== removedPiece[2]) {
                if (checkTable[i][j] === " ") {
                    checkTable[i][j] = character;
                    if (checkWin(checkTable)[0]) {
                        return [true, [i, j, (i * 3 + j)]];
                    }
                    else {
                        checkTable[i][j] = " ";
                    }
                }
            }
        }
    }
    return [false, undefined];
};
const removePiece = (row, column, n) => {
    if (table[row][column] !== " ") {
        table[row][column] = " ";
        boxArray[n].innerHTML = `<p> </p>`;
        console.log(`${playerPlaying.character} removed`);
        playerPlaying.turns++;
        removedPiece = [row, column, n];
        if (vsIA && playerPlaying === player2) {
            let indexRemoved;
            iaPlaces.map((e, i) => {
                if (e[0] === row && e[1] === column && e[2] === n) {
                    indexRemoved = i;
                    removedPiece = [row, column, n];
                }
            });
            iaPlaces.splice(indexRemoved, 1);
            console.log(iaPlaces + "removed");
            setTimeout(() => {
                randomIAClick();
            }, 500);
        }
    }
};
const setPiece = (row, column, n) => {
    if (table[row][column] === " ") {
        table[row][column] = playerPlaying.character;
        boxArray[n].innerHTML = `<p>${playerPlaying.character}</p>`;
        playerPlaying.turns--;
        if (vsIA && playerPlaying === player2) {
            iaPlaces.push([row, column, n]);
            console.log(iaPlaces);
        }
        if (removedPiece.length > 0) {
            removedPiece = [];
        }
    }
    else if (vsIA) {
        setTimeout(() => {
            randomIAClick();
        }, 500);
    }
};
const changeView = (to, from) => {
    to.classList.remove("off");
    from.classList.add("off");
};
const startGameBtn = () => {
    changeView(gamePage, newGamePage);
    createTable(3);
    player1 = new Player((document.querySelector('#player1Input').value), "X");
    player2 = vsIA ? new Player("IA", "O")
        : new Player((document.querySelector('#player2Input').value), "O");
    players = [player1, player2];
    turnsPlayer();
    changesGamePage(0);
    changesGamePage(1);
};
const changesGamePage = (n) => {
    document.getElementById(`namePlayer${n + 1}`).innerText = players[n].name;
    document.getElementById(`turnsLeftPlayer${n + 1}`).innerText = String(players[n].turns);
};
const victory = () => {
    changeView(victoryPage, gamePage);
    document.getElementById("winner").innerText = winnerPlayer.name;
};
const pvpBtn = () => {
    let player2Box = document.getElementById("player2");
    let pvpBtn = document.getElementById("vsIA");
    if (vsIA) {
        vsIA = !vsIA;
        player2Box.classList.remove("off");
        pvpBtn.innerText = "Player vs IA";
    }
    else {
        vsIA = !vsIA;
        player2Box.classList.add("off");
        pvpBtn.innerText = "Player vs Player";
    }
};
//# sourceMappingURL=main.js.map