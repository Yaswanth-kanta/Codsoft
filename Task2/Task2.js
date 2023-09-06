const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    const task = {
        text: taskText,
        id: Date.now(),
    };
    const listItem = createTaskElement(task);
    taskList.appendChild(listItem);
    saveTask(task);
    taskInput.value = '';
}
function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${task.text}</span>
        <span class="edit" onclick="editTask(${task.id})">Edit</span>
        <span class="delete" onclick="deleteTask(${task.id})">Delete</span>
    `;
    listItem.dataset.id = task.id;
    return listItem;
}
function saveTask(task) {
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}
function deleteTask(id) {
    const listItem = document.querySelector(`[data-id="${id}"]`);
    taskList.removeChild(listItem);
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function editTask(id) {
    const listItem = document.querySelector(`[data-id="${id}"]`);
    const taskTextElement = listItem.querySelector('span');
    const currentText = taskTextElement.textContent;
    const newText = prompt('Edit task:', currentText);
    if (newText === null) return;
    taskTextElement.textContent = newText;
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
            task.text = newText;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach((task) => {
        const listItem = createTaskElement(task);
        taskList.appendChild(listItem);
    });
}
addTaskButton.addEventListener('click', addTask);
window.addEventListener('load', loadTasks);