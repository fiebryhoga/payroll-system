CREATE DATABASE PAYROLL_SYSTEM;

USE PAYROLL_SYSTEM;



CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('active', 'inactive') NOT NULL
);

CREATE TABLE IF NOT EXISTS salary_verification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(255) NOT NULL,
    month INT NOT NULL,
    daily_rate DECIMAL(10, 2) NOT NULL,
    bonus DECIMAL(10, 2) NOT NULL,
    deductions DECIMAL(10, 2) NOT NULL,
    verification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);