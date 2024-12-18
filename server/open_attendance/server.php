<?php

// Sertakan file konfigurasi dan kelas layanan
require '../config/connectionServertoDatabase.php';
require 'AttendanceService.php';

try {
    if (!isset($pdo)) {
        throw new Exception("Koneksi ke database tidak tersedia.");
    }

    $service = new AttendanceService($pdo);

    $server = new SoapServer('attendanceService.wsdl');

    $server->setObject($service);

    $server->handle();

} catch (Exception $e) {
    echo "SOAP Server Error: " . $e->getMessage();
}
