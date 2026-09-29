<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
        $rows = $stmt->fetchAll();
        $settings = [];
        foreach ($rows as $row) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
        echo json_encode(["status" => "success", "data" => $settings]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "No settings data provided"]);
            exit();
        }

        $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
        foreach ($input as $key => $val) {
            $stmt->execute([$key, is_array($val) ? json_encode($val) : (string)$val]);
        }

        echo json_encode(["status" => "success", "message" => "Settings updated successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
