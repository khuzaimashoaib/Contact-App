import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./database.js";


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
  }

  if (editBtn) {
    sheetHeading.textContent = "Edit Contact";
    saveBtn.textContent = "Update";
    editBtn.addEventListener("click", () => sheet.classList.add("show"));
  }

  closeBtn.addEventListener("click", () => {
    sheet.classList.remove("show");
  });

  const contactList = document.getElementById("contactList");

  function renderContacts(contacts) {
    contactList.innerHTML = ""; // clear old list

    if (!contacts || contacts.length === 0) {
      contactList.innerHTML = "<p>No contacts available.</p>";
      return;
    }

    contacts.sort((a, b) => {
      const A = (a.first_name || "").toString().toLowerCase();
      const B = (b.first_name || "").toString().toLowerCase();
      return A.localeCompare(B);
    });

    let lastLetter = "";
    let currentInfoMain = null;

    contacts.forEach((c, index) => {
      const name = ((c.first_name || "") + " " + (c.last_name || "")).trim();
      const letter = (name.charAt(0) || "#").toUpperCase();

      // add heading when letter changes
      if (letter !== lastLetter) {
        const h = document.createElement("h4");
        h.textContent = letter;
        contactList.appendChild(h);

        const card = document.createElement("div");
        card.className = "contact_card";
        currentInfoMain = document.createElement("div");
        currentInfoMain.className = "contact_info_main";

        card.appendChild(currentInfoMain);
        contactList.appendChild(card);

        lastLetter = letter;
      }

      const detail = document.createElement("div");
      detail.className = "contact_detailes";

      detail.setAttribute("data-id", c.id);

      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = (name.charAt(0) || "?").toUpperCase();

      const detailsDiv = document.createElement("div");
      detailsDiv.className = "details";

      const h3 = document.createElement("h3");
      h3.className = "name";
      h3.textContent = name || "(No name)";

      detailsDiv.appendChild(h3);

      detail.appendChild(avatar);
      detail.appendChild(detailsDiv);

      currentInfoMain.appendChild(detail);

      const next = contacts[index + 1];
      const nextLetter = next
        ? ((next.first_name || "").charAt(0) || "#").toUpperCase()
        : null;
      if (next && nextLetter === letter) {
        const divider = document.createElement("div");
        divider.className = "details_divider";
        currentInfoMain.appendChild(divider);
      }

      detail.addEventListener("click", async () => {
        await deleteContact(c.id);
        await loadAndRender();

        // window.location.href = `./pages/contact.html?id=${c.id}`;
      });
    });
  }

  async function loadAndRender() {
    contactList.innerHTML = "<p>Loading...</p>";
    try {
      const contacts = await fetchContacts(); // from database.js
      renderContacts(contacts);
      console.log(contacts);
    } catch (err) {
      console.error(err);
      contactList.innerHTML = "<p>Error loading contacts.</p>";
    }
  }



  loadAndRender();
});

// (async () => {

// //   const contacts = await fetchContacts();
//   console.log(contacts);

// })();
