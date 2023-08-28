let contacts = [];
let letters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));

load();

/**
 * render all contacts
 */
async function renderContacts() {
    await init();
    loadContacts();
}

/**
 * load the contacts and display it
 */
function loadContacts() {
    let contactsAdressContainer = document.getElementById('contactsAdressContainer');
    contactsAdressContainer.innerHTML = '';
    renderContactHeadline();
    checkIfLetterExist(contactsAdressContainer);
}

/**
 * checks if the letter exist and sort it
 * @param {contactsAdressContainer} contactsAdressContainer is the div for the contacts
 */
function checkIfLetterExist(contactsAdressContainer) {
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        for (let j = 0; j < contacts.length; j++) {
            if (letter == contacts[j]["firstName"].charAt(0).toLowerCase()) {
                if (!document.getElementById(`adressSection${i}`)) {
                    contactsAdressContainer.innerHTML += renderLettersTemplate(letter, i);
                }
                document.getElementById(`adressSection${i}`).innerHTML += renderContactsTemplate(j);
                changeContactImg(j);
            }
        }
    }
}

/**
 * show the right contact to edit him
 * @param {j} j is the current contact
 */
async function showContactDetails(j) {
    loadContacts();
    let contactDetails = document.getElementById('contactDetails');
    contactDetails.innerHTML = showContactDetailsTemplate(j);
    document.getElementById(`adressField${j}`).style.background = "#2A3647";
    document.getElementById(`adressField${j}`).style.color = "#FFFFFF";
    changeContactImg(j);
    showContactDetailsIfResponsive();
}

/**
 * show the right contact
 * @param {j} j the current contact
 */
function openEditContactContainer(j) {
    document.getElementById('emailIsAlreadyExistingEditContact').classList.add('dp-none');
    document.getElementById('editContactFirstNameInput').value = `${contacts[j]["firstName"]}`;
    document.getElementById('editContactSurnameInput').value = `${contacts[j]["surname"]}`;
    document.getElementById('editContactMailInput').value = `${contacts[j]["mail"]}`;
    document.getElementById('editContactPhoneInput').value = `${contacts[j]["phone"]}`;
    changeEditImg(j);
    document.getElementById('editContactContainer').classList.remove('moveEditContainerOutMedia');
    document.getElementById('editContactContainer').classList.remove('dp-none');
    document.getElementById('bg-contacts').classList.remove('dp-none');
}

/**
 * opens the container to make a new contact
 */
function openNewContactContainer() {
    let firstName = document.getElementById('addContactFirstNameInput');
    document.getElementById('emailIsAlreadyExistingAddContact').classList.add('dp-none');
    firstName.value = '';
    document.getElementById('addContactSurnameInput').value = '';
    document.getElementById('addContactMailInput').value = '';
    document.getElementById('addContactPhoneInput').value = '';
    document.getElementById('addContactContainer').classList.remove('moveContainerOutMedia');
    document.getElementById('addContactContainer').classList.remove('dp-none');
    document.getElementById('bg-contacts').classList.remove('dp-none');

    firstName.select();
}

/**
 * adds contact and send it to the backend 
 */
async function addContact() {
    let firstName = document.getElementById('addContactFirstNameInput').value;
    let surname = document.getElementById('addContactSurnameInput').value;
    let mail = document.getElementById('addContactMailInput').value;
    let phone = document.getElementById('addContactPhoneInput').value;
    let checkIfMailExist = await contacts.find(c => c.mail == mail);

    if (checkIfMailExist) {
        document.getElementById('emailIsAlreadyExistingAddContact').classList.remove('dp-none');
    }
    else {
        await ifAddContactCorrect(firstName, surname, mail, phone);
    }
}

/**
 * add the contact to the backend
 * @param {firstName} firstName is the firstname from the contact
 * @param {surname} surname is the surname from the contact
 * @param {mail} mail is the e-mail from the contact
 * @param {phone} phone is the number from the contact
 */
async function ifAddContactCorrect(firstName, surname, mail, phone) {
    contacts.push({
        "firstName": firstName.charAt(0).toUpperCase() + firstName.slice(1),
        "surname": surname.charAt(0).toUpperCase() + surname.slice(1),
        "mail": mail,
        "background": randomBgColor(),
        "phone": phone,
        "password": firstName.toLowerCase() + surname.charAt(0).toUpperCase()
    });
    contactCreatedAnimation();
    closeNewContactContainer();
    await save();
    await renderContacts();
}

/**
 * save the edit from the contact
 * @param {j} j is the current contact
 */
async function saveEdit(j) {
    let firstName = document.getElementById('editContactFirstNameInput').value;
    let surname = document.getElementById('editContactSurnameInput').value;
    let mail = document.getElementById('editContactMailInput').value;
    let phone = document.getElementById('editContactPhoneInput').value;
    let checkIfMailExist = await contacts.find(c => c.mail == mail);
    if (checkIfMailExist && checkIfMailExist.mail == contacts[j]["mail"]) {
        await ifMailDoesNotExist(firstName, surname, mail, phone, j);
    }
    else if (checkIfMailExist && checkIfMailExist.mail) {
        document.getElementById('emailIsAlreadyExistingEditContact').classList.remove('dp-none');
    }
    else {
        await ifMailDoesNotExist(firstName, surname, mail, phone, j);
    }
}

/**
 * add the contact to the backend
 * @param {firstName} firstName is the firstname from the contact
 * @param {surname} surname is the surname from the contact
 * @param {mail} mail is the e-mail from the contact
 * @param {phone} phone is the number from the contact
 * @param {j} j is the current contact
 */
