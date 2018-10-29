function loadView() {
    console.log("loading view");
    createGameFrame();
}
function createGameFrame() {
    let gameFrame = getGameFrame();
    let enemyTankRow = createEnemyTankRow();
    let spacingRow = createSpacingRow();
    let middleLineRow = createMiddleLineRow();
    let spacingRow2 = createSpacingRow();
    let myTankRow = createMyTankRow();
    
    gameFrame.appendChild(enemyTankRow);
    gameFrame.appendChild(spacingRow);
    gameFrame.appendChild(middleLineRow);
    gameFrame.appendChild(spacingRow2);
    gameFrame.appendChild(myTankRow);
}
function getGameFrame() {
    return document.getElementById("gameFrame");
}
function createMiddleLineRow() {
    let middleLineRow = createRow();
    let col = createCol12();
    col.appendChild(createMiddleLine());
    middleLineRow.appendChild(col);
    return middleLineRow;
}
function createMiddleLine() {
    let line = document.createElement("hr");
    return line;
}

function createSpacingRow() {
    let row = createRow();
    return row.appendChild(createSpacing());
}
function createSpacing() {
    let spacing = document.createElement("div");
    spacing.className = "spacing";
    return spacing;
}

function createEnemyTankRow() {
    let enemyTankRow = createRow();
    let enemyTankCol = createCol12();
    let enemyTank = createEnemyTank();
    enemyTankCol.appendChild(enemyTank);
    enemyTankRow.appendChild(enemyTankCol);
    return enemyTankRow;
}

function createEnemyTank() {
    let tank = document.createElement("div");
    tank.id = "enemyTank";
    return tank;
}

function createMyTankRow() {
    let myTankRow = createRow();
    let myTankCol = createCol12();
    let myTank = createMyTank();
    myTankCol.appendChild(myTank);
    myTankRow.appendChild(myTankCol);
    return myTankRow;
}

function createMyTank() {
    let tank = document.createElement("div");
    tank.id = "myTank";
    return tank;
}

function getGameFrame() {
    return document.getElementById("gameFrame");
}

function createRow() {
    let row = document.createElement("div");
    row.className = "row";
    return row;
}

function createCol12() {
    let col = document.createElement("div");
    col.className = "col-12";
    return col;
}