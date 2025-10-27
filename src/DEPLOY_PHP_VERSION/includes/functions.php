<?php
/**
 * Core Functions
 * Helper functions used throughout the site
 */

/**
 * Sanitize input
 */
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

/**
 * Load JSON data
 */
function load_json_data($filename) {
    $filepath = BASE_PATH . '/data/' . $filename;
    if (file_exists($filepath)) {
        return json_decode(file_get_contents($filepath), true);
    }
    return [];
}

/**
 * Save JSON data
 */
function save_json_data($filename, $data) {
    $filepath = BASE_PATH . '/data/' . $filename;
    $dir = dirname($filepath);
    
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    return file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT));
}

/**
 * Check if user is admin
 */
function is_admin() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

/**
 * Require admin access
 */
function require_admin() {
    if (!is_admin()) {
        header('Location: ?page=admin/login');
        exit;
    }
}

/**
 * Get page URL
 */
function get_page_url($page = '') {
    if (empty($page)) {
        return '/';
    }
    return '/?page=' . urlencode($page);
}

/**
 * Get asset URL
 */
function asset($path) {
    return '/assets/' . ltrim($path, '/');
}

/**
 * Include view
 */
function view($view, $data = []) {
    extract($data);
    include BASE_PATH . '/views/' . $view . '.php';
}

/**
 * Get current page
 */
function current_page() {
    return $_GET['page'] ?? 'home';
}

/**
 * Is current page
 */
function is_current_page($page) {
    return current_page() === $page;
}

/**
 * Generate CSRF token
 */
function csrf_token() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Format date
 */
function format_date($timestamp) {
    return date('d-m-Y H:i', $timestamp);
}

/**
 * Truncate text
 */
function truncate($text, $length = 100) {
    if (strlen($text) > $length) {
        return substr($text, 0, $length) . '...';
    }
    return $text;
}

/**
 * Get submissions
 */
function get_submissions($type = null) {
    $submissions = load_json_data('submissions.json');
    
    if ($type) {
        return array_filter($submissions, function($sub) use ($type) {
            return $sub['type'] === $type;
        });
    }
    
    return $submissions;
}

/**
 * Save submission
 */
function save_submission($data) {
    $submissions = load_json_data('submissions.json');
    
    $submission = [
        'id' => uniqid('sub_'),
        'timestamp' => time(),
        'data' => $data,
        'type' => $data['type'] ?? 'general',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    
    $submissions[] = $submission;
    
    return save_json_data('submissions.json', $submissions);
}

/**
 * Send email notification
 */
function send_notification($to, $subject, $message) {
    $headers = [
        'From: ' . COMPANY_NAME . ' <' . COMPANY_EMAIL . '>',
        'Reply-To: ' . COMPANY_EMAIL,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/html; charset=UTF-8'
    ];
    
    return mail($to, $subject, $message, implode("\r\n", $headers));
}

/**
 * Get CMS pages
 */
function get_cms_pages() {
    return load_json_data('cms_pages.json');
}

/**
 * Get CMS page by ID
 */
function get_cms_page($id) {
    $pages = get_cms_pages();
    return $pages[$id] ?? null;
}

/**
 * Save CMS page
 */
function save_cms_page($id, $data) {
    $pages = get_cms_pages();
    $pages[$id] = $data;
    return save_json_data('cms_pages.json', $pages);
}

/**
 * Get company settings
 */
function get_company_settings() {
    $settings = load_json_data('company_settings.json');
    
    if (empty($settings)) {
        return [
            'name' => COMPANY_NAME,
            'address' => COMPANY_ADDRESS,
            'phone' => COMPANY_PHONE,
            'email' => COMPANY_EMAIL,
            'kvk' => COMPANY_KVK,
            'btw' => COMPANY_BTW
        ];
    }
    
    return $settings;
}

/**
 * Verify hCaptcha
 */
function verify_hcaptcha($response) {
    // For demo purposes, always return true
    // In production, implement actual hCaptcha verification
    return !empty($response);
    
    /* Production code:
    $secret = 'YOUR_HCAPTCHA_SECRET';
    $verify_url = 'https://hcaptcha.com/siteverify';
    
    $data = [
        'secret' => $secret,
        'response' => $response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($verify_url, false, $context);
    $response = json_decode($result);
    
    return $response->success;
    */
}
