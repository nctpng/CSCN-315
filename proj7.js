// Script for form.html

// Modified from proj2.js. New additions are identified with PROJ-7 in comments.

// PROJ-7: Create an array of pet types
let selectedPetTypes = [];

// Event listeners for pet radio buttons
document.getElementById("pet-yes").addEventListener("click", function() {
    document.getElementById("pet-info").style.display = "block";
});
document.getElementById("pet-no").addEventListener("click", function() {
    document.getElementById("pet-info").style.display = "none";
});

// Event listener for form submission
function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const pets = document.querySelector('input[name="pets"]:checked').value;
    const numPets = document.getElementById("num-pets").value;
    const petName = document.getElementById("pet-name").value;
    const petBirthday = new Date(document.getElementById("pet-birthday").value);
    const petTypes = document.querySelectorAll('input[type="checkbox"]'); // PROJ-7: Get all pet types
    const file = document.getElementById("file").files[0]; // PROJ-7: Get the uploaded file
    
    let message = "";
    let petTypeMessage = ""; // PROJ-7: Display the array of pet types to the screen
    
    // check for missing values
    if (name === "" || age === "" || pets === "") {
        console.log("Missing Data: " + name + ", " + age + ", " + pets);
        alert("Please fill out all fields.");
        return;
    }
    
    // PROJ-7: Check for invalid name with regex
    if (/[^a-z]/i.test(name)) {
        return;
    }

    // Greet the user with their name and age
    message += "Hi " + name + "! You are " + age + " years old.<br>";
    
    // If they have a pet, calculate the pet's age
    if (pets === "yes") {
        if (numPets === "" || petTypes.length == 0 || petName === "" || petBirthday === "") { // PROJ-7: Check pet types
            console.log("Missing Data: " + numPets + ", " + petTypes + ", " + petName + ", " + petBirthday);
            alert("Please fill out all fields.");
            return;
        }

        // Calculate the pet's age
        let curr = new Date();
        let diff = curr - petBirthday;
        let year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        diff -= year * (1000 * 60 * 60 * 24 * 365.25);
        let month = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
        diff -= month * (1000 * 60 * 60 * 24 * 30.44);
        let day = Math.floor(diff / (1000 * 60 * 60 * 24));

        // Add the pet's age to the message
        message += "Your pet " + petName + " is " + year + " years, " + month + " months, and " + day + " days old.";
        console.log("Pet Age: " + year + " years, " + month + " months, " + day + " days");

        // PROJ-7: Create an array of pet types
        for (let i = 0; i < petTypes.length; i++) {
            if (petTypes[i].checked) {
                selectedPetTypes.push(petTypes[i].value);
            }
        }

        // PROJ-7: Display the array of pet types to the screen
        if (selectedPetTypes.length > 0) petTypeMessage += "<br>You have a ";
        for (let i = 0; i < selectedPetTypes.length; i++) {
            petTypeMessage += selectedPetTypes[i];
            if (i == selectedPetTypes.length - 2) {
                petTypeMessage += ", and a ";
            }
            else if (i < selectedPetTypes.length - 1) {
                petTypeMessage += ", a ";
            }
            console.log("Pet Type: " + selectedPetTypes[i]);
        }
        petTypeMessage += ".";
    }

    // Display the message
    document.getElementById("greeting").innerHTML = message;
    document.getElementById("pet-info-output").innerHTML = petTypeMessage; // PROJ-7: Display the array of pet types to the screen


    // PROJ-7: Display the uploaded file
    if (file) {
        let cont = document.getElementById("file-content");

        // Remove the previous file's contents
        cont.querySelectorAll("p, img").forEach(function(e) { e.remove(); });

        console.log("File: " + file.name + ", " + file.type);
        document.getElementById("file-name").textContent = file.name;

        if (file.type.startsWith("text/")) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let content = document.createElement("p");
                content.textContent = e.target.result;
                cont.appendChild(content);
            };

            // Read the file as text
            reader.readAsText(file);
        }
        else if (file.type.startsWith("image/")) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let img = document.createElement("img");
                img.src = e.target.result;
                img.style.width = "100%";
                cont.appendChild(img);
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    }
}

document.forms.infoform.file.addEventListener("change", function() {

});
