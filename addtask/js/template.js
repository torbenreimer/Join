function createNewSubtaskHtml(newSubtask) {
  return /*html*/ `
          <div class="checkSubtask-Container">
            <input id="${newSubtask}" checked type="checkbox" onclick="takeSubtask('${newSubtask}', ${newSubtask})">
            <p> ${newSubtask}</p>
        </div>
    `;
}

function clearSubtaskHtml() {
  return /*html*/ `<input class="task-board-input-fields" placeholder="Add new Subtasks" id="input-subTask" readonly onclick="addNewSubtask()"/>
  <img class="plus" src="../assets/img/plus.svg" onclick="addNewSubtask()">
  `;
}

function addNewSubtaskHtml() {
  return /*html*/ `
    <input type="text" type="text" maxlength="20" class="task-board-input-fields" placeholder="Add new Subtasks" id="new-subTask"/>
    <img class="cancelSubtask" src="../assets/img/clear.svg" onclick="clearSubtask()">
    <img class="checkSubtask" src="../assets/img/check-black.svg" onclick="createNewSubtask()" onsubmit="createNewSubtask()">
  `;
}

function newCategoryHtml() {
  return /*html*/ `
  <div class="d-flex" id="newCategoryInput">
    <input class="task-board-input-fields" placeholder="Add new Category" type="text" maxlength="20" id="newCategory"/>
    <img class="cancelSubtask" src="../assets/img/clear.svg" onclick="clearCategory()">
    <img class="checkSubtask" src="../assets/img/check-black.svg" onclick="createNewCategory()">
  </div>
  <div class="chooseColor">
    <span class="blue color-container" id="blue" onclick="getColorForCategory('blue')"></span>
    <span class="red color-container" id="red" onclick="getColorForCategory('red')"></span>
    <span class="green color-container" id="green" onclick="getColorForCategory('green')"></span>
    <span class="orange color-container" id="orange" onclick="getColorForCategory('orange')"></span>
    <span class="purple color-container" id="purple" onclick="getColorForCategory('purple')"></span>
    <span class="darkblue color-container" id="darkblue" onclick="getColorForCategory('darkblue')"></span>
  </div>
  `;
}

function openCategoryListHtml() {
  return /*html*/ `
  <div class="category" onclick="closeCategoryList()" id="closedCategoryInput">
  <input class="categoryInputField" type="text" placeholder="Enter a Category"/>
  <img class="rotate90deg" src="../assets/img/dropdown.svg">
</div>
<div id="categoryList" class="d-none categoryList">
  <div class="category-option">
    <p class="newCategory" onclick="newCategory()">New Category</p>
  </div>

  <div id="categoryOptionTest">
    
  </div>
</div>`;
}

function categoryListHtml(id) {
  return /*html*/ `
  <div class="category-option" id="${id["name"]}">
  </div>
  `;
}

function categoryListItemHtml(id) {
  return /*html*/ `
  <div class="gap d-flex" onclick="closeCategoryList('${id['name']}', '${id['color']}')">
    <p>${id["name"]}</p>
    <span class="${id["color"]} color-container"></span>
  </div>
  <div>
    <img src="../assets/img/cancel.png" onclick="deleteCategory('${id['name']}')">
  </div>
  `;
}

function closeCategoryListHtml() {
  return /*html*/ `
  <div class="category" onclick="openCategoryList()" id="categoryInput">
  <div>
    <input class="categoryInputField" type="text" placeholder="Enter a Category" id="category"/>
  </div>
  <div id="colorContainer">
  </div>
  <div>
    <img src="../assets/img/dropdown.svg" />
  </div>`;
}

function closeCategoryListVarHtml(name, currentColor) {
  return /*html*/ `
  <div class="category" onclick="openCategoryList()" id="categoryInput">
  <div class="dflex">
    <input class="categoryInputField" type="text" placeholder="${name}" id="category"/>
  </div>
  <div class="dflex" id="colorContainer">
    <span class="${currentColor} color-container"></span>
  </div>
  <div>
    <img src="../assets/img/dropdown.svg" />
  </div>`;
}

function newCreatedCategory(createdCategory) {
  return /*html*/ `  
  <p>${createdCategory}</p>
  <span class="${color} color-container"></span>
  `;
}

function clearCategoryHtml() {
  return /*html*/ `
  <div class="category" onclick="openCategoryList()" id="categoryInput">
  <div>
    <input class="categoryInputField" type="text" placeholder="Enter a Category" id="categoryInputField"/>
  </div>
  <div>
    <img src="../assets/img/dropdown.svg" />
  </div>
`;
}

function openAssignToListHtml() {
  return /*html*/ `
  <div class="category" onclick="closeAssignList()" id="closedAssingToInput">
  <input class="categoryInputField" type="text" placeholder="Assign to"/>
  <img class="rotate90deg" src="../assets/img/dropdown.svg">
</div>
<div id="AssignToList" class="d-none categoryList">`;
}

function closeAssignListHtml() {
  return /*html*/ `
  <div class="category" onclick="openAssignToList()" id="assignToInput">
    <div>
      <input class="categoryInputField" type="text" placeholder="Assign to"/>
    </div>
    <div>
      <img src="../assets/img/dropdown.svg" />
    </div>
  </div>
  <div id="assignToList" class="d-none categoryList"></div>
</div>
`;
}

function renderContactsHtml(contact, i) {
  return `
  <div onclick="assignContactTo('${contact["firstName"]}','${contact["surname"]}','${i}')" id="${contact["mail"]}-add" class="assign-to-box" >
    ${contact["firstName"]} ${contact["surname"]}
    <input type="checkbox" id="${contact["mail"]}-input" >
  </div>`;
}

function linkToBoardHtml() {
  return /*html*/ `
    <div class="added-to-board">
      <p class="text">Task added to board</p>
      <img src="../assets/img/board.svg" />
    </div> 
  `;
}

function assignToYouTemplate() {
  return `
  <div onclick="assignContactToYou('${user["firstName"]}','${user["surname"]}')" 
  id="${user["mail"]}-addYou" class="assign-to-box" >
    You
    <input type="checkbox" id="${user["mail"]}-inputYou" >
  </div>`;
}
