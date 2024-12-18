// document.getElementById("verifySalary").addEventListener("click", function () {
//   const employeeName = document.getElementById("employeeName").value;
//   const month = document.getElementById("month").value;
//   const dailyRate = document.getElementById("dailyRate").value;
//   const bonus = document.getElementById("bonus").value;
//   const deductions = document.getElementById("potongan").value;

//   // Validasi input
//   if (!employeeName || !month || !dailyRate || !bonus || !deductions) {
//     document.getElementById("salaryResult").innerText =
//       "Error: Semua input wajib diisi.";
//     return;
//   }

//   // Kirim data ke server menggunakan fetch
//   fetch("../../server/verifikasi_gaji/salary_verification.php", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       employeeName: employeeName,
//       month: month,
//       dailyRate: dailyRate,
//       bonus: bonus,
//       deductions: deductions,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json(); // Parsing JSON secara langsung
//     })
//     .then((data) => {
//       // Menampilkan pesan sukses atau error berdasarkan respons
//       if (data.success) {
//         document.getElementById("salaryResult").innerText = data.message;
//       } else {
//         document.getElementById("salaryResult").innerText =
//           "Error: " + data.message;
//       }
//     })
//     .catch((error) => {
//       document.getElementById("salaryResult").innerText =
//         "Error: Terjadi kesalahan saat menghubungi server.";
//       console.error(error);
//     });
// });
