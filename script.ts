class User {
  id: number;
  givenName: string;
  familyName: string;
  nickName: string;
  creationDate: Date;

  private static idCounter: number = 1;

  constructor(givenName: string, familyName: string, nickName:string) {
    this.id = User.idCounter;
    User.idCounter += 1;
    this.givenName = givenName;
    this.familyName = familyName;
    this.nickName = nickName;
    this.creationDate = new Date();
  }

  toString(): string {
    return `${this.givenName} ${this.familyName} (${this.nickName})`;
  }
}

class UserList {
  users: User[];

  constructor() {
    this.users = [
      new User("Samuel", "Schepp", "Sam"),
      new User("Kevin", "Linne", "Kev"),
      new User("Peter", "Kneisel", "Pete"),
    ];
  }

  addUser(givenName: string, familyName: string, nickName: string): void {
    const newUser: User = new User(givenName.trim(), familyName.trim(), nickName.trim())
    this.users.push(newUser);
    addMessage(`Did add user ${newUser.toString()}`);
  }

  deleteUser(id: number): void {
    for (let i = 0; i < this.users.length; i += 1) {
      if (this.users[i].id === id) {
        addMessage(`Will remove user ${this.users[i].toString()}`);
        this.users.splice(i, 1);
        return;
      }
    }
  }

