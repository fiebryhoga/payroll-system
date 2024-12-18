document.addEventListener("DOMContentLoaded", function () {
  const izinContainer = document.getElementById("izinContainer");
  const permissionList = document.getElementById("permissionList");

  async function fetchPermissionData() {
    try {
      const response = await fetch("../../middleware/middleware_info_izin.php");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      izinContainer.innerHTML = ""; 

      if (data.success && data.data.length > 0) {
        renderPermissions(data.data);
      } else {
        izinContainer.innerHTML = "<p>Tidak ada pengajuan izin.</p>";
      }
    } catch (error) {
      izinContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  function renderPermissions(permissions) {
    permissionList.innerHTML = ""; 
    permissions.forEach((permission) => {
      const listItem = document.createElement("li");
      listItem.classList.add("permission-item");
      listItem.innerHTML = `
        <p><strong>Nama:</strong> ${permission.employee_name}</p>
        <p><strong>Alasan:</strong> ${permission.reason}</p>
        <p><strong>Tanggal Pengajuan:</strong> ${permission.request_date}</p>
        <p><strong>Status:</strong> ${permission.status}</p>
        <hr>
      `;
      permissionList.appendChild(listItem);
    });
  }

  fetchPermissionData();
});
