// TODO
// todoDark Mode (Separate File)
// todoDrag & Drop?
// todoResponsive RWD
// todo Make notes with conclusions

// todoGithub

/*************************
 * CAPTURE HTML ELEMENTS *
 *************************/

const addBTN = document.querySelector("#ADD_BTN");
const mainInput = document.querySelector(".main-input");
const counterBTN = document.querySelector("#COUNTER");
const form = document.querySelector("#FORM");
const list = document.querySelector("#LIST");
const TEMPLATEtask = document.querySelector("#CONTENT");
//Array
let task_arr = JSON.parse(localStorage.getItem("TODOAPP")) || []; // Convert localStorage string to normal JS OR empty arr

//Filters BTN
const filters = document.querySelector(".filters");
const completedBTN = document.querySelector("#COMPLETED");
const activeBTN = document.querySelector("#ACTIVE");
const allBTN = document.querySelector("#ALL");
const clearBTN = document.querySelector("#CLEAR");

/**************************************************
 * FUNCTIONS FOR CREATING & RENDERING ACTUAL TASK *
 **************************************************/

//1. Crete Fn createTask and 2.1 push task_obj to task_arr 2.2 console.log()
function HelperCreateTask() {
    //2. Create object with task
    const task_obj = {
        taskText: mainInput.value,
        id: Date.now().toString(),
        done: false,
    };

    // 3. Render task function based on template tag

    task_arr.push(task_obj);
    console.log(task_arr);
    renderTask(task_obj.id, task_obj.taskText, task_obj.done); // Put object Id, txt and status to render FN
}

//3. Add function and call createTask
form.addEventListener("submit", function (e) {
    e.preventDefault();
    listName = mainInput.value;
    // 3.1 Check value of main input is empty?
    if (listName === "") {
        alert("Please type something");
        return;
    }
    HelperCreateTask();
    taskCounter();
    setLocalStorage();
});

function renderTask() {
    // 4.1 Prevent double render tasks and take listUl as argument
    clearElement(list);
    // 4 render task function based on template tag
    //  ! 4.2 Iteratee through Object
    task_arr.forEach((task_obj) => {
        const singleTask = document.importNode(TEMPLATEtask.content, true);
        const checkbox = singleTask.querySelector("input");

        checkbox.id = task_obj.id; // is the same
        checkbox.checked = task_obj.done; //Change false to true

        const textTask_span = singleTask.querySelector(".item");
        textTask_span.innerHTML = `${task_obj.taskText}`;

        const exBTN = singleTask.querySelector("img");
        exBTN.id = task_obj.id;
        if (checkbox.checked) {
            textTask_span.classList.toggle("completed");
        }
        list.appendChild(singleTask);
    });

    /********************************************
     * FUNCTIONS FOR INDIVIDUAL FEATURES TODOPP *
     ********************************************/

    //Prevent double task

    function clearElement(element) {
        // 1. Classic while loop delete first child
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    // end of renderTask
}
function taskDelete(e) {
    if (e.target.tagName === "IMG") {
        // !1. Filter Method CHANGE ORIGINAL ARR
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
            (task_obj) => task_obj.id === target.id // CHECK //!ID **OF CHECKBOX user click? ID must be the same in e.target and object id: [ some_obj.id]
        );

        checkedTask.done = target.checked; //CHECKBOX.CHECKED = TRUE OR FALSE
    }
    // Re-render entire list
    renderTask();
    taskCounter();
    setLocalStorage();
    // end of taskCheck
}

function clearCompleted() {
    // !Filter method is great to delete stuff
    const completed_arr = task_arr.filter((task_obj) => {
        return task_obj.done !== true; //! !== check the type end value
    });
    task_arr = completed_arr; // assign completed_arr to task_arr(main arr for this project)

    // Re-render entire list

    renderTask();
    taskCounter();
    setLocalStorage();

    // end of clearCompleted
}

function filtersHelper(e) {
    const target = e.target;
    // 1. When button is clicked return empty MAIN list
    if (
        target.id === "ALL" ||
        target.id === "ACTIVE" ||
        target.id === "COMPLETED"
    ) {
        list.innerHTML = "";
    }
    // !MAP RETURNS NEW ARR WITHOUT MODIFICATIONS ORIGINAL ARR!!!
    task_arr.map((task_obj) => {
        // 2.1 Which btn is clicked?
        if (target === completedBTN) {
            completedBTN.classList.add("active");
            activeBTN.classList.remove("active");
            allBTN.classList.remove("active");
            // !2.2 Condition and RECREATE NEW LIST based on template tag
            if (task_obj.done) {
                const singleTask = document.importNode(
                    TEMPLATEtask.content,
                    true
                );
                const checkbox = singleTask.querySelector("input");

                checkbox.id = task_obj.id;
                checkbox.checked = task_obj.done;

                const textTask_span = singleTask.querySelector(".item");
                textTask_span.innerHTML = `${task_obj.taskText}`;

                const exBTN = singleTask.querySelector("img");
                exBTN.id = task_obj.id;
                if (checkbox.checked) {
                    textTask_span.classList.toggle("completed");
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

                const textTask_span = singleTask.querySelector(".item");
                textTask_span.innerHTML = `${task_obj.taskText}`;

                const exBTN = singleTask.querySelector("img");
                exBTN.id = task_obj.id;
                if (checkbox.checked) {
                    textTask_span.classList.toggle("completed");
                }
                list.appendChild(singleTask);
            }
            // end of second if
        }
        if (target === allBTN) {
            completedBTN.classList.remove("active");
            activeBTN.classList.remove("active");
            allBTN.classList.add("active");
            //  2.3 Re-render original list
            renderTask();

            // end of third if
        }
    });
}

function taskCounter() {
    const counter_span = document.querySelector("#COUNTER");
    // Filter method return taskNotCompleted_arr
    const taskNotCompleted_arr = task_arr.filter((task_obj) => {
        return !task_obj.done;
    });
    counter = taskNotCompleted_arr.length; //counter === length arr

    if (counter === 1) {
        counter_span.innerHTML = `${counter} item left`;
    } else {
        counter_span.innerHTML = `${counter} items left`;
    }
}

function setLocalStorage() {
    localStorage.setItem("TODOAPP", JSON.stringify(task_arr)); //Convert normal arr to string Local Storage accept strings only
}

// setLocalStorage end0

//Render Task for 1st time ever
renderTask();
taskCounter();

/*********************
 * EVENTLISTENERS *
 *********************/

list.addEventListener("click", taskDelete);
list.addEventListener("click", taskCheck);
clearBTN.addEventListener("click", clearCompleted);
filters.addEventListener("click", filtersHelper);
