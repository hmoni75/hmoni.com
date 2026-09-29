<?php
// Global CORS & Content-Type Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db_host = "localhost";
$db_user = "hmoni24";
$db_pass = "15HBF&~AVNqu";
$db_name = "hmoni24_hmoni.com";

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    // Try alternate DB name if dot in db name is escaped/sanitized by cPanel
    try {
        $db_name_alt = "hmoni24_hmonicom";
        $pdo = new PDO("mysql:host=$db_host;dbname=$db_name_alt;charset=utf8mb4", $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e2) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database Connection Failed: " . $e2->getMessage()]);
        exit();
    }
}
