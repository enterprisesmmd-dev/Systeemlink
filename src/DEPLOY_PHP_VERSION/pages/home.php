<?php
/**
 * Homepage
 */

$page_title = 'Professioneel IT-beheer voor het MKB';
$page_description = 'Systeemlink biedt professioneel IT-beheer, werkplekbeheer, cloud oplossingen en netwerkbeveiliging voor MKB bedrijven in Nederland.';

include BASE_PATH . '/includes/header.php';
?>

<!-- Hero Slider -->
<section class="relative bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                <span class="text-sm">Professioneel IT-beheer</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
                Zorgeloos IT-beheer voor uw bedrijf
            </h1>
            
            <p class="text-xl opacity-90 mb-8">
                Focus op uw core business, wij regelen de IT. Van werkplekbeheer tot cloud migraties en 24/7 support.
            </p>
            
            <div class="flex flex-wrap gap-4">
                <a href="<?php echo get_page_url('it-check'); ?>" class="px-8 py-4 bg-white text-sky-600 rounded-lg hover:bg-gray-100 transition-all font-semibold">
                    Gratis IT-Check
                </a>
                <a href="<?php echo get_page_url('bedrijfsinformatie/contact'); ?>" class="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 rounded-lg transition-all font-semibold">
                    Neem Contact Op
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Stats Bar -->
<section class="bg-sky-600 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <div class="text-3xl md:text-4xl font-bold mb-1">500+</div>
                <div class="text-sm opacity-90">Tevreden klanten</div>
            </div>
            <div>
                <div class="text-3xl md:text-4xl font-bold mb-1">24/7</div>
                <div class="text-sm opacity-90">Support beschikbaar</div>
            </div>
            <div>
                <div class="text-3xl md:text-4xl font-bold mb-1">99.9%</div>
                <div class="text-sm opacity-90">Uptime garantie</div>
            </div>
            <div>
                <div class="text-3xl md:text-4xl font-bold mb-1">15+</div>
                <div class="text-sm opacity-90">Jaar ervaring</div>
            </div>
        </div>
    </div>
</section>

<!-- Services Grid -->
<section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <div class="inline-flex items-center gap-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-4 py-2 rounded-full mb-4">
                <i data-lucide="zap" class="w-4 h-4"></i>
                <span class="text-sm">Onze diensten</span>
            </div>
            <h2 class="text-3xl md:text-5xl font-bold mb-6">
                Complete IT-oplossingen
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400">
                Van werkplekbeheer tot cloud migraties - wij ontzorgen uw IT volledig
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Werkplekbeheer -->
            <a href="<?php echo get_page_url('oplossingen/werkplekbeheer'); ?>" class="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                <div class="w-14 h-14 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="monitor" class="w-7 h-7 text-sky-600 dark:text-sky-400"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">Werkplekbeheer</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Modern workplace management met Microsoft 365 en Intune
                </p>
                <div class="flex items-center text-sky-600 dark:text-sky-400 text-sm font-medium">
                    Meer info
                    <i data-lucide="arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></i>
                </div>
            </a>

            <!-- Cloud & Microsoft 365 -->
            <a href="<?php echo get_page_url('oplossingen/cloud-microsoft-365'); ?>" class="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                <div class="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="cloud" class="w-7 h-7 text-indigo-600 dark:text-indigo-400"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">Cloud & Microsoft 365</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Migratie naar de cloud en optimalisatie van Microsoft 365
                </p>
                <div class="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                    Meer info
                    <i data-lucide="arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></i>
                </div>
            </a>

            <!-- Netwerk & Beveiliging -->
            <a href="<?php echo get_page_url('oplossingen/netwerk-beveiliging'); ?>" class="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                <div class="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="shield" class="w-7 h-7 text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">Netwerk & Beveiliging</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Enterprise-grade netwerkbeveiliging en monitoring
                </p>
                <div class="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    Meer info
                    <i data-lucide="arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></i>
                </div>
            </a>

            <!-- IT-Support -->
            <a href="<?php echo get_page_url('oplossingen/it-support'); ?>" class="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                <div class="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="headphones" class="w-7 h-7 text-orange-600 dark:text-orange-400"></i>
                </div>
                <h3 class="text-xl font-semibold mb-3">IT-Support</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    24/7 support en proactieve monitoring van uw systemen
                </p>
                <div class="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium">
                    Meer info
                    <i data-lucide="arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></i>
                </div>
            </a>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div class="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div class="relative z-10 max-w-3xl mx-auto">
                <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <i data-lucide="gift" class="w-4 h-4"></i>
                    <span class="text-sm">Gratis & vrijblijvend</span>
                </div>
                
                <h2 class="text-3xl md:text-5xl font-bold mb-6">
                    Vraag een gratis IT-check aan
                </h2>
                
                <p class="text-xl opacity-90 mb-8">
                    Ontdek in 16 stappen verbeterpunten, bespaarmogelijkheden en security risico's
                </p>
                
                <a href="<?php echo get_page_url('it-check'); ?>" class="inline-block px-8 py-4 bg-white text-sky-600 rounded-lg hover:bg-gray-100 transition-all font-semibold">
                    Start IT-Check
                </a>
            </div>
        </div>
    </div>
</section>

<script>
// Reinitialize icons
lucide.createIcons();
</script>

<?php include BASE_PATH . '/includes/footer.php'; ?>
