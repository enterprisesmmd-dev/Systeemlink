<?php
/**
 * Site Header
 */
$current_page = current_page();
$company = get_company_settings();
?>
<!DOCTYPE html>
<html lang="nl" class="<?php echo theme_class(); ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO Meta Tags -->
    <title><?php echo isset($page_title) ? $page_title . ' | ' . SITE_NAME : SITE_NAME . ' - Professioneel IT-beheer'; ?></title>
    <meta name="description" content="<?php echo $page_description ?? 'Systeemlink - Professioneel IT-beheer, werkplekbeheer, cloud oplossingen en netwerkbeveiliging voor MKB bedrijven in Nederland.'; ?>">
    <meta name="keywords" content="<?php echo $page_keywords ?? 'IT-beheer, werkplekbeheer, cloud, Microsoft 365, netwerkbeveiliging, IT-support'; ?>">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="<?php echo SITE_URL . $_SERVER['REQUEST_URI']; ?>">
    
    <!-- Open Graph -->
    <meta property="og:title" content="<?php echo isset($page_title) ? $page_title . ' | ' . SITE_NAME : SITE_NAME; ?>">
    <meta property="og:description" content="<?php echo $page_description ?? 'Professioneel IT-beheer voor het MKB'; ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo SITE_URL . $_SERVER['REQUEST_URI']; ?>">
    <meta property="og:site_name" content="<?php echo SITE_NAME; ?>">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="<?php echo asset('favicon.png'); ?>">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom Styles -->
    <link rel="stylesheet" href="<?php echo asset('css/style.css'); ?>">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- hCaptcha -->
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</head>
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">

<!-- Header -->
<header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
            <!-- Logo -->
            <div class="flex-shrink-0">
                <a href="<?php echo get_page_url(); ?>" class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-sky-600 to-indigo-700 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-xl">S</span>
                    </div>
                    <span class="text-xl font-semibold bg-gradient-to-r from-sky-600 to-indigo-700 bg-clip-text text-transparent">
                        Systeemlink
                    </span>
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center gap-8">
                <!-- Solutions -->
                <div class="relative group">
                    <a href="<?php echo get_page_url('oplossingen'); ?>" class="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium flex items-center gap-1">
                        Oplossingen
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </a>
                    <div class="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div class="py-2">
                            <a href="<?php echo get_page_url('oplossingen/werkplekbeheer'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Werkplekbeheer</a>
                            <a href="<?php echo get_page_url('oplossingen/cloud-microsoft-365'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Cloud & Microsoft 365</a>
                            <a href="<?php echo get_page_url('oplossingen/netwerk-beveiliging'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Netwerk & Beveiliging</a>
                            <a href="<?php echo get_page_url('oplossingen/it-support'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">IT-Support</a>
                        </div>
                    </div>
                </div>

                <!-- Branches -->
                <div class="relative group">
                    <a href="<?php echo get_page_url('branches'); ?>" class="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium flex items-center gap-1">
                        Branches
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </a>
                    <div class="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div class="py-2">
                            <a href="<?php echo get_page_url('branches/zakelijke-dienstverlening'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Zakelijke Dienstverlening</a>
                            <a href="<?php echo get_page_url('branches/zorg-onderwijs'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Zorg & Onderwijs</a>
                            <a href="<?php echo get_page_url('branches/retail-logistiek'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Retail & Logistiek</a>
                            <a href="<?php echo get_page_url('branches/bouw-industrie'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Bouw & Industrie</a>
                        </div>
                    </div>
                </div>

                <!-- Company -->
                <div class="relative group">
                    <span class="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium flex items-center gap-1 cursor-pointer">
                        Bedrijf
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </span>
                    <div class="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div class="py-2">
                            <a href="<?php echo get_page_url('bedrijfsinformatie/over-ons'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Over Ons</a>
                            <a href="<?php echo get_page_url('bedrijfsinformatie/partners-certificeringen'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Partners</a>
                            <a href="<?php echo get_page_url('bedrijfsinformatie/vacatures'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Vacatures</a>
                            <a href="<?php echo get_page_url('bedrijfsinformatie/contact'); ?>" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">Contact</a>
                        </div>
                    </div>
                </div>

                <!-- IT Check Button -->
                <a href="<?php echo get_page_url('it-check'); ?>" class="px-6 py-2 bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-lg hover:from-sky-700 hover:to-indigo-800 transition-all font-medium">
                    Gratis IT-Check
                </a>

                <!-- Dark Mode Toggle -->
                <button onclick="toggleDarkMode()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <i data-lucide="moon" class="w-5 h-5 dark:hidden"></i>
                    <i data-lucide="sun" class="w-5 h-5 hidden dark:block"></i>
                </button>
            </nav>

            <!-- Mobile Menu Button -->
            <button onclick="toggleMobileMenu()" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div class="px-4 py-4 space-y-2">
            <a href="<?php echo get_page_url('oplossingen'); ?>" class="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Oplossingen</a>
            <a href="<?php echo get_page_url('branches'); ?>" class="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Branches</a>
            <a href="<?php echo get_page_url('bedrijfsinformatie/over-ons'); ?>" class="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Over Ons</a>
            <a href="<?php echo get_page_url('bedrijfsinformatie/contact'); ?>" class="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
            <a href="<?php echo get_page_url('it-check'); ?>" class="block px-4 py-3 bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-lg text-center font-medium">
                Gratis IT-Check
            </a>
        </div>
    </div>
</header>

<!-- Main Content -->
<main class="pt-20">
