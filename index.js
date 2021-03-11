let screen = document.querySelector("#screen");
let context = screen.getContext("2d");
const blockSize = 30;
const tetroSize = 4;
// context.fillStyle = "red";
// context.fillRect(0,0,blockSize,blockSize);
let tetro = [
    [0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
];
// テトロミノの座標
let tetroX = 0;
let tetroY = 0;


// テトロミノを表示する関数
const drawTetro = () => {
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

document.onkeydown = (e) => {
    // onkeydown keyCode検索

    switch(e.keyCode){
        case 37: //左
        tetroX--;
        break;
        case 38: //上
        tetroY--;
        break;
        case 39: //右
        tetroX++;
        break;
        case 40: //下
        tetroY++;
        break;
        case 32: //スペース
        break;
    }

    drawTetro();
};

drawTetro();
