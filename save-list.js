//збереження завдань у localstorage
function saveTasks() {
  var taskList = document.getElementById("task-list");
  var tasks = [];
  for (var i = 0; i < taskList.children.length; i++) {
    tasks.push(taskList.children[i].textContent);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//відновлення завдань з localstorage
function loadTasks() {
  var taskList = document.getElementById("task-list");
  var savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    var tasks = JSON.parse(savedTasks);
    for (var i = 0; i < tasks.length; i++) {
      var taskItem = document.createElement("li");

      var taskText = tasks[i].replace("Delete", "");

      taskItem.textContent = taskText;

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "button-delete-task";
      deleteButton.onclick = function (event) {
        var listItem = event.target.parentElement;
        taskList.removeChild(listItem);
        saveTasks();
      };

      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    }
  }
}

window.onload = loadTasks;

document.getElementById("task-input").addEventListener("input", saveTasks);
document.getElementById("task-list").addEventListener("input", saveTasks);
