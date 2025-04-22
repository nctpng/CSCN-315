
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