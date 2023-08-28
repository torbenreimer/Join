/**
 * shows the signUp page
 */

async function signUp() {
  let firstName = document.getElementById("signUpFirstNameInput").value;
  let surname = document.getElementById("signUpSurnameInput").value;
  let mail = document.getElementById("signUpMailInput").value;
  let password = document.getElementById("signUpPasswordInput").value;
  let checkIfMailExist = await contacts.find((c) => c.mail == mail);

  if (checkIfMailExist) {
    document
      .getElementById("emailIsAlreadyExistingSignUp")
      .classList.remove("dp-none");
  } else {
    ifSignUpCorrect(firstName, surname, mail, password);
  }
}

/**
 * 
 * @param {firstName} firstName is the firstname of the new account
 * @param {surname} surname is the last Name/ surname of the new account
 * @param {mail} mail is the e-mail-adress from the new account
 * @param {password} password is the password from the new account
 */
function ifSignUpCorrect(firstName, surname, mail, password) {
  contacts.push({
    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    surname: surname.charAt(0).toUpperCase() + surname.slice(1),
    mail: mail,
    background: randomBgColor(),
    phone: "",
    password: password,
  });
  save();
  firstName = document.getElementById("signUpFirstNameInput").value = "";
  surname = document.getElementById("signUpSurnameInput").value = "";
  mail = document.getElementById("signUpMailInput").value = "";
  password = document.getElementById("signUpPasswordInput").value = "";
  goBackToLogin();
}

/**
 * calls the function to show the login and if resp the signUp in Resp
 */
function goBackToLogin() {
  document.getElementById("signUpContainerContent").classList.add("dp-none");
  showLogin();
  openSignUpResp()
}

/**
 * calls the function to show the login
 */
function goBackToLoginOfForgot() {
  document.getElementById("forgotContainerContent").classList.add("dp-none");
  showLogin();
}

/**
 * to display the login
 */
function showLogin() {
    document.getElementById('loginBox').classList.remove("dp-none");
    document.getElementById('signUpButton').classList.remove("dp-none");
    document.getElementById('signUpButton').classList.remove("fadeIn");
    document.getElementById("loginEmail").focus();
}

/**
 * sets the image not see the password
 */
function togglePasswordImageSignUp() {
  if (document.getElementById("signUpPasswordInput").value == "") {
    document
      .getElementById("signUpPasswordImage")
      .setAttribute("src", "assets/img/lock.png");
    document
      .getElementById("signUpPasswordImage")
      .classList.remove("cursorPointer");
    document
      .getElementById("signUpPasswordImage")
      .classList.add("pointerEventsNone");
  } else {
    document
      .getElementById("signUpPasswordImage")
      .setAttribute("src", "assets/img/hidePassword.png");
    document
      .getElementById("signUpPasswordImage")
      .classList.add("cursorPointer");
    document
      .getElementById("signUpPasswordImage")
      .classList.remove("pointerEventsNone");
  }
}

/**
 * sets the image to see the password
 */
function togglePasswordVisibilitySignUp() {
  if (
    document.getElementById("signUpPasswordInput").getAttribute("type") ==
    "password"
  ) {
    document.getElementById("signUpPasswordInput").setAttribute("type", "text");
    document
      .getElementById("signUpPasswordImage")
      .setAttribute("src", "./img/showPassword.png");
  } else {
    document
      .getElementById("signUpPasswordInput")
      .setAttribute("type", "password");
    document
      .getElementById("signUpPasswordImage")
      .setAttribute("src", "./img/hidePassword.png");
  }
}

/**
 * sends the E-Mail for forgotPassword
 * @param {event} event event
 */
async function forgotPassword(event) {
  let email = document.getElementById("forgotMailInput");
  let forgotUser = await contacts.find((c) => c.mail == email.value);
  if (forgotUser) {
    emailSent();
    setForgotUser(forgotUser);
    document.getElementById("formForgot").action =
      "https://torben-reimer.developerakademie.net/JavaScript/Join/send_mail/send_mail.php";
  } else {
    event.preventDefault();
    document.getElementById("emailIsNotExisting").classList.remove("dp-none");
  }
}


/**
 * sets the user in the local storage
 * @param {forgotUser} forgotUser is the user who has forgot his password
 */
function setForgotUser(forgotUser) {
  let forgotUserAsText = JSON.stringify(forgotUser);
  localStorage.setItem("forgotUser", forgotUserAsText);
}

/**
 * displays the e-mail sent button
 */
function emailSent() {
  document.getElementById("eMailHasBeenSent").classList.remove("dp-none");
}
