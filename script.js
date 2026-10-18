"use strict";
class User {
    constructor(givenName, familyName, nickName) {
        this.id = User.idCounter;
        User.idCounter += 1;
        this.givenName = givenName;
        this.familyName = familyName;
        this.nickName = nickName;
        this.creationDate = new Date();
    }
    toString() {
        return `${this.givenName} ${this.familyName} (${this.nickName})`;
    }
}
User.idCounter = 1;
class UserList {
    constructor() {
        this.users = [
            new User("Samuel", "Schepp", "Sam"),
            new User("Kevin", "Linne", "Kev"),
            new User("Peter", "Kneisel", "Pete"),
        ];
    }
    addUser(givenName, familyName, nickName) {
        const newUser = new User(givenName.trim(), familyName.trim(), nickName.trim());
        this.users.push(newUser);
        addMessage(`Did add user ${newUser.toString()}`);
    }
    deleteUser(id) {
        for (let i = 0; i < this.users.length; i += 1) {
            if (this.users[i].id === id) {
                addMessage(`Will remove user ${this.users[i].toString()}`);
                this.users.splice(i, 1);
                return;
            }
        }
    }
    updateUser(id, givenName, familyName, nickName) {
        for (let i = 0; i < this.users.length; i += 1) {
            if (this.users[i].id === id) {
                this.users[i].givenName = givenName;
                this.users[i].familyName = familyName;
                this.users[i].nickName = nickName;
                addMessage(`Did update user ${this.users[i].toString()}`);
                return;
            }
        }
    }
}
function renderList() {
    let userListEl = document.getElementById("user_list");
    userListEl.replaceChildren();
    for (const user of userList.users) {
        let tr = document.createElement("tr");
        userListEl.append(tr);
        let tdId = document.createElement("td");
        tdId.textContent = user.id.toString();
        tr.append(tdId);
        let tdGivenName = document.createElement("td");
        tdGivenName.textContent = user.givenName;
        tr.append(tdGivenName);
        let tdFamilyName = document.createElement("td");
        tdFamilyName.textContent = user.familyName;
        tr.append(tdFamilyName);
        let tdNickName = document.createElement("td");
        tdNickName.textContent = user.nickName;
        tr.append(tdNickName);
        let tdDate = document.createElement("td");
        tdDate.textContent = user.creationDate.toLocaleString();
        tr.append(tdDate);
        let tdButtons = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-danger";
        deleteButton.addEventListener("click", () => {
            userList.deleteUser(user.id);
            renderList();
        });
        tdButtons.append(deleteButton);
        tr.append(tdButtons);
        let deleteButtonIcon = document.createElement("i");
        deleteButtonIcon.className = "bi bi-trash-fill";
        deleteButton.append(deleteButtonIcon);
        let editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "btn btn-primary ms-3";
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#edit_user_modal");
        editButton.addEventListener("click", () => {
            let idEl = document.getElementById("edit_user_id");
            let givenNameEl = document.getElementById("edit_user_given_name");
            let familyNameEl = document.getElementById("edit_user_family_name");
            let nickNameEl = document.getElementById("edit_user_nick_name");
            idEl.value = user.id.toString();
            givenNameEl.value = user.givenName;
            familyNameEl.value = user.familyName;
            nickNameEl.value = user.nickName;
        });
        tdButtons.append(editButton);
        let editButtonIcon = document.createElement("i");
        editButtonIcon.className = "bi bi-pen-fill";
        editButton.append(editButtonIcon);
    }
}
function addMessage(message) {
    const messagesEl = document.getElementById("messages");
    let alertEl = document.createElement("div");
    alertEl.classList.add("alert", "alert-warning", "alert-dismissible");
    alertEl.setAttribute("role", "alert");
    alertEl.textContent = message;
    messagesEl.appendChild(alertEl);
    let buttonEl = document.createElement("button");
    buttonEl.className = "btn-close";
    buttonEl.addEventListener("click", () => {
        alertEl.remove();
    });
    alertEl.appendChild(buttonEl);
    setTimeout(() => {
        alertEl.remove();
    }, 5000);
}
let userList = new UserList();
document.addEventListener("DOMContentLoaded", () => {
    renderList();
    document.getElementById("add_user_form").addEventListener("submit", (event) => {
        event.preventDefault();
        let givenNameEl = document.getElementById("add_user_given_name");
        let familyNameEl = document.getElementById("add_user_family_name");
        let nickNameEl = document.getElementById("add_user_nick_name");
        let givenName = givenNameEl.value;
        let familyName = familyNameEl.value;
        let nickName = nickNameEl.value;
        if (givenName.trim().length == 0 || familyName.trim().length == 0 || nickName.trim().length == 0) {
            addMessage("All fields must be filled.");
            return;
        }
        userList.addUser(givenName, familyName, nickName);
        givenNameEl.value = "";
        familyNameEl.value = "";
        nickNameEl.value = "";
        renderList();
    });
    document.getElementById("edit_user_form").addEventListener("submit", (event) => {
        event.preventDefault();
        let indexEl = document.getElementById("edit_user_id");
        let givenNameEl = document.getElementById("edit_user_given_name");
        let familyNameEl = document.getElementById("edit_user_family_name");
        let nickNameEl = document.getElementById("edit_user_nick_name");
        //Werte aus den Input-Feldern speichern
        let givenName = givenNameEl.value;
        let familyName = familyNameEl.value;
        let nickName = nickNameEl.value;
        //Die Kontrolle ob die Felder leer sind, wird hier durchgeführt.
        //Wenn eines der Felder leer ist, wird eine Nachricht hinzugefügt und die Funktion beendet.
        if (givenName.trim().length == 0 || familyName.trim().length == 0 || nickName.trim().length == 0) {
            addMessage("Update canceled. All fields must be filled.");
            return;
        }
        //Das eigentliche Update des Users wird hier durchgeführt.
        let userId = parseInt(indexEl.value);
        userList.updateUser(userId, givenNameEl.value, familyNameEl.value, nickNameEl.value);
        renderList();
    });
});
//# sourceMappingURL=script.js.map