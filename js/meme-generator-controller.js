'use strict';

var gCanvas;
var gCtx;

//................ ACTIVES FROM DOM, AFTER DOM LOADS ........//
function onInit() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    // addMouseListeners();
    renderGalery();
}

//.......... DISPLAY IMAGES FROM GLOBAL TO THE DOM ...........// 
function renderGalery() {
    let imgs = gImgs;
    let imgStrHtml = imgs.map(function (img) {
        return `<div onclick="renderMemeEditor(${img.id})" class="card pointer">
        <img src="${img.url}">
        </div>`;
    }).join('');
    const elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = imgStrHtml;
    const elKeyWords = document.querySelector('.key-words');

}

function searchKeyWord(keyWord) {
    let copyArray = gImgs;
    let filterArray = gImgs.than(imgsArray => {
        imgsArray.filter(imgs => imgs.keywords == keyWord)
    })
    console.log('3333', filterArray);
    gImgs = filterArray;
    renderGalery();
}

function renderMemeEditor(idx) {
    ontoggleGallery();
    setCurImgIdx(idx);
    renderCanvas();
}

//..... DISPLAY TEXT AND SELECTED IMAGE ON CANVAS......//
function renderCanvas() {
    drawImgOnCanvas(gMeme.selectedImgId);
    setTimeout(function () {
        drawTxt();
    }, 20)
}
//....DRAW TXT ON CANVAS.......//
function drawTxt() {
    gMeme.lines.forEach(function (line) {
        gCtx.beginPath();
        gCtx.strokeStyle = `${line.color}`;
        gCtx.font = `${line.size}px ${line.family}`;
        gCtx.textAlign = `${line.txtAlign}`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.fillText(line.txt, line.idx, line.idy);
        gCtx.strokeText(line.txt, line.idx, line.idy);
        let txtWidth = gCtx.measureText(line.txt).width;
        let lineHeight = line.size * 1.25;
        gCtx.strokeRect(line.idx - txtWidth / 2 - 10, line.idy - lineHeight + 10, txtWidth + 20, lineHeight)
    })
}

//.... ERASE ALL CANVAS DRAW, TEXT AND IMAGE........//
function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

//.........DRAW SELECTED IMAGE ON CANVAS.....//
function drawImgOnCanvas(id) {
    var img = new Image();
    img.src = `./img/${id}.jpg`;
    // resizeCanvas();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
}

//....... ADD EVENT LISINERS FOR DRAG AND DROP ..........//
function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

//......... FIT CANVAS TO THE CONTAINER ......//
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

///////.............................DOM EVENTS .......................////////
// ........... SWITH DISPLAY GALLERY AND DISPLAY EDITOR ...........//
function ontoggleGallery() {
    const elMemeEditor = document.querySelector('.meme-editor');
    const elMainContent = document.querySelector('.content-container');
    elMainContent.classList.toggle('hide');
    elMemeEditor.classList.toggle('hide');
    onOpenHamburgerMenu();
}

function onDownloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

//.......... OPEN HAMBURGER MENU DROP DOWN MENU ....//
function onOpenHamburgerMenu() {
    const elDropDown = document.querySelector('.drop-down-menu');
    elDropDown.classList.toggle('hide');
    elDropDown.classList.toggle('flex');
    onToggleHamburgerIcon();
    onToggleOvelay();
}

function onToggleHamburgerIcon(){
    const elXSign = document.querySelector('.fa-times');
    const elHamburgerSign = document.querySelector('.fa-bars');
    elXSign.classList.toggle('hide');
    elHamburgerSign.classList.toggle('hide');
}

function onToggleOvelay(){
    const elOverLay = document.querySelector('.overlay-filter');
    elOverLay.classList.toggle('hide');
}

function onChangeColor(color) {
    setColor(color);
    renderCanvas();
}

function onAlignTxt(txtAlign){
    setTxtAlign(txtAlign);
    renderCanvas();
}


function onMoveNxtLine() {
    console.log('hey')
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

function onDrawTextOnCanvas(txt) {
    let currLine = getCurrLine();
    updateMemeLine(currLine, txt);
    renderCanvas();
}

function onDecreaseFontSize() {
    decreaseFontSize();
    renderCanvas();
}

function onMoveLineUp() {
    let currLine = getCurrLine();
    moveLineUp(currLine);
    renderCanvas();
}

function onMoveLineDown() {
    let currLine = getCurrLine();
    moveLineDown(currLine);
    renderCanvas();
}

// function getEvPos(ev) {
//     const pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos
// }



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

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     if (!isLineClicked(pos)) return
//     gMeme.isDragging = true
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'
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