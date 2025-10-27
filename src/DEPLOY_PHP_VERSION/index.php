<?php
/**
 * Systeemlink - PHP Version
 * Main Router & Entry Point
 */

// Start session
session_start();

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuration
define('BASE_PATH', __DIR__);
define('SITE_NAME', 'Systeemlink');
define('SITE_URL', 'https://systeemlink.nl');
define('ADMIN_PASSWORD', 'Systeemlink2024!');

// Company Information
define('COMPANY_NAME', 'Systeemlink');
define('COMPANY_ADDRESS', 'Planetenpark 19, 1443BS Purmerend');
define('COMPANY_PHONE', '+31 613777733');
define('COMPANY_EMAIL', 'info@systeemlink.nl');
define('COMPANY_KVK', '88308170');
define('COMPANY_BTW', 'NL004588053B11');

// Include core files
require_once BASE_PATH . '/includes/functions.php';
require_once BASE_PATH . '/includes/theme.php';

// Get current route
$request = $_GET['page'] ?? 'home';
$request = trim($request, '/');

// Route handling
$routes = [
    // Main pages
    'home' => 'pages/home.php',
    '' => 'pages/home.php',
    
    // IT Check & Scans
    'it-check' => 'pages/it-check.php',
    'scan/modern-workplace' => 'pages/scans/workplace-scan.php',
    'scan/cloud-readiness' => 'pages/scans/cloud-scan.php',
    'scan/security' => 'pages/scans/security-scan.php',
    
    // Solutions
    'oplossingen' => 'pages/solutions.php',
    'oplossingen/werkplekbeheer' => 'pages/solutions/workplace.php',
    'oplossingen/cloud-microsoft-365' => 'pages/solutions/cloud.php',
    'oplossingen/netwerk-beveiliging' => 'pages/solutions/network.php',
    'oplossingen/it-support' => 'pages/solutions/support.php',
    
    // Branches
    'branches' => 'pages/branches.php',
    'branches/zakelijke-dienstverlening' => 'pages/branches/business-services.php',
    'branches/zorg-onderwijs' => 'pages/branches/health-education.php',
    'branches/retail-logistiek' => 'pages/branches/retail-logistics.php',
    'branches/bouw-industrie' => 'pages/branches/construction.php',
    
    // Company Info
    'bedrijfsinformatie/over-ons' => 'pages/company/about.php',
    'bedrijfsinformatie/partners-certificeringen' => 'pages/company/partners.php',
    'bedrijfsinformatie/certificeringen' => 'pages/company/certifications.php',
    'bedrijfsinformatie/vacatures' => 'pages/company/vacancies.php',
    'bedrijfsinformatie/contact' => 'pages/company/contact.php',
    
    // Landing Pages
    'landings/werkplekbeheer' => 'pages/landings/workplace-management.php',
    
    // Admin
    'admin' => 'admin/index.php',
    'admin/login' => 'admin/login.php',
    'admin/logout' => 'admin/logout.php',
];

// Check if route exists
if (isset($routes[$request])) {
    $page_file = BASE_PATH . '/' . $routes[$request];
    
    if (file_exists($page_file)) {
        include $page_file;
    } else {
        include BASE_PATH . '/pages/404.php';
    }
} else {
    // 404
    include BASE_PATH . '/pages/404.php';
}
