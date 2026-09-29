<?php
// Prevent CORS issues
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$pass = '15HBF&~AVNqu';

// Try combination of user and database names according to cPanel configuration
$dbCandidates = ['hmoni24_db', 'hmoni24_hmoni', 'hmoni24_hmoni.com', 'hmoni24_hmonicom'];
$userCandidates = ['hmoni24_hmoni24', 'hmoni24'];

$pdo = null;
$lastError = null;

foreach ($userCandidates as $u) {
    foreach ($dbCandidates as $d) {
        try {
            $pdo = new PDO("mysql:host=$host;dbname=$d;charset=utf8mb4", $u, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
            if ($pdo) {
                break 2;
            }
        } catch (PDOException $e) {
            $lastError = $e->getMessage();
        }
    }
}

if (!$pdo) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . ($lastError ?? "Unknown error")
    ]);
    exit();
}
