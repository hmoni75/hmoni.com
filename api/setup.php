<?php
require_once __DIR__ . '/db.php';

try {
    // 1. Projects & Highlighted Projects
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
        description TEXT,
        tags_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 2. Hero Carousel Tiles
    $pdo->exec("CREATE TABLE IF NOT EXISTS hero_tiles (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) DEFAULT '',
        img TEXT NOT NULL,
        mod VARCHAR(50) DEFAULT 'brand-1',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 3. Services
    $pdo->exec("CREATE TABLE IF NOT EXISTS services (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        num VARCHAR(20) DEFAULT '01',
        title VARCHAR(255) NOT NULL,
        desc_text TEXT NOT NULL,
        tags_json TEXT,
        delay VARCHAR(20) DEFAULT '0.05',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 4. Process Philosophy / My Process
    $pdo->exec("CREATE TABLE IF NOT EXISTS process_steps (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        step_num VARCHAR(20) DEFAULT '01',
        title VARCHAR(255) NOT NULL,
        desc_text TEXT NOT NULL,
        tags_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 5. Testimonials
    $pdo->exec("CREATE TABLE IF NOT EXISTS testimonials (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        author VARCHAR(150) NOT NULL,
        role VARCHAR(150) DEFAULT '',
        company VARCHAR(150) DEFAULT '',
        content TEXT NOT NULL,
        avatar TEXT,
        stars INT DEFAULT 5,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 6. FAQs
    $pdo->exec("CREATE TABLE IF NOT EXISTS faqs (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'General',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 7. Social Media Links
    $pdo->exec("CREATE TABLE IF NOT EXISTS social_links (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        platform VARCHAR(100) NOT NULL,
        url TEXT NOT NULL,
        handle VARCHAR(100) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 8. Experience / Career Timeline
    $pdo->exec("CREATE TABLE IF NOT EXISTS experience (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        period VARCHAR(100) NOT NULL,
        role VARCHAR(200) NOT NULL,
        company VARCHAR(200) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 9. Happy Customers / Stats
    $pdo->exec("CREATE TABLE IF NOT EXISTS stats (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        stat_key VARCHAR(100) NOT NULL,
        label VARCHAR(200) NOT NULL,
        number_value VARCHAR(50) NOT NULL,
        suffix VARCHAR(20) DEFAULT '+',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 10. Tech Stack & Tools
    $pdo->exec("CREATE TABLE IF NOT EXISTS tech_stack (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        category VARCHAR(100) DEFAULT 'Development',
        icon_url TEXT,
        proficiency VARCHAR(50) DEFAULT 'Advanced',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 11. Blog & Resources / Blog Details
    $pdo->exec("CREATE TABLE IF NOT EXISTS blogs (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        author VARCHAR(150) DEFAULT 'H Moni',
        date_str VARCHAR(100) NOT NULL,
        img TEXT NOT NULL,
        excerpt TEXT,
        content LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 12. Contact Inquiries & Messages
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

    // 13. Site Settings & Metadata
    $pdo->exec("CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // -------- POPULATE DEFAULT REAL DATA --------

    // Projects
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM projects");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialProjects = [
            ['The Obsidian Coastal Villa', 'Residential & Architecture', 'Oslo, Norway', '12,400 Sq Ft', 'Architecture & Interior', '/portfolio-details-1', '/assets/imgs/pages/home-13/sec-3-img-1.webp', 'Published', 1, 'Luxurious coastal residence with obsidian stone finishes.', '["Architecture", "Interior", "Luxury"]'],
            ['Atrium of Quiet Light', 'Hospitality & Wellness', 'Kyoto, Japan', '44,200 Sq Ft', 'Master Planning', '/portfolio-details-1', '/assets/imgs/pages/home-13/sec-3-img-2.webp', 'Published', 1, 'Peaceful atrium hotel designed around natural daylight.', '["Wellness", "Hotel", "Kyoto"]'],
            ['Stratum Cultural Pavilion', 'Cultural & Civic', 'Milan, Italy', '118,300 Sq Ft', 'Architecture & Engineering', '/portfolio-details-1', '/assets/imgs/pages/home-13/sec-3-img-3.webp', 'Published', 1, 'Multi-tier cultural space built for exhibitions.', '["Milan", "Exhibition", "Civil"]'],
            ['Lattice House', 'Residential Infill', 'New York, NY', '8,600 Sq Ft', 'Facade Architecture', '/portfolio-details-1', '/assets/imgs/pages/home-13/sec-3-img-4.webp', 'Published', 0, 'Modern urban townhouse with wood lattice screen facade.', '["Townhouse", "NYC", "Facade"]'],
            ['Noirform Denim Concept', 'UI/UX & Branding', 'Global Digital Studio', 'Design System', 'Creative Direction', '/portfolio-1', '/assets/imgs/pages/slideshow/img-1.webp', 'Published', 1, 'Brand art direction & digital platform for sustainable fashion.', '["Branding", "UIUX", "E-Commerce"]']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO projects (title, category, location, size, service, link, img, status, featured, description, tags_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($initialProjects as $p) {
            $insertStmt->execute($p);
        }
    }

    // Hero Tiles
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

    // Services
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM services");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialServices = [
            ['01', 'Brand Identity', 'Logo systems, type pairings, color, and visual language that travels across every touchpoint.', '["Logo", "Type system", "Guidelines"]', '0.05'],
            ['02', 'Web Design', 'Marketing sites, portfolios, and product pages designed in Figma and ready for development.', '["Landing", "Portfolio", "Marketing"]', '0.1'],
            ['03', 'Webflow & Framer', 'Hand-built no-code sites with motion, CMS, and clean structure you can actually maintain.', '["Framer", "Webflow", "CMS"]', '0.15'],
            ['04', 'Product UI/UX', 'Dashboards, onboarding flows, and product surfaces — clear, considered, ready for engineering.', '["Dashboard", "App UI", "Flows"]', '0.2'],
            ['05', 'Art Direction', 'Visual systems, photography direction, and editorial layouts for brands that need a point of view.', '["Editorial", "Photography", "Style"]', '0.25'],
            ['06', 'Front-End Build', 'Pixel-perfect React or Next.js builds, accessible by default and shipped with care.', '["React", "Next.js", "Tailwind"]', '0.3']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO services (num, title, desc_text, tags_json, delay) VALUES (?, ?, ?, ?, ?)");
        foreach ($initialServices as $s) {
            $insertStmt->execute($s);
        }
    }

    // Process Philosophy
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM process_steps");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialProcess = [
            ['01', 'Discovery & Alignment', 'We start by uncovering the core business goals, target audience, and competitive edge.', '["Strategy", "Audit", "Goals"]'],
            ['02', 'Architecture & UX', 'Building wireframes, content hierarchy, and intuitive user journeys.', '["Wireframe", "UX Research", "Flows"]'],
            ['03', 'Visual Direction & UI', 'Crafting elevated UI components, micro-animations, and visual systems.', '["Figma", "Design System", "Motion"]'],
            ['04', 'Production Build & Launch', 'Developing clean React/Next.js code, performing QA tests, and shipping to live production.', '["React", "Testing", "Vercel"]']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO process_steps (step_num, title, desc_text, tags_json) VALUES (?, ?, ?, ?)");
        foreach ($initialProcess as $p) {
            $insertStmt->execute($p);
        }
    }

    // Testimonials
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM testimonials");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialTestimonials = [
            ['Alexander Wright', 'Founder & CEO', 'Obsidian Group', 'H Moni delivered an exceptional digital platform that elevated our entire brand identity. Precision and speed in execution!', '/assets/imgs/template/avatar/avatar-10.webp', 5],
            ['Elena Rostova', 'Design Director', 'Kyoto Wellness Retreat', 'The attention to typography, micro-interactions, and responsive layout is world-class. Highly recommended!', '/assets/imgs/template/avatar/avatar-11.webp', 5],
            ['Marcus Vance', 'VP of Product', 'TechCorp SF', 'Working with H Moni felt seamless. From Figma prototypes to live React code on Vercel, everything was shipped on time.', '/assets/imgs/template/avatar/avatar-12.webp', 5]
        ];
        $insertStmt = $pdo->prepare("INSERT INTO testimonials (author, role, company, content, avatar, stars) VALUES (?, ?, ?, ?, ?, ?)");
        foreach ($initialTestimonials as $t) {
            $insertStmt->execute($t);
        }
    }

    // FAQs
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM faqs");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialFaqs = [
            ['What services do you provide?', 'We offer full-stack web development, UI/UX design, brand identity systems, and custom React/Next.js applications.', 'Services'],
            ['How long does a typical project take?', 'Smaller design & landing page projects take 1-2 weeks. Full custom web platforms take 3-6 weeks.', 'Timeline'],
            ['Do you handle maintenance after launch?', 'Yes! We offer ongoing maintenance, optimization, and feature additions.', 'Support'],
            ['How do we get started?', 'You can book a call or send an inquiry through our contact form. We reply within 24 hours.', 'Process']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO faqs (question, answer, category) VALUES (?, ?, ?)");
        foreach ($initialFaqs as $f) {
            $insertStmt->execute($f);
        }
    }

    // Social Links
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM social_links");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialSocials = [
            ['Twitter', 'https://twitter.com/hmoni', '@hmoni'],
            ['LinkedIn', 'https://linkedin.com/in/hmoni', 'H Moni'],
            ['GitHub', 'https://github.com/hmoni', '@hmoni'],
            ['Instagram', 'https://instagram.com/hmoni', '@hmoni_design']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO social_links (platform, url, handle) VALUES (?, ?, ?)");
        foreach ($initialSocials as $s) {
            $insertStmt->execute($s);
        }
    }

    // Experience
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM experience");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialExp = [
            ['2022 — Present', 'Lead Full-Stack Engineer & Designer', 'H Moni Digital Studio', 'Leading digital product design, web engineering, and client projects worldwide.'],
            ['2020 — 2022', 'Senior UI/UX Specialist', 'IT Incubation Center KUET', 'Designed incubator SaaS tools and mentored startup tech teams.'],
            ['2018 — 2020', 'Frontend Developer', 'Creative Tech Agency', 'Developed responsive React web applications and interactive UI components.']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO experience (period, role, company, description) VALUES (?, ?, ?, ?)");
        foreach ($initialExp as $e) {
            $insertStmt->execute($e);
        }
    }

    // Stats / Happy Customers
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM stats");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialStats = [
            ['happy_clients', 'Happy Global Clients', '120', '+'],
            ['completed_projects', 'Completed Projects', '300', '+'],
            ['experience_years', 'Years of Experience', '6', '+'],
            ['awards_won', 'Design & Tech Recognition', '15', '+']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO stats (stat_key, label, number_value, suffix) VALUES (?, ?, ?, ?)");
        foreach ($initialStats as $st) {
            $insertStmt->execute($st);
        }
    }

    // Tech Stack & Tools
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM tech_stack");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialTech = [
            ['React & Next.js', 'Development', '/assets/imgs/icons/tech-react.svg', 'Expert'],
            ['TypeScript', 'Development', '/assets/imgs/icons/tech-ts.svg', 'Expert'],
            ['Tailwind CSS & Bootstrap', 'Styling', '/assets/imgs/icons/tech-css.svg', 'Expert'],
            ['Figma', 'UI/UX Design', '/assets/imgs/icons/tech-figma.svg', 'Expert'],
            ['Node.js & Express', 'Backend', '/assets/imgs/icons/tech-node.svg', 'Advanced'],
            ['PHP & MySQL', 'Backend & DB', '/assets/imgs/icons/tech-mysql.svg', 'Advanced']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO tech_stack (name, category, icon_url, proficiency) VALUES (?, ?, ?, ?)");
        foreach ($initialTech as $t) {
            $insertStmt->execute($t);
        }
    }

    // Blogs
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM blogs");
    if ($stmt->fetch()['cnt'] == 0) {
        $initialBlogs = [
            ['Designing Digital Experiences That Connect Brands and People', 'designing-digital-experiences', 'UI / UX Design', 'H Moni', 'July 3, 2026', '/assets/imgs/pages/img-201.webp', 'Exploring design principles that build emotional connection and clarity.', 'Digital experience design is more than aesthetics...'],
            ['From Concept to Launch: Building Products That Truly Matter', 'concept-to-launch', 'Product Engineering', 'H Moni', 'July 8, 2026', '/assets/imgs/pages/img-202.webp', 'A step-by-step roadmap to building scalable digital products.', 'Going from idea to live deployment requires strategy...']
        ];
        $insertStmt = $pdo->prepare("INSERT INTO blogs (title, slug, category, author, date_str, img, excerpt, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($initialBlogs as $b) {
            $insertStmt->execute($b);
        }
    }

    // Messages
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

    // Site Settings
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
        "message" => "All 13 database tables initialized and populated successfully!"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Setup Failed: " . $e->getMessage()]);
}
