<?php
header('Content-Type: application/json');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (
    !isset($input['name']) ||
    !isset($input['month']) ||
    !isset($input['daily_rate']) ||
    !isset($input['bonus']) ||
    !isset($input['deduction'])
) {
    echo json_encode(['success' => false, 'message' => 'Parameter nama, bulan, gaji per hari, bonus, dan potongan diperlukan.']);
    exit;
}

$name = $input['name'];
$month = $input['month'];
$daily_rate = floatval($input['daily_rate']);
$bonus = floatval($input['bonus']);
$deduction = floatval($input['deduction']);

function fetchAttendanceData($name, $month)
{
    $api_url = "http://localhost/attendance_management_system/server/save_attendance/server.php?name=" . urlencode($name) . "&month=" . urlencode($month);

    try {
        $response = file_get_contents($api_url);
        if ($response === false) {
            throw new Exception("Gagal terhubung ke API.");
        }

        $data = json_decode($response, true);
        if (!$data['success']) {
            throw new Exception($data['message']);
        }

        return $data['data'];
    } catch (Exception $e) {
        return ['error' => true, 'message' => $e->getMessage()];
    }
}

$attendanceResponse = fetchAttendanceData($name, $month);
if (isset($attendanceResponse['error'])) {
    echo json_encode(['success' => false, 'message' => $attendanceResponse['message']]);
    exit;
}

function calculateSalary($attendanceData, $daily_rate, $bonus, $deduction)
{
    $total_days = count($attendanceData); 
    $base_salary = $total_days * $daily_rate;
    $total_salary = $base_salary + $bonus - $deduction;

    return [
        'total_days' => $total_days,
        'base_salary' => $base_salary,
        'bonus' => $bonus,
        'deduction' => $deduction,
        'total_salary' => $total_salary,
    ];
}

$salaryDetails = calculateSalary($attendanceResponse, $daily_rate, $bonus, $deduction);

echo json_encode([
    'success' => true,
    'attendance_details' => $attendanceResponse,
    'salary_details' => $salaryDetails,
]);
