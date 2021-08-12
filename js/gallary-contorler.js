'use strict';

function onInit() {
    onInitCanvas();
    closeMeme();
}


function onSelecImg(imgId) {
    const img = getSelecImg(imgId);
    document.querySelector('canvas').hidden = false;
    document.querySelector('.meme-contaier').hidden = false;
    var elBtn = document.querySelector('.buttons-container');
    elBtn.style.display = 'grid';
    document.querySelector('.meme-contaier').style.display = 'flex';
    renderImg(img);
    closeGallary();
}

function onSwitchPage(page) {
    choosePage(page);
}

function openGallary() {
    document.querySelector('.gallary-container').hidden = false;
    closeMeme();
}

function closeGallary() {
    document.querySelector('.gallary-container').hidden = true;
}

function closeMeme() {

    document.querySelector('.meme-contaier').style.display = 'none';
    document.querySelector('canvas').hidden = true;
    var elBtn = document.querySelector('.buttons-container');
    elBtn.style.display = 'none';
}

function openMemes() {

}

function choosePage(page) {
    switch (page) {
        case 'gallary':
            openGallary();
            break;
        case 'memes':
            displayMemsPage();
            break;
        case 'about':
            closeGallary();
            break;
    }

}

function displayMemsPage(){
    closeGallary();
    closeMeme();
    onUloadImgFromStorage();
}

function onSearch(){
    var keyword = document.querySelector('[name=search]').value;
    // var img = searchKeyword(keyword);
    // console.log('img',img);

    var keywords = createMapObg(gImgs);
    console.log('key', keywords); 
}

function onToggleMenu() {
    document.body.classList.toggle('open-menu');
}
