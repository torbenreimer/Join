let contactChar;
let currentDraggedElement;
let currentStatus;
let currentTask;
let contactColor;
let subTasksFinish;

/**
 * render all tasks
 */
async function renderTasks() {
  await init();
  categories = JSON.parse(backend.getItem("categories")) || [];
  for (let i = 0; i < tasks.length; i++) {
    currentTask = tasks[i];
    document.getElementById(`${currentTask["status"]}`).innerHTML +=
      taskCardHtml();
    renderArrays();
  }
}

/**
 * let the tasktemplate slide in
 */
function showAddTaskTemplate() {
  document.getElementById("templateContainer").classList.remove("dp-none");
  document.getElementById("body").style = "overflow-y: hidden;";
}

/**
 * render the arrays
 */
function renderArrays() {
  checkSubtask();
  checkAssignTo();
}

/**
 * checks the subtaskcontainer
 */
function checkSubtask() {
  for (let j = 0; j < currentTask["subTask"].length; j++) {
    let calcWidth =
      currentTask["subTaskFinish"] / currentTask["subTask"].length * 100;
    document.getElementById(`subtaskContainer${currentTask["id"]}`).innerHTML =
      subtaskHtml(calcWidth);
  }
}

/**
 * checks  if assignTo
 */
function checkAssignTo() {
  if (currentTask["contact"].length == 0) {
    document.getElementById(`contactContainer${currentTask["id"]}`).innerHTML =
      "";
  } else {
    if (currentTask["contact"].length <= 3) {
      for (let j = 0; j < currentTask["contact"].length; j++) {
        getCharAtNull(j);
        getContactColor(j);
        document.getElementById(
          `contactContainer${currentTask["id"]}`
        ).innerHTML += assignToHtml();
      }
    } else {
      assignToBigger3();
    }
  }
}

/**
 * if assign to bigger 3 than display something other
 */
function assignToBigger3() {
  for (let j = 0; j < 2; j++) {
    getCharAtNull(j);
    getContactColor(j);
    document.getElementById(`contactContainer${currentTask["id"]}`).innerHTML +=
      assignToBigger3Html(j);
  }
  document.getElementById(
    `contactContainer${currentTask["id"]}`
  ).innerHTML += `<p class="contact" style="background-color: #2A3647">+${currentTask["contact"].length - 2
  }</p>`;
}

/**
 * finds in the contact array, 
 * @param {j} j is the current user
 */
function getContactColor(j) {
  let contact = contacts.filter(
    (c) => c.firstName == currentTask["contact"][j]["firstName"]
  );
  contactColor = contact[0]["background"];
}

/**
 * only displays the char at null
 * @param {j} j is the current user
 */
function getCharAtNull(j) {
  let firstName = currentTask["contact"][j]["firstName"];
  let surname = currentTask["contact"][j]["surname"];
  let firstNameChar = firstName.charAt(0).toUpperCase();
  let surnameChar = surname.charAt(0).toUpperCase();
  contactChar = firstNameChar + surnameChar;
}

/**
 * search the tasks id and opens the right card
 * @param {id} id is the id from the currentTask
 */
function openCard(id) {
  document.getElementById("taskCardContainer").classList.remove("dnone");
  currentTask = tasks.find((t) => t.id == id);
  document.getElementById("openTaskCard").innerHTML = openCardHtml();
  getSubtaskForOpenedCard(id);
  for (let i = 0; i < currentTask["contact"].length; i++) {
    getCharAtNull(i);
    getContactColor(i);
    document.getElementById(`assingToCard${id}`).innerHTML +=
      openCardAssingToHtml(i);
  }
}

/**
 * close the card
 */
function closeCard() {
  document.getElementById("taskCardContainer").classList.add("dnone");
}

/**
 * 
 * @param {id} id currentTask id
 */
function getSubtaskForOpenedCard(id) {
  if (currentTask["subTask"].length == 0) {
    document.getElementById(`openedSubtaskContainer${id}`).innerHTML = "";
  } else {
    for (let j = 0; j < currentTask["subTask"].length; j++) {
      let currentTaskId = currentTask["id"] + j;
      document.getElementById(`openedSubtaskContainer${id}`).innerHTML +=
        openCardSubtaskToHtml(currentTaskId, j);
      getSubtaskChecked(currentTaskId, j);
    }
  }
}

function getSubtaskChecked(currentTaskId, j) {
  if (subTasksFinish.length == 0) {
    document.getElementById(currentTaskId).innerHTML = subtaskAddHtml(
      currentTaskId,
      j
    );
  }
  if (subTasksFinish.includes(`${currentTaskId}`)) {
    document.getElementById(currentTaskId).innerHTML = subtaskFinishHtml(
      currentTaskId,
      j
    );
  } else {
    document.getElementById(currentTaskId).innerHTML = subtaskAddHtml(
      currentTaskId,
      j
    ); 
  }
}

async function deleteTask(id) {
  currentTaskIndex = tasks.findIndex((t) => t.id == id);
  tasks.splice(currentTaskIndex, 1);
  await addTasks();
  updateHtml();
  closeCard();
}

async function addSubtaskToFinish(id, j) {
  let subTaskFinish = currentTask["subTaskFinish"] + 1;
  currentTask["subTaskFinish"] = subTaskFinish;
  await backend.setItem("tasks", JSON.stringify(tasks));
  updateHtml();
  subTasksFinish.push(id);
  await backend.setItem("subTasks", JSON.stringify(subTasksFinish));
  closeCard();
}

async function addSubtaskToDelete(id, j) {
  let subTaskFinish = currentTask["subTaskFinish"] - 1;
  currentTask["subTaskFinish"] = subTaskFinish;
  await backend.setItem("tasks", JSON.stringify(tasks));
  updateHtml();
  let deleteId = subTasksFinish.findIndex((s) => s == id);
  subTasksFinish.splice(deleteId, 1);
  await backend.setItem("subTasks", JSON.stringify(subTasksFinish));
  closeCard();
}

function toggleMoveMenu(id) {
  if (
    document
      .getElementById(`task-card-move-menu-${id}`)
      .classList.contains("d-none")
  ) {
    document
      .getElementById(`task-card-move-menu-${id}`)
      .classList.remove("d-none");
    document
      .getElementById(`task-card-move-menu-icon-${id}`)
      .setAttribute("src", "../assets/img/close-window-32.png");
    let status = tasks.find((t) => t.id == id)["status"].replace(/\s/g, "");
    document
      .getElementById(`${status}-move-menu-item-${id}`)
      .classList.add("d-none");
  } else {
    document
      .getElementById(`task-card-move-menu-${id}`)
      .classList.add("d-none");
    document
      .getElementById(`task-card-move-menu-icon-${id}`)
      .setAttribute("src", "../assetsimg/arrow-59-32.png");
  }
}