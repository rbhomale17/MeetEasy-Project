const BaseUrl = "http://localhost:3000";
const registrationUrl = `${BaseUrl}/users/register`

let firstnameError = document.getElementById("firstname-error")
let genderError = document.getElementById("gender-error")
let emailError = document.getElementById("email-error")
let passwordError = document.getElementById("password-error")
let submitError = document.getElementById("submit-error")

// validation for first name from input

function validationFirstName() {
    let name = document.getElementById("name").value;
    const nameInput = /^[A-Za-z\s]+$/.test(name);
    // console.log(nameInput)
    if (nameInput) {
        firstnameError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        firstnameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

//validation for email id from input

function validationEmail() {
    let email = document.getElementById("email").value;
    let emailInput = /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/.test(email);
    // console.log(emailInput)
    if (emailInput) {
        emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        emailError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

// validation for password from input

function validationPassword() {
    let password = document.getElementById("password").value;
    const passwordInput = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@!#$%^&*()-=_+[\]{}|\\;:'",.<>/?`~]{8,}$/.test(password);

    if (passwordInput) {
        console.log("Password is valid.");
        passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        alert("Password is invalid. It should have a minimum length of 8 characters, contain at least one letter and one digit, and may include any symbol.");
        passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

// validation for gender from input

function validationGender() {
    let gender = document.getElementById("gender").value;
    if (gender != "") {
        const genderInput = /^(Male|Female)$/;
        // const gender = "male";
        if (genderInput) {
            console.log("Gender is valid.");
            genderError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        } else {
            alert("Gender invalid");
            genderError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
            return false;
        }
    } else {
        genderError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}
// validation for form all inputs are working or data provided working fine or not

// let flag = false;
function validateSubmit() {
    if (!validationPassword() || !validationEmail() || !validationGender() || !validationFirstName()) {
        submitError.innerHTML = "Please fill correct Data."
        return false
    } else {
        // flag = true;
        RegisterUser();
        return true;
    }
}
//submit event created here

var Submitbutton = document.getElementById("Submit");
Submitbutton.addEventListener("click", function (e) {
    e.preventDefault();
    validateSubmit()
})

// catching all input values after validation
var username = document.getElementById("name");
var gender = document.getElementById("gender");
var email = document.getElementById("email");
var password = document.getElementById("password");

// posting new Admin user data to server

function RegisterUser() {
    let newUserObject = {
        "name": username.value,
        "password": password.value,
        "gender": gender.value,
        "email": email.value
    };
    console.log(newUserObject)
    fetch(`${registrationUrl}`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(newUserObject)
    }).then((res) => res.json()).then((data) => {
        alert(`${data.msg}`);
        if (data.err == false) return;
        alert("Redirecting to Dashboard Page");
        let userData = data.user;
        console.log(data.user);
        localStorage.setItem('userDetails', JSON.stringify(userData))
        redirectToLogin();
    })
}

// // redirecting to dashboard

function redirectToLogin() {
    location.href = "./landing.html";
};

