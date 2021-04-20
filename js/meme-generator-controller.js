'use strict';

var gCanvas;
var gCtx;


function onInit() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    // addMouseListeners();
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
    setTimeout(function () {
        drawTxt();
    }, 20)
}

// function addMouseListeners() {
//     gCanvas.addEventListener('mousemove', onMove)
//     gCanvas.addEventListener('mousedown', onDown)
//     gCanvas.addEventListener('mouseup', onUp)
// }

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    gMeme.isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

// function onMove(ev) {
//     const pos = getEvPos(ev)
//     if (isLineClicked(pos)) {
//         const dx = pos.x - gMeme.idx;
//         const dy = pos.y - gMeme.idy;

//         gMeme.idx += dx;
//         gMeme.idy += dy;

//         gStartPos = pos
//         renderCanvas()
//         renderCircle()
//     }
// }

// function onUp() {
//     gCircle.isDragging = false
//     document.body.style.cursor = 'grab'
// }

// function isLineClicked(clickedPos) {

//     console.log()
//     const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
//     return distance <= gCircle.size
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)

//     gElCanvas.addEventListener('touchstart', onDown)

//     gElCanvas.addEventListener('touchend', onUp)
// }

// window.addEventListener('resize', () => {
//     resizeCanvas();
//     renderCanvas();
// })


function DrawTextOnCanvas(txt) {
    let currLine = getCurrLine();
    updateMemeLine(currLine, txt);
    // resizeCanvas();
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
    gMeme.lines.forEach(function (line) {
        gCtx.font = `${line.size}px ${line.family}`;
        gCtx.strokeStyle = `${line.color}`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.fillText(line.txt, line.idx, line.idy);
        gCtx.strokeText(line.txt, line.idx, line.idy);
    })
}

function onOpenHamburgerMenu(elBtn) {
    const xSign = `<i class="fas fa-times"></i>`;
    const hamburgerSign = `<i class="fas fa-bars"></i>`;
    elBtn.innerHTML = (elBtn.innerHTML === hamburgerSign) ? xSign : hamburgerSign;
    const elDropDown = document.querySelector('.drop-down-menu');
    elDropDown.classList.toggle('hide');
    elDropDown.classList.toggle('flex');
    elOverLay.classList.toggle('hide');
}

function onChangeColor(color) {
    setColor(color);
    renderCanvas();
}

function drawImgOnCanvas(id) {
    var img = new Image();
    img.src = `./img/${id}.jpg`;
    // resizeCanvas();
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
    renderCanvas();
}

function onIncreaseFontSize() {
    increaseFontSize();
    renderCanvas();
}

function onDecreaseFontSize() {
    decreaseFontSize();
    renderCanvas();
}


function onMoveLineUp() {
    let currLine = getCurrLine();
    moveLineUp(currLine);
    // renderCanvas();
}

function onMoveLineDown() {
    let currLine = getCurrLine();
    moveLineDown(currLine);
    // renderCanvas();
}


function getEvPos(ev) {
    const pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}