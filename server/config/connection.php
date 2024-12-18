<?php
// Konfigurasi Database
$host = ($_SERVER['SERVER_NAME'] === 'localhost') ? '127.0.0.1' : 'localhost';
$dbname = 'payroll_system';
$username = 'root';
$password = 'yhogaganteng';

try {
    $pdo = new PDO("mysql:host=$host;port=3306;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
