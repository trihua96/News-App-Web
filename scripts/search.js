"use strict";

const inputSearch = document.getElementById("input-query");

//////////////////////////////////////////////////////
// Retrive Search API to current user
const displaySearch = function (content, page) {
  userArrCl.forEach((user) => {
    // User Logged then render news
    if (user.username === currentUser.username) {
      // Get page size & news data
      pageSize = Number(user.pageSize);
      dataNews = user.getSearch(content, user.pageSize, page);
    }
  });

  renderNews(dataNews);
};

// User logged
if (currentUser) {
  let content;
  btnSubmit.addEventListener("click", function () {
    // Get data input
    if (inputSearch.value.trim()) {
      // Input not empty
      content = inputSearch.value;

      // Display News searched
      displaySearch(content, page);

      // Get total pages initial
      totalPages = pageSize;
      // Handle default initial: Remove previous button
      if (page === 1) btnPrev.style.display = "none";

      console.log(totalPages, pageSize);
      btnNext.addEventListener("click", function (e) {
        // Prevent reload page
        e.preventDefault();

        // Display article
        displaySearch(content, page);

        // Handle next page
        nextBtn();

        // Render Add or remove Next button
        displayNextBtn();
      });

      btnPrev.addEventListener("click", function (e) {
        // Prevent reload page
        e.preventDefault();

        // Display article
        displaySearch(content, page);

        // Handle prev page
        prevBtn();

        // Render Add or remove next button
        displayNextBtn();
      });
    } else {
      alert("Search field is empty!❌");
    }
  });
} else {
  // Not yet login
  alert("Let's login to Search!");
  window.location.href = "../index.html";
}
