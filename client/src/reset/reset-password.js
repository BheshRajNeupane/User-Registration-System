import { showMessageModal } from "../show.js";

async function Reset(data) {
  try {
    const response = await axios.patch(
      "http://127.0.0.1:3000/api/users/password-reset",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.data.status === "success") {
      showMessageModal("success", "Successfully reset !");

      window.location.href = "../login/login.html";
    }
  } catch (error) {
    console.log(error);

    showMessageModal("failure", error.response.data.message);
    return;
  }
}

$(document).ready(function () {
  // Register button click event
  $("#reset-btn").on("click", async function (event) {
    event.preventDefault();

    const email = $("#email").val();
    const currentPassword = $("#password").val();
    const newPassword = $("#newpassword").val();

    if (!email || !currentPassword || !newPassword) {
      showMessageModal("failure", "All fields are required.");
      return;
    }

    const data = { email, currentPassword, newPassword };

    await Reset(data);
  });
});
