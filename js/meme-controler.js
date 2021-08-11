'use strict';

var gCanvas;
var gCtx;
var gCurrImg;
var gStartPos;
var gMeme;
var gLineNum;
var gCurrLine;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

// var x = gCanvas.width / 2;
// var y = gCanvas.height - gCanvas.height / 4.5;
function onInitCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gStartPos = { x: gCanvas.width / 2, y: 48 };
    gMeme = createMemes(gStartPos);
    gLineNum = 0;
    gCurrLine = gMeme.lines[gLineNum];
    addMouseListeners();
    addTouchListeners();
    renderCanvas();
}

function renderImg(img) {
    gCurrImg = img.url;
    drawImg(gCurrImg);
}

function drawImg(imgUrl) {
    var img = new Image();
    img.src = imgUrl;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onDrawTxt(txt) {
    gCurrLine.txt = txt;
    gMeme.selectedLineIdx = gLineNum;
    renderCanvas();
}

function drawTxt(txt, lineIdx) {
    const line = getLine(lineIdx);
    const { x, y } = line.pos;
    var color = getColor();
    var size = getFontSize();
    var align = getAlign();
    var font = getFont();
    gCtx.font = `${size}px ${font}`;
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = 'white';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.textAlign = align;
}

function renderCanvas() {
    clearCanvas();
    drawImg(gCurrImg);
    drawLine();
}

function drawLine() {
    var memes = getMeme();
    var elBorder = document.querySelector('.border-box');
    memes.lines.forEach((line, idx) => {
        drawTxt(line.txt, idx);
        // elBorder.innerHTML = line.txt;
    });
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onChangeColor() {
    const fontColor = document.querySelector('[name=font-color]').value;
    changeColor(fontColor);
    renderCanvas();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    renderCanvas();
}

function onChangeAlign(alignment) {
    console.log('this', alignment);
    changeAlignment(alignment);
    renderCanvas();
}

function onChangeFont(fontFamily) {
    changeFont(fontFamily);
    renderCanvas();
}

function OnMoveLine(diff) {
    // gCurrLine.pos;
    gCurrLine.pos.y += diff;
    // gStartPos.y = gCurrLine.pos.y;
    renderCanvas();
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    var txtWidth = gCtx.measureText(gCurrLine.txt).width;
    if (!isline(pos, txtWidth)) return;
    setLineDrag(true);
    gStartPos = pos
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    var elLine = document.querySelector('.txt');
    elLine.style.border = '1px solid';
    if (gCurrLine.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy);
        gStartPos = pos;
        renderCanvas();
    }
}

function onUp() {
    setLineDrag(false);
    document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
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
    return pos;
}

function onAddLine() {
    document.querySelector('.txt').value = '';
    var pos = { x: gCanvas.width / 2, y: 144 };
    addLine(pos);
    gLineNum++;
    gCurrLine = getLine(gLineNum);

    // renderCanvas();
}

function onSwitchLine() {

}


