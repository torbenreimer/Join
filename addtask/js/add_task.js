let tasks = [];
let prios = [];
let subTask = [];
let assignTo = [];
let category;
let color;
let categories = [{}];
let currentPrio;
let currentId;
let currentStatusTemp;

load();

/**
 * gives the variable currentId a new Value
 */
function getTasksId() {
  currentId = Math.random() + tasks.length;
}

/**
 * disable a date from the past
 */
function disableDateinput() {
  let today = new Date().toISOString().split("T")[0];
  document.getElementsByName("input-date")[0].setAttribute("min", today);
}

/**
 * disable a date from the past for the template
 */
function disableDateInputTemplate() {
  let today = new Date().toISOString().split("T")[0];
  document.getElementsByName("inputDateTemplate")[0].setAttribute("min", today);
}

/**
 * checks if the prio exist if not pushes it into the array prios
 * @param {prio}  prio is the value from the currentprio that was clicked
 */
function addingPrio(prio) {
  if (prios.includes(prio)) {
    checkPrio(prio);
  } else {
    prios.push(prio);
    checkPrio(prio);
  }
}

/**
 * checks if the currentprio = the newprio if that than takes away the class
 * @param {newprio} newprio is the value from the currentprio that was clicked
 */
function checkPrio(newprio) {
  for (let i = 0; i < prios.length; i++) {
    let prio = prios[i];
    if (prio != newprio || currentPrio == newprio) {
      takePrio(prio);
    } else {
      getPrio(prio);
    }
  }
  currentPrio = newprio;
}

/**
 * gives the prio a class to highlight it
 * @param {prio} prio is the value from the currentprio
 */
function getPrio(prio) {
  document.getElementById(prio).classList.add(prio);
  document.getElementById(
    `${prio}-img`
  ).src = `../assets/img/${prio}-white.svg`;
}

/**
 * takes the prio a class to highlight it
 * @param {prio} prio is the value from the currentprio
 */
function takePrio(prio) {
  document.getElementById(prio).classList.remove(prio);
  document.getElementById(`${prio}-img`).src = `../assets/img/prio-${prio}.svg`;
}

/**
 * checks if category or currentprio have a value if not error
 */
function mustFields() {
  if (!category) {
    ifCategoryUndefined();
  } else if (!currentPrio) {
    ifPrioUndefined();
  } else {
    getValuesFromInputs();
  }
}

function ifCategoryUndefined() {
  return (
    document.getElementById("categoryInput").classList.add("error"),
    setTimeout(() => {
      document.getElementById("categoryInput").classList.remove("error");
    }, 1500)
  );
}

function ifPrioUndefined() {
  return (
    document.getElementById("prios").classList.add("error"),
    setTimeout(() => {
      document.getElementById("prios").classList.remove("error");
    }, 1500)
  );
}

/**
 * gets the values from the inputs to create a task
 */
function getValuesFromInputs() {
  let title = document.getElementById("input-title");
  let description = document.getElementById("input-description");
  let date = document.getElementById("input-date");
  createTask(title, description, date);
}

/**
 * create a json that has different arrays to create a task
 * @param {title} title is the value from the input title and gives the title for the task
 * @param {description} description is the value from the input description and gives the description for the task
 * @param {date} date is the value from the input date and gives the date for the task
 */
function createTask(title, description, date) {
  tasks.push({
    title: title.value,
    description: description.value,
    date: date.value,
    prio: currentPrio,
    category: category,
    color: color,
    subTask: subTask,
    contact: assignTo,
    status: "to do",
    subTaskFinish: 0,
    id: currentId,
  });
  addTasks();
  linkToBoard();
  title.value = "";
  description.value = "";
  date.value = "";
}

/**
 * link to board after successfully added a task
 */
function linkToBoard() {
  disbaleButtons();
  document.getElementById("addedToBoard").innerHTML = linkToBoardHtml();
  setTimeout(() => {
    window.location.href = "../board/board.html";
  }, 2000);
}

/**
 * disable buttons
 */
function disbaleButtons() {
  let create = document.getElementById("create");
  create.disabled = true;
  let clear = document.getElementById("clear");
  clear.disabled = true;
}

/**
 *add a new subtask
 */
function addNewSubtask() {
  document.getElementById("addNewSubtask").innerHTML = addNewSubtaskHtml();
}

/**
 * clear subtask and calls a function to changes the html
 */
function clearSubtask() {
  document.getElementById("addNewSubtask").innerHTML = clearSubtaskHtml();
}

/**
 * creates a new Subtask and calls a function to change the html
 */
function createNewSubtask() {
  let subtasks = document.getElementById("new-subTask");
  if (subtasks.selectionEnd >= 2) {
    let newSubtask = document.getElementById("new-subTask").value;
    subTask.push(newSubtask);
    document.getElementById("newSubtask").innerHTML +=
      createNewSubtaskHtml(newSubtask);
    clearSubtask();
  }
}

/**
 * deletes a subtask
 * @param {value} value is the string from the subtask
 * @param {subtask} subtask is the json that will deleted
 */
function takeSubtask(value, subtask) {
  if (!subtask.checked) {
    let deleteSubtask = tasks.findIndex((s) => s.subtask == subtask);
    subTask.splice(deleteSubtask, 1);
  } else {
    subTask.push(value);
  }
}

/**
 * clears the page
 */
function clearAll() {
  window.location.href = "add_task.html";
}

/**
 * loads the json from the backend and give it to a variable
 */
function load() {
  let contactsASText = backend.getItem("contactsASText");

  if (contactsASText) {
    contacts = JSON.parse(contactsASText);
  }
}

/**
 * loads the json from the backend and give it to a variable
 */
async function loadTasks() {
  await init();
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  categories = JSON.parse(backend.getItem("categories")) || [];
  getTasksId();
}

/**
 * add tasks to the backend
 */
async function addTasks() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}

/**
 * checks fields that must have a value from the template
 */
async function mustFieldsTemplate() {
  if (!category) {
    ifCategoryUndefined();
  } else if (!currentPrio) {
    ifPrioUndefined();
  } else {
    getValuesFromInputsTemplate();
  }
}

/**
 * get the values from the input fields from the template
 */
function getValuesFromInputsTemplate() {
  let templateTitle = document.getElementById("inputTitleTemplate");
  let templateDescription = document.getElementById("inputDescriptionTemplate");
  let templateDate = document.getElementById("inputDateTemplate");
  createTaskTemplate(templateTitle, templateDescription, templateDate);
}

/**
 * create a json that has different arrays to create a task
 * @param {title} title is the value from the input title and gives the title for the task
 * @param {description} description is the value from the input description and gives the description for the task
 * @param {date} date is the value from the input date and gives the date for the task
 */
async function createTaskTemplate(title, description, date) {
  getTasksId();
  tasks.push({
    title: title.value,
    description: description.value,
    date: date.value,
    prio: currentPrio,
    category: category,
    color: color,
    subTask: subTask,
    contact: assignTo,
    status: currentStatus,
    subTaskFinish: 0,
    id: currentId,
  });
  addTasks();
  linkToBoard();
  title.value = "";
  description.value = "";
  date.value = "";
}
