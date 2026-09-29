<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id DESC");
        $projects = $stmt->fetchAll();
        // Convert integer fields
        foreach ($projects as &$p) {
            $p['id'] = (int)$p['id'];
            $p['featured'] = (bool)$p['featured'];
        }
        echo json_encode(["status" => "success", "data" => $projects]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            $input = $_POST;
        }

        if (empty($input['title'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Title is required"]);
            exit();
        }

        $stmt = $pdo->prepare("INSERT INTO projects (title, category, location, size, service, link, img, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['title'],
            $input['category'] ?? 'UI/UX & Branding',
            $input['location'] ?? 'Khulna, Bangladesh',
            $input['size'] ?? 'Custom Web App',
            $input['service'] ?? 'Full-Stack Engineering',
            $input['link'] ?? '/portfolio-details-1',
            $input['img'] ?? '/assets/imgs/pages/home-13/sec-3-img-1.webp',
            $input['status'] ?? 'Published',
            isset($input['featured']) ? ($input['featured'] ? 1 : 0) : 1
        ]);

        $newId = $pdo->lastInsertId();
        echo json_encode(["status" => "success", "id" => (int)$newId, "message" => "Project created successfully"]);
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
            echo json_encode(["status" => "error", "message" => "ID is required for deletion"]);
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
