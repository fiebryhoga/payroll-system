<?php
require '../config/connectionServerToDatabase.php';

class AttendanceService
{
    private $pdo;

    public function __construct()
    {
        global $pdo;
        $this->pdo = $pdo;
    }


    /**
     * Mendapatkan seluruh riwayat absensi.
     * @return array Data riwayat attendance.
     * @throws SoapFault
     */
    public function getAttendanceHistory()
    {
        try {
            $query = $this->pdo->prepare("
                SELECT id, date, start_time, end_time, status
                FROM attendance
                ORDER BY date DESC
            ");
            $query->execute();

            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return ["message" => "Tidak ada riwayat absensi ditemukan."];
            }

            return $result;
        } catch (PDOException $e) {
            throw new SoapFault("Server", "Gagal mengambil data riwayat absensi: " . $e->getMessage());
        }
    }

    /**
     * Mendapatkan data absensi yang statusnya aktif.
     * @return array Data absensi aktif.
     * @throws SoapFault
     */
    public function getActiveAttendance()
    {
        try {
            $query = $this->pdo->prepare("
                SELECT id, date, start_time, end_time
                FROM attendance
                WHERE status = 'active'
            ");
            $query->execute();

            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return ["message" => "Tidak ada absensi aktif ditemukan."];
            }

            return $result;
        } catch (PDOException $e) {
            throw new SoapFault("Server", "Gagal mengambil data absensi aktif: " . $e->getMessage());
        }
    }
}
