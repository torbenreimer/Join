let assignUser = [];
let rightPrio;
let currentIdEdit;

/**
 * opens the card to edit 
 * @param {id} id tasks id
 */
function editCardHtml(id) {
  assignUser = [];
  document.getElementById("openTaskCard").innerHTML = editCardHtmlTemplate(id);
  loadCurrentTask(id);
}

/**
 * filter the tasks/ searchbar 
 */
function filterTasks() {
  let search = document.getElementById('searchTask').value.toLowerCase();
  let content = document.getElementById('status-container');
  let cards = content.querySelectorAll('.task-card');

  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector('.task-card-title').innerHTML;
    let description = cards[i].querySelector('.task-card-description').innerHTML;
    if (title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
      cards[i].style.display = 'block';
    } else {
      cards[i].style.display = 'none';
    }
  }
}

/**
 * renders the img so the righ person is displayed
 */
async function renderImgEdit() {
  for (let k = 0; k < currentIdEdit["contact"].length; k++) {
    document.getElementById('profileImgEdit').innerHTML += `
        <div class="profilePictureEdit" id="profilePictureEdit${k}"></div>`;
    assignUser.push(await contacts.find(c => c.firstName == currentIdEdit["contact"][k]["firstName"]));
  }
  for (let l = 0; l < assignUser.length; l++) {
    document.getElementById(`profilePictureEdit${l}`).style.background = `${assignUser[l]["background"]}`;
    document.getElementById(`profilePictureEdit${l}`).innerHTML = `<img onclick="deleteAssignUser(${l})" src="../assets/img/cancel.png"><span>
      ${assignUser[l]["firstName"].charAt(0).toUpperCase() +
      assignUser[l]["surname"].charAt(0).toUpperCase()}</span>`;
  }
}

/**
 * delete the assign user
 * @param {k} k is the current contact
 */
function deleteAssignUser(k) {
  assignUser.splice([k], 1);
  document.getElementById(`profilePictureEdit${k}`).classList.add('dp-none');
}

/**
 * filter through all tasks and give them the right prio
 * @param {id} id tasks id
 */
function loadCurrentTask(id) {
  currentIdEdit = tasks.find((t) => t.id == id);
  document.getElementById('input-title-edit').value = `${currentIdEdit["title"]}`;
  document.getElementById('input-description-edit').value = `${currentIdEdit["description"]}`;
  document.getElementById('input-date-edit').value = `${currentIdEdit["date"]}`;
  renderImgEdit();
  if (currentIdEdit["prio"] == "urgent") {
    addingPrioEdit('urgent');
  }
  else if (currentIdEdit["prio"] == "medium") {
    addingPrioEdit('medium');
  }
  else if (currentIdEdit["prio"] == "low") {
    addingPrioEdit('low');
  }
}

function getValuesFromInputsEdit(id) {
  let title = document.getElementById("input-title-edit");
  let description = document.getElementById("input-description-edit");
  let date = document.getElementById("input-date-edit");
  addRightPrio();
  editTask(title, description, date, id);
}

/**
 * 
 * @param {title} title is the title from the edited task
 * @param {description} description is the description from the edited task
 * @param {date} date is the that is selected
 * @param {id} id the right task
 */
function editTask(title, description, date, id) {
  currentIdEdit.title = title.value;
  currentIdEdit.description = description.value;
  currentIdEdit.date = date.value;
  currentIdEdit.prio = rightPrio;
  currentIdEdit.contact = assignUser;

  addTasks();
  assignUser = [];
  updateHtml();
  openCard(id);
}

/**
 * checks the prio and pushes into the prio array or not
 * @param {prio} prio is the current prio from the task
 */
function addingPrioEdit(prio) {
  if (prios.includes(prio)) {
    checkPrioEdit(prio);
  }
  else {
    prios.push(prio);
    checkPrioEdit(prio);
  }
}

/**
 * added the prio to the right container
 */
function addRightPrio() {
  if (document.getElementById('low-edit').classList.contains('low')) {
    rightPrio = "low";
  }
  else if (document.getElementById('medium-edit').classList.contains('medium')) {
    rightPrio = "medium";
  }
  else if (document.getElementById('urgent-edit').classList.contains('urgent')) {
    rightPrio = "urgent";
  }
  else { rightPrio = "low" }
}

/**
 * checks the prio and give it to the container or takes it
 */
