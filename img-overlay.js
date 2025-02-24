/* Project 5 code */

// Add click event to image
const img = document.getElementsByClassName("overlay-image")[0]
img[0].onclick = function() { createOverlay.call(this); }

// REQUIREMENT 1 - Create overlay of image when clicked
function createOverlay() {
    // Overlay div
    let overlay = document.createElement("div");    // REQUIREMENT 3 - Use createElement

    // Overlay styles
    overlay.style.position = "fixed";
    overlay.style.width = "100%";
    overlay.style.top = "50%";
    overlay.style.left = "50%";
    overlay.style.transform = "translate(-50%, -50%)";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    
    // Clone of image to be displayed in overlay
    let newImg = this.cloneNode(true);

    // Image styles
    newImg.style.height = "100vh";
    newImg.style.width = "auto";
    overlay.appendChild(newImg);            // REQUIREMENT 3 - Use appendChild

    // Add click event to remove overlay
    overlay.addEventListener("click", function() {
        document.body.removeChild(overlay); // REQUIREMENT 3 - Use removeChild
    });

    // Add overlay to the body
    document.body.appendChild(overlay);     // REQUIREMENT 3 - Use appendChild
}