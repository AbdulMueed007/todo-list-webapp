let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showMessage(msg) {
  alert(msg); // Optional: Replace with toast if desired
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
      <span style="flex: 1; margin-left: 10px; ${task.completed ? 'text-decoration: line-through; color: gray;' : ''}">
        ${task.text}
      </span>
      <div class="task-buttons">
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    input.value = '';
    saveTasks();
    renderTasks();
    showMessage('Task added successfully!');
  }
}

function editTask(index) {
  const newTask = prompt('Edit task:', tasks[index].text);
  if (newTask !== null && newTask.trim() !== '') {
    tasks[index].text = newTask.trim();
    saveTasks();
    renderTasks();
    showMessage('Task edited successfully!');
  }
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    showMessage('Task deleted successfully!');
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Allow pressing Enter to add task
document.getElementById('taskInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Dark mode toggle with icon switch
const darkBtn = document.getElementById('toggleDarkMode');
darkBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark');
  darkBtn.textContent = document.body.classList.contains('dark') ? ' Light Mode' : ' Dark Mode';
});

// Initial render
renderTasks();
