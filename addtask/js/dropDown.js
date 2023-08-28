let categoryId;
/**
 * open the dropdownmenu for category
 */
function openCategoryList() {
  closeAssignList();
  document.getElementById("categoryListContainer").innerHTML =
    openCategoryListHtml();
  getCategoryList();
  document
    .getElementById("closedCategoryInput")
    .classList.add("border-drop-down");
  document.getElementById("categoryList").classList.remove("d-none");
  document.getElementById("categoryList").style = `border-top: none`;
}

/**
 * loops through the categories json to display the category
 */
function getCategoryList() {
  if (!categories.includes(category)) {
    for (let i = 0; i < categories.length; i++) {
      categoryId = categories[i];
      let id = categories[i];
      showTheRightCategory(id);
    }
  }
}

/**
 * calls the HTML functions to display the category
 * @param {id} id is the current category from categories
 */
function showTheRightCategory(id) {
  document.getElementById("categoryOptionTest").innerHTML +=
    categoryListHtml(id);
  document.getElementById(id["name"]).innerHTML = categoryListItemHtml(id);
}

/**
 * open the dropdownmenu for assignTo
 */
function openAssignToList() {
  closeCategoryList(category, color);
  document.getElementById("assignToContainer").innerHTML =
    openAssignToListHtml();
  document.getElementById("AssignToList").classList.remove("d-none");
  document
    .getElementById("closedAssingToInput")
    .classList.add("border-drop-down");
  renderAddTaskContacts();
}

/**
 * it deletes the category
 * @param {name} name is the name of the category that gets deleted
 */
function deleteCategory(name) {
  let currentIndex = categories.findIndex((c) => c.name == name);
  categories.splice(currentIndex, 1);
  saveCategory();
  closeCategoryList();
  openCategoryList();
}

/**
 * close the assignTo list
 */
function closeAssignList() {
  document.getElementById("assignToContainer").innerHTML =
    closeAssignListHtml();
}

/**
 * close the category list and maybe shows a category u assigned
 */
function closeCategoryList(name, currentColor) {
  if (name && currentColor) {
    document.getElementById("categoryListContainer").innerHTML =
      closeCategoryListVarHtml(name, currentColor);
    category = name;
    color = currentColor;
  } else if (category && color) {
    document.getElementById("categoryListContainer").innerHTML =
      closeCategoryListVarHtml(category, color);
  } else {
    document.getElementById("categoryListContainer").innerHTML =
      closeCategoryListHtml();
  }
}

/**
 * gets a new category
 */
function newCategory() {
  document.getElementById("categoryListContainer").innerHTML =
    newCategoryHtml();
}

/**
 * creates a new category
 */
function createNewCategory() {
  let createdCategory = document.getElementById("newCategory").value;
  document.getElementById("newCategoryInput").innerHTML +=
    newCreatedCategory(createdCategory);
  getCategory(createdCategory, color);
}

/**
 * gets the category that was selected / created
 * @param {name} name is the name of the category
 * @param {newcolor} newcolor is the color that was selected
 */
function getCategory(name, newcolor) {
  category = name;
  color = newcolor;
  categories.push({
    name: category,
    color: color,
  });
  saveCategory();
  closeCategoryList();
  document.getElementById(
    "colorContainer"
  ).innerHTML = `<div class="${color} color-container"></div>`;
  document.getElementById("category").value = `${name} `;
}

async function saveCategory() {
  await backend.setItem("categories", JSON.stringify(categories));
}

/**
 * gets the right color for the category
 * @param {newcolor} newcolor is the color that was selected
 */
function getColorForCategory(newcolor) {
  color = newcolor;
  if (color == newcolor) {
    document.getElementById(newcolor).classList.add("active-color");
  } else {
    document.getElementById(newcolor).classList.remove("active-color");
  }
}

/**
 * clears the category
 */
function clearCategory() {
  document.getElementById("newCategoryInput").classList.add("d-none");
  document.getElementById("categoryListContainer").innerHTML =
    clearCategoryHtml();
}
