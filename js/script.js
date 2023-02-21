{
    let tasks = [];
    let hideDoneTask = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, {
            content: newTaskContent
        }];
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const toggleDoneButtons = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };


    const renderHtmlTasks = () => {
        const taskToHtml = task => `
                <li class="
                    tasks__item${task.done && hideDoneTask ? " tasks__item--hidden" : ""} js-tasks
                ">
                    <button class="tasks__button tasks__button--done js-done"> 
                        ${task.done ? " ✓ " : ""}
                    </button>
                    <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                        ${task.content}
                     </span>
                    <button class="tasks__button tasks__button--remove js-remove">
                    🗑️
                    </button>
                </li>
            `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHtml).join("");
    };
    const renderButton = () => {
        const buttonElements = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonElements.innerHTML = "";
            return;
        }

        buttonElements.innerHTML = `
        <button 
            class="buttons__button js-toggleHideDoneTasks"
            >
            ${hideDoneTask ? "Wyświetl" : "Ukryj"} ukonczone
        </button>
        <button
            class="buttons__button js-markAllDone"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}
        >
        Zakończ wszystkie
        </button>
    `;
    };

    const bindButtonEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        } 

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTask);
        }
    };

    const render = () => {
        renderHtmlTasks();
        bindEvents();
        toggleDoneButtons();
        
        renderButton();
        bindButtonEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}