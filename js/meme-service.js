'use strict';

// var gKeyWords;
// var gImgs;
var gMeme;
const KEY = 'memeDB';
var gSaveMemes = {saveMeme:[]};
var gStickers = [{id: 1, url:'img/stickers/sticker1.jpg'},{id: 2, url:`img/stickers/sticker2.jpg`},{id: 3, url:`img/stickers/sticker3.jpg`}]
// createMeme();

function createMemes(pos) {
    var gMeme = {
        id: 0,
        selectedImgId: 0,
        selectedLineIdx: 0,
        canvasImg: false,
        stickers: [],
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
function getMemeById(memeId) {    
    var img = gSaveMemes.saveMeme.find(function (img) {
        return img.id === memeId;
    });
    return img;
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
function setAlignPos(pos) {    
    gMeme.lines[gMeme.selectedLineIdx].pos.x = pos;
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

function addLine(pos, txt = '') {
    gMeme.lines.push({
        txt: txt,
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
function saveMeme() {
    gMeme.id = _makeId();
    gMeme.canvasImg = gCanvas.toDataURL('image/jpeg', 0.1);
    if(!loadFromStorage(KEY)) {
        gSaveMemes.saveMeme.push(gMeme);
    }else{ 
        loadMeme();
        gSaveMemes.saveMeme.push(gMeme);
    }
    saveToStorage(KEY, gSaveMemes);
}

function loadMeme(){
    gSaveMemes = loadFromStorage(KEY); 
    if(!gSaveMemes) gSaveMemes = { saveMeme:[]};
}

function getSavedMems(){
    return gSaveMemes.saveMeme;
}

function addSticker(sticker){
    gMeme.stickers.push({ src: sticker.src, x: getCanvasDimension().width / 2 , y: (getCanvasDimension().height / 2), size: 60 })
}

function updateImgId(imgId){
    gMeme.selectedImgId = imgId;
}

function _makeId(length = 4) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function deleteMeme(memeId){
    var idx = gSaveMemes.saveMeme.findIndex(function (meme) {
        return meme.id === memeId;
    });
    gSaveMemes.saveMeme.splice(idx, 1);
    saveToStorage(KEY, gSaveMemes);
}

