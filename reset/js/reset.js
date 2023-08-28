let forgotUser;
let resetContact;

load();
loadFromLocalStorage();

/**
 * loads the user from the local storage
 */
function loadFromLocalStorage() {
  let user = localStorage.getItem("forgotUser");

  if (user) {
    forgotUser = JSON.parse(user);
  }
}

/**
 * change the password
 */
async function changePassword() {
  resetContact = await contacts.find((c) => c.mail == forgotUser["mail"]);
  let newPassword = document.getElementById("newPassword");
  let confirmPassword = document.getElementById("confirmPassword");
  if (newPassword.value == confirmPassword.value) {
    resetContact["password"] = newPassword.value;
    save();
    window.location.href = '../index.html';
  } else {
    document.getElementById("error").classList.add("error");
    document.getElementById("error").classList.remove("d-none");
    document.getElementById("continue").style = "margin-top: 0px";
  }
  console.log(forgotUser);
}

/**
 * loads the contact json from the backend
 */
async function load() {
  let contactsASText = await backend.getItem("contactsASText");

  if (contactsASText) {
    contacts = JSON.parse(contactsASText);
  }
}

/**
 * saves the json contacts to the backend
 */
async function save() {
  let contactsASText = JSON.stringify(contacts);
  await backend.setItem('contactsASText', contactsASText);
}
