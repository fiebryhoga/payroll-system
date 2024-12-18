<?php

$wsdl = "http://localhost/attendance_management_system/server/permission_attendance/attendanceIzin.wsdl";

try {
    $client = new SoapClient($wsdl);

    $izinInfo = $client->getIzinInfo();

    header('Content-Type: application/json');

    echo json_encode($izinInfo, JSON_PRETTY_PRINT);

} catch (SoapFault $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}
