'use strict';

//...KEY TO SAVE IN LOCAL STORAGE...........//
const MEMEKEY = 'meme';
const IMGKEY = 'img';

//............IMAGES ARRAY GLOBAL ..........//
let gImgs = _createImgs();

//.... EHCH MEME LINES THE USER EDITS ........//
let gMeme = {
    selectedImgId: 7,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I Know!!',
        size: 50,
        family: 'Arial',
        align: 'left',
        color: 'white',
        stroke: 'black',
        txtAlign: 'center',
        idx: 200,
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
        idx: 200,
        idy: 300,
        isDragging: false
    }]
};

let gUserSavedMems = [];
let gUserSavedImgs = [];

let gKeywords = {
    'happy': 12,
    'funny puk': 1
};

//...... KEY WORDS TO APPLY IN IMG KYWORDS ARRAY ............//
let gKeyWordsList = ['happy', 'funny', 'angry', 'cute', 'sleepy'];

//........MAKE THE IMGAGES ARRAY TO RENDER ..............//
function _createImgs() {
    let imgs = [];
    for (let i = 0; i < 18; i++) {
        let img = {
            id: i + 1,
            url: `img/${i+1}.jpg`,
            keywords: ['funny']
        }
        imgs.push(img);
    }
    return imgs;
}

// setRandomKeyWord();
// function setRandomKeyWord() {
//     let imgs = _createImgs();
//     imgs.forEach(img => {
//         img.keywords[0] = getRandKeyWord();
//     })
// }

// function getRandKeyWord(){
//     let keyWord = gKeyWordsList[getRandomInt(0, gKeyWordsList.length-1)];
//     return keyWord;
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
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? 0 : gMeme.selectedLineIdx + 1;
}

function changeFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].family = font;
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
}

function updateMemeLine(line, val) {
    line.txt = val;
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++;
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--;
}

function moveLineUp(currLine) {
    currLine.idy -= 10;
}

function moveLineDown(currLine) {
    currLine.idy += 10;
}

//...................... SAVE USER MEMES TO LOCAL STORAGE .................//
function saveUserMeme(userMeme, imgData) {
    gUserSavedImgs.push(imgData);
    gUserSavedMems.push(userMeme);
    saveToStorage(MEMEKEY, gUserSavedMems);
    saveToStorage(IMGKEY, gUserSavedImgs);
}

//................... GETS USER MEMES FROM LOCAL STORAGE ...............////
function getUserSaveMeme() {
    let userMeme = loadFromStorage(IMGKEY);
    return userMeme;
}