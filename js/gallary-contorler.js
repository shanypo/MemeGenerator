'use strict';

function onInit() {
    onInitCanvas();
    closeMeme();
}

function onSelecImg(imgId) {
    const img = getSelecImg(imgId);
    displayGallary();
    document.querySelector('canvas').hidden = false;
    var elBtn = document.querySelector('.buttons-container');
    elBtn.style.display = 'grid';
    renderImg(img);
}

function onSwitchPage(page) {
    choosePage(page);
}

function displayGallary() {
    var elGallary = document.querySelector('.gallary-container');
    if (elGallary.classList.contains('hidden')) {
        elGallary.classList.remove('hidden');
    } else {
        elGallary.classList.add('hidden');
    }
    closeMeme();
}

function closeGallary() {
    document.querySelector('.gallary-container').hidden = true;
}

function closeMeme() {
    document.querySelector('canvas').hidden = true;
    var elBtn = document.querySelector('.buttons-container');
    elBtn.style.display = 'none';
}

function openMemes() {

}

function choosePage(page) {
    switch (page) {
        case 'gallary':
            displayGallary();
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