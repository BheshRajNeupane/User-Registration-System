
import { showMessageModal } from "../show.js";

async function Login(data) {
  let response;
  try {
    response = await axios.post(
      "http://127.0.0.1:3000/api/users/login",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      showMessageModal("success", "Login successful!");
      window.location.href = "../users/userlist.html";
    } else {
      showMessageModal(
        "failure",
        response.data.message || "Invalid email or password"
      );
    }
  } catch (error) {
    console.error("Login error:", error);

    if (error.response) {
      if (error.response.status === 400) {
        showMessageModal(
          "failure",
          "Bad request. Please check your credentials and try again."
        );
      } else if (error.response.status === 401) {
        showMessageModal("failure", "Unauthorized. Invalid email or password.");
      } else if (error.response.status === 500) {
        showMessageModal("failure", "Server error. Please try again later.");
      } else {
        showMessageModal(
          "failure",
          "An unknown error occurred. Please try again."
        );
      }
    } else {
      showMessageModal(
        "failure",
        "An error occurred while setting up the request."
      );
    }
  }
}

$(document).ready(function () {
  $("#login-btn").on("click", async function (event) {
    event.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    if (!email || !password) {
      showMessageModal(
        "failure",
        "Please fill in both email and password fields."
      );
      return;
    }

    const data = { email, password };

    await Login(data);
  });
});
