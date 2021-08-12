'use strict';

// var gKeyWords;
// var gImgs;
var gMeme;
const KEY = 'memeDB';
var gSaveMemes = [];
// createMeme();

function createMemes(pos) {
    var gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                txt: " ",
                size: 40,
                align: 'center',
                color: 'black',
                pos,
                isDrag: false,
                font: 'impact'
            }
        ],
    }
    return gMeme;
}

/***************************get*************************************/

function findImg() {
    return gImgs.url;
}

function getTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function getMeme() {
    return gMeme;
}

function getColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color;
}

function getLine(idx = gMeme.selectedLineIdx) {
    return gMeme.lines[idx];
}

function getParam(param) {
    return gMeme.lines[gMeme.selectedLineIdx][param];
}
/***************************change*************************************/
function changeParam(param, newValue) {
    gMeme.lines[gMeme.selectedLineIdx][param] = newValue;

}

function changeFontSize(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 24 || gMeme.lines[gMeme.selectedLineIdx].size > 90) return;
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

/***************************lines*************************************/

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx;
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy;
}

function isline(clickedPos, txtWidth) {
    const { pos } = gMeme.lines[gMeme.selectedLineIdx];
    const distance = Math.sqrt((pos.x - clickedPos.x) + (pos.y - clickedPos.y))
    return distance <= txtWidth;
}

function addLine(pos) {
    gMeme.lines.push({
        txt: " ",
        size: 40,
        align: 'center',
        color: 'black',
        pos,
        isDrag: false,
        font: 'impact'
    });
    return gMeme.lines[gMeme.selectedLineIdx];
}

function updateLine() {
    return gMeme.selectedLineIdx >= gMeme.lines.length - 1 ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx++;

}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx--;
}

/*************************save meme*********************************************/
function saveMeme(){
    // saveToStorage(KEY, gMeme);

}

function uploadImgFromStorage(){
    return loadFromStorage(KEY);
}

function saveMeme() {
    gSaveMemes.push(gMeme);
    localStorage.setItem(KEY, gCanvas.toDataURL(gSaveMemes, 'image/jpeg'));
    return gSaveMemes;
}



