<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        if (!empty($_GET['slug'])) {
            $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = ? LIMIT 1");
            $stmt->execute([$_GET['slug']]);
            $blog = $stmt->fetch();
            if ($blog) {
                $blog['id'] = (int)$blog['id'];
                echo json_encode(["status" => "success", "data" => $blog]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Blog post not found"]);
            }
            exit();
        }

        $stmt = $pdo->query("SELECT * FROM blogs ORDER BY id DESC");
        $items = $stmt->fetchAll();
        foreach ($items as &$b) {
            $b['id'] = (int)$b['id'];
        }
        echo json_encode(["status" => "success", "data" => $items]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        if (empty($input['title'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Title is required"]);
            exit();
        }

        $slug = !empty($input['slug']) ? $input['slug'] : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title'])));

        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE blogs SET title = ?, slug = ?, category = ?, author = ?, date_str = ?, img = ?, excerpt = ?, content = ? WHERE id = ?");
            $stmt->execute([
                $input['title'],
                $slug,
                $input['category'] ?? 'UI / UX Design',
                $input['author'] ?? 'H Moni',
                $input['date_str'] ?? date('F j, Y'),
                $input['img'] ?? '/assets/imgs/pages/img-201.webp',
                $input['excerpt'] ?? '',
                $input['content'] ?? '',
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Blog post updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO blogs (title, slug, category, author, date_str, img, excerpt, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['title'],
                $slug,
                $input['category'] ?? 'UI / UX Design',
                $input['author'] ?? 'H Moni',
                $input['date_str'] ?? date('F j, Y'),
                $input['img'] ?? '/assets/imgs/pages/img-201.webp',
                $input['excerpt'] ?? '',
                $input['content'] ?? ''
            ]);
            echo json_encode(["status" => "success", "id" => (int)$pdo->lastInsertId(), "message" => "Blog post created successfully"]);
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
        $stmt = $pdo->prepare("DELETE FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Blog post deleted successfully"]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
