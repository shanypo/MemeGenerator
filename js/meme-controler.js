'use strict';

var gCanvas;
var gCtx;
var gCurrImg;
var gStartPos;
var gMeme;
var gCurrLine;
var gSavesMemes;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInitCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gStartPos = { x: gCanvas.width / 2, y: 48 };
    gMeme = createMemes(gStartPos);
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx];
    addMouseListeners();
    addTouchListeners();
    renderCanvas();
}

/******************************render************************************/
function renderImg(img) {
    cleanTxt();
    gCurrImg = img.url;
    drawImg(gCurrImg);
}

function renderCanvas() {
    clearCanvas();
    drawImg(gCurrImg);
    drawLine();
}
function scaleToFit(img){
var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}
/******************************draw************************************/

function drawImg(imgUrl) {
    var img = new Image();
    img.src = imgUrl;     
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    // var gCanvas = gCtx.canvas;
    // var hRatio = gCanvas.width / img.width;
    // var vRatio = gCanvas.height / img.height;
    // var ratio = Math.min(hRatio, vRatio);
    // var centerShift_x = (gCanvas.width - img.width * ratio) / 2;
    // var centerShift_y = (gCanvas.height - img.height * ratio) / 2;
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    // gCtx.drawImage(img, 0, 0, img.width, img.height,
    // centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);    

}

function onDrawTxt(txt) {
    gCurrLine.txt = txt;
    renderCanvas();
}

function drawTxt(txt, lineIdx) {
    const line = getLine(lineIdx);
    const { x, y } = line.pos;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = line.color;
    gCtx.fillStyle = 'white';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.textAlign = line.align;
}

function drawLine() {
    var memes = getMeme();
    memes.lines.forEach((line, idx) => {
        drawTxt(line.txt, idx);
    });
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onChangeColor() {
    const fontColor = document.querySelector('[name=font-color]').value;
    changeParam('color', fontColor);
    renderCanvas();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    renderCanvas();
}

function onChangeAlign(alignment) {
    changeParam('align', alignment.name)
    renderCanvas();
}

function onChangeFont(fontFamily) {
    changeParam('font', fontFamily)
    renderCanvas();
}

/******************************move************************************/


function OnMoveLine(diff) {
    gCurrLine.pos.y += diff;
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


/******************************lines************************************/

function onAddLine() {
    cleanTxt();
    var pos = { x: gCanvas.width / 2, y: 144 };
    document.querySelector('[name=text-line]').focus();
    addLine(pos);
    updateLine();
    gCurrLine = getLine();
    renderCanvas();
}

function onSwitchLine() {
    var idx = updateLine();
    document.querySelector('[name=text-line]').value = gMeme.lines[idx].txt;
    document.querySelector('[name=text-line]').focus();
}

function onDeleteLine() {
    deleteLine();
    cleanTxt();
    updateLine();
    renderCanvas();
}

/******************************lines************************************/

function onSaveMeme() {
    gSavesMemes = saveMeme();
}

function onUloadImgFromStorage() {

    if(!gSaveMemes || gSaveMemes.length === 0)return;
    gSavesMemes.forEach((meme) => {
        var meme = new Image();        
        meme.src = uploadImgFromStorage();
        var elMeme = document.querySelector('.memes-page');
        elMeme.appendChild(meme);
    });
    
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function cleanTxt(){
    document.querySelector('.txt').value = '';
}

