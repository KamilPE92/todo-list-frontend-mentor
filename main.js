// TODO
// !git lokalnie
// todoCounter
// todoLocal Storage
// todoDark Mode (Separate File)
// todoDrag & Drop?
// todoResponsive RWD
// todo Make notes with conclusions
// todoUnicorn film

// todoGithub

// Capture HTML Elements
const addBTN = document.querySelector("#ADD_BTN");
const mainInput = document.querySelector(".main-input");
const counterBTN = document.querySelector("#COUNTER");
const form = document.querySelector("#FORM");
const list = document.querySelector("#LIST");
const TEMPLATEtask = document.querySelector("#CONTENT");
//Array
let task_arr = [];
//Filters BTN
const filters = document.querySelector(".filter");
const completedBTN = document.querySelector("#COMPLETED");
const activeBTN = document.querySelector("#ACTIVE");
const allBTN = document.querySelector("#ALL");
const clearBTN = document.querySelector("#CLEAR");

// xxx.addEventListener("click", (e) => {
//     console.log("1");
// });

//1 Crete Fn createTask and 2.1 push task_obj to task_arr 2.2 console.log()
function HelperCreareTask() {
    //1 Create object with task
    const task_obj = {
        taskText: mainInput.value,
        id: Date.now().toString(),
        done: false,
    };

    // 3 render task function based on template tag

    task_arr.push(task_obj);
    console.log(task_arr);
    renderTask(task_obj.id, task_obj.taskText, task_obj.done);
}

//2 add function and call createTask
form.addEventListener("submit", function (e) {
    e.preventDefault();
    listName = mainInput.value;
    // 3 Check value of main input is empty?
    if (listName === "") {
        alert("Please type something");
        return;
    }
    HelperCreareTask();
});

function renderTask() {
    clearElement(list);
    // 3 render task function based on template tag
    task_arr.forEach((task_obj) => {
        const singleTask = document.importNode(TEMPLATEtask.content, true);
        const checkbox = singleTask.querySelector("input");

        checkbox.id = task_obj.id;
        checkbox.checked = task_obj.done;

        const texTask_span = singleTask.querySelector(".item");
        texTask_span.innerHTML = `${task_obj.taskText}`;

        const exBTN = singleTask.querySelector("img");
        exBTN.id = task_obj.id;
        if (checkbox.checked) {
            texTask_span.classList.toggle("completed");
        }
        list.appendChild(singleTask);
    });

    //Prevent double task
    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    // end of renderTask
}
function taskDelete(e) {
    if (e.target.tagName === "IMG") {
        task_arr = task_arr.filter((task_obj) => {
            return task_obj.id !== e.target.id;
        });
    }
    //Render
    renderTask();
    // end of taskDelete
}

function taskCheck(e) {
    const target = e.target;

    if (target.tagName.toLowerCase() === "input") {
        const checkedTask = task_arr.find(
            (task_obj) => task_obj.id === target.id // CHECK //!ID **OF CHECKBOX Where user click?
        );

        checkedTask.done = target.checked; //CHECKBOX.CHECKED = TRUE OR FALSE
    }
    renderTask();
    // end of taskCheck
}

function clearCompleted() {
    const completed_arr = task_arr.filter((task_obj) => {
        return task_obj.done !== true;
    });
    task_arr = completed_arr;
    renderTask();
    // end of clearCompleted
}

function filtersHelper(e) {
    const target = e.target; //??????????
    if (
        target.id === "ALL" ||
        target.id === "ACTIVE" ||
        target.id === "COMPLETED"
    ) {
        list.innerHTML = "";
    }
    task_arr.map((task_obj) => {
        if (target === completedBTN) {
            completedBTN.classList.add("active");
            activeBTN.classList.remove("active");
            allBTN.classList.remove("active");
            if (task_obj.done) {
                const singleTask = document.importNode(
                    TEMPLATEtask.content,
                    true
                );
                const checkbox = singleTask.querySelector("input");

                checkbox.id = task_obj.id;
                checkbox.checked = task_obj.done;

                const texTask_span = singleTask.querySelector(".item");
                texTask_span.innerHTML = `${task_obj.taskText}`;

                const exBTN = singleTask.querySelector("img");
                exBTN.id = task_obj.id;
                if (checkbox.checked) {
                    texTask_span.classList.toggle("completed");
                }
                list.appendChild(singleTask);
            }
        }
        if (target === activeBTN) {
            activeBTN.classList.add("active");
            completedBTN.classList.remove("active");
            if (task_obj.done === false) {
                const singleTask = document.importNode(
                    TEMPLATEtask.content,
                    true
                );
                const checkbox = singleTask.querySelector("input");

                checkbox.id = task_obj.id;
                checkbox.checked = task_obj.done;

                const texTask_span = singleTask.querySelector(".item");
                texTask_span.innerHTML = `${task_obj.taskText}`;

                const exBTN = singleTask.querySelector("img");
                exBTN.id = task_obj.id;
                if (checkbox.checked) {
                    texTask_span.classList.toggle("completed");
                }
                list.appendChild(singleTask);
            }
            // end of second if
        }
        if (target === allBTN) {
            completedBTN.classList.remove("active");
            activeBTN.classList.remove("active");
            allBTN.classList.add("active");
            renderTask();

            // end of third if
        }
    });
}

// addEventListeners

list.addEventListener("click", taskDelete);
list.addEventListener("click", taskCheck);
clearBTN.addEventListener("click", clearCompleted);
filters.addEventListener("click", filtersHelper);
