<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM experience ORDER BY id DESC");
        $items = $stmt->fetchAll();
        foreach ($items as &$e) {
            $e['id'] = (int)$e['id'];
        }
        echo json_encode(["status" => "success", "data" => $items]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['role']) || empty($input['company'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Role and Company are required"]);
            exit();
        }

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE experience SET period = ?, role = ?, company = ?, description = ? WHERE id = ?");
            $stmt->execute([
                $input['period'] ?? '2023 — Present',
                $input['role'],
                $input['company'],
                $input['description'] ?? '',
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Experience item updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO experience (period, role, company, description) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['period'] ?? '2023 — Present',
                $input['role'],
                $input['company'],
                $input['description'] ?? ''
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Experience item added successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM experience WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Experience item deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
