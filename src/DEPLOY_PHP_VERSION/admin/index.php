<?php
/**
 * CMS Admin Panel
 */

require_admin();

$current_tab = $_GET['tab'] ?? 'pages';

// Handle page updates
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_page'])) {
    $page_id = $_POST['page_id'];
    $page_data = [
        'name' => sanitize_input($_POST['page_name']),
        'path' => sanitize_input($_POST['page_path']),
        'seo' => [
            'title' => sanitize_input($_POST['seo_title']),
            'description' => sanitize_input($_POST['seo_description']),
            'keywords' => sanitize_input($_POST['seo_keywords'])
        ],
        'updated' => time()
    ];
    
    if (save_cms_page($page_id, $page_data)) {
        $success_message = "Pagina succesvol bijgewerkt!";
    }
}

$pages = get_cms_pages();
$submissions = get_submissions();
$company = get_company_settings();
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS Admin - Systeemlink</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-gray-50">

<div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex-shrink-0">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-8">
                <div class="w-10 h-10 bg-gradient-to-br from-sky-600 to-indigo-700 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-xl">S</span>
                </div>
                <div>
                    <div class="font-semibold">Systeemlink</div>
                    <div class="text-xs text-gray-400">CMS Admin</div>
                </div>
            </div>

            <nav class="space-y-2">
                <a href="?page=admin&tab=pages" class="flex items-center gap-3 px-4 py-3 rounded-lg <?php echo $current_tab === 'pages' ? 'bg-sky-600' : 'hover:bg-gray-800'; ?> transition-colors">
                    <i data-lucide="file-text" class="w-5 h-5"></i>
                    <span>Pagina's</span>
                </a>
                <a href="?page=admin&tab=submissions" class="flex items-center gap-3 px-4 py-3 rounded-lg <?php echo $current_tab === 'submissions' ? 'bg-sky-600' : 'hover:bg-gray-800'; ?> transition-colors">
                    <i data-lucide="inbox" class="w-5 h-5"></i>
                    <span>Submissions</span>
                    <span class="ml-auto bg-sky-600 px-2 py-1 rounded-full text-xs"><?php echo count($submissions); ?></span>
                </a>
                <a href="?page=admin&tab=company" class="flex items-center gap-3 px-4 py-3 rounded-lg <?php echo $current_tab === 'company' ? 'bg-sky-600' : 'hover:bg-gray-800'; ?> transition-colors">
                    <i data-lucide="building" class="w-5 h-5"></i>
                    <span>Bedrijfsinfo</span>
                </a>
                <a href="?page=admin&tab=settings" class="flex items-center gap-3 px-4 py-3 rounded-lg <?php echo $current_tab === 'settings' ? 'bg-sky-600' : 'hover:bg-gray-800'; ?> transition-colors">
                    <i data-lucide="settings" class="w-5 h-5"></i>
                    <span>Instellingen</span>
                </a>
            </nav>

            <div class="mt-8 pt-8 border-t border-gray-800">
                <a href="?page=admin/logout" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-red-400">
                    <i data-lucide="log-out" class="w-5 h-5"></i>
                    <span>Uitloggen</span>
                </a>
            </div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 px-8 py-4">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                        <?php 
                        switch($current_tab) {
                            case 'pages': echo 'Pagina Beheer'; break;
                            case 'submissions': echo 'Form Submissions'; break;
                            case 'company': echo 'Bedrijfsinformatie'; break;
                            case 'settings': echo 'Instellingen'; break;
                            default: echo 'Dashboard';
                        }
                        ?>
                    </h1>
                    <p class="text-gray-500 text-sm">Beheer uw website content</p>
                </div>
                <a href="<?php echo get_page_url(); ?>" target="_blank" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                    <span>Bekijk Website</span>
                </a>
            </div>
        </header>

        <!-- Content -->
        <div class="p-8">
            <?php if (isset($success_message)): ?>
            <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div class="flex items-center">
                    <i data-lucide="check-circle" class="w-5 h-5 text-green-500 mr-3"></i>
                    <p class="text-green-700"><?php echo $success_message; ?></p>
                </div>
            </div>
            <?php endif; ?>

            <?php
            switch($current_tab) {
                case 'pages':
                    include __DIR__ . '/tabs/pages.php';
                    break;
                case 'submissions':
                    include __DIR__ . '/tabs/submissions.php';
                    break;
                case 'company':
                    include __DIR__ . '/tabs/company.php';
                    break;
                case 'settings':
                    include __DIR__ . '/tabs/settings.php';
                    break;
                default:
                    echo '<p>Select a tab</p>';
            }
            ?>
        </div>
    </main>
</div>

<script>
lucide.createIcons();
</script>

</body>
</html>
