<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM hero_tiles ORDER BY id ASC");
        $tiles = $stmt->fetchAll();
        foreach ($tiles as &$t) {
            $t['id'] = (int)$t['id'];
        }
        echo json_encode(["status" => "success", "data" => $tiles]);
        exit();
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            $input = $_POST;
        }

        if (empty($input['img'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Image is required"]);
            exit();
        }

        // If editing existing
        if (!empty($input['id'])) {
            $stmt = $pdo->prepare("UPDATE hero_tiles SET title = ?, img = ?, mod = ? WHERE id = ?");
            $stmt->execute([
                $input['title'] ?? '',
                $input['img'],
                $input['mod'] ?? 'brand-1',
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Hero photo updated successfully"]);
            exit();
        } else {
            $stmt = $pdo->prepare("INSERT INTO hero_tiles (title, img, mod) VALUES (?, ?, ?)");
            $stmt->execute([
                $input['title'] ?? '',
                $input['img'],
                $input['mod'] ?? 'brand-1'
            ]);
            $newId = $pdo->lastInsertId();
            echo json_encode(["status" => "success", "id" => (int)$newId, "message" => "Hero photo added successfully"]);
            exit();
        }
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'] ?? null;
        }

        if (isset($_GET['reset']) && $_GET['reset'] === 'true') {
            $pdo->exec("TRUNCATE TABLE hero_tiles");
            $initialHeroTiles = [
                ['Brand Identity 1', 'sec-1-tile-1.webp', 'brand-1'],
                ['Digital Product 2', 'sec-1-tile-2.webp', 'neutral-100'],
                ['Creative Layout 3', 'sec-1-tile-3.webp', 'neutral-800'],
                ['UIUX Showcase 4', 'sec-1-tile-4.webp', 'brand-2'],
                ['Visual Story 5', 'sec-1-tile-5.webp', 'neutral-300'],
                ['Mobile App 6', 'sec-1-tile-6.webp', 'brand-1']
            ];
            $insertStmt = $pdo->prepare("INSERT INTO hero_tiles (title, img, mod) VALUES (?, ?, ?)");
            foreach ($initialHeroTiles as $t) {
                $insertStmt->execute($t);
            }
            echo json_encode(["status" => "success", "message" => "Hero tiles reset to default"]);
            exit();
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID is required"]);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM hero_tiles WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Hero photo deleted successfully"]);
        exit();
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
