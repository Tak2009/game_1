let can = document.querySelector("#canvas");
let ctx = can.getContext("2d");
// a square side length
const blockSize = 30;
// tetromino size
const tetroSize = 4;
// field size
const fieldCol = 10; //10 columns in width
const fieldRow = 20; // 20 rows in height
// playing screen size in pixcel
const screenWitdth = blockSize * fieldCol
const screenHeight = blockSize * fieldRow

can.width = screenWitdth;
can.height = screenHeight;
can.style.border = "4px solid #555"

let speed = 300;
let gameOver = false;

let colorList = [
    "#000", // for the empty array in tetroList
    "#FD2",
    "#66F",
    "#6CF",
    "#F44",
    "#6B6",
    "#FA2",
    "#C5C"
]

let tetroList = [
    [], // this is to avoid "0" in tetroType in fixTetro()
    [
        [0,0,0,0], //i
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,1,0,0], //l
        [0,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,1,0], //j
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,1,0,0], //t
        [0,1,1,0],
        [0,1,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0], //o
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],    
    [
        [0,0,0,0], //z
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0], //s
        [0,1,1,0],
        [1,1,0,0],
        [0,0,0,0]
    ]
]

let tetroType = Math.floor(Math.random() * (tetroList.length - 1)) + 1

// tetromino
let tetro = tetroList[tetroType]
const startX = fieldCol/2 -tetroSize/2;

let field = [];

// initializing a field 
const initializeField = () => {
    for (let y = 0; y < fieldRow; y++){
        //inserting rows into field
        field[y] = [];
        for (let x = 0; x < fieldCol; x++){
            //inserting columns into a row array in the above
            field[y][x] = 0;
        }
    }
}

const drawOneBlock = (x, y, c) => {
    let px = x * blockSize;
    let py = y * blockSize;
    ctx.fillStyle = colorList[c];
    ctx.fillRect(px,py,blockSize,blockSize);
    ctx.strokeStyle="black";
    ctx.strokeRect(px,py,blockSize,blockSize);

}


const gameOverMessage = (message) => {
    ctx.font = "40px 'MS Gothic'";
    let w = ctx.measureText(message).width;
    let x = screenWitdth/2 - w/2;
    let y = screenHeight/2 - 20;
    ctx.lineWidth = 8;
    ctx.strokeText(message, x, y);
    ctx.fillStyle = "white";
    ctx.fillText(message, x, y);
}
// display field
const drawField = () => {
        ctx.clearRect(0,0,screenWitdth, screenHeight);
    //y 縦軸: 各配列　x 横軸: 各配列の中
        for (let y = 0; y < fieldRow; y++){
            for (let x = 0; x < fieldCol; x++){
                if(field[y][x]){
                    drawOneBlock(x, y, field[y][x])
                }
            }
        }
    }

// tetromino coordinate 
let tetroX = startX;
let tetroY = 0;

// display tetromino
const drawTetro = () => {
    for (let y = 0; y < tetroSize; y++){
        for (let x = 0; x < tetroSize; x++){
            if(tetro[y][x]){
                drawOneBlock(tetroX + x, tetroY + y, tetroType)
            }
        }
    }
    if (gameOver){
        gameOverMessage("Game Over")
    } 
}

const checkMovement = (mx, my, newTetro = tetro) => {
    // if (newTetro == undefined){
    //     newTetro = tetro
    // }
        for (let y = 0; y < tetroSize; y++){
            for (let x = 0; x < tetroSize; x++){
                if(newTetro[y][x]){
                    let nx = tetroX + x + mx;
                    let ny = tetroY + y + my;
                    console.log(ny)
                    console.log(nx)
                    if(ny < 0 || nx < 0 || ny >= fieldRow || nx >= fieldCol || field[ny][nx]){
                        console.log(ny)
                        console.log(nx)
                        return false;
                    }
                }
            }
        }
    
    return true
}

const rotateTetro = () => {
    let newTetro = [];
    for (let y = 0; y < tetroSize; y++){
        newTetro[y] = [];
        for (let x = 0; x < tetroSize; x++){
            newTetro[y][x] = tetro[tetroSize - 1 - x][y]
        }
    }
    return newTetro;
}

const fixTetro = () => {
    for (let y = 0; y < tetroSize; y++){
        for (let x = 0; x < tetroSize; x++){
            if(tetro[y][x]){
                //　if tetroList does not have an empty array in it at index 0, i shape always disappear
                field[tetroY + y][tetroX + x] = tetroType;
            }
        }
    }
}

// line check
const checkLine = () =>{
    let lineCount = 0;
    for (let y = 0; y < fieldRow; y++){
        let checkFlag = true;
        for (let x = 0; x < fieldCol; x++){
            if (!field[y][x]){
                checkFlag = false;
                break;
            }
        }
        // if a line is filled with blocks
        if (checkFlag){
            lineCount++;
            for (let ny = y; ny > 0; ny--){
                for (let nx = 0; nx < fieldCol; nx++){
                field[ny][nx] = field[ny - 1][nx];
                }
            }
        }
    }
}

const dropTetro = () => {
    // if gameover = true, no more tetro comes up from the top
    if(gameOver){
        return;
    }

    if (checkMovement(0, 1)){
        tetroY++
    } else {
        // anchor the tetro once it hits the bottom or a block
        fixTetro();
        // check the line = all filled 
        checkLine();
        // tetro type needs resetting for a next tetro
        tetroType = Math.floor(Math.random() * (tetroList.length - 1)) + 1
        tetro = tetroList[tetroType]
        // reset the coordinate for a new tetro
        tetroX = startX;
        tetroY = 0;

        // game over check
        if(!checkMovement(0, 0)){
            gameOver = true;
        }

    }

    drawField();
    drawTetro();
}

initializeField();

// test data. inserting a block into the initialized field
field[5][8] = 1;

drawField()
drawTetro();
setInterval(dropTetro, speed)

document.onkeydown = (e) => {
    // if gameover = true, no key entry is accepted 
    if(gameOver){
        return;
    }
　console.log(e.code)
    switch(e.code){
        case "ArrowLeft": //左
        if (checkMovement(-1, 0))
        tetroX--;
        break;
        case "ArrowUp": //上
        if (checkMovement(0, -1))
        tetroY--;
        break;
        case "ArrowRight": //右
        if (checkMovement(1, 0))
        tetroX++;
        break;
        case "ArrowDown": //下
        if (checkMovement(0, 1))
        tetroY++;
        break;
        case "Space": //スペース
        let newTetro = rotateTetro()
        if (checkMovement(0, 0, newTetro)){
            tetro = newTetro
        }
        break;
    }
    drawField()
    drawTetro();
};


