const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8Nxvhp4ClV_SzHgm0HXzCxSOxYqHDQjsuEG7ykekEZFFwpjhQdGxVi1YvfthjMpv2tA/exec";

import { db, collection, addDoc, getDocs } from "./firebase.js";

const donateForm = document.getElementById("donateForm");
const msg = document.getElementById("msg");
const itemsList = document.getElementById("itemsList");

const donationsRef = collection(db, "donations");

// --- Add Donation ---
if (donateForm) {
  donateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const item = {
      name: document.getElementById("itemName").value,
      category: document.getElementById("category").value,
      description: document.getElementById("description").value,
      location: document.getElementById("location").value,
      contact: document.getElementById("contact").value,
    };

    try {
  await fetch(SHEET_API_URL, {
  method: "POST",
  body: JSON.stringify(item),
  headers: { "Content-Type": "application/json" },
});

      msg.textContent = "🎉 Donation added successfully!";
      donateForm.reset();
    } catch (error) {
      msg.textContent = "⚠️ Error adding donation: " + error.message;
    }
  });
}
https://script.google.com/macros/s/AKfycbz8Nxvhp4ClV_SzHgm0HXzCxSOxYqHDQjsuEG7ykekEZFFwpjhQdGxVi1YvfthjMpv2tA/exec
// --- Display Donations ---
if (itemsList) {
  async function loadDonations() {
    const querySnapshot = await fetch(SHEET_API_URL);
    itemsList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Category:</strong> ${data.category}</p>
        <p>${data.description}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p>📞 ${data.contact}</p>
      `;
      itemsList.appendChild(card);
    });
  }
  loadDonations();
}
