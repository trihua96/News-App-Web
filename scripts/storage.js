"use strict";

// Register & login Element form
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPassConfirm = document.getElementById("input-password-confirm");

// Get perPage, category element (Settings)
const inputPageSize = document.getElementById("input-page-size");
const inputOptions = document.getElementById("input-category");

// News element
const newsContainer = document.getElementById("news-container");
const pageNum = document.getElementById("page-num");

// Button
const btnSubmit = document.getElementById("btn-submit");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

//////////////////////////////////////////////////
//------------- Start News PAGE -----------------
// Page: handle event previous/next page
// dataNews: to assign & get promise data from user class
// totalResults: to store value total news returned from API then compare with total page
let page = 1,
  dataNews,
  totalResults,
  totalPages = 0,
  pageSize = 0;

// Render articles to html to display
const renderNews = async function (dataNews) {
  try {
    // Handle promise dataNews
    const data = await dataNews;

    if (!data) throw new Error("Sorry, error request!");
    // Get total news pages
    totalResults = data.totalResults;

    newsContainer.innerHTML = "";

    // Render articles and add to html
    data.articles.forEach((article) => {
      const html = `
        <div style="border: 1px solid #dddddd; overflow: auto; margin-bottom: 20px" class="news-content">
            <div class="news-image">
                <img src='${article.urlToImage}' style="float: left; width: 400px; height: 300px; margin-right: 20px;" alt="image"/>
           </div>
           <div class="news-describe">
                <h3 style="font-size: 1.5rem">${article.title}</h3>
                <p>${article.description}</p>
                <button type="button" class="btn btn-primary btn-viewNews"><a href="${article.url}}" target="_blank" style="color: white">View</a></button>
            </div>
        </div>             
      `;

      newsContainer.insertAdjacentHTML("beforeend", html);
    });
  } catch (err) {
    alert(err.message);
  }
};

// Display or remove (Next btn)
const displayNextBtn = function () {
  // Remove Next button (total page = total result returned )
  if (
    Math.round(totalPages / pageSize) === Math.round(totalResults / pageSize)
  ) {
    btnNext.style.display = "none";
  } else {
    // Add next btn
    btnNext.style.display = "block";
  }
};

const nextBtn = function () {
  page++;
  // Display Prev button
  btnPrev.style.display = "block";

  pageNum.textContent = page;

  totalPages += pageSize;
  console.log(totalPages, pageSize);
};
const prevBtn = function () {
  if (page > 1) {
    page--;

    totalPages -= pageSize;
  }
  console.log(totalPages, pageSize);
  if (page === 1) btnPrev.style.display = "none";
  pageNum.textContent = page;
};
//------------- End News PAGE -------------------
//////////////////////////////////////////////////

// Save storage
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// Retrieve the object from LocalStorage
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

// Remove Item from localStorage
const removeFromStorage = function (key) {
  return localStorage.removeItem(key);
};

// Create array and get local data
const KEY_User = "USER_ARRAY";
const KEY_Task = "todoTask";
const userArr = getFromStorage(KEY_User) || [];

// Convert JS object to class instance
const parseUser = function (userData) {
  const user = new UserCl(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    // Settings PART
    userData.category,
    userData.pageSize
  );

  return user;
};

const userArrCl = userArr.map((user) => parseUser(user));

// Get data current user logging
let currentUser = getFromStorage("currentUser") || null;

// Get Todo storage
const todoArr = getFromStorage(KEY_Task) || [];

// Convert JS object to class instance
const parseTask = function (taskData) {
  const taskTodo = new TaskCl(taskData.task, taskData.owner, taskData.isDone);

  return taskTodo;
};

const todoArrCl = todoArr.map((task) => parseTask(task));
