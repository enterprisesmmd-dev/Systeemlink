<?php
/**
 * Admin Login
 */

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';
    
    if ($password === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: ?page=admin');
        exit;
    } else {
        $error = 'Incorrect wachtwoord';
    }
}
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Systeemlink</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 min-h-screen flex items-center justify-center">

<div class="w-full max-w-md p-8">
    <div class="bg-white rounded-2xl shadow-2xl p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-600 to-indigo-700 rounded-2xl mb-4">
                <span class="text-white font-bold text-2xl">S</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">CMS Admin Login</h1>
            <p class="text-gray-500 text-sm mt-2">Systeemlink Content Management</p>
        </div>

        <?php if (isset($error)): ?>
        <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div class="flex items-center">
                <i data-lucide="alert-circle" class="w-5 h-5 text-red-500 mr-3"></i>
                <p class="text-red-700"><?php echo $error; ?></p>
            </div>
        </div>
        <?php endif; ?>

        <!-- Login Form -->
        <form method="POST" class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Wachtwoord
                </label>
                <input type="password" 
                       name="password" 
                       required 
                       autofocus
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                       placeholder="Voer admin wachtwoord in">
            </div>

            <button type="submit" class="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-lg hover:from-sky-700 hover:to-indigo-800 transition-all font-semibold">
                Inloggen
            </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-500">
            <a href="<?php echo get_page_url(); ?>" class="text-sky-600 hover:text-sky-700">
                ← Terug naar website
            </a>
        </div>
    </div>

    <!-- Info -->
    <div class="mt-6 text-center text-white text-sm opacity-75">
        <p>Standaard wachtwoord: <code class="bg-white/20 px-2 py-1 rounded">Systeemlink2024!</code></p>
    </div>
</div>

<script>
lucide.createIcons();
</script>

</body>
</html>
