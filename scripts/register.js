"use strict";

// Valid data validate
const validateRegister = function (user) {
  let submitOk = true;

  // FirstName validate
  if (user.firstName.trim() === "") {
    alert("Empty first name value!");
    submitOk = false;
  }

  // LastName validate
  if (user.lastName.trim() === "") {
    alert("Empty last name value!");
    submitOk = false;
  }

  // Username validate
  if (userArr) {
    // UserArr not empty then check unique username
    for (let i = 0; i < userArr.length; i++) {
      if (user.username.toLowerCase() === userArr[i].username.toLowerCase()) {
        alert("Username must unique!");
        submitOk = false;
        break;
      }
    }
  }
  if (user.username.trim() === "") {
    alert("Empty username value!");
    submitOk = false;
  }

  // Password validate
  if (user.password.trim() === "") {
    alert("Empty password value!");
    submitOk = false;
  }
  if (user.password.length <= 8) {
    alert("Password must be more than 8 characters!");
    submitOk = false;
  }

  // Confirm password validate
  if (inputPassConfirm.value.trim() === "") {
    alert("Empty password confirm value!");
    submitOk = false;
  }

  // Check password = confirm password
  if (user.password !== inputPassConfirm.value) {
    alert("confirm password & password must same!");
    submitOk = false;
  }
  return submitOk;
};

// Click event register
btnSubmit.addEventListener("click", function () {
  // Get data form
  const user = new UserCl(
    inputFirstName.value,
    inputLastName.value,
    inputUsername.value,
    inputPassword.value
  );
  // console.log(user);

  const isValidate = validateRegister(user);

  if (isValidate) {
    alert("You registered success!");
    // Add in array
    userArrCl.push(user);

    //save in local storage
    saveToStorage(KEY_User, userArrCl);

    // Change page to login.
    window.location.href = "../pages/login.html";
  } else {
    alert("Please, check value again!");
  }
});
