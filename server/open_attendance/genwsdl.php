<?php
require "vendor/autoload.php";
require "AttendanceService.php";

$gen = new \PHP2WSDL\PHPClass2WSDL("AttendanceService",
    "http://localhost/payroll_system/server/open_attendance/server.php");

    
$gen->generateWSDL();
file_put_contents("attendanceService.wsdl", $gen->dump());
echo "Done!";


echo "WSDL generated successfully!";
