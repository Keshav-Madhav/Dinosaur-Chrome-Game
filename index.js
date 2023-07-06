let board;
let boardWidth=750;
let boardHeight=250;
let context;

let dinoWidth=88;
let dinoHeight=94;
let dinoX=50;
let dinoY=boardHeight-dinoHeight;
let dinoImg;

let dino={
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}

let cactusArr=[];
let cactus1Width=34;
let cactus2Width=69;
let cactus3Width=104;

let cactusHeight=70;
let cactusX=700;
let cactusY=boardHeight-cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

let velocityX=-8;
let velocityY=0;
let gravity=0.4;

let gameOver=false;
let score=0;

window.onload = function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;

    context=board.getContext("2d"); 

    dinoImg=new Image();
    dinoImg.src="./Assets/dino.png";
    dinoImg.onload=function(){
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = './Assets/cactus1.png'; 

    cactus2Img = new Image();
    cactus2Img.src = './Assets/cactus2.png'; 

    cactus3Img = new Image();
    cactus3Img.src = './Assets/cactus3.png'; 

    requestAnimationFrame(update);
    setInterval(placeCactus,1000);

    document.addEventListener("keydown", moveDino);
}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }

    context.clearRect(0,0,board.width,board.height);

    velocityY+=gravity;
    dino.y=Math.min(dino.y+velocityY, dinoY);

    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    for(let i=0; i< cactusArr.length;i++){
        let cactus=cactusArr[i];
        cactus.x+=velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if(detectCollision(dino,cactus)){
            gameOver=true;
            dinoImg.src="./Assets/dino-dead.png";
            dinoImg.onload=function(){
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    context.fillStyle="black";
    context.font="20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveDino(e){
    if(gameOver){
        return;
    }

    if((e.code=="Space" || e.code=="ArrowUp") && dino.y==dinoY){
        velocityY = -10;
    }
}

function placeCactus() {
    if(gameOver){
        return;
    }

    //place cactus
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height: cactusHeight
    }

    let placeCactusChance = Math.random();

    if (placeCactusChance > .90) { //10% you get cactus3
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArr.push(cactus);
    }
    else if (placeCactusChance > .70) { //30% you get cactus2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArr.push(cactus);
    }
    else if (placeCactusChance > .50) { //50% you get cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArr.push(cactus);
    }

    if(cactus.cactusArr.length>5){
        cactusArr.shift();
    }
}

function detectCollision(a,b ){
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}