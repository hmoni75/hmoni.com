<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM faqs ORDER BY id ASC");
        $items = $stmt->fetchAll();
        foreach ($items as &$f) {
            $f['id'] = (int)$f['id'];
        }
        echo json_encode(["status" => "success", "data" => $items]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['question']) || empty($input['answer'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Question and Answer are required"]);
            exit();
        }

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE faqs SET question = ?, answer = ?, category = ? WHERE id = ?");
            $stmt->execute([
                $input['question'],
                $input['answer'],
                $input['category'] ?? 'General',
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "FAQ updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO faqs (question, answer, category) VALUES (?, ?, ?)");
            $stmt->execute([
                $input['question'],
                $input['answer'],
                $input['category'] ?? 'General'
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "FAQ created successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM faqs WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "FAQ deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
