
$(document).ready(function () {
  const apiUrl = "http://127.0.0.1:3000/api/users";

  // Load users and populate the table
  async function loadUsers() {
    try {
      const response = await axios.get(apiUrl);
      const users = response.data.data;
      const tableBody = $("#userTable tbody");
      tableBody.empty();

      users.forEach((user, index) => {
        const row = `
                        <tr data-id="${user._id}" data-name="${
          user.name
        }" data-email="${user.email}" data-phone="${user.phone}">
                            <td>${index + 1}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>
                                <button class="btn btn-sm btn-primary edit-btn">Edit</button>
                                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                            </td>
                        </tr>`;
        tableBody.append(row);
      });
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  // Show user details  on row click ( popup)
  $("#userTable").on("click", "tr", function (event) {
    if ($(event.target).is("button")) return;

    const userId = $(this).data("id");
    const name = $(this).data("name");
    const email = $(this).data("email");
    const phone = $(this).data("phone");

    if (userId && name && email && phone) {
      $("#modalUserId").val(userId);
      $("#modalName").val(name).prop("readonly", true);
      $("#modalEmail").val(email).prop("readonly", true);
      $("#modalPhone").val(phone).prop("readonly", true);

      $("#saveChanges").addClass("d-none");
      $("#userModalLabel").text("User Details");
      $("#userModal").modal("show");
    }
  });

  // Open editable modal for editing when Edit button is clicked
  $("#userTable").on("click", ".edit-btn", function (event) {
    event.stopPropagation();

    const userId = $(this).closest("tr").data("id");
    const name = $(this).closest("tr").data("name");
    const email = $(this).closest("tr").data("email");
    const phone = $(this).closest("tr").data("phone");

    if (userId && name && email && phone) {
      $("#modalUserId").val(userId);
      $("#modalName").val(name).prop("readonly", false);
      $("#modalEmail").val(email).prop("readonly", false);
      $("#modalPhone").val(phone).prop("readonly", false);

      $("#saveChanges").removeClass("d-none");
      $("#userModalLabel").text("Edit User Details");
      $("#userModal").modal("show");
    }
  });

  // Save changes from modal
  $("#saveChanges").on("click", async function () {
    const userId = $("#modalUserId").val();
    const updatedName = $("#modalName").val();
    const updatedEmail = $("#modalEmail").val();
    const updatedPhone = $("#modalPhone").val();

    try {
      const res = await axios.patch(`${apiUrl}/${userId}`, {
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
      });

      $("#userModal").modal("hide");

      loadUsers();
    } catch (error) {
      console.error("Error saving user details:", error);
      alert(error.response.data.message);
    }
  });

  // Delete button functionality
  $("#userTable").on("click", ".delete-btn", async function (event) {
    event.stopPropagation();

    const userId = $(this).closest("tr").data("id");
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${apiUrl}/${userId}`);
        loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(error.response.data.message);
      }
    }
  });

  loadUsers();
});
