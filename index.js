let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

// ブロックの縦横：正方形の一辺
const blockSize = 30;
// テトロミノのサイズ
const tetroSize = 4;
// フィールドサイズ by Block
const fieldCol = 10; //横に１０個
const fieldRow = 20; //縦に２０個
// スクリーンサイズ
const screenWitdth = blockSize * fieldCol
const screenHeight = blockSize * fieldRow

canvas.width = screenWitdth;
canvas.height = screenHeight;
canvas.style.border = "4px solid #555"

// context.fillStyle = "red";
// context.fillRect(0,0,blockSize,blockSize);

// テトロミノの本体
let tetro = [
    [0,0,0,0], //z
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
];
// テトロミノの座標
let tetroX = 0;
let tetroY = 0;

// テトロミノを表示する関数
const drawTetro = () => {

// 一旦消す
    context.clearRect(0,0,screenWitdth, screenHeight);
//y 縦軸: 各配列　x 横軸: 各配列の中
    for (let y = 0; y < tetroSize; y++){
        for (let x = 0; x < tetroSize; x++){
            if(tetro[y][x]){
                let px = (tetroX + x) * blockSize;
                let py = (tetroY + y) * blockSize;
                context.fillStyle = "blue";
                context.fillRect(px,py,blockSize,blockSize);
                context.strokeStyle="black";
                context.strokeRect(px,py,blockSize,blockSize);
            }
        }
    }
}

drawTetro();

document.onkeydown = (e) => {
    // Code検索
　console.log(e.code)
    switch(e.code){
        case "ArrowLeft": //左
        tetroX--;
        break;
        case "ArrowUp": //上
        tetroY--;
        break;
        case "ArrowRight": //右
        tetroX++;
        break;
        case "ArrowDown": //下
        tetroY++;
        break;
        case "Space": //スペース
        break;
    }

    drawTetro();
};


