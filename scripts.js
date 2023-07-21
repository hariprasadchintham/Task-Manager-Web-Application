// Get references to the required elements
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const taskList = document.getElementById("taskList");
const allTasksBtn = document.getElementById("allTasksBtn");
const completedTasksBtn = document.getElementById("completedTasksBtn");
const incompleteTasksBtn = document.getElementById("incompleteTasksBtn");

// Define the tasks array to store task objects
let tasks = [];

// Function to render tasks in the list
function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task.task_text}</span>
            <span class="due-date">${task.due_date}</span>
            <button data-index="${index}" class="complete-btn">Complete</button>
            <button data-index="${index}" class="delete-btn">Delete</button>
        `;
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskList.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    if (taskText === "" || dueDate === "") {
        alert("Please enter both a task and a due date.");
        return;
    }

    const newTask = {
        task_text: taskText,
        due_date: dueDate,
        completed: false
    };

    tasks.push(newTask);
    renderTasks(tasks);
    saveTasksToLocalStorage();
    taskInput.value = "";
    dueDateInput.value = "";
}

// Function to mark a task as completed
function toggleTaskCompletion() {
    const index = this.getAttribute("data-index");
    tasks[index].completed = !tasks[index].completed;
    renderTasks(tasks);
    saveTasksToLocalStorage();
}

// Function to delete a task
function deleteTask() {
    const index = this.getAttribute("data-index");
    tasks.splice(index, 1);
    renderTasks(tasks);
    saveTasksToLocalStorage();
}

// Function to filter tasks based on completion status
function filterTasksByCompletion(completionStatus) {
    const filteredTasks = tasks.filter(task => task.completed === completionStatus);
    renderTasks(filteredTasks);
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = storedTasks || [];
    renderTasks(tasks);
}

// Event listeners for user interactions
document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("taskList").addEventListener("click", function(event) {
    if (event.target.classList.contains("complete-btn")) {
        toggleTaskCompletion.call(event.target);
    } else if (event.target.classList.contains("delete-btn")) {
        deleteTask.call(event.target);
    }
});
allTasksBtn.addEventListener("click", () => renderTasks(tasks));
completedTasksBtn.addEventListener("click", () => filterTasksByCompletion(true));
incompleteTasksBtn.addEventListener("click", () => filterTasksByCompletion(false));

// Load tasks from local storage on page load
loadTasksFromLocalStorage();
// scripts.js (for Todo list page)
