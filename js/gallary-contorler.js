'use strict';

function onInit(){
    onInitCanvas();
    document.querySelector('.meme-contaier').hidden = true;

}

function onSelecImg(imgId){
    const img = getSelecImg(imgId);    
    document.querySelector('.gallary-container').hidden = true;
    document.querySelector('.meme-contaier').hidden = false;
    renderImg(img);
}

