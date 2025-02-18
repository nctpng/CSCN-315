
// Calculator functions

// Append one character to the display
function appendDisplay(char) {
    const disp = document.getElementById("display");
    if (disp.innerText == "0" && char != ".") {
        disp.innerText = char;
    }
    else {
        disp.innerText += char;
    }
}

// Delete one character from the display
function deleteLast() {
    const disp = document.getElementById("display");
    if (disp.innerText != "0") {
        disp.innerText = disp.innerText.slice(0, -1);
    }
}

// Clear the display
function clearDisplay() {
    document.getElementById("display").innerText = "0";
}

// Evaluate the expression in the display
function calculate() {
    const disp = document.getElementById("display");
    disp.innerText = eval(disp.innerText);
}


// Themes menu
function toggleList() {
    const themes = document.getElementById("themes_container");
    
    // Toggle menu visibility
    if (themes.style.display == "block") {
        themes.style.display = "none";
    } else {
        themes.style.display = "block";
    }
}

// Hide the list on click outside the dropdown list
window.onclick = function(event) {
    if (!event.target.matches('.dropdown_button')) {
        document.getElementById('themes_container')
            .style.display = "none";
    }
}


// Function to change the theme of the calculator
const theme_buttons = document.getElementsByClassName("theme");
const calc = document.getElementById("calculator");
const disp = document.getElementById("display");
const calc_buttons = document.getElementsByClassName("button");
for (let i = 0; i < theme_buttons.length; i++) {
    theme_buttons[i].addEventListener("click", function() {
        let theme = this.innerText.toLowerCase();
        switch (theme) {
            case "light":
                calc.style.backgroundColor = "#f0f0f0";
                calc.style.color = "black";
                disp.style.backgroundColor = "white";
                disp.style.color = "black";
                disp.style.border = "1px solid black";
                for (let j = 0; j < calc_buttons.length; j++) {
                    calc_buttons[j].style.backgroundColor = "#e0e0e0";
                    calc_buttons[j].style.color = "black";
                    calc_buttons[j].style.border = "1px solid black";
                }
                break;
            case "dark":
                calc.style.backgroundColor = "#202020";
                calc.style.color = "white";
                disp.style.backgroundColor = "black";
                disp.style.color = "white";
                disp.style.border = "1px solid white";
                for (let j = 0; j < calc_buttons.length; j++) {
                    calc_buttons[j].style.backgroundColor = "#303030";
                    calc_buttons[j].style.color = "white";
                    calc_buttons[j].style.border = "1px solid white";
                }
                break;
            case "blue":
                calc.style.backgroundColor = "blue";
                calc.style.color = "white";
                disp.style.backgroundColor = "#4040ff";
                disp.style.color = "white";
                disp.style.border = "1px solid white";
                for (let j = 0; j < calc_buttons.length; j++) {
                    calc_buttons[j].style.backgroundColor = "#0000d0";
                    calc_buttons[j].style.color = "white";
                    calc_buttons[j].style.border = "1px solid white";
                }
                break;
            case "green":
                calc.style.backgroundColor = "green";
                calc.style.color = "white";
                disp.style.backgroundColor = "#00a000";
                disp.style.color = "white";
                disp.style.border = "1px solid white";
                for (let j = 0; j < calc_buttons.length; j++) {
                    calc_buttons[j].style.backgroundColor = "#009000";
                    calc_buttons[j].style.color = "white";
                    calc_buttons[j].style.border = "1px solid white";
                }
                break;
            case "red":
                calc.style.backgroundColor = "red";
                calc.style.color = "black";
                disp.style.backgroundColor = "#ff2020";
                disp.style.color = "black";
                disp.style.border = "1px solid black";
                for (let j = 0; j < calc_buttons.length; j++) {
                    calc_buttons[j].style.backgroundColor = "#e00000";
                    calc_buttons[j].style.color = "black";
                    calc_buttons[j].style.border = "1px solid black";
                }
                break;
        }
    });
}