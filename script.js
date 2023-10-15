// Variables
    // Start screen
const startScreen = document.querySelector('.startScreen');
const numOfPlayers = document.querySelector('#numOfPlayers');
const numOfTreasures = document.querySelector('#numOfTreasures');
const startBtn = document.querySelector('#startBtn');
const instructionsBtn = document.querySelector('#instructionsBtn');
const instructions = document.querySelector('.instructions');
    // Game board
const gameBoard = document.querySelector('.gameBoard');
const table = document.querySelector('#board');
const extra = document.querySelector('.extraPanel');
const extraRoom = document.querySelector('#extraRoom');
const right = document.querySelector('#right');
    // Player panel
const playerPanel = document.querySelector('.playerPanel');
const curPlayerPanel = document.querySelector('.curPlayerPanel');
const curPlayer = document.querySelector('#curPlayer');
const changePlayer = document.querySelector('#changePlayer');
const gameOver = document.querySelector('#gameOver');
    // Pieces
const pieces = ['iLR', 'iUD', 'rohLD', 'rohLU', 'rohRD', 'rohRU', 'tLRD', 'tLRU', 'tLUD', 'tRUD'];
const lines = ['iLR', 'iUD'];
const Ts = ['tLRD', 'tLUD', 'tLRU', 'tRUD'];
const bends = ['rohLD', 'rohLU', 'rohRU', 'rohRD'];
    // Treasures
const treasures = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13','s14','s15','s16','s17','s18','s19','s20','s21','s22','s23','s24'];
    // Player icons
const playerIcons = ['BLUE1', 'GREEN1', 'RED1', 'YELLOW1'];
    // Count of random pieces
let lCnt = 0;
let tCnt = 0;
let bCnt = 0;
    // Slider prohibition
let upData = [{
    id: 1,
    up: true,
},
{
    id: 3,
    up: true,
},
{
    id: 5,
    up: true,
}];

let downData = [{
    id: 1,
    down: true,
},
{
    id: 3,
    down: true,
},
{
    id: 5,
    down: true,
}];

let leftData = [{
    id: 1,
    left: true,
},
{
    id: 3,
    left: true,
},
{
    id: 5,
    left: true,
}];

let rightData = [{
    id: 1,
    right: true,
},
{
    id: 3,
    right: true,
},
{
    id: 5,
    right: true,
}];
let turn = 0;

    // List of players
let players = [];

// Helper
function defaultFields() {
    players = [];
    turn = 0;
    lCnt = 0;
    tCnt = 0;
    bCnt = 0;
    setDefault();
}

function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function xyCoord(td) {
    const x = td.cellIndex;
    const tr = td.parentNode;
    const y = tr.sectionRowIndex;
    return {x, y};
}

function fixedPieces(i, j) {
    if (i === 0) {
        if (j === 0) {
            return "rohRD";
        } else if (j === 2) {
            return "tLRD";
        } else if (j === 4) {
            return "tLRD";
        } else if (j === 6) {
            return "rohLD";
        }
    } else if (i === 2) {
        if (j === 0) {
            return "tRUD";
        } else if (j === 2) {
            return "tRUD";
        } else if (j === 4) {
            return "tLRD";
        } else if (j === 6) {
            return "tLUD";
        }
    } else if (i === 4) {
        if (j === 0) {
            return "tRUD";
        } else if (j === 2) {
            return "tLRU";
        } else if (j === 4) {
            return "tLUD";
        } else if (j === 6) {
            return "tLUD";
        }
    } else if (i === 6) {
        if (j === 0) {
            return "rohRU";
        } else if (j === 2) {
            return "tLRU";
        } else if (j === 4) {
            return "tLRU";
        } else if (j === 6) {
            return "rohLU";
        }
    }
}

function randomPieces() {
    let n = random(0, 2);
    if (n === 0) {
        if (lCnt !== 13) {
            lCnt++;
            return lines[random(0, 1)];
        } else {
            n = random(1, 2);
        }
    }
    if (n === 1) {
        if (tCnt !== 6) {
            tCnt++;
            return Ts[random(0, 3)];
        } else {
            n = 2;
        }
    }
    if (n === 2) {
        if (bCnt !== 15) {
            bCnt++;
            return bends[random(0, 3)];
        } else {
            return randomPieces();
        }
    }
}

