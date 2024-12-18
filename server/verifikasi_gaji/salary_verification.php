<?php
require '../config/connection.php'; 

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['name'], $data['month'], $data['daily_rate'], $data['bonus'], $data['deduction'], $data['total_salary'])
) {
    $name = $data['name'];
    $month = $data['month'];
    $dailyRate = $data['daily_rate'];
    $bonus = $data['bonus'];
    $deduction = $data['deduction'];
    $totalSalary = $data['total_salary'];

    try {
        $pdo = new PDO("mysql:host=localhost;dbname=your_database", "username", "password");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare(
            "INSERT INTO salary_verification (employee_name, month, daily_rate, bonus, deductions, total_salary)
            VALUES (:employee_name, :month, :daily_rate, :bonus, :deductions, :total_salary)"
        );

        $stmt->bindParam(':employee_name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':month', $month, PDO::PARAM_STR);
        $stmt->bindParam(':daily_rate', $dailyRate, PDO::PARAM_STR);
        $stmt->bindParam(':bonus', $bonus, PDO::PARAM_STR);
        $stmt->bindParam(':deductions', $deduction, PDO::PARAM_STR);
        $stmt->bindParam(':total_salary', $totalSalary, PDO::PARAM_STR);

        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Data tidak valid atau beberapa parameter kurang.']);
}
