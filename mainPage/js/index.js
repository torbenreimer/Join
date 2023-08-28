let user;
let rememberedUser;

/**
 * loads the different tasks and calls a function for remembered user
 */
async function initLogin() {
    await initIndex();
    loadRememberedUser();
}

/**
 * gets the user remembered in the local storage
 */
function loadRememberedUser() {
    if ((localStorage.getItem("rememberUser") || 0) == 1) {
        rememberedUser = JSON.parse(localStorage.getItem("rememberedUser")) || []
        document.getElementById('loginEmail').value = rememberedUser.mail;
        document.getElementById('loginPassword').value = rememberedUser.password;
        document.getElementById("loginRememberCheckbox").checked = true;
        document.getElementById('loginPasswordImage').setAttribute('src', 'assets/img/hidePassword.png');
        document.getElementById('loginPasswordImage').classList.add('cursorPointer');
    }
}

/**
 * changes the the email img
 */
function emailInputChanged() {
    if (!document.getElementById('loginEmail').classList.contains('hidden')) {
        document.getElementById('wrongEmail').classList.add("hidden");
    }
}

/**
 * changes the the password img
 */
function pwInputChanged() {
    if (!document.getElementById('loginPassword').classList.contains('hidden')) {
        document.getElementById('wrongPassword').classList.add("hidden");
    }
    togglePasswordImage();
}

/**
 * changes the img when you didnt write something or click it to unsee the password
 */
function togglePasswordImage() {
    if (document.getElementById('loginPassword').value == '') {
        document.getElementById('loginPasswordImage').setAttribute('src', 'assets/img/lock.png');
        document.getElementById('loginPasswordImage').classList.add('pointerEventsNone');
        document.getElementById('loginPasswordImage').classList.remove('cursorPointer');
    }
    else {
        document.getElementById('loginPasswordImage').setAttribute('onclick', 'togglePasswordVisibility();')
        document.getElementById('loginPasswordImage').setAttribute('src', 'assets/img/hidePassword.png');
        document.getElementById('loginPasswordImage').classList.remove('pointerEventsNone');
        document.getElementById('loginPasswordImage').classList.add('cursorPointer');
    }
}

/**
 * changes the img when you write something so you can see it
 */
function togglePasswordVisibility() {
    if (document.getElementById('loginPassword').getAttribute('type') == 'password') {
        document.getElementById('loginPassword').setAttribute('type', 'text');
        document.getElementById('loginPasswordImage').setAttribute('src', 'assets/img/showPassword.png');
    } else {
        document.getElementById('loginPassword').setAttribute('type', 'password');
        document.getElementById('loginPasswordImage').setAttribute('src', 'assets/img/hidePassword.png');
    }
}

/**
 * gives a user no Password when you dont give them one
 */
function noUserPassword() {
    user = {
        background: user.background,
        firstName: user.firstName,
        mail: user.mail,
        password: "",
        phone: user.phone,
        surname: user.surname
    };
}

/**
 * search the login data to evaluate who logs in
 */
async function login() {
    user = await contacts.find((contact) => contact.mail == document.getElementById('loginEmail').value)
    if (user) {
        if (user.password == document.getElementById('loginPassword').value) {
            noUserPassword();
            setUser(user);
            setRememberUser();
            window.location.href = './summary/summary.html';
        }
        else {
            document.getElementById('wrongPassword').classList.remove("hidden");
        }
    }
    else {
        document.getElementById('wrongEmail').classList.remove("hidden");
    }
}

/**
 * set the user to remember in the local storage
 */
function setRememberUser() {
    if (document.getElementById("loginRememberCheckbox").checked) {
        localStorage.setItem("rememberedUser", JSON.stringify(user));
        localStorage.setItem("rememberUser", 1);
    } else {
        localStorage.setItem("rememberUser", 0);
    }
}

/**
 * opens signUp to make a new account
 * @param {signUp} signUp 
 */
function openSignUp(signUp) {
    document.getElementById('emailIsAlreadyExistingSignUp').classList.add('dp-none');
    document.getElementById('signUpContainerContent').classList.remove("dp-none");
    document.getElementById('loginBox').classList.add("dp-none");
    document.getElementById('signUpButton').classList.add("dp-none");
    document.getElementById("signUpFirstNameInput").focus();
    openSignUpResp(signUp);
}
/**
 * the signUp in Responsiv design
 * @param {signUp} signUp signUp
 */
function openSignUpResp(signUp) {
    let width = window.innerHeight;
    if(width > 530 && signUp) {
        document.getElementById('logoBig').classList.add('smallerLogo');
    } else {
        document.getElementById('logoBig').classList.remove('smallerLogo');
    }
}

/**
 * opens the forgotPassword page
 */
function openForgotPassword() {
    document.getElementById('eMailHasBeenSent').classList.add('dp-none');
    document.getElementById('forgotContainerContent').classList.remove("dp-none");
    document.getElementById('loginBox').classList.add("dp-none");
    document.getElementById('signUpButton').classList.add("dp-none");
    document.getElementById("forgotMailInput").focus();
}

/**
 * sets the user in the localstorage
 * @param {user} user data for the local storage
 */
function setUser(user) {
    let userAsText = JSON.stringify(user);
    localStorage.setItem("user", userAsText);
}