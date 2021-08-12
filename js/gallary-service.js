'use strict';
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'sad'] }, { id: 2, url: 'img/2.jpg', keywors: ['funny'] }];
var gKeyWords = { 'happy': 3, 'you can': 2 };

function getSelecImg(imgId) {
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    });
    return img;
}

function searchKeyword(keyword) {
    return gImgs.forEach(imgs => {
        imgs.find(function (img){
            return img.keywords === keyword;
        })
    })
}

function createMapObg(gImgs) {
    var keywordsMap = {};
    // debugger
    for (var i = 0; i < gImgs.length; i++){
        for (var j = 0; j < gImgs[i].keywords.length; j++){
            var key = gImgs[i].keywords[j];
            var value = keywordsMap[key];
            keywordsMap[key] = value ? ++value : 1;
        }
    }
    return keywordsMap;
}