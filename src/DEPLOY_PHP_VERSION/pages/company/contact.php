<?php
/**
 * Contact Page
 */

$page_title = 'Contact - Neem contact met ons op';
$page_description = 'Neem contact op met Systeemlink voor al uw IT-vragen. Bel, mail of kom langs op ons kantoor in Purmerend.';

// Handle contact form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_contact'])) {
    $captcha_response = $_POST['h-captcha-response'] ?? '';
    
    if (verify_hcaptcha($captcha_response)) {
        $submission_data = [
            'type' => 'Contact',
            'naam' => sanitize_input($_POST['naam']),
            'bedrijf' => sanitize_input($_POST['bedrijf'] ?? ''),
            'email' => sanitize_input($_POST['email']),
            'telefoon' => sanitize_input($_POST['telefoon'] ?? ''),
            'onderwerp' => sanitize_input($_POST['onderwerp']),
            'bericht' => sanitize_input($_POST['bericht'])
        ];
        
        if (save_submission($submission_data)) {
            // Send notification email
            $email_body = "<h2>Nieuw Contactformulier Bericht</h2>";
            $email_body .= "<p><strong>Naam:</strong> " . $submission_data['naam'] . "</p>";
            $email_body .= "<p><strong>Bedrijf:</strong> " . $submission_data['bedrijf'] . "</p>";
            $email_body .= "<p><strong>Email:</strong> " . $submission_data['email'] . "</p>";
            $email_body .= "<p><strong>Telefoon:</strong> " . $submission_data['telefoon'] . "</p>";
            $email_body .= "<p><strong>Onderwerp:</strong> " . $submission_data['onderwerp'] . "</p>";
            $email_body .= "<p><strong>Bericht:</strong><br>" . nl2br($submission_data['bericht']) . "</p>";
            
            send_notification(COMPANY_EMAIL, "Nieuw Contactformulier Bericht", $email_body);
            
            $success_message = "Uw bericht is succesvol verzonden! We nemen zo snel mogelijk contact met u op.";
        }
    } else {
        $error_message = "Captcha verificatie mislukt. Probeer het opnieuw.";
    }
}

include BASE_PATH . '/includes/header.php';
?>

<!-- Hero -->
<section class="bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <div class="text-sm opacity-90 mb-4">Home / Bedrijf / Contact</div>
            
            <h1 class="text-4xl md:text-5xl font-bold mb-6">
                Neem contact met ons op
            </h1>
            
            <p class="text-xl opacity-90">
                Heeft u een vraag of wilt u vrijblijvend kennismaken? We helpen u graag verder.
            </p>
        </div>
    </div>
</section>

<!-- Success/Error Messages -->
<?php if (isset($success_message)): ?>
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
        <div class="flex items-center">
            <i data-lucide="check-circle" class="w-5 h-5 text-green-500 mr-3"></i>
            <p class="text-green-700 dark:text-green-400"><?php echo $success_message; ?></p>
        </div>
    </div>
</div>
<?php endif; ?>

<?php if (isset($error_message)): ?>
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
        <div class="flex items-center">
            <i data-lucide="alert-circle" class="w-5 h-5 text-red-500 mr-3"></i>
            <p class="text-red-700 dark:text-red-400"><?php echo $error_message; ?></p>
        </div>
    </div>
</div>
<?php endif; ?>

<!-- Contact Content -->
<section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12">
            <!-- Contact Info -->
            <div>
                <h2 class="text-3xl font-bold mb-8">Contactgegevens</h2>
                
                <div class="space-y-6">
                    <!-- Address -->
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center">
                            <i data-lucide="map-pin" class="w-6 h-6 text-sky-600 dark:text-sky-400"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">Adres</h3>
                            <p class="text-gray-600 dark:text-gray-400"><?php echo COMPANY_ADDRESS; ?></p>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center">
                            <i data-lucide="phone" class="w-6 h-6 text-sky-600 dark:text-sky-400"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">Telefoon</h3>
                            <a href="tel:<?php echo str_replace(' ', '', COMPANY_PHONE); ?>" class="text-sky-600 dark:text-sky-400 hover:underline">
                                <?php echo COMPANY_PHONE; ?>
                            </a>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center">
                            <i data-lucide="mail" class="w-6 h-6 text-sky-600 dark:text-sky-400"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">Email</h3>
                            <a href="mailto:<?php echo COMPANY_EMAIL; ?>" class="text-sky-600 dark:text-sky-400 hover:underline">
                                <?php echo COMPANY_EMAIL; ?>
                            </a>
                        </div>
                    </div>

                    <!-- Business Hours -->
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center">
                            <i data-lucide="clock" class="w-6 h-6 text-sky-600 dark:text-sky-400"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">Openingstijden</h3>
                            <p class="text-gray-600 dark:text-gray-400">
                                Maandag - Vrijdag: 08:00 - 18:00<br>
                                Weekend: Op afspraak
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Business Info -->
                <div class="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <h3 class="font-semibold mb-4">Bedrijfsgegevens</h3>
                    <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>KVK:</strong> <?php echo COMPANY_KVK; ?></p>
                        <p><strong>BTW:</strong> <?php echo COMPANY_BTW; ?></p>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div>
                <h2 class="text-3xl font-bold mb-8">Stuur ons een bericht</h2>
                
                <form method="POST" class="space-y-6">
                    <input type="hidden" name="submit_contact" value="1">
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Naam *</label>
                        <input type="text" 
                               name="naam" 
                               required 
                               class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-800">
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Bedrijf</label>
                        <input type="text" 
                               name="bedrijf" 
                               class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-800">
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Email *</label>
                        <input type="email" 
                               name="email" 
                               required 
                               class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-800">
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Telefoon</label>
                        <input type="tel" 
                               name="telefoon" 
                               class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-800">
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Onderwerp *</label>
                        <select name="onderwerp" 
                                required 
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-800">
                            <option value="">Selecteer een onderwerp</option>
                            <option value="Algemene vraag">Algemene vraag</option>
                            <option value="IT-Check aanvragen">IT-Check aanvragen</option>
                            <option value="Offerte aanvraag">Offerte aanvraag</option>
                            <option value="Support vraag">Support vraag</option>
                            <option value="Anders">Anders</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Bericht *</label>
                        <textarea name="bericht" 
                                  required 
                                  rows="6" 
                                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-800"></textarea>
                    </div>

                    <!-- hCaptcha -->
                    <div class="h-captcha" data-sitekey="10000000-ffff-ffff-ffff-000000000001"></div>

                    <button type="submit" class="w-full px-8 py-4 bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-lg hover:from-sky-700 hover:to-indigo-800 transition-all font-semibold">
                        Verstuur bericht
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

<script>
lucide.createIcons();
</script>

<?php include BASE_PATH . '/includes/footer.php'; ?>
