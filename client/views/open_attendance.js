const openAttendanceButton = document.getElementById("openAttendance");
const attendanceForm = document.getElementById("attendanceForm");
const attendanceStatus = document.getElementById("attendanceStatus");
const submitAttendanceButton = document.getElementById("submitAttendance");
const endTimeInput = document.getElementById("endTime");
const activeAttendanceList = document.getElementById("activeAttendanceList");
const viewHistoryButton = document.getElementById("viewHistory");
const historyModal = document.getElementById("historyModal");
const historyList = document.getElementById("historyList");
const closeHistoryButton = document.getElementById("closeHistory");

openAttendanceButton.addEventListener("click", () => {
  attendanceForm.style.display = "block";
});

submitAttendanceButton.addEventListener("click", () => {
  const endTime = endTimeInput.value;
  const startTime = new Date().toLocaleTimeString("en-GB");

  if (!endTime) {
    alert("Mohon masukkan waktu tutup absensi.");
    return;
  }

  if (endTime <= startTime) {
    alert("Waktu penutupan harus lebih besar dari waktu saat ini.");
    return;
  }

  fetch("../../server/open_attendance/open_attendance.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `start_time=${startTime}&end_time=${endTime}`,
  })
    .then((response) => {
      if (!response.ok) throw new Error("Gagal membuka absensi.");
      return response.json();
    })
    .then((data) => {
      alert(data.message || "Absensi berhasil dibuka.");
      attendanceForm.style.display = "none";
      attendanceStatus.textContent = "Status: Dibuka";
      loadActiveAttendance();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message || "Terjadi kesalahan.");
    });
});

function loadActiveAttendance() {
  fetch("../../server/open_attendance/get_active_attendance.php")
    .then((response) => response.json())
    .then((data) => {
      activeAttendanceList.innerHTML = ""; 
      if (data.length === 0) {
        activeAttendanceList.innerHTML = "<li>Tidak ada absensi aktif.</li>";
        attendanceStatus.textContent = "Status: Tidak Ada Absensi Aktif";
        return;
      }

      data.forEach((attendance) => {
        const li = document.createElement("li");
        li.textContent = `Tanggal: ${attendance.date}, Dibuka: ${attendance.start_time}, Ditutup: ${attendance.end_time}`;
        activeAttendanceList.appendChild(li);
      });

      attendanceStatus.textContent = "Status: Ada Absensi Aktif";
    })
    .catch((error) => console.error("Error:", error));
}

viewHistoryButton.addEventListener("click", () => {
  historyModal.style.display = "flex";
  loadHistoryAttendance();
});

closeHistoryButton.addEventListener("click", () => {
  historyModal.style.display = "none";
});

function loadHistoryAttendance() {
  fetch("../../server/open_attendance/get_attendance_history.php")
    .then((response) => response.json())
    .then((data) => {
      historyList.innerHTML = ""; 
      data.forEach((attendance) => {
        const li = document.createElement("li");
        li.textContent = `Tanggal: ${attendance.date}, Dibuka: ${attendance.start_time}, Ditutup: ${attendance.end_time},
        Status: ${attendance.status}`;
        historyList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadActiveAttendance();
});
