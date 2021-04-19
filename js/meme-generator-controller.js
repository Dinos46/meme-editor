'use strict';

const gCanvas = document.querySelector('.canvas');
const gCtx = gCanvas.getContext('2d');

function onInit(){
    renderGalery();
    // resizeCanvas();
}

function renderGalery(){
    let imgs = getImgToDisplay();
    let imgStrHtml = imgs.map(function(img){
        return `
        <div class="card">
        <img src="${img.url}">
        </div>`;

    });
    const elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = imgStrHtml;
    console.log(imgs)
}

function renderMemeEditor(){
    
}

function onUpdate(){}
function onRemove(){}
function onAdd(){}


function downloadMeme(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}

drawImgOnCanvas();

function drawImgOnCanvas() {
    var img = new Image()
    img.src = './img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}