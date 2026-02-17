// Typing Effect
const text = "Web Developer | Data Analyst";
let i = 0;

function typing(){
if(i < text.length){
document.querySelector(".typing").textContent += text.charAt(i);
i++;
setTimeout(typing,80);
}
}

document.querySelector(".typing").textContent="";
typing();

// Loader
window.onload = function(){
document.getElementById("loader").style.display="none";
}
