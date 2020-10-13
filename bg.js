const body = document.querySelector("body");

const IMG_NUMBER = 7;
// random number 얻기
function getRandom() {
    const num = Math.floor(Math.random() * IMG_NUMBER);
    return num;
}
// draw background
function paintImg(num) {
    const image = new Image();
    image.src = `./background/${num + 1}.jpg`;
    image.classList.add("bgImage");
    body.append(image);
}

function init() {
    // random num => background 설정
    const ranNum = getRandom();
    paintImg(ranNum);
}

init();
