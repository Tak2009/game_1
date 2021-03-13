let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

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

canvas.width = screenWitdth;
canvas.height = screenHeight;
canvas.style.border = "4px solid #555"

// context.fillStyle = "red";
// context.fillRect(0,0,blockSize,blockSize);

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

const drawABlock = (x, y) => {
    let px = x * blockSize;
    let py = y * blockSize;
    context.fillStyle = "blue";
    context.fillRect(px,py,blockSize,blockSize);
    context.strokeStyle="black";
    context.strokeRect(px,py,blockSize,blockSize);

}

// display field
const drawField = () => {
        context.clearRect(0,0,screenWitdth, screenHeight);
    //y 縦軸: 各配列　x 横軸: 各配列の中
        for (let y = 0; y < fieldRow; y++){
            for (let x = 0; x < fieldCol; x++){
                if(field[y][x]){
                    drawABlock(x, y)
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
                drawABlock(tetroX + x, tetroY + y)
            }
        }
    }
}


initializeField();

// test data. inserting a block into the initialized field
field[5][8] = 1;

drawField()
drawTetro();
   

const checkMovement = (mx, my) => {
    for (let y = 0; y < tetroSize; y++){
        for (let x = 0; x < tetroSize; x++){
            let nx = tetroX + x + mx;
            let ny = tetroY + y + my;
            if(tetro[y][x]){
                console.log(ny)
                console.log(nx)
                if(field[ny][nx] ||
                    ny < 0 ||
                    nx < 0 ||
                    ny >= fieldRow ||
                    nx >= fieldCol){
                    console.log(ny)
                    console.log(nx)
                    return false;
                }
            }
        }
    }
    return true
}


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
        break;
    }
    drawField()
    drawTetro();
};


