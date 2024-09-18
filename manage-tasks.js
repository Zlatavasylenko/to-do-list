// Додаємо нове завдання до списку
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    taskInput.value = "";
    saveTasks();
  }
}

// Створюємо елемент завдання з обробниками подій drag-and-drop
function createTaskItem(text) {
  const taskItem = document.createElement("li");
  taskItem.textContent = text;
  addDragAndDropHandlers(taskItem); // Додаємо обробники подій

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "button-delete-task";
  deleteButton.onclick = function () {
    taskItem.parentNode.removeChild(taskItem);
    saveTasks();
  };

  taskItem.appendChild(deleteButton);
  return taskItem;
}

// Додаємо обробники подій drag-and-drop
function addDragAndDropHandlers(taskItem) {
  taskItem.draggable = true;
  taskItem.ondragstart = handleDragStart;
  taskItem.ondragover = handleDragOver;
  taskItem.ondrop = handleDrop;
}

// Обробник початку перетягування
function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.textContent.replace("Delete", "").trim());
  event.target.classList.add("dragging");
}

// Обробник перебування над елементом під час перетягування
function handleDragOver(event) {
  event.preventDefault();
  const dragging = document.querySelector(".dragging");
  if (event.target.tagName === "LI" && event.target !== dragging) {
    const taskList = document.getElementById("task-list");
    const rect = event.target.getBoundingClientRect();
    const next = (event.clientY - rect.top) > rect.height / 2;
    taskList.insertBefore(dragging, next ? event.target.nextSibling : event.target);
  }
}

// Обробник події drop
function handleDrop(event) {
  event.preventDefault();
  document.querySelector(".dragging").classList.remove("dragging");
  saveTasks();
}

// Очищення списку завдань
function clearTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

const clearButton = document.createElement("button");
clearButton.textContent = "Delete all tasks";
clearButton.className = "button-delete";
clearButton.onclick = clearTasks;
document.body.appendChild(clearButton);

// Збереження завдань у LocalStorage
function saveTasks() {
  const taskList = document.getElementById("task-list");
  const tasks = [];
  for (let i = 0; i < taskList.children.length; i++) {
    tasks.push(taskList.children[i].textContent.replace("Delete", "").trim());
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Завантаження завдань з LocalStorage
function loadTasks() {
  const taskList = document.getElementById("task-list");
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    for (let i = 0; i < tasks.length; i++) {
      const taskItem = createTaskItem(tasks[i]); // Використовуємо createTaskItem для додавання обробників
      taskList.appendChild(taskItem);
    }
  }
}

// Викликаємо завантаження завдань при завантаженні сторінки
window.onload = loadTasks;

