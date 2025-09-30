import { loadAndRender } from "./fetchingData.js";
import { addContactBtn } from "./addContact.js";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add_contact_btn");
  const sheet = document.getElementById("bottomSheet");
  const closeBtn = document.getElementById("closeSheet");
  const editBtn = document.getElementById("editBtn");
  const sheetHeading = sheet.querySelector("h3");
  const saveBtn = sheet.querySelector(".save_btn"); // save button

  if (addBtn) {
    sheetHeading.textContent = "Add Contact";
    saveBtn.textContent = "Save";
    addBtn.addEventListener("click", () => sheet.classList.add("show"));

    saveBtn.addEventListener("click", () => {
      addContactBtn(sheet);
    });
  }

  closeBtn.addEventListener("click", () => {
    sheet.classList.remove("show");
  });

  loadAndRender();
});
