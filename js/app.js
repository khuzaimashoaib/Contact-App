import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./database.js";

document.querySelectorAll(".contact_detailes").forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("data-id");
    window.location.href = `./pages/contact.html?id=${id}`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add_contact_btn");
  const sheet = document.getElementById("bottomSheet");
  const closeBtn = document.getElementById("closeSheet");
  const editBtn = document.getElementById("editBtn");
  const sheetHeading = sheet.querySelector("h3");

  if (addBtn) {
    sheetHeading.textContent = "Add Contact";
    addBtn.addEventListener("click", () => sheet.classList.add("show"));
  }

  if (editBtn) {
    sheetHeading.textContent = "Edit Contact";
    editBtn.addEventListener("click", () => sheet.classList.add("show"));
  }

  closeBtn.addEventListener("click", () => {
    sheet.classList.remove("show");
  });
});

// (async () => {

// //   const contacts = await fetchContacts();
//   console.log(contacts);

// })();
