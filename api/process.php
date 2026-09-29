<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM process_steps ORDER BY id ASC");
        $steps = $stmt->fetchAll();
        foreach ($steps as &$s) {
            $s['id'] = (int)$s['id'];
            $s['desc'] = $s['desc_text'];
            $s['tags'] = !empty($s['tags_json']) ? json_decode($s['tags_json'], true) : [];
        }
        echo json_encode(["status" => "success", "data" => $steps]);
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
            $stmt = $pdo->prepare("UPDATE process_steps SET step_num = ?, title = ?, desc_text = ?, tags_json = ? WHERE id = ?");
            $stmt->execute([
                $input['step_num'] ?? '01',
                $input['title'],
                $input['desc'] ?? $input['desc_text'] ?? '',
                is_array($input['tags'] ?? null) ? json_encode($input['tags']) : ($input['tags_json'] ?? '[]'),
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Process step updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO process_steps (step_num, title, desc_text, tags_json) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['step_num'] ?? '01',
                $input['title'],
                $input['desc'] ?? $input['desc_text'] ?? '',
                is_array($input['tags'] ?? null) ? json_encode($input['tags']) : ($input['tags_json'] ?? '[]')
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Process step created successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM process_steps WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Process step deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
