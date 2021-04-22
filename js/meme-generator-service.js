'use strict';

//...KEY TO SAVE IN LOCAL STORAGE...........//
const MEMEKEY = 'meme';
const IMGKEY = 'img';


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

let gFilterBy = '';
let gUserSavedMems = [];
let gUserSavedImgs = [];
let gKeyWords = ['kiss', 'trump', 'president', 'dutch', 'paint', 'baby', 'cute', 'puppies', 'cat', 'puppies', 'cute',
    'dogs', 'love', 'boy', 'angry', 'star', 'famous', 'baby', 'evil', 'sunshine', 'famous', 'told you', 'professor', 'actor', 'evil', 'baby', 'dance', 'happy', 'trump', 'president', 'baby', 'funny', 'baby', 'funny', 'dog', 'funny',
    'obama', 'president'
];

//............IMAGES ARRAY GLOBAL ..........//
let gImgs = [{
        id: 1,
        url: 'img/1.jpg',
        keywords: ['trump', 'president']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['dutch', 'paint']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['baby', 'cute', 'puppies']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['cat', 'puppies', 'cute']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['dogs, love']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['boy', 'angry']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['star', 'famous']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['baby', 'evil']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['sunshine']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['famous', 'told you']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['professor']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['actor', 'evil']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['baby', 'dance', 'happy']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['trump', 'president']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['baby, funny']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['dog', 'funny']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['obama', 'president']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['kiss']
    }
];

let gKeywordsNum = {
    'happy': 12,
    'funny puk': 1
};

//....... GET THE CUURENT LINE TXT THE USER EDITS .........//
function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

//...................... UPDATE MODEL FUNCTIONS ...............//

function addLine() {
    const line = {
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
    }
    gMeme.lines.unshift(line);
}

function removeLine(line) {
    gMeme.lines.shift(line);
}

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

function setFilter(filerBy) {
    gFilterBy = filerBy;
}