
// Check whether each of the fields of the registration form are valid
function validateForm(event) {
    event.preventDefault();
    const form = document.forms.registration;

    try {
        // Check validity of each field
        if (!validateFullname(form) || !validateUsername(form) || !validateEmail(form)
            || !validatePassword(form) || !validateConfirm(form) || !validatePhone(form)
            || !validateDOB(form) || !validateTerms(form))
        { return; }
    } 
    catch(err) {
        console.error(err);
        alert("An error occurred. Please try again.");
    }

    alert("Registration successful!");
    form.reset();
}

// Functions to check the validity of each field

function validateFullname(form) {
    const fullname = form.fullname.value;
    const msg = form.fullname.nextElementSibling.nextElementSibling;

    if (!/^[a-z]/i.test(fullname)) {
        msg.style.display = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}

function validateUsername(form) {
    const username = form.username.value;
    const msg = form.username.nextElementSibling.nextElementSibling;

    if (!/^[a-z1-9]/i.test(username)) {
        msg.style.display = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}

function validateEmail(form) {
    const email = form.email.value;
    const msg = form.email.nextElementSibling.nextElementSibling;

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        msg.style.display = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}

function validatePassword(form) {
    const password = form.password.value;
    const msg = form.password.nextElementSibling.nextElementSibling;
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

    if (!validPassword) {
        msg.style.display = "block";
        return false;
    }

    msg.style.display = "none";
    return true;
}

function validateConfirm(form) {
    const password = form.password.value;
    const confirm = form.confirm.value;
    const msg = form.confirm.nextElementSibling.nextElementSibling;
    const msg2 = form.password.nextElementSibling.nextElementSibling;

    if (password !== confirm) {
        msg.style.display = "block";
        msg2.style.display = "block";

        msg.textContent = "Passwords do not match.";
        msg2.textContent = "Passwords do not match.";
        return false;
    }
    return true;
}

function validatePhone(form) {
    const phone = form.phone.value;
    const msg = form.phone.nextElementSibling.nextElementSibling;

    if (!/^\d{10}$/.test(phone)) {
        msg.style = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}

function validateDOB(form) {
    const dob = form.dob.value;
    const msg = form.dob.nextElementSibling.nextElementSibling;

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
    const msg = form.terms.nextElementSibling.nextElementSibling;

    if (!terms) {
        msg.style.display = "block";
        return false;
    }
    msg.style.display = "none";
    return true;
}