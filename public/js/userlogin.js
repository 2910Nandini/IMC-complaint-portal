const inputs = document.querySelectorAll(".input");

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});


function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const passwordIcon = document.querySelector(".toggle-password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove("fa-eye-slash");
    }
}

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function sendOTP() {
    const email = document.getElementById("email").value;
    if (!email) {
        alert("Please enter your email.");
        return;
    }
    const otp = generateOTP();
    // Mock function to simulate sending email
    console.log("Sending OTP " + otp + " to " + email);
    alert("OTP has been sent to your email.");

    // Store OTP for later validation
    localStorage.setItem("otp", otp);
}

function resendOTP() {
    sendOTP();
}

function validateOTP() {
    const enteredOTP = document.getElementById("otp").value;
    const storedOTP = localStorage.getItem("otp");

    if (enteredOTP === storedOTP) {
        showPopup();
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}