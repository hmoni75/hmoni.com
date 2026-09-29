<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM messages ORDER BY id DESC");
        $messages = $stmt->fetchAll();
        foreach ($messages as &$m) {
            $m['id'] = (int)$m['id'];
            $m['read'] = (bool)$m['is_read'];
            $m['date'] = $m['date_str'] ?: date("M d, Y");
        }
        echo json_encode(["status" => "success", "data" => $messages]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            $input = $_POST;
        }

        if (empty($input['email']) || empty($input['message'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Email and message are required"]);
            exit();
        }

        $stmt = $pdo->prepare("INSERT INTO messages (name, email, phone, message, date_str, is_read, location) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['name'] ?? 'Anonymous Visitor',
            $input['email'],
            $input['phone'] ?? '',
            $input['message'],
            $input['date'] ?? date("M d, Y, g:i a"),
            0,
            $input['location'] ?? 'Web Visitor'
        ]);

        $newId = $pdo->lastInsertId();
        echo json_encode(["status" => "success", "id" => (int)$newId, "message" => "Inquiry sent successfully"]);
        exit();
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'] ?? null;
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID is required"]);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Message deleted successfully"]);
        exit();
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
