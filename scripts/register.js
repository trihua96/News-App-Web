"use strict";

// Valid data validate
const validateRegister = function (user) {
  let submitOk = true;

  const firstnameValue = user.firstName.trim();
  const lastnameValue = user.lastName.trim();
  const usernameValue = user.username.trim()
  const passwordValue = user.password.trim()
  const passConfirmValue = inputPassConfirm.value.trim()

  // FirstName validate
  if (firstnameValue === "") {
    setErrorFor(inputFirstName, "Empty first name value!");
    submitOk = false;
  } else {
    setSuccessFor(inputFirstName);
  }

  // LastName validate
  if (lastnameValue === "") {
    setErrorFor(inputLastName, "Empty last name value!");
    submitOk = false;
  } else {
    setSuccessFor(inputLastName);
  }

  // Username validate
  if (userArr) {
    // UserArr not empty then check unique username
    for (let i = 0; i < userArr.length; i++) {
      if (usernameValue.toLowerCase() === userArr[i].username.toLowerCase()) {
        setErrorFor(inputUsername, "Username must unique!");
        submitOk = false;
        break;
      }
    }
  } else {
    setSuccessFor(inputUsername);
  }

  if (usernameValue === "") {
    setErrorFor(inputUsername, "Empty username value!");
    submitOk = false;
  } else if(usernameValue.length < 8) {
    setErrorFor(inputUsername, "Username must 8 characters or more!");
    submitOk = false;
  } else {
    setSuccessFor(inputUsername);
  }

  // Password validate
  if (passwordValue === "") {
    setErrorFor(inputPassword, "Empty password value!");
    submitOk = false;
  } else {
    setSuccessFor(inputPassword);
  }
  if (passwordValue.length <= 8) {
    setErrorFor(inputPassword, "Password must be more than 8 characters!");
    submitOk = false;
  } else {
    setSuccessFor(inputPassword);
  }

  // Confirm password validate
  if (passConfirmValue === "") {
    setErrorFor(inputPassConfirm, "Empty password confirm!");
    submitOk = false;
  } 
  // Check password = confirm password
  else if (passwordValue !== passConfirmValue) {
    setErrorFor(inputPassConfirm, "confirm password & password must same!");
    submitOk = false;
  } else {
    setSuccessFor(inputPassConfirm);
  }
  return submitOk;
};

// Catch Error register
function setErrorFor(input, message)  {  
  const formContainer = input.parentElement;

  const small = formContainer.querySelector('small');
  small.innerText = message;
  // Add error class
  formContainer.classList.add('error');
  formContainer.classList.remove('success');
}

// Catch Success register
function setSuccessFor(input) {
  const formContainer = input.parentElement;  
  const small = formContainer.querySelector('small');
  small.innerText = "";
  formContainer.classList.add('success');
  formContainer.classList.remove('error');

}

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
