// Script for form.html

// Event listeners for pet radio buttons
document.getElementById("pet-yes").addEventListener("click", function() {
    document.getElementById("pet-info").style.display = "inline";
});
document.getElementById("pet-no").addEventListener("click", function() {
    document.getElementById("pet-info").style.display = "none";
});

// Event listener for form submission
document.getElementById("info-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let pets = document.querySelector('input[name="pets"]:checked').value;
    let numPets = document.getElementById("num-pets").value;
    let petName = document.getElementById("pet-name").value;
    let petBirthday = new Date(document.getElementById("pet-birthday").value);

    let message = "";

    // check for missing values
    if (name === "" || age === "" || pets === "") {
        console.log("Missing Data: " + name + ", " + age + ", " + pets);
        alert("Please fill out all fields.");
        return;
    }

    // Greet the user with their name and age
    message += "Hi " + name + "! You are " + age + " years old.<br>";

    // If they have a pet, calculate the pet's age
    if (pets === "yes") {
        if (numPets === "" || petName === "" || petBirthday === "") {
            console.log("Missing Data: " + numPets + ", " + petName + ", " + petBirthday);
            alert("Please fill out all fields.");
            return;
        }

        let curr = new Date();
        let diff = curr - petBirthday;
        let year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        diff -= year * (1000 * 60 * 60 * 24 * 365.25);
        let month = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
        diff -= month * (1000 * 60 * 60 * 24 * 30.44);
        let day = Math.floor(diff / (1000 * 60 * 60 * 24)) - 1;

        console.log("Pet Age: " + year + " years, " + month + " months, " + day + " days");

        // Add the pet's age to the message
        message += "Your pet " + petName + " is " + year + " years, " + month + " months, and " + day + " days old.";
    }

    // Display the message
    document.getElementById("greeting").innerHTML = message;
});