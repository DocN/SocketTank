function loadView() {
    console.log("loading view");
    createPlayerPrompt();
    
}


function createPlayerPrompt() {
    let loginPrompt = document.getElementById("loginPrompt");
    loginPrompt.className = "container viewheight40";
    loginPrompt.appendChild(createTitle());
    loginPrompt.appendChild(createRowSpacing10());
    loginPrompt.appendChild(createInputBox());
    loginPrompt.appendChild(createRowSpacing10());
    loginPrompt.appendChild(createSubmitButtonRow());
}

function createRowSpacing10() {
    let row = createRow();
    let col = createCol12();
    col.appendChild(createSpacing10());
    row.appendChild(col);
    return row;
}

function createSpacing10() {
    let spacing10 = document.createElement("div");
    spacing10.className = "spacing10";
    return spacing10;
}
function createSubmitButtonRow() {
    let row = createRow();
    let col = createCol12();
    col.appendChild(createSubmitButton());
    row.appendChild(col);
    return row;
}

function createSubmitButton() {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary buttonWidth";
    btn.innerText = "Play!";
    btn.setAttribute("onClick", "submitUser()")
    return btn;
}
function createTitle() {
    let title = document.createElement("h1");
    title.id = "promptTitle";
    title.innerText = "Please enter your name";
    let row = createRow();
    let col = createCol12();
    col.appendChild(title);
    row.appendChild(col);
    return row;
}

function createInputBox() {
    let name = document.createElement("input");
    name.setAttribute("type", "text");
    name.id = "playerNameInput";
    name.value = "Player";
    let row = createRow();
    let col = createCol12();
    col.appendChild(name);
    row.appendChild(col);
    return row;
}

function createGameFrame() {
    let gameFrame = getGameFrame();
    let enemyTankContainer = createContainer100();
    let enemyTankRow = createEnemyTankRow();
    enemyTankContainer.appendChild(enemyTankRow);
    let spacingRow = createSpacingRow();
    let middleLineRow = createMiddleLineRow();
    let spacingRow2 = createSpacingRow();
    let myTankContainer = createContainer100();
    let myTankRow = createMyTankRow();
    myTankContainer.appendChild(myTankRow);
    
    gameFrame.appendChild(createMyShell());
    gameFrame.appendChild(enemyTankContainer);
    gameFrame.appendChild(spacingRow);
    gameFrame.appendChild(middleLineRow);
    gameFrame.appendChild(spacingRow2);
    gameFrame.appendChild(myTankContainer);
}

function createContainer100() {
    let container = document.createElement("div");
    container.className = "container height100";
    return container;
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
    let tankline = document.createElement("div");
    tankline.className = "line-in-middleEnemy";
    tankline.id = "enemyTankLine";
    tank.appendChild(tankline);
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
    let tankline = document.createElement("div");
    tankline.className = "line-in-middle";
    tankline.id = "myTankLine";
    tank.appendChild(tankline);
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

function clearLoginPrompt() {
    let loginPrompt = document.getElementById("loginPrompt");
    loginPrompt.innerHTML = "";
    loginPrompt.className = "";
}

function createMyShell() {
    let tankShell = document.createElement("div");
    tankShell.id = "myShell";
    tankShell.className = "bullet";
    return tankShell;
}