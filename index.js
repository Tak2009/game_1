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
//y 縦軸: 各配列　x 横軸: 各配列の中
for (let y = 0; y < tetroSize; y++){
    for (let x = 0; x < tetroSize; x++){
        if(tetro[y][x]){
            let px = x * blockSize;
            let py = y * blockSize;
            context.fillStyle = "blue";
            context.fillRect(px,py,blockSize,blockSize);
            context.strokeStyle="black";
            context.strokeRect(px,py,blockSize,blockSize);
        }
    }
}

