<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM tech_stack ORDER BY id ASC");
        $items = $stmt->fetchAll();
        foreach ($items as &$t) {
            $t['id'] = (int)$t['id'];
        }
        echo json_encode(["status" => "success", "data" => $items]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['name'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Name is required"]);
            exit();
        }

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE tech_stack SET name = ?, category = ?, icon_url = ?, proficiency = ? WHERE id = ?");
            $stmt->execute([
                $input['name'],
                $input['category'] ?? 'Development',
                $input['icon_url'] ?? '',
                $input['proficiency'] ?? 'Advanced',
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Tech stack item updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO tech_stack (name, category, icon_url, proficiency) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['name'],
                $input['category'] ?? 'Development',
                $input['icon_url'] ?? '',
                $input['proficiency'] ?? 'Advanced'
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Tech stack item added successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM tech_stack WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Tech stack item deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
