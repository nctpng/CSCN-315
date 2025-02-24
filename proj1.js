// Variables to store the cat image, name, and description
let catImgIndex = 0; // Index of current cat
let catImages = ["img/tuxedo-stan.jpg", "img/felicette-spacecat.jpg"];
let catNames = ["Tuxedo Stan", "Felicette"];
let catDescs = ["Tuxedo Stan was a cat from Halifax, Nova Scotia, Canada, who ran for mayor in 2012.",
               "Félicette was the first cat to go to space. She was launched on a French mission in October 1963."];

// Variables
const catImage = document.getElementById("cat-image");
const catName = document.getElementById("cat-name");
const catDesc = document.getElementById("cat-desc");

catImage.src = catImages[catImgIndex];
catName.innerHTML = catNames[catImgIndex];
catDesc.firstElementChild.innerHTML = catDescs[catImgIndex];

// Function to change the cat image, name, and description
function changeCat(dir) {
    catImgIndex = (catImgIndex + dir + catImages.length) % catImages.length;
    catImage.src = catImages[catImgIndex];
    catName.innerHTML = catNames[catImgIndex];
    catDesc.firstElementChild.innerHTML = catDescs[catImgIndex];
}

// Function to show/hide the cat description
function showDesc() {
    let desc = document.getElementById("cat-desc");
    desc.style.display = desc.style.display === "none" ? "inline" : "none";
}