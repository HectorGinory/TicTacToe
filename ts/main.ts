let table: string[][] = []
let gamePage = document.getElementById("game")
let rulesPage = document.getElementById("rules")
let boardHTML = document.getElementById('board')
let victoryPage = document.getElementById("victory")
let newGamePage = document.getElementById("newGame")
let mainMenuPage = document.getElementById("mainMenu")
let boxArray = boardHTML.getElementsByClassName('box')
let vsIA = false
let iaPlaces: number[][] = []
let removedPiece = []
class Player {
    name: string;
    turns: number;
    character: string;

    constructor(name, character) {
        this.name = name;
        this.turns = 3;
        this.character = character;
    }
}

let player1 = new Player("undefined","X")
let player2 = new Player("undefined","O")
let playerPlaying = player1
let players = [player1, player2]
let winnerPlayer = new Player("undefined","O") 

const createTable = (n: number): void => {
    for (let i = 0; i < n; i++) {
        table.push([])
        for (let j = 0; j < n; j++) {
            table[i].push(" ")
        }
    }
}

const checkWin = (array: any[]):boolean => {
    array.map((row, index)=> {
        row.map((e, i) => {
            if(e === player1.character || e === player2.character) {
                if(index === 0) {
                    if (e === table[1][i] && e === table[2][i]) {
                        return true
                    }
                }
                if(i === 0) {
                    if (e === table[index][1] && e === table[index][2]) {
                        return true
                    }
                }
                if(i === 1 && index === 1) {
                    if ((e === table[0][0] && (e === table[2][2])) || (e === table[0][2] && e === table[2][0])) {    
                        return true
                    }
                }
            }
        })
    })
    return false
}

const boxOnClick = (rowArr, colArr, i) => {
        if(playerPlaying.turns === 0 && playerPlaying.character === table[rowArr][colArr]) {
            removePiece(rowArr,colArr,i)
            changesGamePage(0)
            changesGamePage(1)
        } else if (playerPlaying.turns > 0  && table[rowArr][colArr] === " ") {
            setPiece(rowArr,colArr,i)
            changesGamePage(0)
            changesGamePage(1)
            if(checkWin(table)) {
                winnerPlayer = JSON.parse(JSON.stringify(playerPlaying))
                victory()
            }
            turnsPlayer()
        } else if (vsIA === true  && playerPlaying === player2) {
            randomIAClick()
        }
} 

const randomIAClick = () => {
    console.log("try");
    console.log(iaPlaces.length);
    if(player2.turns === 0) {
        let randomPlaceIndex = Math.round(Math.random()*2)
        console.log(iaPlaces[randomPlaceIndex][0],iaPlaces[randomPlaceIndex][1],iaPlaces[randomPlaceIndex][2], "remove");
        boxOnClick(iaPlaces[randomPlaceIndex][0],iaPlaces[randomPlaceIndex][1],iaPlaces[randomPlaceIndex][2])
    } else {
        for(let i = 0; i < table.length; i++) {
            let checkTable = table
            for(let j = 0; j < table[i].length; j++) {
                checkTable[i][j] = player1.character
                if(checkWin(checkTable)) {
                    boxOnClick(i,j,(i*3+j))
                }
                checkTable[i][j] = player2.character
                if(checkWin(checkTable)) {
                    boxOnClick(i,j,(i*3+j))
                }
            }
        }
        let randomRow:number = (Math.round(Math.random()*2))
        let randomCol:number = (Math.round(Math.random()*2))
        let randomI:number = (randomRow * 3) + randomCol
        console.log(randomRow, randomCol, randomI);
        if(randomRow === removedPiece[0] && randomCol === removedPiece[1] && randomI === removedPiece[2]) {
            randomIAClick()
        } else {
            boxOnClick(randomRow, randomCol, randomI)
        }
    }
}

const turnsPlayer = () => {
    if(vsIA) {
        if(playerPlaying === player1) {
            playerPlaying = player2
            setTimeout(() => {
                randomIAClick()
            }, 500)
        } else {
            playerPlaying = player1
        }
    } else {
        if(playerPlaying === player1) {
            playerPlaying = player2
        } else {
            playerPlaying = player1
        }
    }
}

const removePiece = (row,column,n) => {
    if(table[row][column] !== " ") {
        table[row][column] = " ";
        boxArray[n].innerHTML = `<p> </p>`
        console.log(`${playerPlaying.character} removed`);
        playerPlaying.turns++
        removedPiece = [row,column, n]
        if(vsIA && playerPlaying === player2) {
            let indexRemoved;
            iaPlaces.map((e, i) => {
                if(e[0] === row && e[1] === column && e[2] === n){
                    indexRemoved = i
                }
            })
            iaPlaces.slice(indexRemoved, 1)
            setTimeout(() => {
                randomIAClick()
            }, 500)
        }
    } 
}

const setPiece = (row,column,n) => {
    if(table[row][column] === " ") {
        table[row][column] = playerPlaying.character;
        boxArray[n].innerHTML = `<p>${playerPlaying.character}</p>`
        playerPlaying.turns--
        if(vsIA && playerPlaying === player2) {
            iaPlaces.push([row, column, n])
        }
        if(removedPiece.length > 0) {
            removedPiece = []
        }
    } else if (vsIA) {
        setTimeout(() => {
            randomIAClick()
        }, 500)
    }
}

const changeView = (to, from) => {
    to.classList.remove("off")
    from.classList.add("off")
}

const startGameBtn = () => {
    changeView(gamePage, newGamePage)
    createTable(3)
    player1 = new Player(((<HTMLInputElement>document.querySelector('#player1Input')).value), "X")
    player2 = vsIA  ? new Player("IA", "O") 
                    : new Player(((<HTMLInputElement>document.querySelector('#player2Input')).value), "O")
    players = [player1, player2]
    turnsPlayer()
    changesGamePage(0)
    changesGamePage(1)
}

const changesGamePage = (n) => {
    document.getElementById(`namePlayer${n+1}`).innerText = players[n].name
    document.getElementById(`turnsLeftPlayer${n+1}`).innerText = String(players[n].turns)
}

const victory = () => {
    changeView(victoryPage, gamePage)
    playerPlaying = undefined
    document.getElementById("winner").innerText = winnerPlayer.name
}

const pvpBtn = () => {
    let player2Box = document.getElementById("player2")
    let pvpBtn = document.getElementById("vsIA")
    if(vsIA) {
        vsIA = !vsIA
        player2Box.classList.remove("off")
        pvpBtn.innerText = "Player vs IA"
    } else {
        vsIA = !vsIA
        player2Box.classList.add("off")
        pvpBtn.innerText = "Player vs Player"
    }
}