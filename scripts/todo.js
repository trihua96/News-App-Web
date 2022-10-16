"use strict";

const inputTask = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");
const btnClose = document.querySelector(".close");

const btnAddTask = document.getElementById("btn-add");

//////////////////////////

let isDone = false,
  current;

// Display task
const displayTask = function () {
  todoList.innerHTML = "";

  todoArrCl.forEach((task) => {
    if (currentUser.username === task.owner) {
      const html = `   
            <li class="${task.isDone ? "checked" : ""}">
                ${task.task}
                <span class="close">×</span>
            </li>
            `;

      todoList.insertAdjacentHTML("afterbegin", html);
    }
  });
};

// User logged
if (currentUser) {
  displayTask();

  // Event click to curent task: Propagation
  todoList.addEventListener("click", function (e) {
    // Case: click to current li then add Toggle checked class
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    }

    // Loop through todo array
    todoArrCl.forEach((task) => {
      if (currentUser.username === task.owner) {
        // (Event Check) task selected same with task currentUser
        const currTxtLi = e.target.textContent.trim();
        if (task.task === currTxtLi.slice(0, currTxtLi.indexOf("\n"))) {
          // Change Check sign in task
          task.isDone = !task.isDone;

          // Update to local
          saveToStorage(KEY_Task, todoArrCl);
        }

        // (Event Remove) Parent li Selected & same text
        if (
          e.target.classList.contains("close") &&
          task.task ===
            e.target.parentElement.textContent
              .trim()
              .slice(0, e.target.parentElement.textContent.trim().indexOf("\n"))
        ) {
          // Remove current task selected
          todoArrCl.splice(todoArrCl.indexOf(task), 1);

          saveToStorage(KEY_Task, todoArrCl);

          e.target.parentElement.style.display = "none";
        }
      }
    });
  });

  // Event add btn
  btnAddTask.addEventListener("click", function () {
    // Get value and pass in task class
    const todoTask = new TaskCl(inputTask.value, currentUser.username, isDone);

    // Check task duplicated
    const isDuplicate = todoArrCl.some((task) => todoTask.task === task.task);

    // Check Input not empty & not same
    if (todoTask.task.trim() && !isDuplicate) {
      // Add todo list
      todoArrCl.push(todoTask);

      // Display in todo list
      displayTask();

      // Update to local
      saveToStorage(KEY_Task, todoArrCl);
    } else {
      alert("Empty field input or Duplicate task ⚠\nPlease, check again!");
    }
  });
} else {
  alert("Let's login to set Todo List 📑");
  window.location.href = "../index.html";
}
