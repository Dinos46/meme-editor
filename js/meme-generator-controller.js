'use strict';

var gCanvas;
var gCtx;


function onInit() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    renderGalery();
}

function renderGalery() {
    let imgs = getImgToDisplay();

    let imgStrHtml = imgs.map(function (img) {
        return `<div onclick="renderMemeEditor(${img.id})" class="card pointer">
        <img src="${img.url}">
        </div>`;
    }).join('');
    const elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = imgStrHtml;
    const elKeyWords = document.querySelector('.key-words');

}

function renderMemeEditor(idx) {
    ontoggleGallery();
    setCurImgIdx(idx);
    setNewImg(idx)
    drawImgOnCanvas(idx);
}

function renderCanvas(imgId) {
    drawImgOnCanvas(imgId)
    setTimeout(function(){
        drawTxt();
    },20)
}


function DrawTextOnCanvas(txt) {
    let currLine = getCurrLine();
    updateMemeLine(currLine, txt);
    renderCanvas(gMeme.selectedImgId);
}

function ontoggleGallery() {
    const elMemeEditor = document.querySelector('.meme-editor');
    const elMainContent = document.querySelector('.content-container');
    elMainContent.classList.toggle('hide');
    elMemeEditor.classList.toggle('hide');
}

function downloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function drawTxt() {
    let line = getCurrLine();
    gCtx.strokeStyle = 'green';
    gCtx.font = `${line.size}px ${line.family}`;
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.idx, line.idy);
}


function drawImgOnCanvas(id) {
    var img = new Image();
    img.src = `./img/${id}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


    function onMoveNxtLine() {
        nextLine()
        document.querySelector('input[name="write-meme"]').placeholder = getCurrLine().txt;
    }
    
    function onChangeFontFamily() {
        let font = document.querySelector('select[name="fonts"]').value;
        changeFontFamily(font);
    }
    
    function onIncreaseFontSize() {
        increaseFontSize();
    }
    
    function onDecreaseFontSize() {
        decreaseFontSize();
    }