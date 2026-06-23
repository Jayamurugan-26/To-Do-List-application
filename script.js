let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats(){

    document.getElementById("totalTasks").innerText =
    "Total: " + tasks.length;

    document.getElementById("completedTasks").innerText =
    "Completed: " + tasks.filter(task => task.completed).length;
}

function renderTasks(filter = "all"){

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(filter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");
        li.className = "task";

        li.innerHTML = `
        <div class="task-left">
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})">

            <div>
             <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>
            <br>
            <small>📅 ${task.dueDate}</small>
            </div>
          </div>

        <div class="task-buttons">
            <button class="edit-btn"
            onclick="editTask(${index})">
            Edit
            </button>

            <button class="delete-btn"
            onclick="deleteTask(${index})">
            Delete
            </button>
        </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask(){

    const input = document.getElementById("taskInput");

    const text = input.value.trim();

    if(text === ""){
        alert("Enter a task");
        return;
    }

    const dueDate =
    prompt("Enter Due Date (DD-MM-YYYY)");

    tasks.push({
        text:text,
        completed:false,
        dueDate:dueDate || "No Date"
});

    saveTasks();
    renderTasks();

    input.value = "";
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function editTask(index){

    const newTask =
    prompt("Edit Task", tasks[index].text);

    if(newTask !== null && newTask.trim() !== ""){

        tasks[index].text = newTask;

        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();
        renderTasks();
    }
}

function searchTasks(){

    const searchValue =
    document.getElementById("searchInput")
    .value.toLowerCase();

    const taskItems =
    document.querySelectorAll("#taskList li");

    taskItems.forEach(item => {

        const text =
        item.innerText.toLowerCase();

        item.style.display =
        text.includes(searchValue)
        ? "flex"
        : "none";
    });
}
function clearCompleted(){

    tasks =
    tasks.filter(task => !task.completed);

    saveTasks();
    renderTasks(currentFilter);
}