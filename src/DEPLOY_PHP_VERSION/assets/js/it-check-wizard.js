/**
 * IT-Check Wizard JavaScript
 * Interactive multi-step form
 */

const questions = [
    {
        id: 'employees',
        question: 'Hoeveel medewerkers heeft uw organisatie?',
        description: 'Dit helpt ons de juiste IT-oplossing voor te stellen',
        options: [
            { value: '1-10', label: '1-10 medewerkers', icon: 'users' },
            { value: '11-50', label: '11-50 medewerkers', icon: 'users' },
            { value: '51-100', label: '51-100 medewerkers', icon: 'building-2' },
            { value: '100+', label: 'Meer dan 100 medewerkers', icon: 'building-2' }
        ]
    },
    {
        id: 'industry',
        question: 'In welke branche is uw organisatie actief?',
        description: 'Verschillende branches hebben verschillende IT-behoeften',
        options: [
            { value: 'retail', label: 'Retail & E-commerce', icon: 'shopping-cart' },
            { value: 'logistics', label: 'Logistiek & Transport', icon: 'truck' },
            { value: 'construction', label: 'Bouw & Industrie', icon: 'hard-hat' },
            { value: 'healthcare', label: 'Zorg & Welzijn', icon: 'heart' },
            { value: 'education', label: 'Onderwijs', icon: 'graduation-cap' },
            { value: 'business-services', label: 'Zakelijke dienstverlening', icon: 'briefcase' },
            { value: 'other', label: 'Overig', icon: 'globe' }
        ]
    },
    {
        id: 'infrastructure',
        question: 'Waar draait uw IT-infrastructuur momenteel?',
        description: 'We analyseren uw huidige omgeving en migratiemogelijkheden',
        options: [
            { value: 'on-premise', label: 'Volledig on-premise (eigen servers)', icon: 'server' },
            { value: 'hybrid', label: 'Hybride (deels cloud, deels on-premise)', icon: 'cloud' },
            { value: 'cloud-basic', label: 'Cloud (basis setup)', icon: 'cloud' },
            { value: 'cloud-advanced', label: 'Cloud (volledig geoptimaliseerd)', icon: 'zap' }
        ]
    },
    {
        id: 'budget',
        question: 'Wat is uw geschatte maandbudget voor IT?',
        description: 'Dit helpt ons realistische aanbevelingen te doen',
        options: [
            { value: '1k', label: '€ 1.000 - € 2.500 per maand', icon: 'euro' },
            { value: '2.5k', label: '€ 2.500 - € 5.000 per maand', icon: 'euro' },
            { value: '5k', label: '€ 5.000 - € 10.000 per maand', icon: 'euro' },
            { value: '10k+', label: 'Meer dan € 10.000 per maand', icon: 'euro' },
            { value: 'unknown', label: 'Nog niet bekend', icon: 'help-circle' }
        ]
    },
    {
        id: 'primary-goal',
        question: 'Wat is uw belangrijkste doel met deze IT-check?',
        description: 'We richten de analyse op uw specifieke doelstellingen',
        options: [
            { value: 'productivity', label: 'Productiviteit verhogen', icon: 'zap' },
            { value: 'security', label: 'Beveiliging verbeteren', icon: 'shield' },
            { value: 'cost', label: 'Kosten besparen', icon: 'trending-down' },
            { value: 'flexibility', label: 'Flexibiliteit verhogen', icon: 'cloud' },
            { value: 'scalability', label: 'Schaalbaarheid verbeteren', icon: 'trending-up' }
        ]
    }
];

let currentQuestion = 0;
let answers = {};

// Initialize wizard
function initWizard() {
    renderQuestion(0);
    updateProgress();
}

// Render question
function renderQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('questions-container');
    
    let html = `
        <div class="question-slide">
            <div class="mb-6">
                <span class="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    Vraag ${index + 1} van ${questions.length}
                </span>
            </div>
            
            <h3 class="text-2xl font-bold mb-3">${question.question}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-8">${question.description}</p>
            
            <div class="grid gap-4">
    `;
    
    question.options.forEach(option => {
        const isSelected = answers[question.id] === option.value;
        html += `
            <button type="button" 
                    onclick="selectOption('${question.id}', '${option.value}')"
                    class="option-button ${isSelected ? 'selected' : ''} flex items-center gap-4 p-4 border-2 rounded-lg transition-all text-left ${isSelected ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'}">
                <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                    <i data-lucide="${option.icon}" class="w-6 h-6 text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <span class="flex-1 font-medium">${option.label}</span>
                ${isSelected ? '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i>' : ''}
            </button>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    lucide.createIcons();
}

// Select option
function selectOption(questionId, value) {
    answers[questionId] = value;
    
    // Update UI
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected', 'border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-900/20');
        btn.classList.add('border-gray-300', 'dark:border-gray-700');
    });
    
    event.target.closest('.option-button').classList.add('selected', 'border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-900/20');
    event.target.closest('.option-button').classList.remove('border-gray-300', 'dark:border-gray-700');
    
    // Auto-advance after selection
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        } else {
            showContactForm();
        }
    }, 500);
}

// Next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
        updateProgress();
        updateButtons();
    } else {
        showContactForm();
    }
}

// Previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
        updateProgress();
        updateButtons();
    }
}

// Show contact form
function showContactForm() {
    document.getElementById('questions-container').classList.add('hidden');
    document.getElementById('contact-step').classList.remove('hidden');
    document.getElementById('navigation-buttons').classList.add('hidden');
    
    // Add answers as hidden fields
    const form = document.getElementById('it-check-form');
    Object.keys(answers).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = `answers[${key}]`;
        input.value = answers[key];
        form.appendChild(input);
    });
    
    updateProgress(100);
}

// Update progress bar
function updateProgress(percent = null) {
    const progress = percent || Math.round(((currentQuestion + 1) / questions.length) * 100);
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-text').textContent = progress + '%';
}

// Update navigation buttons
function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (currentQuestion === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = 'Naar contactgegevens';
    } else {
        nextBtn.textContent = 'Volgende';
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initWizard);
