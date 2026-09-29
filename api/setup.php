<?php
require_once __DIR__ . '/db.php';

try {
    // 1. Create Projects Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        location VARCHAR(150) DEFAULT '',
        size VARCHAR(100) DEFAULT '',
        service VARCHAR(150) DEFAULT '',
        link VARCHAR(255) DEFAULT '/portfolio-details-1',
        img TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Published',
        featured TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 2. Create Hero Tiles Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS hero_tiles (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) DEFAULT '',
        img TEXT NOT NULL,
        mod VARCHAR(50) DEFAULT 'brand-1',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 3. Create Messages Table (Inquiries)
    $pdo->exec("CREATE TABLE IF NOT EXISTS messages (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(50) DEFAULT '',
        message TEXT NOT NULL,
        date_str VARCHAR(100) DEFAULT '',
        is_read TINYINT(1) DEFAULT 0,
        location VARCHAR(150) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 4. Create Site Settings Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Seed default projects if empty
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM projects");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialProjects = [
            ['The Obsidian Coastal Villa', 'Residential & Architecture', 'Oslo, Norway', '12,400 Sq Ft', 'Architecture & Interior', '/portfolio-details-1', '/assets/imgs/pages/home-13/sec-3-img-1.webp', 'Published', 1],
            ['Atrium of Quiet Light', 'Hospitality & Wellness', 'Kyoto, Japan', '44,200 Sq Ft', 'Master Planning', '/portfolio-details-1', '/assets/imgs/pages/home-13/sec-3-img-2.webp', 'Published', 1],
            ['Stratum Cultural Pavilion', 'Cultural & Civic', 'Milan, Italy', '118,300 Sq Ft', 'Architecture & Engineering', '/portfolio-details-1', '/assets/imgs/pages/home-13/sec-3-img-3.webp', 'Published', 1],
            ['Lattice House', 'Residential Infill', 'New York, NY', '8,600 Sq Ft', 'Facade Architecture', '/portfolio-details-1', '/assets/imgs/pages/home-13/sec-3-img-4.webp', 'Published', 0],
            ['Noirform Denim Concept', 'UI/UX & Branding', 'Global Digital Studio', 'Design System', 'Creative Direction', '/portfolio-1', '/assets/imgs/pages/slideshow/img-1.webp', 'Published', 1]
        ];
        $insertStmt = $pdo->prepare("INSERT INTO projects (title, category, location, size, service, link, img, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($initialProjects as $p) {
            $insertStmt->execute($p);
        }
    }

    // Seed default hero tiles if empty
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM hero_tiles");
    if ($stmt->fetch()['cnt'] == 0) {
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
    }

    // Seed default messages if empty
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM messages");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialMessages = [
            ['Tanvir Rahman', 'tanvir.kuet@gmail.com', '+880 1711 234567', 'Hi H Moni, we are looking for a full-stack developer and UI designer for an IT Incubation project at KUET. Could you share your availability?', 'Today, 3:45 PM', 0, 'Khulna, Bangladesh'],
            ['Sarah Jenkins', 'sarah@techcorp.io', '+1 (212) 555-0199', 'Hello! We loved the Obsidian Coastal Villa and Noirform Denim projects on your site. We want to hire you for a custom React & Next.js SaaS portal.', 'Yesterday, 11:20 AM', 1, 'New York, USA']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO messages (name, email, phone, message, date_str, is_read, location) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($initialMessages as $m) {
            $insertStmt->execute($m);
        }
    }

    // Seed default site settings if empty
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM site_settings");
    if ($stmt->fetch()['cnt'] == 0) {
        $settings = [
            'brandName' => 'H Moni',
            'contactEmail' => 'hello@hmoni.com',
            'officeAddress' => 'IT Incubation & Training Center KUET, Khulna - 9203, Bangladesh',
            'studioAddress' => 'H Moni Digital Studio, Khulna - 9203, Bangladesh',
            'workingHours' => 'Mo - Sa (9am - 5pm)',
            'metaTitle' => 'H Moni — Creative Designer, Full-Stack Engineer & Digital Studio',
            'metaKeywords' => 'H Moni, H Moni Portfolio, H Moni UI UX Designer, H Moni Full Stack Developer, KUET IT Incubation'
        ];
        $insertStmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
        foreach ($settings as $k => $v) {
            $insertStmt->execute([$k, $v]);
        }
    }

    echo json_encode([
        "status" => "success",
        "message" => "Database tables initialized and populated successfully!"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Setup Failed: " . $e->getMessage()]);
}
