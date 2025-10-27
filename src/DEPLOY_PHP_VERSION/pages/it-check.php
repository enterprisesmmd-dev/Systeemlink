<?php
/**
 * IT-Check Page - Interactive Wizard
 */

$page_title = 'Gratis IT-Check - Ontdek verbeterpunten in uw IT';
$page_description = 'Vraag een gratis en vrijblijvende IT-check aan. We analyseren uw infrastructuur en geven advies over mogelijke verbeteringen en kostenbesparingen.';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_it_check'])) {
    $captcha_response = $_POST['h-captcha-response'] ?? '';
    
    if (verify_hcaptcha($captcha_response)) {
        $submission_data = [
            'type' => 'IT-Check',
            'answers' => $_POST['answers'] ?? [],
            'bedrijf' => sanitize_input($_POST['bedrijf'] ?? ''),
            'naam' => sanitize_input($_POST['naam'] ?? ''),
            'email' => sanitize_input($_POST['email'] ?? ''),
            'telefoon' => sanitize_input($_POST['telefoon'] ?? '')
        ];
        
        if (save_submission($submission_data)) {
            // Send notification email
            $email_body = "<h2>Nieuwe IT-Check Aanvraag</h2>";
            $email_body .= "<p><strong>Bedrijf:</strong> " . $submission_data['bedrijf'] . "</p>";
            $email_body .= "<p><strong>Naam:</strong> " . $submission_data['naam'] . "</p>";
            $email_body .= "<p><strong>Email:</strong> " . $submission_data['email'] . "</p>";
            $email_body .= "<p><strong>Telefoon:</strong> " . $submission_data['telefoon'] . "</p>";
            
            send_notification(COMPANY_EMAIL, "Nieuwe IT-Check Aanvraag", $email_body);
            
            $success_message = "Uw IT-Check aanvraag is succesvol verzonden! We nemen binnen 24 uur contact met u op.";
        }
    } else {
        $error_message = "Captcha verificatie mislukt. Probeer het opnieuw.";
    }
}

include BASE_PATH . '/includes/header.php';
?>

<!-- Hero -->
<section class="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-3xl mx-auto">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                <span class="text-sm">Gratis & vrijblijvend</span>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-bold mb-6">
                Uitgebreide IT-Check
            </h1>
            
            <p class="text-xl opacity-90">
                Ontdek in 16 stappen verbeterpunten, bespaarmogelijkheden en security risico's in uw IT-infrastructuur
            </p>
        </div>
    </div>
</section>

<!-- Success/Error Messages -->
<?php if (isset($success_message)): ?>
<div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 my-6 max-w-4xl mx-auto">
    <div class="flex items-center">
        <i data-lucide="check-circle" class="w-5 h-5 text-green-500 mr-3"></i>
        <p class="text-green-700 dark:text-green-400"><?php echo $success_message; ?></p>
    </div>
</div>
<?php endif; ?>

<?php if (isset($error_message)): ?>
<div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-6 max-w-4xl mx-auto">
    <div class="flex items-center">
        <i data-lucide="alert-circle" class="w-5 h-5 text-red-500 mr-3"></i>
        <p class="text-red-700 dark:text-red-400"><?php echo $error_message; ?></p>
    </div>
</div>
<?php endif; ?>

<!-- IT-Check Wizard -->
<section class="py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Voortgang</span>
                    <span class="text-sm font-medium text-emerald-600 dark:text-emerald-400" id="progress-text">0%</span>
                </div>
                <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div id="progress-bar" class="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300" style="width: 0%"></div>
                </div>
            </div>

            <!-- Wizard Form -->
            <form method="POST" id="it-check-form" class="space-y-8">
                <input type="hidden" name="submit_it_check" value="1">
                
                <!-- Questions Container -->
                <div id="questions-container">
                    <!-- Questions will be loaded via JavaScript -->
                </div>

                <!-- Contact Info (Final Step) -->
                <div id="contact-step" class="hidden space-y-4">
                    <h3 class="text-2xl font-bold mb-6">Uw gegevens</h3>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Bedrijfsnaam *</label>
                        <input type="text" name="bedrijf" required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Naam *</label>
                        <input type="text" name="naam" required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Email *</label>
                        <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Telefoon *</label>
                        <input type="tel" name="telefoon" required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800">
                    </div>

                    <!-- hCaptcha -->
                    <div class="h-captcha" data-sitekey="10000000-ffff-ffff-ffff-000000000001"></div>

                    <button type="submit" class="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg hover:from-emerald-700 hover:to-teal-800 transition-all font-semibold">
                        Verzenden
                    </button>
                </div>

                <!-- Navigation Buttons -->
                <div id="navigation-buttons" class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" onclick="previousQuestion()" id="prev-btn" class="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium hidden">
                        Vorige
                    </button>
                    <button type="button" onclick="nextQuestion()" id="next-btn" class="ml-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg hover:from-emerald-700 hover:to-teal-800 transition-all font-semibold">
                        Volgende
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>

<script src="<?php echo asset('js/it-check-wizard.js'); ?>"></script>
<script>
lucide.createIcons();
</script>

<?php include BASE_PATH . '/includes/footer.php'; ?>
