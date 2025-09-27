import { fetchContacts, deleteContact } from "./database.js";
import { updateContactBtn } from "./updateContact.js";

document.addEventListener("DOMContentLoaded", async () => {
  const sheet = document.getElementById("bottomSheet");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = sheet.querySelector(".save_btn");
  const sheetHeading = sheet.querySelector("h3");

  const urlParams = new URLSearchParams(window.location.search);
  const contactId = urlParams.get("id"); // URL se id le rahe hain

  if (!contactId) return; // agar id na mile to kuch na kare

  const contacts = await fetchContacts(); // saare contacts fetch karo
  const contact = contacts.find((c) => c.id.toString() === contactId);
  // matching contact

  if (!contact) return; // agar contact na mile to kuch na kare

  // UI update
  document.getElementById("avatarBig").textContent = (
    contact.first_name.charAt(0) || "?"
  ).toUpperCase();
  document.getElementById(
    "fullName"
  ).textContent = `${contact.first_name} ${contact.last_name}`;
  document.getElementById("phone").textContent =
    contact.number || "(No number)";
  document.getElementById("email").textContent = contact.email || "(No email)";

  document.getElementById("deleteBtn").addEventListener("click", async () => {
    await deleteContact(contact.id);
    window.location.href = "../index.html";
  });

  if (editBtn) {
    sheetHeading.textContent = "Edit Contact";
    saveBtn.textContent = "Update";
    editBtn.addEventListener("click", () => {
      sheet.classList.add("show");
    });

    saveBtn.addEventListener("click", async () => {
      await updateContactBtn(contactId, sheet);
      window.location.href = "../index.html";
    });
  }
});
