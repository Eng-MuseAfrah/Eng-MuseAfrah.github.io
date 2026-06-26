
const profileImages = [
    "afrah.JPEG",
    "graduation1.jpg",
    "graduation2.jpg"
];

let currentImage = 0;

const image = document.getElementById("profileImage");

setInterval(() => {

    image.style.opacity = "0";

    setTimeout(() => {

        currentImage = (currentImage + 1) % profileImages.length;

        image.src = profileImages[currentImage];

        image.style.opacity = "1";

    }, 400);

}, 3000);
