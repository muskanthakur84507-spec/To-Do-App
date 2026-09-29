const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    const pending = tasks.filter(task => !task.completed);
    const completed = tasks.filter(task => task.completed);

    pendingCount.textContent = `${pending.length} pending`;
    completedCount.textContent = `${completed.length} completed`;

    if (pending.length === 0) {
        pendingTasks.innerHTML =
            `<p class="empty-message">No pending tasks 🎉</p>`;
    }

    if (completed.length === 0) {
        completedTasks.innerHTML =
            `<p class="empty-message">No completed tasks yet.</p>`;
    }

    pending.forEach(task => createTaskElement(task, pendingTasks));
    completed.forEach(task => createTaskElement(task, completedTasks));
}

function createTaskElement(task, container) {

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    if (task.completed) {
        taskDiv.classList.add("completed");
    }

    taskDiv.innerHTML = `
        <div class="task-text">${task.text}</div>

        <div class="task-time">
            Added: ${task.createdAt}
            ${task.completedAt ? `<br>Completed: ${task.completedAt}` : ""}
        </div>

        <div class="task-buttons">

            <button class="complete-btn">
                ${task.completed ? "↩️ Undo" : "✅ Complete"}
            </button>

            <button class="edit-btn">✏️ Edit</button>

            <button class="delete-btn">🗑️ Delete</button>

        </div>
    `;

    taskDiv.querySelector(".complete-btn").addEventListener("click", () => {
        task.completed = !task.completed;

        if (task.completed) {
            task.completedAt = getTime();
        } else {
            task.completedAt = null;
        }

        saveTasks();
        renderTasks();
    });

    taskDiv.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit your task:", task.text);

        if (newText !== null && newText.trim() !==