function checkPrioEdit(newprio) {
  for (let i = 0; i < prios.length; i++) {
    let prio = prios[i];
    if (prio != newprio || currentPrio == newprio) {
      takePrioEdit(prio);
    }
    else {
      getPrioEdit(prio);
    }
  }
  currentPrio = newprio;
}

/**
 * changes the prio from the edit
 * @param {prio} prio gets the prio from the edit
 */
function getPrioEdit(prio) {
  document.getElementById(prio + '-edit').classList.add(prio);
  document.getElementById(`${prio}-img-edit`).src = `../assets/img/${prio}-white.svg`;
  if (document.getElementById(prio + '-edit') == document.getElementById('urgent-edit')) {
    ifPrioEditSameUrgent();
  }
  else if (document.getElementById(prio + '-edit') == document.getElementById('medium-edit')) {
    ifPrioEditSameMedium();
  }
  else if (document.getElementById(prio + '-edit') == document.getElementById('low-edit')) {
    ifPrioEditSameLow();
  }
}

function ifPrioEditSameUrgent() {
  takePrioEdit('medium');
  takePrioEdit('low');
}

function ifPrioEditSameMedium() {
  takePrioEdit('urgent');
  takePrioEdit('low');
}

function ifPrioEditSameLow() {
  takePrioEdit('medium');
  takePrioEdit('urgent');
}

/**
 * takes the prio from the prios that are not selected
 * @param {prio} prio is the current prio
 */
function takePrioEdit(prio) {
  document.getElementById(prio + '-edit').classList.remove(prio);
  document.getElementById(`${prio}-img-edit`).src = `../assets/img/prio-${prio}.svg`;
}

/**
 * opens the list to assign people
 */
function openAssignToListEdit() {
  document.getElementById("assignToContainerEdit").innerHTML =
    openAssignToListEditHtml();
  document.getElementById("AssignToListEdit").classList.remove("d-none");
  document.getElementById("closedAssingToInputEdit").classList.add("border-drop-down");
  renderAddTaskContactsEdit();
}

/**
 * closes the assignList
 */
function closeAssignListEdit() {
  document.getElementById("assignToContainerEdit").innerHTML =
    closeAssignListEditHtml();
}

/**
 * displays the assigned Contacts
 */
function renderAddTaskContactsEdit() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    document.getElementById("AssignToListEdit").innerHTML +=
      renderContactsEditHtml(contact, i);
    for (let j = 0; j < assignUser.length; j++) {
      if (document.getElementById(`${i}-edit`).innerText == `${assignUser[j]["firstName"]} ${assignUser[j]["surname"]}`) {
        document.getElementById(`${i}-edit`).classList.add('dp-none');
      }
    }
  }
}

/**
 * assigns contacts to the edit
 * @param {firstName} firstName is the firstname from the contact
 * @param {surname} surname is the surname from the contacr
 * @param {i} i is the index
 */
function assignContactToEdit(firstName, surname, i) {
  if (document.getElementById(`${i}-input`).checked == false) {
    ifCheckedFalse(firstName, surname, i);
  }

  else if (document.getElementById(`${i}-input`).checked == true) {
    ifCheckedTrue();
  }
}

/**
 * checks if the contact is assigned if not push it to it
 * @param {firstName} firstName is the firstname from the contact
 * @param {surname} surname is the surname from the contacr
 * @param {i} i is the index
 */
function ifCheckedFalse(firstName, surname, i) {
  document.getElementById(`${i}-input`).click();
  assignUser.push({
    firstName: firstName,
    surname: surname
  },
  );
}

/**
 * checks if the contact is assigned if yes delete it
 * @param {firstName} firstName is the firstname from the contact
 * @param {surname} surname is the surname from the contacr
 * @param {i} i is the index
 */
function ifCheckedTrue(firstName, surname, i) {
  for (let j = 0; j < assignUser.length; j++) {
    if (assignUser[j]["firstName"] == firstName && assignUser[j]["surname"] == surname) {
      document.getElementById(`${i}-input`).click();
      assignUser.splice([j]);
    }
  }
}

/**
 * renders the edit and save it 
 */
function renderTasksEdit() {
  for (let i = 0; i < tasks.length; i++) {
    for (let k = 0; k < assignUser.length; k++) {
      contactColor = assignUser[k]["background"];
      document.getElementById("to do").innerHTML += taskCardHtml(i);
      renderArrays(i);
    }
  }
}