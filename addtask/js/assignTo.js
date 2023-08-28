function renderNoAssignToContacts(contact) {
  for (let j = 0; j < assignTo.length; j++) {
    if (
      document.getElementById(`${contact["mail"]}-add`).innerText ==
      `${assignTo[j]["firstName"]} ${assignTo[j]["surname"]}`
    ) {
      document.getElementById(`${contact["mail"]}-input`).checked = true;
    }
  }
}

let user = JSON.parse(localStorage.getItem("user")) || [];

function renderAllContacts() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    document.getElementById("AssignToList").innerHTML += renderContactsHtml(
      contact,
      i
    );
    renderNoAssignToContacts(contact);
  }
}

function renderAddTaskContacts() {
  if (user["firstName"] === "Ghost" && user["surname"] === "Guest") {
    renderAllContacts();
  } else if (
    !assignTo.some((item) => item.firstName === `${user["firstName"]}`) &&
    !assignTo.some((item) => item.surname === `${user["surname"]}`)
  ) {
    document.getElementById("AssignToList").innerHTML = assignToYouTemplate();
    renderAllContacts();
  } else {
    renderAllContacts();
  }
}

function assignContactTo(firstName, surname, i) {
  if (
    document.getElementById(`${contacts[i]["mail"]}-input`).checked == false
  ) {
    assignTo.push({
      firstName: firstName,
      surname: surname,
    });
    checked(i);
  } else {
    assignTo.splice(i, 1);
    unchecked(i);
  }
}

function checked(i) {
  document.getElementById(`${contacts[i]["mail"]}-input`).checked = true;
}

function unchecked(i) {
  document.getElementById(`${contacts[i]["mail"]}-input`).checked = false;
}

function assignContactToYou(firstName, surname) {
  if (document.getElementById(`${user["mail"]}-inputYou`).checked == false) {
    document.getElementById(`${user["mail"]}-inputYou`).click();
    assignTo.push({
      firstName: firstName,
      surname: surname,
    });
  } else if (
    document.getElementById(`${user["mail"]}-inputYou`).checked == true
  ) {
    for (let j = 0; j < assignTo.length; j++) {
      if (assignTo[j]["firstName"] == firstName) {
        document.getElementById(`${user["mail"]}-inputYou`).click();
      }
    }
  }
}
