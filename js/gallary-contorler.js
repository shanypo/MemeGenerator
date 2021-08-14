'use strict';

function onInit() {
    renderGallary();
    onInitCanvas();
    closeMeme();
    closeSavedMems();
}

function renderGallary() {
    var gallary = getImgs();
    var strHtml = `<label for="file-input">
    <div class="uplaod-img">Upload your own photo</div>
    </label>
    <input type="file" class="file-input" id="file-input" onchange="onImgInput(event)">`
    gallary.forEach(function (img, idx) {
        return strHtml += `<img src="${img.url}" onclick="onSelecImg(${idx + 1})">`
    });
    document.querySelector('.main-container').innerHTML = strHtml;
}

function onSelecImg(imgId) {
    const img = getSelecImg(imgId);
    updateImgId(imgId);
    document.querySelector('canvas').hidden = false;
    document.querySelector('.meme-contaier').hidden = false;
    var elBtn = document.querySelector('.buttons-container');
    elBtn.style.display = 'grid';
    document.querySelector('.meme-contaier').style.display = 'flex';
    renderImg(img);
    closeGallary();
    closeSavedMems();
}

function onSwitchPage(page) {
    choosePage(page);
}

function openGallary() {
    document.body.classList.remove('open-menu');
    document.querySelector('.gallary-container').hidden = false;
    closeMeme();
    closeSavedMems();
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

function displayMemsPage() {
    closeGallary();
    closeMeme();
    document.body.classList.remove('open-menu');
    document.querySelector('.memes-page').style.display = '';
}

function onSearch(searchWord) {
    var fillterImgs = filterGallary(searchWord);
    var strHtml = `<label for="file-input">
    <div class="uplaod-img">Upload your own photo</div></label><input type="file" class="file-input" id="file-input" onchange="onImgInput(event)">`
    fillterImgs.forEach(function (img, idx) {
        return strHtml += `<img src="${img.url}" onclick="onSelecImg(${idx + 1})">`
    });
    document.querySelector('.main-container').innerHTML = strHtml;

}

function onToggleMenu() {
    document.body.classList.toggle('open-menu');
}

function closeSavedMems() {
    document.querySelector('.memes-page').style.display = 'none';
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImgToGall)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImgToGall(img) {
    addImg(img);
    renderGallary();
}
