const leaf = ["./images/trefle.png","./images/feuille1.png","./images/feuille2.webp"];
const imgContainer = document.querySelector(".images");

var windowWidth = screen.availWidth;

let moveImg = [
    { transform: 'rotate(0)', top: '-10%' },
    { transform: 'rotate(360deg)', top: '100%' }
];

let timing = {
    duration: 8000,
    iterations: 1,
};
function animation() {
    function addImage() {
        setTimeout(() => {
            addImage();
        }, 1000);

        for (let nb = 0; nb < Math.floor(Math.random()*3)+1; nb++) {
            let img = document.createElement('img');
            imgContainer.appendChild(img);
            img.src = leaf[Math.floor(Math.random()*3)];
            img.style.left = Math.floor(Math.random()*windowWidth)+"px";
            img.style.width = Math.random()+1+"%";

            timing.duration = Math.floor(Math.random()*8000)+8000;
            moveImg[1].transform = 'rotate('+Math.floor(Math.random()*720)+'deg)';
            let imgAnimation = img.animate(moveImg, timing);
            imgAnimation.addEventListener('finish',() => {
                img.remove();
            });
        }
    };

    addImage();
};

document.addEventListener('DOMContentLoaded', animation);