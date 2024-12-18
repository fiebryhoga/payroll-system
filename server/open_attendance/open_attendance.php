<?php
require '../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $date = date('Y-m-d');
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];
    $current_datetime = date('Y-m-d H:i:s'); 

    $current_time = date('H:i:s');
    if ($start_time < $current_time) {
        echo json_encode(['error' => 'Waktu pembukaan absensi tidak valid.']);
        http_response_code(400);
        exit;
    }

    if ($end_time <= $start_time) {
        echo json_encode(['error' => 'Waktu penutupan harus setelah waktu pembukaan.']);
        http_response_code(400);
        exit;
    }

    $start_datetime = $date . ' ' . $start_time;
    $end_datetime = $date . ' ' . $end_time;

    try {
       
        $update_query = $pdo->prepare("
            UPDATE attendance
            SET status = 'inactive'
            WHERE CONCAT(date, ' ', end_time) < :current_datetime
            AND status = 'active'
        ");
        $update_query->execute([':current_datetime' => $current_datetime]);

        $insert_query = $pdo->prepare("
            INSERT INTO attendance (date, start_time, end_time, status)
            VALUES (:date, :start_time, :end_time, 'active')
        ");
        $insert_query->execute([
            ':date' => $date,
            ':start_time' => $start_datetime, 
            ':end_time' => $end_datetime, 
        ]);

        echo json_encode(['message' => 'Absensi berhasil dibuka. Absensi lama yang kedaluwarsa telah dinonaktifkan.']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Terjadi kesalahan pada server.', 'details' => $e->getMessage()]);
        http_response_code(500);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metode tidak diizinkan.']);
}
