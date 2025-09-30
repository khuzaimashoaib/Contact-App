import { addContact } from "./database.js";
import { loadAndRender } from "./fetchingData.js";
import { withSpinner, showToast } from "./utils.js";

export async function addContactBtn(sheet) {
  // input elements
  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const numberInput = document.getElementById("phoneInput");
  const emailInput = document.getElementById("emailInput");
  const saveBtn = document.getElementById("saveBtn");

  // values
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const number = numberInput.value.trim();
  const email = emailInput.value.trim();

  // validation check
  if (!firstName) {
    showToast("First name is required!", 2000);
    return;
  }

  if (!number) {
    showToast("Phone number is required!", 2000);
    return;
  }

  withSpinner(saveBtn, "Saving...", async () => {
    await addContact(firstName, lastName, number, email);
    await loadAndRender();
    sheet.classList.remove("show");

    firstNameInput.value = "";
    lastNameInput.value = "";
    numberInput.value = "";
    emailInput.value = "";
    showToast("Contact added successfully!");
  });
}
