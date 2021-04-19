'use strict';

const gCanvas = document.querySelector('.canvas');
const gCtx = gCanvas.getContext('2d');


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
    // createMeme(idx);
    ontoggleGallery();
    let img = getImgByIdx(idx);
    drawImgOnCanvas(img.id);
    clearCanvas()
    setTxtStyle();
    // resizeCanvas();
}


function DrawTextOnCanvas(txt) {
    gCtx.fillStyle = 'green';
    // gCtx.font = '30px Arial'
    gCtx.fillText('hello', 400, 500);
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

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function drawImgOnCanvas(idx) {
    var img = new Image()
    img.src = `./img/${idx}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}