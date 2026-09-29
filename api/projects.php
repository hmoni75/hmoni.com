<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id DESC");
        $projects = $stmt->fetchAll();
        foreach ($projects as &$p) {
            $p['id'] = (int)$p['id'];
            $p['featured'] = (bool)$p['featured'];
            $p['tags'] = !empty($p['tags_json']) ? json_decode($p['tags_json'], true) : [];
        }
        echo json_encode(["status" => "success", "data" => $projects]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['title'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Title is required"]);
            exit();
        }

        $tagsJson = is_array($input['tags'] ?? null) ? json_encode($input['tags']) : ($input['tags_json'] ?? '[]');

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE projects SET title = ?, category = ?, location = ?, size = ?, service = ?, link = ?, img = ?, status = ?, featured = ?, description = ?, tags_json = ? WHERE id = ?");
            $stmt->execute([
                $input['title'],
                $input['category'] ?? 'Architecture',
                $input['location'] ?? '',
                $input['size'] ?? '',
                $input['service'] ?? '',
                $input['link'] ?? '/portfolio-details-1',
                $input['img'] ?? '/assets/imgs/pages/home-13/sec-3-img-1.webp',
                $input['status'] ?? 'Published',
                !empty($input['featured']) ? 1 : 0,
                $input['description'] ?? '',
                $tagsJson,
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Project updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO projects (title, category, location, size, service, link, img, status, featured, description, tags_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['title'],
                $input['category'] ?? 'Architecture',
                $input['location'] ?? '',
                $input['size'] ?? '',
                $input['service'] ?? '',
                $input['link'] ?? '/portfolio-details-1',
                $input['img'] ?? '/assets/imgs/pages/home-13/sec-3-img-1.webp',
                $input['status'] ?? 'Published',
                !empty($input['featured']) ? 1 : 0,
                $input['description'] ?? '',
                $tagsJson
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Project created successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Project deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
