import { showMessageModal } from "../show.js";
// const showMessageModal = function Modal (type, message) {
//     const modalTitle = $('#messageModalLabel');
//     const modalContent = $('#messageContent');

//     if (type === 'success') {
//         modalTitle.text('Success');
//         modalContent.text(message);
//         modalTitle.removeClass('text-danger').addClass('text-success');
//     } else if (type === 'failure') {
//         modalTitle.text('Failure');
//         modalContent.text(message);
//         modalTitle.removeClass('text-success').addClass('text-danger');
//     }
//      $('#messageModal').modal('show');
// }
async function Registration(data) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:3000/api/users/register",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.data.status === "success") {
      showMessageModal("success", "Successfully registered!");

      window.location.href = "../login/login.html";
    }
  } catch (error) {
    showMessageModal("failure", error.response.data.message);
    return;
  }
}

$(document).ready(function () {
  // Register button click event
  $("#register-btn").on("click", async function (event) {
    event.preventDefault();

    const email = $("#email").val();
    const name = $("#name").val();
    const phone = $("#phone").val();
    const password = $("#password").val();

    if (!email || !name || !phone || !password) {
      showMessageModal("failure", "All fields are required.");
      return;
    }

    const data = { email, name, phone, password };

    await Registration(data);
  });
});
