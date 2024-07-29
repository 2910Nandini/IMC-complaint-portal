const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})


function togglePopup() {
    const popup = document.getElementById('profilePopup');
    popup.classList.toggle('show');
}

function editProfile() {
    alert('Edit Profile clicked');
}

function manageGoogleAccount() {
    alert('Manage your Google Account clicked');
}

function navigateTo(option) {
    //alert(Navigating to ${option});
    // Here you can add the logic to navigate to different pages or sections
    // For example:
    // if (option === 'your-profile') {
    //     window.location.href = '/your-profile';
    // }
}

// Close the popup when clicking outside of it
window.onclick = function(event) {
    const popup = document.getElementById('profilePopup');
    if (event.target !== popup && !popup.contains(event.target) && event.target.className !== 'profile-button') {
        popup.classList.remove('show');
    }
}

function openModal(view) {
    var modal = document.getElementById("modal");
    var modalContent = document.getElementById("modal-content");

    if (view === 'view1') {
        modalContent.innerHTML = "Content for View 1";
    } else if (view === 'view2') {
        modalContent.innerHTML = "Content for View 2";
    }

    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
    var modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function toggleDropdown() {
    var dropdown = document.getElementById("dropdown");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function logout() {
    // Add logout functionality here
    alert("Logged out!");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.nav-link img')) {
        var dropdown = document.getElementById("dropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
}