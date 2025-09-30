import { updateContact, fetchContacts } from "./database.js";
import { withSpinner, showToast } from "./utils.js";

export async function updateContactBtn(contactId, sheet) {
  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const numberInput = document.getElementById("phoneInput");
  const emailInput = document.getElementById("emailInput");

  const updateBtn = document.querySelector("#updateBtn"); // spinner button

  const contacts = await fetchContacts();
  const oldContact = contacts.find((c) => c.id.toString() === contactId);

  if (!oldContact) {
    alert("Contact not found!");
    return;
  }

  const firstName = firstNameInput.value.trim() || oldContact.first_name;
  const lastName = lastNameInput.value.trim() || oldContact.last_name;
  const number = numberInput.value.trim() || oldContact.number;
  const email = emailInput.value.trim() || oldContact.email;

  await withSpinner(
    updateBtn,
    "Updating...",
    async () => {
      await updateContact(contactId, firstName, lastName, number, email);
      sheet.classList.remove("show");

      firstNameInput.value = "";
      lastNameInput.value = "";
      numberInput.value = "";
      emailInput.value = "";
      setTimeout(() => {
      window.location.reload();
    },1000); 
    },
    2000
  );
}
