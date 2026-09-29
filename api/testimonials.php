<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY id DESC");
        $items = $stmt->fetchAll();
        foreach ($items as &$t) {
            $t['id'] = (int)$t['id'];
            $t['stars'] = (int)$t['stars'];
        }
        echo json_encode(["status" => "success", "data" => $items]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['author']) || empty($input['content'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Author and Content are required"]);
            exit();
        }

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE testimonials SET author = ?, role = ?, company = ?, content = ?, avatar = ?, stars = ? WHERE id = ?");
            $stmt->execute([
                $input['author'],
                $input['role'] ?? '',
                $input['company'] ?? '',
                $input['content'],
                $input['avatar'] ?? '',
                (int)($input['stars'] ?? 5),
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Testimonial updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO testimonials (author, role, company, content, avatar, stars) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['author'],
                $input['role'] ?? '',
                $input['company'] ?? '',
                $input['content'],
                $input['avatar'] ?? '',
                (int)($input['stars'] ?? 5)
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Testimonial added successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Testimonial deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