function setDefault() {
    upData = [{
        id: 1,
        up: true,
    },
    {
        id: 3,
        up: true,
    },
    {
        id: 5,
        up: true,
    }];
    
    downData = [{
        id: 1,
        down: true,
    },
    {
        id: 3,
        down: true,
    },
    {
        id: 5,
        down: true,
    }];
    
    leftData = [{
        id: 1,
        left: true,
    },
    {
        id: 3,
        left: true,
    },
    {
        id: 5,
        left: true,
    }];
    
    rightData = [{
        id: 1,
        right: true,
    },
    {
        id: 3,
        right: true,
    },
    {
        id: 5,
        right: true,
    }];
}

function getGates(td) {
    if (td === undefined){
        return [''];
    } else {
        let src = td.firstElementChild.src;
        return src.split('media/')[1].split('.png')[0].split('').filter(a => a.match(/[A-Z]/));
    }
}

extraRoom.addEventListener('click', rotate);
function rotate() {
    let extraPiece = extraRoom.firstElementChild;
    let src = extraPiece.src.split('media/')[1].split('.png')[0];
    if (lines.includes(src)) {
        let index = lines.indexOf(src);
        extraPiece.src = `media/${lines[(index+1) % 2]}.png`;
    } else if (Ts.includes(src)) {
        let index = Ts.indexOf(src);
        extraPiece.src = `media/${Ts[(index+1) % 4]}.png`;
    } else if (bends.includes(src)) {
        let index = bends.indexOf(src);
        extraPiece.src = `media/${bends[(index+1) % 4]}.png`;
    }
}

numOfPlayers.addEventListener('input', changeMax);
function changeMax() {
    numOfTreasures.max = 24/numOfPlayers.value;
}

instructionsBtn.addEventListener('click', show);
function show() {
    if (instructions.style.display === 'none') {
        instructions.style.display = 'block';
    } else {
        instructions.style.display = 'none';
    }
}

changePlayer.addEventListener('click', nextPlayer)
function nextPlayer() {
    moveOff();
    sliderOn();
    turn = (turn+1) % numOfPlayers.value;
    curPlayer.innerHTML = `It is player ${(turn % numOfPlayers.value) + 1}'s turn.`;
    let img = document.createElement('img');
    img.src = `media/${playerIcons[turn % numOfPlayers.value]}.png`;
    curPlayer.appendChild(img);
}

