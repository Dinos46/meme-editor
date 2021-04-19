'use strict';

let gCanvas;
let gCtx;


function onInit() {
    renderGalery();
}

function renderGalery() {
    let imgs = getImgToDisplay();
    let imgStrHtml = imgs.map(function (img) {
        return `<div  onclick="renderMemeEditor(${img.id})" class="card">
        <img src="${img.url}">
        </div>`;
    }).join('');
    const elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = imgStrHtml;

}

function renderMemeEditor(idx) {
    renderCanvas();
    setCurImgIdx(idx);
    drawImgOnCanvas(idx);
}

function renderCanvas(){
    let strHtml = `<canvas class="canvas" height="400" width="400"></canvas>`;
    const elCanvas = document.querySelector('.canvas-container');
    elCanvas.innerHTML = strHtml;
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    ontoggleGallery();
    
}


function DrawTextOnCanvas(txt) {
    setNewLine(txt);
}

function ontoggleGallery() {
    const elMemeEditor = document.querySelector('.meme-editor');
    const elMainContent = document.querySelector('.content-container');
    elMainContent.classList.toggle('hide');
    elMemeEditor.classList.toggle('hide');
}

function downloadMeme(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}



function drawImgOnCanvas(idx) {
    var img = new Image()
    img.src = `./img/${idx}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawTxt();
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}