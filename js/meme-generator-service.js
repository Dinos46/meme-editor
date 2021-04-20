'use strict';

let gKeywords = {
    'happy': 12,
    'funny puk': 1
};

let gImgs = createImgs();

let gMeme = {
    selectedImgId: 7,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I Know!!',
        size: 20,
        family: 'Arial',
        align: 'left',
        color: 'red',
        idx: 80,
        idy: 50
    }, {
        txt: 'you know!!',
        size: 50,
        family: 'Arial',
        align: 'left',
        color: 'green',
        idx: 80,
        idy: 250
    }]
};


function createImgs(){
    let imgs = [];
    for(let i = 0; i < 18; i++){
    let img = {id: i+1, url: `img/${i+1}.jpg`, keywords: ['happy']}
    imgs.push(img)
    }
    return imgs;
}

const KEY = 'meme';
let gSortBy;


function getImgToDisplay() {
    let imgs = gImgs;
    return imgs;
}

function setCurImgIdx(idx) {
    gMeme.selectedImgId = idx;
}


function setNewLine(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    
}

function setNewImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function nextLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx += 1;

    }
    console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx);
}

function changeFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].family = font;
    drawTxt();
}

function updateMemeLine(line, val){
    line.txt = val;
    console.log(gMeme)
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

// function getImgByIdx(imgIdx) {
//     let img = gImgs.find(function (img) {
//         console.log(imgIdx, img.id)
//         return imgIdx === img.id;
//     })
//     return img;
// }


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++;
    // drawTxt();
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--;
    // drawTxt();
}