  updateUser(id: number, givenName: string, familyName: string, nickName:string): void {
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

function renderList(): void {
  let userListEl: HTMLElement = document.getElementById("user_list")!;
  userListEl.replaceChildren();

  for (const user of userList.users) {
    let tr: HTMLElement = document.createElement("tr");
    userListEl.append(tr);

    let tdId: HTMLElement = document.createElement("td");
    tdId.textContent = user.id.toString();
    tr.append(tdId);

    let tdGivenName: HTMLElement = document.createElement("td");
    tdGivenName.textContent = user.givenName;
    tr.append(tdGivenName);

    let tdFamilyName: HTMLElement = document.createElement("td");
    tdFamilyName.textContent = user.familyName;
    tr.append(tdFamilyName);

    let tdNickName: HTMLElement = document.createElement("td");
    tdNickName.textContent = user.nickName;
    tr.append(tdNickName);

    let tdDate: HTMLElement = document.createElement("td");
    tdDate.textContent = user.creationDate.toLocaleString();
    tr.append(tdDate);

    let tdButtons: HTMLElement = document.createElement("td")
    let deleteButton: HTMLButtonElement = document.createElement("button")
    deleteButton.type = "button";
    deleteButton.className = "btn btn-danger"
    deleteButton.addEventListener("click", (): void => {
      userList.deleteUser(user.id);
      renderList();
    });
    tdButtons.append(deleteButton);
    tr.append(tdButtons);

    let deleteButtonIcon: HTMLElement = document.createElement("i");
    deleteButtonIcon.className = "bi bi-trash-fill";
    deleteButton.append(deleteButtonIcon);

    let editButton: HTMLButtonElement = document.createElement("button")
    editButton.type = "button";
    editButton.className = "btn btn-primary ms-3"
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#edit_user_modal");
    editButton.addEventListener("click", (): void => {
      let idEl: HTMLInputElement = document.getElementById("edit_user_id") as HTMLInputElement;
      let givenNameEl: HTMLInputElement = document.getElementById("edit_user_given_name") as HTMLInputElement;
      let familyNameEl: HTMLInputElement = document.getElementById("edit_user_family_name") as HTMLInputElement;
      let nickNameEl: HTMLInputElement = document.getElementById("edit_user_nick_name") as HTMLInputElement;

      idEl.value = user.id.toString();
      givenNameEl.value = user.givenName;
      familyNameEl.value = user.familyName;
      nickNameEl.value = user.nickName;
    });
    tdButtons.append(editButton);

    let editButtonIcon: HTMLElement = document.createElement("i");
    editButtonIcon.className = "bi bi-pen-fill";
    editButton.append(editButtonIcon);
  }
  //HTML elemente holen
  const userAnzahlEl: HTMLElement = document.getElementById("UserAnzahl")!;
  const VornameLaengeDurchEl: HTMLElement = document.getElementById("VornameLaengDurch")!;

  //Aufgabe a) Lass UserAnzahlBerechnung als Nummer dargestellt werden
  //also länge des Arrays userList.users als Zahl der Statistik
  let UserAnzahlBerechnung: number = userList.users.length;
  userAnzahlEl.textContent = UserAnzahlBerechnung.toString();
  //.textContent um die Zahl in HTML anzuzeigen, da textContent nur Strings akzeptiert.
  //.toString() um die Zahl in einen String umzuwandeln, damit sie in HTML angezeigt werden kann.

  //Aufgabe b)
  //erstellung einer Hilfsvariable die den Wert 0 hat
  let summeBuchstaben: number= 0;
  //Start der Schleife
  // geh die liste userList.users von oben nach unten durch und addiere die länge des Vornamens jedes Users zur Hilfsvariable summeBuchstaben
  for (const user of userList.users) {
    //addiert die Länge des Vornamens jedes Users zur Hilfsvariable summeBuchstaben
    // user.givenName.length gibt die Länge des Vornamens des aktuellen Users zurück
    summeBuchstaben += user.givenName.length;
    //hier endet die Schleife (Programm springt so lange hoch bis jeder Nutzer durchlaufen wurde)
  }
  //sicherheitsabfrage, dass die Liste nicht leer ist, um eine Division durch 0 zu vermeiden
  if (UserAnzahlBerechnung > 0) {
    // Durchschnitt berechnen: Gesamtsumme der Buchstaben geteilt durch die Anzahl der Nutzer
    let durchschnitt: number = summeBuchstaben / UserAnzahlBerechnung;

    // Das berechnete Ergebnis als Text in das HTML-Feld schreiben
    // Auch hier nutzen wir .toString(), weil .textContent nur reinen Text (Strings) akzeptiert
    VornameLaengeDurchEl.textContent = durchschnitt.toString();
  } else {
    // Falls die Liste komplett leer ist (0 Nutzer), wird direkt eine "0" ins HTML geschrieben
    VornameLaengeDurchEl.textContent = "0";
  }
}

function addMessage(message: string): void {
  const messagesEl: HTMLElement = document.getElementById("messages")!;

  let alertEl: HTMLElement = document.createElement("div")
  alertEl.classList.add("alert", "alert-warning", "alert-dismissible");
  alertEl.setAttribute("role", "alert");
  alertEl.textContent = message;
  messagesEl.appendChild(alertEl);

  let buttonEl: HTMLElement = document.createElement("button");
  buttonEl.className = "btn-close";
  buttonEl.addEventListener("click", () => {
    alertEl.remove();
  })
  alertEl.appendChild(buttonEl);

  setTimeout(() => {
    alertEl.remove();
  }, 5000);
}

let userList: UserList = new UserList();

document.addEventListener("DOMContentLoaded", (): void => {
  renderList();

  document.getElementById("add_user_form")!.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    let givenNameEl: HTMLInputElement = document.getElementById("add_user_given_name") as HTMLInputElement;
    let familyNameEl: HTMLInputElement = document.getElementById("add_user_family_name") as HTMLInputElement;
    let nickNameEl: HTMLInputElement = document.getElementById("add_user_nick_name") as HTMLInputElement;
    let givenName: string = givenNameEl.value;
    let familyName: string = familyNameEl.value;
    let nickName: string = nickNameEl.value;
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

  document.getElementById("edit_user_form")!.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    let indexEl: HTMLInputElement = document.getElementById("edit_user_id") as HTMLInputElement;
    let givenNameEl: HTMLInputElement = document.getElementById("edit_user_given_name") as HTMLInputElement;
    let familyNameEl: HTMLInputElement = document.getElementById("edit_user_family_name") as HTMLInputElement;
    let nickNameEl: HTMLInputElement = document.getElementById("edit_user_nick_name") as HTMLInputElement;

    //Werte aus den Input-Feldern speichern
    let givenName: string = givenNameEl.value;
    let familyName: string = familyNameEl.value;
    let nickName: string = nickNameEl.value;
    //Die Kontrolle ob die Felder leer sind, wird hier durchgeführt.
    //Wenn eines der Felder leer ist, wird eine Nachricht hinzugefügt und die Funktion beendet.
    if (givenName.trim().length == 0 || familyName.trim().length == 0 || nickName.trim().length == 0) {
      addMessage("Update canceled. All fields must be filled.");
      return;
    }
    //Das eigentliche Update des Users wird hier durchgeführt.
    let userId: number = parseInt(indexEl.value);
    userList.updateUser(userId, givenNameEl.value, familyNameEl.value, nickNameEl.value);
    renderList();
  });
});
