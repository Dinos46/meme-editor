'use strict';

let gKeywords = {
    'happy': 12,
    'funny puk': 1
};

let gImgs = [
{id: 1, url: 'img/1.jpg', keywords: ['happy']}, 
{id: 2, url: 'img/2.jpg', keywords: ['happy']}, 
{id: 3, url: 'img/3.jpg', keywords: ['happy']},
{id: 4, url: 'img/4.jpg', keywords: ['happy']},
{id: 5, url: 'img/5.jpg', keywords: ['happy']},
{id: 6, url: 'img/6.jpg', keywords: ['happy']},
{id: 7, url: 'img/7.jpg', keywords: ['happy']},
{id: 8, url: 'img/8.jpg', keywords: ['happy']},
{id: 9, url: 'img/9.jpg', keywords: ['happy']},
{id: 10, url: 'img/10.jpg', keywords: ['happy']},
{id: 11, url: 'img/11.jpg', keywords: ['happy']},
{id: 12, url: 'img/12.jpg', keywords: ['happy']},
{id: 13, url: 'img/13.jpg', keywords: ['happy']},
{id: 14, url: 'img/14.jpg', keywords: ['happy']},
{id: 15, url: 'img/15.jpg', keywords: ['happy']},
{id: 16, url: 'img/16.jpg', keywords: ['happy']},
{id: 17, url: 'img/17.jpg', keywords: ['happy']},
{id: 18, url: 'img/18.jpg', keywords: ['happy']}
];



let gMeme = {
    selectedImgId: 7,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I Know!!',
        size: 20,
        family: 'Arial',
        align: 'left',
        color: 'red',
        idx: 50,
        idy: 80
    },{
        txt: 'you know!!',
        size: 50,
        family: 'Arial',
        align: 'left',
        color: 'green',
        idx: 80,
        idy: 50
    }
]
};

let gCurrLine = 0;

const KEY = 'meme';
let gSortBy;


function getImgToDisplay() {
    let imgs = gImgs;
    return imgs;
}

function setCurImgIdx(idx) {
    gMeme.selectedImgId = idx;
}

function setNewLine(txt){
    gMeme.lines[gCurrLine].txt = txt;
    clearCanvas();
    drawTxt();
}

// function getImgByIdx(imgIdx) {
//     let img = gImgs.find(function (img) {
//         console.log(imgIdx, img.id)
//         return imgIdx === img.id;
//     })
//     return img;
// }

function drawTxt(){
    setTxtStyle();
}

function setTxtStyle(){
        gMeme.lines.forEach(function(line) {
            gCtx.strokeStyle = 'green'; 
            gCtx.font = `${line.size}px ${line.family}`;
            console.log(gCtx.font);
            gCtx.fillStyle = line.color;
            gCtx.fillText(line.txt, line.x, line.y);
            gCtx.strokeText(line.txt, line.idx, line.idy);
        })
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}