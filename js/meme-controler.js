'use strict';

var gCanvas;
var gCtx;
var gCurrImg;
var gStartPos;
var gMeme;
var gCurrLine;
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
    loadMeme();
    renderSavedMems();
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
    drawSickers();
    drawLine();
}
function scaleToFit(img) {
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

function drawSickers() {
    var meme = getMeme();
    meme.stickers.forEach(sticker => {
        const img = new Image();
        img.src = sticker.src
        gCtx.drawImage(img, sticker.x, sticker.y, sticker.size, sticker.size)
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
    if (alignment.name === 'left') {
        setAlignPos(gCanvas.width / 4);
    } else if (alignment.name === 'right') {
        setAlignPos(gCanvas.width - 100)
    } else if (alignment.name === 'center') {
        setAlignPos(gCanvas.width / 2)
    }
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
    const pos = getEvPos(ev);
    var txtWidth = gCtx.measureText(gCurrLine.txt).width;
    if (!isline(pos, txtWidth)) return;
    setLineDrag(true);
    gStartPos = pos;
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
    var meme = getMeme();
    if (meme.selectedLineIdx >= 1) {
        var pos = { x: gCanvas.width / 2, y: gCanvas.height / 2 };
    } else {
        var pos = { x: gCanvas.width / 2, y: 350 };
    }
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
    gCurrLine = getLine();
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    cleanTxt();
    updateLine();
    renderCanvas();
}

/******************************save***********************************/
function onSaveMeme() {
    saveMeme();
    renderSavedMems();
}

function renderSavedMems() {
    var saveMemes = getSavedMems();
    var strHtml = '';
    saveMemes.forEach(function (meme) {
        return strHtml += `<div><img src="${meme.canvasImg}" onclick="onSelecSaveImg('${meme.id}')">
        <button class="delete-btn" onclick="onDelete('${meme.id}')">X</button></div>`
    });
    document.querySelector('.memes-page').innerHTML = strHtml;
}

function onSelecSaveImg(memeId) {
    var meme = getMemeById(memeId);
    document.querySelector('canvas').hidden = false;
    document.querySelector('.meme-contaier').hidden = false;
    var elBtn = document.querySelector('.buttons-container');
    elBtn.style.display = 'grid';
    document.querySelector('.meme-contaier').style.display = 'flex';
    closeSavedMems();
    var img = getSelecImg(meme.selectedImgId)
    drawImg(img.url);
    renderCanvas();
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function cleanTxt() {
    document.querySelector('.txt').value = '';
}

function onDelete(memeId) {
    deleteMeme(memeId);
    renderSavedMems();

}
/**************************stickers******************************************/

// function onAddSticker(sticker) {
//     addSticker(sticker)
//     renderCanvas();
// }
function getCanvasDimension() {
    return { width: gCanvas.width, height: gCanvas.height };
}

// function renderSticker(stickerId) {
//     var stickers = getSticker(stickerId);
//     var sticker = new Image();
//     sticker.src = stickers.url;
//     gCtx.drawImage(sticker, 0, 0, 30, 30);
//     renderCanvas();
// }


/*******************************share********************************************/

function onOploadImg() {
    renderCanvas()
    var memeToShare = gCanvas.toDataURL('image/jpeg')
    shareImage(memeToShare)
}

async function shareImage(imgCanvasToShare) {
    const response = await fetch(imgCanvasToShare);
    const blob = await response.blob();
    const filesArray = [
        new File(
            [blob],
            'meme.jpg',
            {
                type: "image/jpeg",
                lastModified: new Date().getTime()
            }
        )
    ];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

