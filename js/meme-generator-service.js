'use strict';

var gKeywords = {
    'happy': 12,
    'funny puk': 1
};

var gImgs = [
    {
    id: 1,
    url: 'img/1.jpg',
    keywords: ['happy']
},{
    id: 2,
    url: 'img/2.jpg',
    keywords: ['happy']
}
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
};


const KEY = 'meme';

let gSortBy;



function getImgToDisplay() {
    let imgs = gImgs;
    return imgs;
}


function getByIdx(imgIdx) {
    let imgs = gImgs.find(function (img) {
        return imgIdx === img.id;
    })
    return;
}

function create() {}

function update() {}

function remove() {}