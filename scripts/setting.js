"use strict";

const btnSave = document.getElementById("btn-submit");

const validateSets = function () {
  let isSets = true;
  if (!inputPageSize.value.trim()) {
    alert("Empty per page! ⚠");
    isSets = false;
  }
  if (inputOptions.value === "General") {
    alert("Let's select category! ⚠");
    isSets = false;
  }
  return isSets;
};

if (currentUser) {
  btnSave.addEventListener("click", function () {
    if (validateSets()) {
      userArrCl.forEach((user) => {
        if (user.username === currentUser.username) {
          user.category = inputOptions.value;
          user.pageSize = inputPageSize.value;
          alert("Successful settings! 🆗");

          // Update pageSize, category
          console.log(userArrCl);
          saveToStorage(KEY_User, userArrCl);
        }
      });
    } else {
      alert("Check again! ✔");
    }
  });
} else {
  alert("Let's login to settings 📑");
  window.location.href = "../index.html";
}
