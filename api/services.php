<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM services ORDER BY id ASC");
        $services = $stmt->fetchAll();
        foreach ($services as &$s) {
            $s['id'] = (int)$s['id'];
            $s['desc'] = $s['desc_text'];
            $s['tags'] = !empty($s['tags_json']) ? json_decode($s['tags_json'], true) : [];
        }
        echo json_encode(["status" => "success", "data" => $services]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['title'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Title is required"]);
            exit();
        }

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE services SET num = ?, title = ?, desc_text = ?, tags_json = ?, delay = ? WHERE id = ?");
            $stmt->execute([
                $input['num'] ?? '01',
                $input['title'],
                $input['desc'] ?? $input['desc_text'] ?? '',
                is_array($input['tags'] ?? null) ? json_encode($input['tags']) : ($input['tags_json'] ?? '[]'),
                $input['delay'] ?? '0.05',
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Service updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO services (num, title, desc_text, tags_json, delay) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['num'] ?? '01',
                $input['title'],
                $input['desc'] ?? $input['desc_text'] ?? '',
                is_array($input['tags'] ?? null) ? json_encode($input['tags']) : ($input['tags_json'] ?? '[]'),
                $input['delay'] ?? '0.05'
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Service created successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Service deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
