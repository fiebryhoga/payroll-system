document.addEventListener("DOMContentLoaded", () => {
  const salaryForm = document.getElementById("salaryForm");
  const salaryResult = document.getElementById("salaryResult");

  salaryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const employeeName = document.getElementById("employeeName")?.value;
    const month = document.getElementById("month")?.value;
    const dailyRate = parseFloat(document.getElementById("dailyRate")?.value);
    const bonus = parseFloat(document.getElementById("bonus")?.value);
    const deduction = parseFloat(document.getElementById("potongan")?.value);

    if (
      !employeeName ||
      !month ||
      isNaN(dailyRate) ||
      isNaN(bonus) ||
      isNaN(deduction)
    ) {
      salaryResult.textContent = "Harap isi semua bidang dengan benar.";
      return;
    }

    try {
      const response = await fetch(
        "../../middleware/middleware_salary_calculator.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: employeeName,
            month: month,
            daily_rate: dailyRate,
            bonus: bonus,
            deduction: deduction,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const { attendance_details, salary_details } = data;
        salaryResult.innerHTML = `
          <h3>Detail Absensi:</h3>
          <ul>
            ${attendance_details
              .map(
                (record) => `<li>${record.date} - Status: ${record.status}</li>`
              )
              .join("")}
          </ul>
          <h3>Perhitungan Gaji:</h3>
          <p>Total Hari Kerja: ${salary_details.total_days}</p>
          <p>Gaji Pokok: Rp ${salary_details.base_salary.toLocaleString()}</p>
          <p>Bonus: Rp ${salary_details.bonus.toLocaleString()}</p>
          <p>Potongan: Rp ${salary_details.deduction.toLocaleString()}</p>
          <p>Total Gaji: Rp ${salary_details.total_salary.toLocaleString()}</p>
        `;
      } else {
        salaryResult.textContent = `Error: ${data.message}`;
      }
    } catch (error) {
      salaryResult.textContent = `Terjadi kesalahan: ${error.message}`;
    }
  });

  document
    .getElementById("verifySalary")
    ?.addEventListener("click", async function () {
      const employeeName = document.getElementById("employeeName")?.value;
      const month = document.getElementById("month")?.value;
      const dailyRate = parseFloat(document.getElementById("dailyRate")?.value);
      const bonus = parseFloat(document.getElementById("bonus")?.value);
      const deductions = parseFloat(document.getElementById("potongan")?.value);

      if (
        !employeeName ||
        !month ||
        isNaN(dailyRate) ||
        isNaN(bonus) ||
        isNaN(deduction)
      ) {
        document.getElementById("salaryResult").innerText =
          "Error: Semua input wajib diisi.";
        return;
      }

      try {
        const salaryCalculationResponse = await fetch(
          "../../middleware/middleware_salary_calculator.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              dailyRate,
              bonus,
              deductions,
            }),
          }
        );

        const calculationData = await salaryCalculationResponse.json();

        if (calculationData.success) {
          const totalSalary = calculationData.totalSalary;

          const verificationResponse = await fetch(
            "../../server/verifikasi_gaji/salary_verification.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                employeeName,
                month,
                dailyRate,
                bonus,
                deductions,
                totalSalary,
              }),
            }
          );
          console.log({
            name: employeeName,
            month: month,
            daily_rate: dailyRate,
            bonus: bonus,
            deduction: deduction,
          });

          const verificationData = await verificationResponse.json();
          if (verificationData.success) {
            document.getElementById("salaryResult").innerText =
              verificationData.message;
          } else {
            document.getElementById("salaryResult").innerText =
              "Error: " + verificationData.message;
          }
        } else {
          document.getElementById("salaryResult").innerText =
            "Error: Gagal menghitung gaji.";
        }
      } catch (error) {
        document.getElementById("salaryResult").innerText =
          "Error: Terjadi kesalahan saat menghubungi server.";
        console.error(error);
      }
    });
});
