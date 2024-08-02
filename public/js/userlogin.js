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


function togglePasswordVisibility(inputId, icon) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove("fa-eye-slash");
    }
}


async function sendOTP(formId) {
    const form = document.getElementById(formId);
    const email = form.querySelector('input[name="email"]').value;

    if (!email) {
        alert('Please enter your email address');
        return;
    }

    const endpoint = formId === 'userlogin' ? '/send-user-otp' : '/send-admin-otp';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
    }
}

function resendOTP(formId) {
    sendOTP(formId);
}

// Fetch user form data and submit to server
async function submituserForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById("userlogin");
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            console.log("Login successful");
            // Redirect to user dashboard
            window.location.href = "/dashboard";
        } else {
            const errorResult = await response.json();
            alert("Invalid OTP. Please try again.");
            console.error('Error:', errorResult.message)
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}


// Fetch admin form data and submit to server
async function submitadminForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById("adminlogin");
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/loginadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            console.log("Login successful");
            // Redirect to admin dashboard
            window.location.href = "/admindash";
        } else {
            const errorResult = await response.json();
            alert("Invalid OTP. Please try again.");
            console.error('Error:', errorResult.message)
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});