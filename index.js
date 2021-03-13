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
let speed = 300;

can.width = screenWitdth;
can.height = screenHeight;
can.style.border = "4px solid #555"

// tetromino patterns
let tetro = [
    [0,0,0,0], //z
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
];

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

const drawOneBlock = (x, y) => {
    let px = x * blockSize;
    let py = y * blockSize;
    ctx.fillStyle = "blue";
    ctx.fillRect(px,py,blockSize,blockSize);
    ctx.strokeStyle="black";
    ctx.strokeRect(px,py,blockSize,blockSize);

}

// display field
const drawField = () => {
        ctx.clearRect(0,0,screenWitdth, screenHeight);
    //y 縦軸: 各配列　x 横軸: 各配列の中
        for (let y = 0; y < fieldRow; y++){
            for (let x = 0; x < fieldCol; x++){
                if(field[y][x]){
                    drawOneBlock(x, y)
                }
            }
        }
    }

// tetromino coordinate 
let tetroX = 0;
let tetroY = 0;

// display tetromino
const drawTetro = () => {
    for (let y = 0; y < tetroSize; y++){
        for (let x = 0; x < tetroSize; x++){
            if(tetro[y][x]){
                drawOneBlock(tetroX + x, tetroY + y)
            }
        }
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
                field[tetroY + y][tetroX + x] = 1;
            }
        }
    }
}

const dropTetro = () => {
    if (checkMovement(0, 1)){
        tetroY++
    } else {
        fixTetro();
        tetroX = 0;
        tetroY = 0;
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
    // check key movement 
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


