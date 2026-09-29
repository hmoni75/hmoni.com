<?php
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit();
}

$uploadDir = __DIR__ . '/../uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (!empty($_FILES['file'])) {
    $file = $_FILES['file'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

    if (!in_array($ext, $allowed)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid image extension"]);
        exit();
    }

    $fileName = 'upload_' . time() . '_' . uniqid() . '.' . $ext;
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
        $host = $_SERVER['HTTP_HOST'];
        $url = "$protocol://$host/uploads/$fileName";
        echo json_encode(["status" => "success", "url" => $url]);
        exit();
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to upload file"]);
        exit();
    }
}

// Handle Base64 Upload
$input = json_decode(file_get_contents('php://input'), true);
if ($input && !empty($input['base64Image'])) {
    $base64 = $input['base64Image'];
    if (preg_match('/^data:image\/(\w+);base64,/', $base64, $type)) {
        $data = substr($base64, strpos($base64, ',') + 1);
        $type = strtolower($type[1]);
        if ($type === 'jpeg') $type = 'jpg';
        $data = base64_decode($data);
        if ($data !== false) {
            $fileName = 'upload_' . time() . '_' . uniqid() . '.' . $type;
            $targetPath = $uploadDir . $fileName;
            file_put_contents($targetPath, $data);
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $host = $_SERVER['HTTP_HOST'];
            $url = "$protocol://$host/uploads/$fileName";
            echo json_encode(["status" => "success", "url" => $url]);
            exit();
        }
    }
}

http_response_code(400);
echo json_encode(["status" => "error", "message" => "No valid file or base64 image received"]);
