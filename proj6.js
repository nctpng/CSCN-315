
// On form submission, check that all fields are valid
function validateForm(event) {
    event.preventDefault();
    const form = document.forms.registration;

    try {
        // Check validity of each field
        if (!validateFullname(form) || !validateUsername(form) || !validateEmail(form)
            || !validatePassword(form) || !validatePhone(form)
            || !validateDOB(form) || !validateTerms(form))
        { return; }
    } 
    catch(err) {
        console.error(err);
        alert("An error occurred. Please try again.");
        window.alert(err);
        return;
    }

    alert("Registration successful!");
    form.reset();
}


// Functions to check the validity of each field

function validateFullname(form) {
    const fullname = form.fullname.value;
    const msg = document.getElementById("fullname").getElementsByClassName("error-message")[0];

    if (!/^[a-z]/i.test(fullname)) {
        msg.style.display = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}

function validateUsername(form) {
    const username = form.username.value;
    const msg = document.getElementById("username").getElementsByClassName("error-message")[0];

    if (!/^[a-z1-9]/i.test(username)) {
        msg.style.display = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}

function validateEmail(form) {
    const email = form.email.value;
    const msg = document.getElementById("email").getElementsByClassName("error-message")[0];

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        msg.style.display = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}

// Helper function for validatePassword()
function setPasswordErr(password, msg) {
    let validPassword = true;

    if (password.length < 8) {
        msg.textContent = "Password must be at least 8 characters long.";
        validPassword = false;
    }
    else if (!/[A-Z]/.test(password)) {
        msg.textContent = "Password must contain at least one uppercase letter";
        validPassword = false;
    }
    else if (!/[a-z]/.test(password)) {
        msg.textContent = "Password must contain at least one lowercase letter";
        validPassword = false;
    }
    else if (!/[0-9]/.test(password)) {
        msg.textContent = "Password must contain at least one digit";
        validPassword = false;
    }
    else if (!/[#?!@$ %^&*-]/.test(password)) {
        msg.textContent = "Password must contain at least one special character";
        validPassword = false;
    }

    return validPassword;
}

function validatePassword(form) {
    const msg_password = document.getElementById("password").getElementsByClassName("error-message")[0];
    const msg_confirm = document.getElementById("confirm").getElementsByClassName("error-message")[0];
    let validPasswords = true;
    
    // Check if the passwords match
    if (form.password.value !== form.confirm.value) {
        msg_password.textContent = "Passwords do not match.";
        msg_confirm.textContent = "Passwords do not match.";
    }

    // Check if the password has an error
    if (!setPasswordErr(form.password.value, msg_password) || form.password.value !== form.confirm.value) {
        document.getElementById("password").classList.add("error");
        validPasswords = false;
    }
    else {
        document.getElementById("password").classList.remove("error");
    }

    // Check if the confirm password has an error
    if (!setPasswordErr(form.confirm.value, msg_confirm) || form.password.value !== form.confirm.value) {
        document.getElementById("confirm").classList.add("error");
        validPasswords = false;
    }
    else {
        document.getElementById("confirm").classList.remove("error");
    }

    return validPasswords;
}

function validatePhone(form) {
    const phone = form.phone.value;
    const msg = document.getElementById("phone").getElementsByClassName("error-message")[0];

    if (!/^\d{10}$/.test(phone)) {
        msg.style = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}

function validateDOB(form) {
    const dob = form.dob.value;
    const msg = document.getElementById("dob").getElementsByClassName("error-message")[0];

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        msg.style.display = "block";
        msg.textContent = "Invalid date of birth.";
        return false;
    }
    else if (new Date().getFullYear() - new Date(dob).getFullYear() < 18) {
        msg.style.display = "block";
        msg.textContent = "You must be at least 18 years old.";
        return false;
    }

    msg.style.display = "none";
    return true;
}

function validateTerms(form) {
    const terms = form.terms.checked;
    const msg = document.getElementById("terms").getElementsByClassName("error-message")[0];

    if (!terms) {
        msg.style.display = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}