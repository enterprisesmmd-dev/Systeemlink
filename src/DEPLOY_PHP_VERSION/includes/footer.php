</main>

<!-- Footer -->
<footer class="bg-gray-900 dark:bg-black text-white pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <!-- Company Info -->
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-gradient-to-br from-sky-600 to-indigo-700 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-xl">S</span>
                    </div>
                    <span class="text-xl font-semibold">Systeemlink</span>
                </div>
                <p class="text-gray-400 text-sm mb-4">
                    Professioneel IT-beheer voor het MKB
                </p>
                <div class="space-y-2 text-sm text-gray-400">
                    <div class="flex items-center gap-2">
                        <i data-lucide="map-pin" class="w-4 h-4"></i>
                        <span><?php echo COMPANY_ADDRESS; ?></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i data-lucide="phone" class="w-4 h-4"></i>
                        <a href="tel:<?php echo str_replace(' ', '', COMPANY_PHONE); ?>" class="hover:text-sky-400">
                            <?php echo COMPANY_PHONE; ?>
                        </a>
                    </div>
                    <div class="flex items-center gap-2">
                        <i data-lucide="mail" class="w-4 h-4"></i>
                        <a href="mailto:<?php echo COMPANY_EMAIL; ?>" class="hover:text-sky-400">
                            <?php echo COMPANY_EMAIL; ?>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Oplossingen -->
            <div>
                <h3 class="font-semibold mb-4">Oplossingen</h3>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="<?php echo get_page_url('oplossingen/werkplekbeheer'); ?>" class="hover:text-sky-400">Werkplekbeheer</a></li>
                    <li><a href="<?php echo get_page_url('oplossingen/cloud-microsoft-365'); ?>" class="hover:text-sky-400">Cloud & Microsoft 365</a></li>
                    <li><a href="<?php echo get_page_url('oplossingen/netwerk-beveiliging'); ?>" class="hover:text-sky-400">Netwerk & Beveiliging</a></li>
                    <li><a href="<?php echo get_page_url('oplossingen/it-support'); ?>" class="hover:text-sky-400">IT-Support</a></li>
                </ul>
            </div>

            <!-- Branches -->
            <div>
                <h3 class="font-semibold mb-4">Branches</h3>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="<?php echo get_page_url('branches/zakelijke-dienstverlening'); ?>" class="hover:text-sky-400">Zakelijke Dienstverlening</a></li>
                    <li><a href="<?php echo get_page_url('branches/zorg-onderwijs'); ?>" class="hover:text-sky-400">Zorg & Onderwijs</a></li>
                    <li><a href="<?php echo get_page_url('branches/retail-logistiek'); ?>" class="hover:text-sky-400">Retail & Logistiek</a></li>
                    <li><a href="<?php echo get_page_url('branches/bouw-industrie'); ?>" class="hover:text-sky-400">Bouw & Industrie</a></li>
                </ul>
            </div>

            <!-- Bedrijf -->
            <div>
                <h3 class="font-semibold mb-4">Bedrijf</h3>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="<?php echo get_page_url('bedrijfsinformatie/over-ons'); ?>" class="hover:text-sky-400">Over Ons</a></li>
                    <li><a href="<?php echo get_page_url('bedrijfsinformatie/partners-certificeringen'); ?>" class="hover:text-sky-400">Partners</a></li>
                    <li><a href="<?php echo get_page_url('bedrijfsinformatie/vacatures'); ?>" class="hover:text-sky-400">Vacatures</a></li>
                    <li><a href="<?php echo get_page_url('bedrijfsinformatie/contact'); ?>" class="hover:text-sky-400">Contact</a></li>
                </ul>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-sm text-gray-400">
                    &copy; <?php echo date('Y'); ?> <?php echo COMPANY_NAME; ?>. Alle rechten voorbehouden.
                </div>
                <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span>KVK: <?php echo COMPANY_KVK; ?></span>
                    <span>BTW: <?php echo COMPANY_BTW; ?></span>
                </div>
            </div>
        </div>
    </div>
</footer>

<!-- Support Widget -->
<button onclick="toggleSupportWidget()" class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40">
    <i data-lucide="headphones" class="w-6 h-6"></i>
</button>

<!-- Back to Top -->
<button onclick="scrollToTop()" id="back-to-top" class="hidden fixed bottom-24 right-6 w-12 h-12 bg-gray-900 dark:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40">
    <i data-lucide="arrow-up" class="w-5 h-5"></i>
</button>

<!-- Cookie Consent -->
<div id="cookie-consent" class="hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-50">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-700 dark:text-gray-300">
            We gebruiken cookies om uw ervaring te verbeteren. Door deze website te gebruiken, gaat u akkoord met ons gebruik van cookies.
        </p>
        <div class="flex gap-3">
            <button onclick="acceptCookies()" class="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium">
                Accepteren
            </button>
            <button onclick="declineCookies()" class="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                Weigeren
            </button>
        </div>
    </div>
</div>

<!-- Scripts -->
<script>
// Initialize Lucide icons
lucide.createIcons();

// Dark Mode Toggle
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        document.cookie = 'theme=light; path=/; max-age=31536000';
    } else {
        html.classList.add('dark');
        document.cookie = 'theme=dark; path=/; max-age=31536000';
    }
    
    // Reinitialize icons
    setTimeout(() => lucide.createIcons(), 100);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Back to Top
window.addEventListener('scroll', function() {
    const btn = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        btn.classList.remove('hidden');
    } else {
        btn.classList.add('hidden');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cookie Consent
if (!getCookie('cookieConsent')) {
    document.getElementById('cookie-consent').classList.remove('hidden');
}

function acceptCookies() {
    document.cookie = 'cookieConsent=accepted; path=/; max-age=31536000';
    document.getElementById('cookie-consent').classList.add('hidden');
}

function declineCookies() {
    document.cookie = 'cookieConsent=declined; path=/; max-age=31536000';
    document.getElementById('cookie-consent').classList.add('hidden');
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Support Widget (placeholder)
function toggleSupportWidget() {
    alert('Support widget - In productie: WhatsApp/Chat integratie');
}
</script>

</body>
</html>
