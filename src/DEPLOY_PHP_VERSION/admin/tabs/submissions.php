<?php
/**
 * Submissions Tab
 */

$all_submissions = get_submissions();
$filter_type = $_GET['filter'] ?? 'all';

if ($filter_type !== 'all') {
    $all_submissions = array_filter($all_submissions, function($sub) use ($filter_type) {
        return ($sub['type'] ?? 'general') === $filter_type;
    });
}
?>

<div class="space-y-6">
    <!-- Filters -->
    <div class="flex items-center gap-4">
        <a href="?page=admin&tab=submissions&filter=all" class="px-4 py-2 rounded-lg <?php echo $filter_type === 'all' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'; ?>">
            Alle (<?php echo count(get_submissions()); ?>)
        </a>
        <a href="?page=admin&tab=submissions&filter=IT-Check" class="px-4 py-2 rounded-lg <?php echo $filter_type === 'IT-Check' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'; ?>">
            IT-Checks
        </a>
        <a href="?page=admin&tab=submissions&filter=Security Scan" class="px-4 py-2 rounded-lg <?php echo $filter_type === 'Security Scan' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'; ?>">
            Security Scans
        </a>
        <a href="?page=admin&tab=submissions&filter=Contact" class="px-4 py-2 rounded-lg <?php echo $filter_type === 'Contact' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'; ?>">
            Contact
        </a>
    </div>

    <!-- Submissions List -->
    <?php if (empty($all_submissions)): ?>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <i data-lucide="inbox" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">Geen submissions</h3>
            <p class="text-gray-500">Er zijn nog geen formulier submissions ontvangen.</p>
        </div>
    <?php else: ?>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bedrijf/Naam</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <?php foreach (array_reverse($all_submissions) as $submission): ?>
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <?php echo format_date($submission['timestamp']); ?>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800">
                                <?php echo $submission['type'] ?? 'General'; ?>
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <?php echo $submission['data']['bedrijf'] ?? $submission['data']['naam'] ?? 'N/A'; ?>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <a href="mailto:<?php echo $submission['data']['email'] ?? ''; ?>" class="text-sky-600 hover:text-sky-700">
                                <?php echo $submission['data']['email'] ?? 'N/A'; ?>
                            </a>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                            <button onclick="viewSubmission('<?php echo $submission['id']; ?>')" class="text-sky-600 hover:text-sky-700 font-medium">
                                Bekijk details
                            </button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
</div>

<script>
function viewSubmission(id) {
    alert('Submission details voor ID: ' + id + '\n\nIn productie: modal met alle details');
}

lucide.createIcons();
</script>
