"use strict";

//////////////////////////////////////////////////
// Retrive News API to current user
const displayNews = function (page) {
  userArrCl.forEach((user) => {
    // User Logged then render news
    if (user.username === currentUser.username) {
      // Get page size & news data
      pageSize = Number(user.pageSize);
      dataNews = user.getNews("us", user.category, user.pageSize, page);
    }
  });

  renderNews(dataNews);
};

// User logged then display news page
if (currentUser) {
  displayNews(page); // Get pageSize = user.pageSize

  // Get total pages initial
  totalPages = pageSize;

  // Handle default: Remove previous button
  if (page === 1) btnPrev.style.display = "none";

  // Handle transfer page
  btnNext.addEventListener("click", function (e) {
    // Prevent reload page
    e.preventDefault();

    // Display article
    displayNews(page);

    // Handle next page
    nextBtn();

    // Render Add or remove Next button
    displayNextBtn();
  });

  btnPrev.addEventListener("click", function (e) {
    // Prevent reload page
    e.preventDefault();

    // Display article
    displayNews(page);

    // Handle prev page
    prevBtn();

    // Render Add or remove next button
    displayNextBtn();
  });
} else {
  // Not yet login
  alert("Let's login to view news!");
  window.location.href = "../index.html";
}
