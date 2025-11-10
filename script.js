// Select elements
const form = document.getElementById("regForm");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");
const modalMsg = document.getElementById("modalMsg");

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop default form submission

  const scriptURL = form.action; // your Google Apps Script Web App URL
  const formData = new FormData(form);

  try {
    // Send data to Google Apps Script
    const response = await fetch(scriptURL, { method: "POST", body: formData });
    const result = await response.json();

    if (result.result === "success") {
      // Show success message in modal
      modalMsg.textContent = "✅ Thank you! Your data has been successfully submitted.";
      modalBackdrop.classList.add("active");
      form.reset(); // Reset form fields
    } else {
      throw new Error(result.message || "Unknown error");
    }
  } catch (err) {
    modalMsg.textContent = "❌ Submission failed. Please try again later.";
    modalBackdrop.classList.add("active");
    console.error("Error:", err);
  }
});

// Close modal on click
closeModal.addEventListener("click", () => {
  modalBackdrop.classList.remove("active");
});
