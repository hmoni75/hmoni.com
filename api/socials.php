<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM social_links ORDER BY id ASC");
        $items = $stmt->fetchAll();
        foreach ($items as &$s) {
            $s['id'] = (int)$s['id'];
        }
        echo json_encode(["status" => "success", "data" => $items]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['platform']) || empty($input['url'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Platform and URL are required"]);
            exit();
        }

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE social_links SET platform = ?, url = ?, handle = ? WHERE id = ?");
            $stmt->execute([
                $input['platform'],
                $input['url'],
                $input['handle'] ?? '',
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Social link updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO social_links (platform, url, handle) VALUES (?, ?, ?)");
            $stmt->execute([
                $input['platform'],
                $input['url'],
                $input['handle'] ?? ''
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Social link added successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM social_links WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Social link deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
