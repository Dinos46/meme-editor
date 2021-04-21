'use strict';

//...KEY TO SAVE IN LOCAL STORAGE...........//
const KEY = 'meme';

//............IMAGES ARRAY GLOBAL ..........//
let gImgs = _createImgs();

//.... EHCH MEME LINES THE USER EDITS ........//
let gMeme = {
    selectedImgId: 7,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I Know!!',
        size: 20,
        family: 'Arial',
        align: 'left',
        color: 'white',
        stroke: 'black',
        txtAlign: 'center',
        idx: 80,
        idy: 50,
        isDragging: false
    }, {
        txt: 'you know!!',
        size: 50,
        family: 'Arial',
        align: 'left',
        color: 'white',
        stroke: 'black',
        txtAlign: 'center',
        idx: 80,
        idy: 250,
        isDragging: false
    }]
};


let gKeywords = {
    'happy': 12,
    'funny puk': 1
};

//...... KEY WORDS TO APPLY IN IMG KYWORDS ARRAY ............//
var gKeyWordsList = ['happy', 'funny', 'angry', 'cute', 'sleepy'];


//........MAKE THE IMGAGES ARRAY TO RENDER ..............//
function _createImgs() {
    let imgsArray = [];

    for (let i = 0; i < 18; i++) {
        // let randomKeyWord = gKeyWordsList[getRandomInt(0, gKeyWordsList.length-1)];
        let img = {
            id: i + 1,
            url: `img/${i+1}.jpg`,
            keywords: []
        }
        imgsArray.push(img);
    }
    return imgsArray;
}

//  console.log()
// function getRandomKeyWord() {
//     let randNum = ;
//     console.log(randNum);
//     return ;
// }


// function removeLine() {
//     if (!gMeme.lines) return;
//     getCurrLine()
// }

//....... GET THE CUURENT LINE TXT THE USER EDITS .........//
function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

//...................... UPDATE MODEL FUNCTIONS ...............//
function setCurImgIdx(idx) {
    gMeme.selectedImgId = idx;
}

function setNewLine(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function nextLine() {
    console.log(gMeme.selectedLineIdx)
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? 0 : gMeme.selectedLineIdx + 1;
}

function changeFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].family = font;
    drawTxt();
}

function setTxtAlign(txtAlign) {
    switch (txtAlign) {
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].txtAlign = 'center';
            break
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].txtAlign = 'right';
            break
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].txtAlign = 'left';
            break
    }
    drawTxt();
}

function updateMemeLine(line, val) {
    line.txt = val;
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    drawTxt();
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++;
    drawTxt();
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--;
    drawTxt();
}

function moveLineUp(currLine) {
    currLine.idy -= 10;
    drawTxt();
}

function moveLineDown(currLine) {
    currLine.idy += 10;
    drawTxt();
}