startBtn.addEventListener('click', startGame);
function startGame() {
    if (gameOver.hasChildNodes) {
        gameOver.firstChild.remove();
    }
    gameBoard.style.display = 'flex';
    let extraPiece = document.createElement('img');
    extraPiece.classList.add('movablePiece');
    extraPiece.src = `media/${randomPieces()}.png`;
    extraRoom.appendChild(extraPiece);
    for (let i = 0; i < 7; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let td = document.createElement('td');
            if (i % 2 === 0 && j % 2 === 0) {
                td.innerHTML = `<img class="fixedPiece" src="media/${fixedPieces(i, j)}.png">`;
            } else {
                td.innerHTML = `<img class="movablePiece" src="media/${randomPieces()}.png">`;
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    setTreasures();
    setPlayers();
    setCurPlayer();
    pPanel();
    sliderOn();
    startBtn.style.display = 'none';
    right.style.display = 'block';

}

function setTreasures() {
    let m, n;
    for (let i = 0; i < numOfTreasures.value*numOfPlayers.value; i++) {
        do {
            m = random(0, 6);
            n = random(0, 6);
        } while(table.rows[m].cells[n].childElementCount === 2 || (m === 0 && n === 0) || (m === 0 && n === 6) || (m === 6 && n === 0) || (m === 6 && n === 6));
        let img = document.createElement('img');
        img.classList.add('treasure');
        img.src = `media/${treasures[i]}.png`;
        table.rows[m].cells[n].appendChild(img);
    }
}

function setPlayers() {
    const cornersX = [0, 0, 6, 6];
    const cornersY = [0, 6, 0, 6];
    let rows = table.rows;
    for (let i = 0; i < numOfPlayers.value; i++) {
        let img = document.createElement('img');
        let cell = rows[cornersX[i]].cells[cornersY[i]];
        img.classList.add('playerIcon');
        img.setAttribute('id', `player${i}`);
        img.src = `media/${playerIcons[i]}.png`;
        cell.appendChild(img);
    }
}

function setCurPlayer() {
    curPlayer.innerHTML = `It is player ${turn+1}'s turn.`
    let img = document.createElement('img');
    img.src = `media/${playerIcons[turn % numOfPlayers.value]}.png`;
    curPlayer.appendChild(img);
}

function pPanel() {
    const cols = [0, 6, 0, 6];
    const rows = [0, 0, 6, 6];
    for (let i = 0; i < numOfPlayers.value; i++) {
        let newPlayer = {
            id: (i+1),
            score: 0,
            treasures: parseInt(numOfTreasures.value),
            toCollect: treasures.slice(i*numOfTreasures.value, numOfTreasures.value*(i+1)).concat('winner'),
            initial: {x: cols[i], y: rows[i]},
        };
        players.push(newPlayer);
        let pInfo = document.createElement('div');
        pInfo.classList.add('pInfo');
        pInfo.setAttribute('id', `pInfo${i}`);
        pInfo.innerHTML = `Player ${i+1}'s score: ${players[i].score}, 
        Treasure to collect: <img src="media/${players[i].toCollect[players[i].score]}.png">`;
        playerPanel.appendChild(pInfo);
    }
}

function hasWon(player, td) {
    let {x, y} = xyCoord(td);
    if (players[player].score === players[player].treasures && x === players[player].initial.x && y === players[player].initial.y) {
        gameBoard.style.display = 'none';
        let h1 = document.createElement('h1');
        h1.innerHTML = `Game over! <br> Player ${player + 1} won!`;
        gameOver.appendChild(h1);
        document.querySelectorAll('tr').forEach(tr => tr.remove());
        document.querySelector('#extraRoom').firstElementChild.remove();
        document.querySelector('#curPlayer').firstElementChild.remove();
        document.querySelectorAll('.pInfo').forEach(p => p.remove());
        defaultFields();
        startBtn.style.display = 'inline-block';
        return true;
    } else {
        return false;
    }
}

function sliderOn() {
    const m = [0, 0, 0, 1, 1, 3, 3, 5, 5, 6, 6, 6];
    const n = [1, 3, 5, 0, 6, 0, 6, 0, 6, 1, 3, 5];
    for (let i = 0; i < 12; i++) {
        table.rows[m[i]].cells[n[i]].addEventListener('click', slide);
    }
}

function slide(e) {
    let td;
    let isIn = false;
    if (this.contains(e.target.closest('img'))) {
        td = e.target.parentNode;
    } else if (e.target.matches('td')) {
        td = e.target;
    }
    let {x, y} = xyCoord(td);
    if(x === 0 && leftData[(y-1)/2].left) {
        isIn = true;
        let room = extraRoom.innerHTML;
        extraRoom.innerHTML = table.rows[y].cells[6].innerHTML;
        for (let i = 6; i > 0; i--) {
            table.rows[y].cells[i].innerHTML = table.rows[y].cells[i-1].innerHTML;
        }
        let isPlayer = extraRoom.lastChild.src.split('media/')[1].split('.png')[0];
        let player = extraRoom.lastChild;
        table.rows[y].cells[x].innerHTML = room;
        if (isPlayer === 'BLUE1' || isPlayer === 'GREEN1' || isPlayer === 'RED1' || isPlayer === 'YELLOW1') {
            table.rows[y].cells[x].appendChild(player);
        }
        setDefault();
        rightData[(y-1)/2].right = false;
    } else if ((x === 1 || x === 3 || x === 5) && y === 0 && upData[(x-1)/2].up) {
        isIn = true;
        let room = extraRoom.innerHTML;
        extraRoom.innerHTML = table.rows[6].cells[x].innerHTML;
        for (let i = 6; i > 0; i--) {
            table.rows[i].cells[x].innerHTML = table.rows[i-1].cells[x].innerHTML;
        }
        let isPlayer = extraRoom.lastChild.src.split('media/')[1].split('.png')[0];
        let player = extraRoom.lastChild;
        table.rows[y].cells[x].innerHTML = room;
        if (isPlayer === 'BLUE1' || isPlayer === 'GREEN1' || isPlayer === 'RED1' || isPlayer === 'YELLOW1') {
            table.rows[y].cells[x].appendChild(player);
        }
        setDefault();
        downData[(x-1)/2].down = false;
    } else if (x === 6 && rightData[(y-1)/2].right) {
        isIn = true;
        let room = extraRoom.innerHTML;
        extraRoom.innerHTML = table.rows[y].cells[0].innerHTML;
        for (let i = 0; i < 6; i++) {
            table.rows[y].cells[i].innerHTML = table.rows[y].cells[i+1].innerHTML;
        }
        let isPlayer = extraRoom.lastChild.src.split('media/')[1].split('.png')[0];
        let player = extraRoom.lastChild;
        table.rows[y].cells[x].innerHTML = room;
        if (isPlayer === 'BLUE1' || isPlayer === 'GREEN1' || isPlayer === 'RED1' || isPlayer === 'YELLOW1') {
            table.rows[y].cells[x].appendChild(player);
        }
        setDefault();
        leftData[(y-1)/2].left = false;
    } else if ((x === 1 || x === 3 || x === 5) && y === 6 && downData[(x-1)/2].down) {
        isIn = true;
        let room = extraRoom.innerHTML;
        extraRoom.innerHTML = table.rows[0].cells[x].innerHTML;
        for (let i = 0; i < 6; i++) {
            table.rows[i].cells[x].innerHTML = table.rows[i+1].cells[x].innerHTML;
        }
        let isPlayer = extraRoom.lastChild.src.split('media/')[1].split('.png')[0];
        let player = extraRoom.lastChild;
        table.rows[y].cells[x].innerHTML = room;
        if (isPlayer === 'BLUE1' || isPlayer === 'GREEN1' || isPlayer === 'RED1' || isPlayer === 'YELLOW1') {
            table.rows[y].cells[x].appendChild(player);
        }
        setDefault();
        upData[(x-1)/2].up = false;
    }
    if (isIn) {
        sliderOff();
        moveOn(turn);
    }
}

function sliderOff() {
    const m = [0, 0, 0, 1, 1, 3, 3, 5, 5, 6, 6, 6];
    const n = [1, 3, 5, 0, 6, 0, 6, 0, 6, 1, 3, 5];
    for (let i = 0; i < 12; i++) {
        table.rows[m[i]].cells[n[i]].removeEventListener('click', slide);
    }
}

function moveOn(turn) {
    let player = document.querySelector(`#player${turn}`);
    let td = player.parentNode;
    let {x, y} = xyCoord(td);
    let gates = getGates(td);
    if (gates.includes('R') && getGates(table.rows[y].cells[x+1]).includes('L')) {
        table.rows[y].cells[x+1].firstElementChild.style.border = '4px solid green';
        table.rows[y].cells[x+1].firstElementChild.style.width = '67px';
        td.nextSibling.addEventListener('click', moveTo);
    }
    if (gates.includes('L') && getGates(table.rows[y].cells[x-1]).includes('R')) {
        table.rows[y].cells[x-1].firstElementChild.style.border = '4px solid green';
        table.rows[y].cells[x-1].firstElementChild.style.width = '67px';
        td.previousSibling.addEventListener('click', moveTo);
    }
    if (gates.includes('D') && getGates(table.rows[y+1].cells[x]).includes('U')) {
        table.rows[y+1].cells[x].firstElementChild.style.border = '4px solid green';
        table.rows[y+1].cells[x].firstElementChild.style.width = '67px';
        table.rows[y+1].cells[x].addEventListener('click', moveTo);
    }
    if (gates.includes('U') && getGates(table.rows[y-1].cells[x]).includes('D')) {
        table.rows[y-1].cells[x].firstElementChild.style.border = '4px solid green';
        table.rows[y-1].cells[x].firstElementChild.style.width = '67px';
        table.rows[y-1].cells[x].addEventListener('click', moveTo);
    }
}

function moveTo(e) {
    let td;
    if (this.contains(e.target.closest('img'))) {
        td = e.target.parentNode;
    } else if (e.target.matches('td')) {
        td = e.target;
    }
    let img = document.querySelector(`#player${turn}`);
    td.appendChild(img);
    td.firstElementChild.style.border = 'none';
    collect(td, turn);
    if (hasWon(turn, td)) {
        moveOff();
    } else {
        moveOn(turn);
    }
}

function moveOff() {
    document.querySelectorAll('td').forEach(td => td.firstElementChild.style.border = 'none');
    document.querySelectorAll('td').forEach(td => td.firstElementChild.style.width = '75px');
    document.querySelectorAll('td').forEach(td => td.removeEventListener('click', moveTo));
}

function collect(td, turn) {
    let children = td.childNodes;
    let treasure = children[1].src.split('media/')[1].split('.png')[0];
    if (players[turn].toCollect[players[turn].score] === treasure) {
        players[turn].score++;
        children[1].remove();
        updateScore(turn);
    }
}

function updateScore(playerId) {
    let pInfo = document.querySelector(`#pInfo${playerId}`);
    pInfo.innerHTML = `Player ${playerId+1}'s score: ${players[playerId].score}, 
    Treasure to collect: `;
    let img = document.createElement('img');
    img.src = `media/${players[playerId].toCollect[players[playerId].score]}.png`;
    pInfo.appendChild(img);
}