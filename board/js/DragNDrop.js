
/**
 * updates all Html container
 */
async function updateHtml() {
  emptyContainerTodo();
  emptyContainerProgress();
  emptyContainerFeedback();
  emptyContainerDone();
}

/**
 * used to start dragging the element for Drag n Drop
 * @param {id} id the id from the tasks
 */
function startDragging(id) {
  currentDraggedElement = id;
}
/**
 * says that a tasks can be dropped in the container
 * @param {ev} ev event
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * marks the container in which you can  drop the tasks
 * @param {status} status the status from the element 
 */
function highlight(status) {
  document.getElementById(status).classList.add("drag-area-highlight");
}

/**
 * removes the classs for the highlight
 * @param {status} status the status from the element
 */
function endHighlight(status) {
  document.getElementById(status).classList.remove("drag-area-highlight");
}

/**
 * for mobile devices the drag n drop
 * @param {id} id the id from the current task
 * @param {status} status status from the current task
 */
function moveTaskToStatus(id, status) {
  startDragging(id);
  moveTo(status);
}

/**
 * changes the status to move it to a different container
 * @param {status} status from the container where you drop it
 */
function moveTo(status) {
  currentTask = tasks.find((t) => t.id == currentDraggedElement)
  currentTask["status"] = status;
  updateHtml();
  addTasks();
  endHighlight(status);
}

/**
 * filter a empty container and display all tasks with the status: to do
 */
function emptyContainerTodo() {
  let statusContainerTodo = tasks.filter((tasks) => tasks["status"] == "to do");
  document.getElementById(`to do`).innerHTML = "";

  for (let i = 0; i < statusContainerTodo.length; i++) {
    currentTask = statusContainerTodo[i];
    document.getElementById("to do").innerHTML += taskCardHtml();
    checkArrays();
  }
}

/**
 * filter a empty container and display all tasks with the status:in progess
 */
function emptyContainerProgress() {
  let statusContainerProgress = tasks.filter(
    (tasks) => tasks["status"] == "in progress"
  );
  document.getElementById("in progress").innerHTML = "";

  for (let i = 0; i < statusContainerProgress.length; i++) {
    currentTask = statusContainerProgress[i];
    document.getElementById("in progress").innerHTML += taskCardHtml();
    checkArrays();
  }
}

/**
 * filter a empty container and display all tasks with the status: awaiting feedback
 */
function emptyContainerFeedback() {
  let statusContainerFeedback = tasks.filter(
    (tasks) => tasks["status"] == "awaiting feedback"
  );
  document.getElementById("awaiting feedback").innerHTML = "";

  for (let i = 0; i < statusContainerFeedback.length; i++) {
    currentTask = statusContainerFeedback[i];
    document.getElementById("awaiting feedback").innerHTML += taskCardHtml();
    checkArrays();
  }
}

/**
 * filter a empty container and display all tasks with the status: done
 */
function emptyContainerDone() {
  let statusContainerDone = tasks.filter((tasks) => tasks["status"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let i = 0; i < statusContainerDone.length; i++) {
    currentTask = statusContainerDone[i];
    document.getElementById("done").innerHTML += taskCardHtml();
    checkArrays();
  }
}


/**
 * checks the arrays to display them right
 */
function checkArrays() {
  checkAssignTo();
  checkSubtask();
}
