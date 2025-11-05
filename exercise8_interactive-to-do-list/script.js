document.getElementById("addTaskButton").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    
    const listItem = document.createElement("li");

    const text = taskInput.value.trim();
    if (text !== "") {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("taskCheckbox");

        const span = document.createElement("span");
        span.textContent = text;

        checkbox.addEventListener("change", function() {
            // Toggle a class on the <li> so we can style the whole box
            listItem.classList.toggle("completed", checkbox.checked);
            // Also add a class to the text span for any text-specific styles (optional)
            span.classList.toggle("completed-text", checkbox.checked);
            updateCounters();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", function() {
            taskList.removeChild(listItem);
            updateCounters();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        taskInput.value = "";
        updateCounters();
    }
});

function updateCounters() {
    const tasks = document.querySelectorAll("#taskList li");
    const completedTasks = document.querySelectorAll("#taskList li .taskCheckbox:checked");

    document.getElementById("completedTasks").textContent = completedTasks.length;
    document.getElementById("remainingTasks").textContent = tasks.length - completedTasks.length;
}