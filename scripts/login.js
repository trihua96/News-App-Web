"use strict";

// valiate data form login same data storaged
let isUsername, isPassword;
isUsername = isPassword = true;

const validateLogin = function (user) {
  let submitOk = true;

  // Case user[0] != [] (true)
  if (user[0]) {
    for (let i = 0; i < user.length; i++) {
      // Check Username field empty
      if (inputUsername.value.trim() === "") {
        alert("Username field is Empty! ❌");
        submitOk = false;
        break;
      }

      // Check Password field empty
      if (inputPassword.value.trim() === "") {
        alert("Password field is Empty! ❌");
        submitOk = false;
        break;
      }

      // Check both username & password
      if (
        inputUsername.value.toLowerCase() === user[i].username.toLowerCase() &&
        inputPassword.value === user[i].password
      ) {
        // Both correct
        // save current user login
        currentUser = user[i];
        submitOk = true;
        break;
      } else if (
        // Username: true & password: false
        inputUsername.value.toLowerCase() === user[i].username.toLowerCase() &&
        inputPassword.value !== user[i].password
      ) {
        isPassword = false;
        isUsername = true;
      } else {
        // Username: false & password: true
        isUsername = false;
        isPassword = true;
      }

      // Both wrong
      submitOk = false;
    }
  } else {
    // Case user[0] = []  (false)
    alert("No user data! ⚠ Please register ⚠");
  }
  return submitOk;
};

btnSubmit.addEventListener("click", function () {
  const isValidate = validateLogin(userArrCl);

  if (isValidate) {
    // Login success
    // Save data to localStorage
    saveToStorage("currentUser", currentUser);
    alert("Login sucess 📍");
    // Change page to home.
    window.location.href = "../index.html";
  } else {
    // Data login wrong
    // Wrong username, password true
    if (isUsername === false) {
      alert("Wrong username!");
    } else if (isPassword === false) {
      alert("Wrong password!");
    } else {
      alert("Please, check again!✅");
    }
  }
});