async function ifMailDoesNotExist(firstName, surname, mail, phone, j) {
    contacts[j]["firstName"] = firstName;
    contacts[j]["surname"] = surname;
    contacts[j]["mail"] = mail;
    contacts[j]["phone"] = phone;

    closeEditSaveDeleteContactContainer();
    await save();
    await renderContacts();
    showContactDetails(j);
}

/**
 * deletes a contact and save it to the back
 * @param {j} j is the current contact
 */
async function deleteContact(j) {
    if (contacts[j]["mail"] == user["mail"]) {
        changeUserToGuestUser();
    }
    await checkIfTaskIncludeContact(j);
    contacts.splice(j, 1);
    contactDeletedAnimation();
    closeEditSaveDeleteContactContainer();
    await save();
    await renderContacts();
    renderContactHeadline();
    closeContactDetails();
}

/**
 * changes user to the guest user
 */
function changeUserToGuestUser() {
    user = {
        firstName: 'Ghost',
        surname: 'Guest',
        mail: 'test@test.test',
        background: 'rgb(133,150,22)',
        phone: 0,
        password: 'test'
    };
    let userAsText = JSON.stringify(user);
    localStorage.setItem("user", userAsText);
}

/**
 * checks if the contact is included in a task
 * @param {j} j is the current contact 
 */
async function checkIfTaskIncludeContact(j) {
    for (let t = 0; t < tasks.length; t++) {
        let task = tasks[t];
        for (let k = 0; k < task["contact"].length; k++) {
            let contact = task["contact"][k];
            if (contact["firstName"] == contacts[j]["firstName"] && contact["surname"] == contacts[j]["surname"]) {
                task["contact"].splice(k, 1);
            }
        }
        await addTasks();
    }
}

/**
 * closes the new contact container
 */
function closeNewContactContainer() {
    document.getElementById('addContactContainer').classList.add('moveContainerOutMedia');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

/**
 * closes the edit container
 */
function closeEditContactContainer() {
    document.getElementById('editContactContainer').classList.add('moveEditContainerOutMedia');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

/**
 * saves the changes and closes the delete contact container
 */
function closeEditSaveDeleteContactContainer() {
    document.getElementById('editContactContainer').classList.add('dp-none');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

/**
 * opens the task template
 * @param {status} status is the status
 */
function openAddTaskContainer(status) {
    currentStatus = status;
    document.getElementById('taskBoard').classList.remove('d-none');
    document.getElementById('addTaskContainerContacts').classList.remove('dp-none');
    document.getElementById('taskBoard').classList.remove('moveContainerOutMedia');
}

/**
 * close the add task template
 */
function closeAddTaskContainer() {
    document.getElementById('taskBoard').classList.add('moveContainerOutMedia');
    setTimeout(function () {
        document.getElementById('addTaskContainerContacts').classList.add('dp-none');
        document.getElementById('taskBoard').classList.remove('moveContainerOutMedia');
    }, 400);
}

/**
 * changes the img for the contact
 * @param {j} j is the current contact
 */
function changeContactImg(j) {
    let image = document.getElementById(`adressImg${j}`);
    image.innerHTML = `${contacts[j]["firstName"].charAt(0).toUpperCase()}${contacts[j]["surname"].charAt(0).toUpperCase()}`;
    document.getElementById(`adressImg${j}`).style.background = `${contacts[j]["background"]}`;
}

/**
 * change the img for the edit
 * @param {j} j is the current contact
 */
function changeEditImg(j) {
    let image = document.getElementById('addContactProfileImg');
    image.innerHTML = `${contacts[j]["firstName"].charAt(0).toUpperCase()}${contacts[j]["surname"].charAt(0).toUpperCase()}`;
    document.getElementById('addContactProfileImg').style.background = `${contacts[j]["background"]}`;
}

/**
 * render the headline for the contact
 */
function renderContactHeadline() {
    let headline = document.getElementById('contactDetails');
    headline.innerHTML = headlineTemplate();
}

/**
 * shows the button contact created
 */
function contactCreatedAnimation() {
    document.getElementById('contactCreated').classList.remove('dp-none');
    setTimeout(() => {
        document.getElementById('contactCreated').classList.add('contactCreatedButton');
        document.getElementById('contactCreated').classList.add('dp-none');
    }, 2000);
    
}

/**
 * shows the button contact deleted
 */
function contactDeletedAnimation() {
    document.getElementById('contactDeleted').classList.remove('dp-none');
    setTimeout(() => {
    document.getElementById('contactDeleted').classList.add('contactCreatedButton');
    document.getElementById('contactDeleted').classList.add('dp-none');
    }, 2000);
}

/**
 * shows the contact page for responsiv
 */
function showContactDetailsIfResponsive() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        document.getElementById('contactsAdressContainer').classList.add("dp-none");
        document.getElementById('contactsNewContact').classList.add("dp-none");
        document.getElementById('contactDetails').style.display = "flex";
    }
}

/**
 * close the contact details
 */
function closeContactDetails() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        document.getElementById('contactsAdressContainer').classList.remove("dp-none");
        document.getElementById('contactsNewContact').classList.remove("dp-none");
        document.getElementById('contactDetails').style.display = "none";
    }
}

/**
 * sets a random number for the background for each contact
 * @returns a bg color
 */
function randomBgColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
}

/**
 * saves contacts to the backend
 */
async function save() {
    let contactsASText = JSON.stringify(contacts);
    await backend.setItem('contactsASText', contactsASText);
}

/**
 * loads contacts from the backend
 */
async function load() {
    let contactsASText = await backend.getItem('contactsASText');

    if (contactsASText) {
        contacts = JSON.parse(contactsASText);
    }
}