import { fetchContacts, deleteContact } from "./database.js";

document.addEventListener("DOMContentLoaded", async () => {
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
});
