'use strict';

// var gKeyWords;
// var gImgs;
var gMeme;

// createMeme();
var gKeyWords = { 'happy': 3, 'you can': 2 };
var gImgs = [{ id: 1, url: 'img/1.jpg', keywors: ['funny'] }, { id: 2, url: 'img/2.jpg', keywors: ['funny'] }];

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
        ]
    }
    return gMeme;
}

function findImg() {
    return gImgs.url;
}

function getTxt() {
    return gMeme.lines[0].txt;
}

function getMeme() {
    return gMeme;
}

function changeColor(fontColor) {
    gMeme.lines[0].color = fontColor;
}

function getColor() {
    return gMeme.lines[0].color;
}

function changeFontSize(diff) {
    gMeme.lines[0].size += diff;
}

function getFontSize() {
    return gMeme.lines[0].size;
}

function changeAlignment(alignment) {
    gMeme.lines[0].align = alignment.name;
}

function getAlign() {
    return gMeme.lines[0].align;
}

function setLineDrag(isDrag) {
    gMeme.lines[0].isDrag = isDrag
}

function getLine(lineNum) {
    return gMeme.lines[lineNum];
}

function moveLine(dx, dy) {
    gMeme.lines[0].pos.x += dx;
    gMeme.lines[0].pos.y += dy;
}

function changeFont(fontFamily) {
    gMeme.lines[0].font = fontFamily;
}

function getFont() {
    return gMeme.lines[0].font;
}

function isline(clickedPos, txtWidth) {
    const { pos } = gMeme.lines[0];
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
    return gMeme.lines[1];
}