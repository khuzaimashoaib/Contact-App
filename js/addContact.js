import { addContact } from "./database.js";
import { loadAndRender } from "./fetchingData.js";

export async function addContactBtn(sheet) {
  // input elements
  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const numberInput = document.getElementById("phoneInput");
  const emailInput = document.getElementById("emailInput");

  // values
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const number = numberInput.value.trim();
  const email = emailInput.value.trim();

  // validation check
  if (!firstName || !number) {
    alert("Please fill all fields before saving.");
    return;
  }

  // save contact
  await addContact(firstName, lastName, number, email);

  // reload contacts
  loadAndRender();

  // close sheet
  sheet.classList.remove("show");

  // clear inputs
  firstNameInput.value = "";
  lastNameInput.value = "";
  numberInput.value = "";
  emailInput.value = "";
}
