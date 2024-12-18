<?php
header('Content-Type: application/json');
require '../config/connection.php';

try {
    $query = $pdo->prepare("SELECT id, date, start_time, end_time, status FROM attendance ORDER BY date DESC");
    $query->execute();

    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal mengambil data history absensi.', 'details' => $e->getMessage()]);
}
