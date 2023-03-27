let table = [];
let tableroHTML = document.getElementById('board');
let verticalTable = [];
let diagonalTable = [];
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
        }
    }
    if (table.length === 3) {
        diagonalTable = [[table[0][0], table[1][1], table[2][2]],
            [table[0][2], table[1][1], table[2][0]]];
    }
};
createTable(3);
console.log(table);
console.log(verticalTable);
console.log(diagonalTable);
//# sourceMappingURL=main.js.map