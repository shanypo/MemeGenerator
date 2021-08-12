'use strict';
var gImgs = [];
var gKeyWords = { 'happy': 3, 'you can': 2 };

createImg();
function createImg() {
    var keywords = ['funny', 'sad', 'man', 'baby', 'happy'];
    
    for (var i = 0; i < 11; i++) {
        gImgs[i] = {
            id: i+1,
            url: `img/${i+1}.jpg`,
            keywords: []
        }
        for(var j = 0; j < 2; j++){
            var idx = getRandomInt(0, 5);
            gImgs[i].keywords[j] = keywords[idx];
        }
      
    }
}

function getSelecImg(imgId) {    
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    });
    return img;
}

function searchKeyword(keyword) {
    return gImgs.forEach(imgs => {
        imgs.find(function (img) {
            return img.keywords === keyword;
        })
    })
}

function createMapObg(gImgs) {
    var keywordsMap = {};
    // debugger
    for (var i = 0; i < gImgs.length; i++) {
        for (var j = 0; j < gImgs[i].keywords.length; j++) {
            var key = gImgs[i].keywords[j];
            var value = keywordsMap[key];
            keywordsMap[key] = value ? ++value : 1;
        }
    }
    return keywordsMap;
}