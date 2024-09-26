document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('saveTasksButton').addEventListener('click', saveTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <input type="checkbox" onchange="toggleTask(this)">
            <span>${taskText}</span>
            <button onclick="removeTask(this)">Удалить</button>
        `;
        
        taskList.appendChild(listItem);
        taskInput.value = ''; // Очистка поля ввода
    }
}

function toggleTask(checkbox) {
    const taskText = checkbox.nextSibling;
    taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
}

function removeTask(button) {
    const listItem = button.parentElement;
    listItem.remove();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    let tasks = [];

    for (let listItem of taskList.children) {
        const taskText = listItem.querySelector('span').innerText;
        const isChecked = listItem.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isChecked });
    }

    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
    URL.revokeObjectURL(url);
}
