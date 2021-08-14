'use strict';
var gImgs = [];
var gKeyWords = { 'happy': 3, 'you can': 2 };

createImg();
function createImg() {
    for (var i = 0; i < 18; i++) {
        gImgs[i] = {
            id: i+1,
            url: `img/${i+1}.jpg`,
            keywords: []
        }
    }

    gImgs[0].keywords = ['man'];
    gImgs[1].keywords = ['animal', 'cute'];
    gImgs[2].keywords = ['animal', 'baby', 'cute'];
    gImgs[3].keywords = ['animal'];
    gImgs[4].keywords = ['baby', 'funny'];
    gImgs[5].keywords = ['man'];
    gImgs[6].keywords = ['baby', 'funny'];
    gImgs[7].keywords = ['man', 'funny'];
    gImgs[8].keywords = ['baby', 'funny'];
    gImgs[9].keywords = ['funny', 'man'];
    gImgs[10].keywords = ['man', 'movie'];
    gImgs[11].keywords = ['man'];
    gImgs[12].keywords = ['man', 'funny','movie'];
    gImgs[13].keywords = ['man', 'funny','movie'];
    gImgs[14].keywords = ['man'];
    gImgs[15].keywords = ['man','movie'];
    gImgs[16].keywords = ['man'];
    gImgs[17].keywords = ['toys','movie'];
}

function getSelecImg(imgId) {    
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    });
    return img;
}

function createMapObg(gImgs) {
    var keywordsMap = {};
    for (var i = 0; i < gImgs.length; i++) {
        for (var j = 0; j < gImgs[i].keywords.length; j++) {
            var key = gImgs[i].keywords[j];
            var value = keywordsMap[key];
            keywordsMap[key] = value ? ++value : 1;
        }
    }
    return keywordsMap;
}

function getImgs(){
    return gImgs;
}

function addImg(img){
    var id = gImgs.length + 1;
    gImgs.push({id, url:img.currentSrc});
}
function filterGallary(searchWord){
    if (searchWord === '')return gImgs;
    var filterGallary = gImgs.filter(function(img){
        return img.keywords.some(function(keyword){
            return keyword.toLowerCase().includes(searchWord)
        });
    })
    return filterGallary;
}
