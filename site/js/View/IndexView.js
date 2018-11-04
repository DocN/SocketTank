//loading default view
function loadView() {
    console.log("loading view");
    createPlayerPrompt();
    
}

//create player prompt view
function createPlayerPrompt() {
    let loginPrompt = document.getElementById("loginPrompt");
    loginPrompt.className = "container viewheight40";
    loginPrompt.appendChild(createTitle());
    loginPrompt.appendChild(createRowSpacing10());
    loginPrompt.appendChild(createInputBox());
    loginPrompt.appendChild(createRowSpacing10());
    loginPrompt.appendChild(createSubmitButtonRow());
}

//create spacing row 10 pixels
function createRowSpacing10() {
    let row = createRow();
    let col = createCol12();
    col.appendChild(createSpacing10());
    row.appendChild(col);
    return row;
}

//creating spacing 10 fragment
function createSpacing10() {
    let spacing10 = document.createElement("div");
    spacing10.className = "spacing10";
    return spacing10;
}

//create submitbuttonrow for submit start game button
function createSubmitButtonRow() {
    let row = createRow();
    let col = createCol12();
    col.appendChild(createSubmitButton());
    row.appendChild(col);
    return row;
}

//create start game btn 
function createSubmitButton() {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary buttonWidth";
    btn.innerText = "Play!";
    btn.setAttribute("onClick", "submitUser()")
    return btn;
}

//create title to enter name
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

//create input box for entering player name
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

//create game frame for the game view
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

    gameFrame.appendChild(createEnemyShell());
    gameFrame.appendChild(createMyShell());
    gameFrame.appendChild(enemyTankContainer);
    gameFrame.appendChild(spacingRow);
    gameFrame.appendChild(middleLineRow);
    gameFrame.appendChild(spacingRow2);
    gameFrame.appendChild(myTankContainer);

    createScoreboard();
    createControls();
}

//create controls for resetting game
function createControls() {
    let controls = document.getElementById("controls");
    controls.appendChild(createReset());
}

//create scoreboard for keeping track of score
function createScoreboard() {
    let scores = document.getElementById("bodyID");
    scores.appendChild(createMyScoreDiv());
}

//create scoreboard view
function createMyScoreDiv() {
    let myScoreBox = document.createElement("div");
    myScoreBox.id = "myScoreBox";
    
    let myNameTitle = document.createElement("h3");
    myNameTitle.id = "myNameTitle";
    myNameTitle.innerText = "You: " + myName;

    let myLivesTitle = document.createElement("h3");
    myLivesTitle.innerText = "Lives: " + myLives + "/" + maxLives;
    myLivesTitle.id= "myLivesTitle";

    let enemyNameTitle = document.createElement("h3");
    enemyNameTitle.id = "enemyNameTitle";
    enemyNameTitle.innerText = "Opponent: " + enemyName;

    let enemyLivesTitle = document.createElement("h3");
    enemyLivesTitle.innerText = "Lives: " + enemyLives + "/" + maxLives;
    enemyLivesTitle.id= "enemyLivesTitle";

    myScoreBox.appendChild(myNameTitle);
    myScoreBox.appendChild(myLivesTitle);
    myScoreBox.appendChild(enemyNameTitle);
    myScoreBox.appendChild(enemyLivesTitle);
    return myScoreBox;
}

//update score view
function updateMyScoreView() {
    document.getElementById("myScoreBox").remove();
    document.getElementById("bodyID").appendChild(createMyScoreDiv());
}

//update enemy score view
function updateEnemyScoreView() {
    document.getElementById("myScoreBox").remove();
    document.getElementById("bodyID").appendChild(createMyScoreDiv());
}

//update the enemy name
function updateEnemyName(name) {
    document.getElementById("enemyNameTitle").innerText ="opponent: " + name;

}

//creates a contaienr with 100 height px
function createContainer100() {
    let container = document.createElement("div");
    container.className = "container height100";
    return container;
}

//gets the div for the game frame
function getGameFrame() {
    return document.getElementById("gameFrame");
}

//creates the middle line row
function createMiddleLineRow() {
    let middleLineRow = createRow();
    let col = createCol12();
    col.appendChild(createMiddleLine());
    middleLineRow.appendChild(col);
    return middleLineRow;
}

//creates the middle line itself
function createMiddleLine() {
    let line = document.createElement("hr");
    return line;
}

//create the spacing between the middle and the tank
function createSpacingRow() {
    let row = createRow();
    return row.appendChild(createSpacing());
}

//creates the spacing for the spacing row
function createSpacing() {
    let spacing = document.createElement("div");
    spacing.className = "spacing";
    return spacing;
}

//creates the row for the enemy tank view
function createEnemyTankRow() {
    let enemyTankRow = createRow();
    let enemyTankCol = createCol12();
    let enemyTank = createEnemyTank();
    enemyTankCol.appendChild(enemyTank);
    enemyTankRow.appendChild(enemyTankCol);
    return enemyTankRow;
}

//creates the enemy tank view
function createEnemyTank() {
    let tank = document.createElement("div");
    tank.id = "enemyTank";
    let tankline = document.createElement("div");
    tankline.className = "line-in-middleEnemy";
    tankline.id = "enemyTankLine";
    tank.appendChild(tankline);
    return tank;
}

//creates the local player's tank view
function createMyTankRow() {
    let myTankRow = createRow();
    let myTankCol = createCol12();
    let myTank = createMyTank();
    myTankCol.appendChild(myTank);
    myTankRow.appendChild(myTankCol);
    return myTankRow;
}

//creates the tank to go inside the tank view
function createMyTank() {
    let tank = document.createElement("div");
    tank.id = "myTank";
    let tankline = document.createElement("div");
    tankline.className = "line-in-middle";
    tankline.id = "myTankLine";
    tank.appendChild(tankline);
    return tank;
}

//gets the frame for the game
function getGameFrame() {
    return document.getElementById("gameFrame");
}

//creates a generic row
function createRow() {
    let row = document.createElement("div");
    row.className = "row";
    return row;
}

//creates a generic col-12 div
function createCol12() {
    let col = document.createElement("div");
    col.className = "col-12";
    return col;
}

//clears the login page
function clearLoginPrompt() {
    let loginPrompt = document.getElementById("loginPrompt");
    loginPrompt.innerHTML = "";
    loginPrompt.className = "";
}

//creates the local player's tank shell view
function createMyShell() {
    let tankShell = document.createElement("div");
    tankShell.id = "myShell";
    tankShell.className = "bullet";
    return tankShell;
}

//create the enemy player's tank shell view locally
function createEnemyShell() {
    let tankShell = document.createElement("div");
    tankShell.id = "enemyShell";
    tankShell.className = "bullet";
    return tankShell;
}

//reveal the enemie's tank shell in view
function showEnemyShell() {
    let tankShell = document.getElementById("enemyShell");
    tankShell.style.display = "block";
}

//hide the enemie's tank shell 
function hideEnemyShell() {
    let tankShell = document.getElementById("enemyShell");
    tankShell.style.display = "none";
}
//reveal my tank shell in view
function showMyShell() {
    let tankShell = document.getElementById("myShell");
    if(tankShell != null) {
        tankShell.style.display = "block";
    }
    
}

//hide my own tank shell
function hideMyShell() {
    let tankShell = document.getElementById("myShell");
    tankShell.style.display = "none";
}

//creates a reset button for resetting the room
function createReset() {
    let reset = document.createElement("button");
    reset.className = "btn btn-primary"; 
    reset.innerText ="Reset Room";
    reset.setAttribute("onclick", "resetRoom()")
    return reset;
}

