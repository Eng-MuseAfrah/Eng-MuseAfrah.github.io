const images = [
    "muuse.jpeg.jpeg",
    "graduation1.jpg.jpeg",
    "graduation2.jpg.jpeg"
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
