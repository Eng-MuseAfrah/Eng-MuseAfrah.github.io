const images = [
    "afrah.JPEG",
    "graduation1.jpg",
    "graduation2.jpg"
];

let current = 0;

const img = document.getElementById("profileImage");

setInterval(() => {

    img.style.opacity = "0";

    setTimeout(() => {

        current++;

        if(current >= images.length){
            current = 0;
        }

        img.src = images[current];

        img.style.opacity = "1";

    },400);

},3000);
