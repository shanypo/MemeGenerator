'use strict';

function getSelecImg(imgId){
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    });
    return img;

}