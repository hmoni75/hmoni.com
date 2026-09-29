<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM stats ORDER BY id ASC");
        $items = $stmt->fetchAll();
        foreach ($items as &$st) {
            $st['id'] = (int)$st['id'];
        }
        echo json_encode(["status" => "success", "data" => $items]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['label']) || !isset($input['number_value'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Label and Number Value are required"]);
            exit();
        }

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE stats SET stat_key = ?, label = ?, number_value = ?, suffix = ? WHERE id = ?");
            $stmt->execute([
                $input['stat_key'] ?? strtolower(str_replace(' ', '_', $input['label'])),
                $input['label'],
                (string)$input['number_value'],
                $input['suffix'] ?? '+',
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Stat updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO stats (stat_key, label, number_value, suffix) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['stat_key'] ?? strtolower(str_replace(' ', '_', $input['label'])),
                $input['label'],
                (string)$input['number_value'],
                $input['suffix'] ?? '+'
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Stat added successfully"]);
            exit();
        }
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'] ?? json_decode(file_get_contents('php://input'), true)['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID is required"]);
            exit();
        }
        $stmt = $pdo->prepare("DELETE FROM stats WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Stat deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
