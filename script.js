document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Clear existing list before rendering
    todoList.innerHTML = '';
    tasks.forEach(task => renderTasks(task));

    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if(taskText === "") return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        
        tasks.push(newTask);
        // renderTasks(newTask); // Add this line to render new task
        saveTasks();
        renderTasks(newTask); // Add this line to render new task
        todoInput.value = "";
    });

    function renderTasks(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if(task.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `<span> ${task.text} </span>
        <button class="delete-btn">Delete</button>`; // Fixed innerHTML
        
        li.addEventListener('click',  (e) => {
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle("completed", task.completed);

            saveTasks();
        });

        li.querySelector('button').addEventListener('click' , (e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up to the li element
            const taskId = li.getAttribute("data-id");
            tasks = tasks.filter(task => task.id != taskId);
            saveTasks();
            li.remove(); // Remove the li element from the DOM
        })
       

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});