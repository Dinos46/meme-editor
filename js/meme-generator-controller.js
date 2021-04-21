'use strict';

let gCanvas;
let gCtx;
let gTouchEvs = ['touchmove', 'touchstart', 'touchend'];

//................ ACTIVES FROM DOM, AFTER DOM LOADS ........//
function onInit() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    addMouseListeners();
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
    let strHtml = gKeyWordsList.map(word => {
        return `<span class="pointer">${word} </span>`;
    }).join('');
    elKeyWords.innerHTML = strHtml;
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
        // gCtx.strokeRect(line.idx - txtWidth / 2 - 10, line.idy - lineHeight + 10, txtWidth + 20, lineHeight)
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
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        // resizeCanvas();
    }
}

//......... FIT CANVAS TO THE CONTAINER ......//
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

///////.............................DOM EVENTS .......................////////
// ........... SWITCH DISPLAY GALLERY AND DISPLAY EDITOR ...........//
function ontoggleGallery() {
    const elMemeEditor = document.querySelector('.meme-editor');
    const elMainContent = document.querySelector('.content-container');
    elMainContent.classList.toggle('hide');
    elMemeEditor.classList.toggle('hide');
}

function onDownloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

//.......... OPEN HAMBURGER MENU DROP DOWN MENU ....//
function onOpenHamburgerMenu() {
    if (window.innerWidth > 600) return;
    const elDropDown = document.querySelector('.drop-down-menu');
    elDropDown.classList.toggle('hide');
    elDropDown.classList.toggle('flex');
    onToggleHamburgerIcon();
    onToggleOvelay();
}

function onToggleHamburgerIcon() {
    const elXSign = document.querySelector('.fa-times');
    const elHamburgerSign = document.querySelector('.fa-bars');
    elXSign.classList.toggle('hide');
    elHamburgerSign.classList.toggle('hide');
}

function onToggleOvelay() {
    const elOverLay = document.querySelector('.overlay-filter');
    elOverLay.classList.toggle('hide');
}

function onSearch(inputVal) {
    gImgs.filter(img => {
       return img.keywords.includes(inputVal);
    })
    renderCanvas();
}

// ................. EVENTS FROM MEME EDITOR ...........//
function onChangeColor(color) {
    setColor(color);
    renderCanvas();
}

function onAlignTxt(txtAlign) {
    setTxtAlign(txtAlign);
    renderCanvas();
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

function onDrawTextOnCanvas(txt) {
    let currLine = getCurrLine();
    updateMemeLine(currLine, txt);
    renderCanvas();
}

function onDecreaseFontSize() {
    decreaseFontSize();
    renderCanvas();
}

function onSaveToTab() {
    const data = gCanvas.toDataURL();
    saveUserMeme(gMeme, data);
}

function renderUserTab() {
    let userMeme = getUserSaveMeme();
    if (!userMeme) return;
    const elImg = document.querySelector('.img-container');
    const elUserTab = document.querySelector('.uesr-save-tab');
    elUserTab.classList.toggle('hide');
    let strHtml = userMeme.map(data => {
        return `<img class="meme" src="${data}">`;
    }).join('');
    elImg.innerHTML = strHtml;
    // if(window.innerWidth <= 600)
    // onOpenHamburgerMenu();
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

//................... DRAG AND DROP MEME ..................//
function addMouseListeners() {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    let line = gCanvas.getBoundingClientRect();
    const pos = getEvPos(ev)
    let x = pos.x - line.top;
    let y = pos.y - line.left;
    console.log('out')
    if (!isLineClicked(x, y)) return;
    console.log('in')
    gMeme.lines[gMeme.selectedLineIdx].isDragging = true;
    gMeme.lines[gMeme.selectedLineIdx].idx = pos.x;
    gMeme.lines[gMeme.selectedLineIdx].idy = pos.y;
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const pos = getEvPos(ev)
    if (gMeme.lines[gMeme.selectedLineIdx].isDragging) {
        const dx = pos.x - gMeme.lines[gMeme.selectedLineIdx].idx;
        const dy = pos.y - gMeme.lines[gMeme.selectedLineIdx].idy;
        gMeme.lines[gMeme.selectedLineIdx].idx += dx;
        gMeme.lines[gMeme.selectedLineIdx].idy += dy;
        renderCanvas()
    }
}

function onUp() {
    gMeme.lines[gMeme.selectedLineIdx].isDragging = false;
    document.body.style.cursor = 'grab';
}

function isLineClicked(xPos, yPos) {
    let linePosx = getCurrLine().idx;
    let linePosy = getCurrLine().idy;
    console.log(linePosx, linePosy)
    const distance = Math.sqrt(
        (xPos - linePosx) +
        (yPos - linePosy))
    let lineHeight = (gMeme.lines[gMeme.selectedLineIdx].size * 1.25);
    console.log();
    return distance <= lineHeight;
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

// window.addEventListener('resize', () => {
//     resizeCanvas();
//     renderCanvas();
// })

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