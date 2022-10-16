"use strict";

const messageLogin = document.getElementById("welcome-message");
const loginModal = document.getElementById("login-modal");
const btnLogout = document.getElementById("btn-logout");

////////////////////////////////////////
// Handle login, logout
if (!currentUser) {
  // Remove logout button when not yet login.
  btnLogout.toggleAttribute("hidden");
} else {
  // Current user logged
  messageLogin.textContent = `Welcome ${currentUser.firstName}`;
  // Delete login modal
  loginModal.toggleAttribute("hidden");
}

// Event logout button
btnLogout.addEventListener("click", function () {
  messageLogin.textContent = "";

  // Delete currentUser logged and Display login modal
  removeFromStorage("currentUser");
  loginModal.toggleAttribute("hidden");
  btnLogout.toggleAttribute("hidden");
});
