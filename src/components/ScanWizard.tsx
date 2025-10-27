import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, Send, Building2, Mail, Phone, User, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Captcha } from './Captcha';
import { toast } from 'sonner@2.0.3';

interface Question {
  id: string;
  question: string;
  description?: string;
  options: {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

interface ScanWizardProps {
  title: string;
  description: string;
  theme: {
    gradient: string;
    badge: string;
    button: string;
    progress: string;
    option: string;
    optionHover: string;
  };
  questions: Question[];
  icon: React.ComponentType<{ className?: string }>;
}

export function ScanWizard({ title, description, theme, questions, icon: Icon }: ScanWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [companyData, setCompanyData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const totalSteps = questions.length + 1; // +1 for company data form
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    
    // Auto-advance after selection with animation delay
    setTimeout(() => {
      if (currentStep < questions.length) {
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!companyData.companyName || !companyData.contactPerson || !companyData.email || !captchaToken) {
      toast.error('Vul alle verplichte velden in');
      return;
    }

    // Save submission to localStorage
    const submission = {
      type: title,
      timestamp: new Date().toISOString(),
      captchaVerified: true,
      answers: answers,
      ...companyData
    };

    try {
      const existingSubmissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
      existingSubmissions.push(submission);
      localStorage.setItem('form_submissions', JSON.stringify(existingSubmissions));
    } catch (error) {
      console.error('Error saving submission:', error);
    }

    // Simulate sending data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    toast.success('Scan aanvraag verzonden! We nemen binnen 24 uur contact op.');
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[600px] flex items-center justify-center"
      >
        <div className="text-center max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-24 h-24 mx-auto mb-8 rounded-full ${theme.gradient} flex items-center justify-center`}
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-4xl mb-4">Bedankt voor uw aanvraag!</h2>
          <p className="text-xl text-gray-600 mb-8">
            We hebben uw gegevens ontvangen en zullen binnen 24 uur contact met u opnemen om de scan in te plannen.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="mb-4">Uw antwoorden:</h3>
            <div className="space-y-3 text-left">
              {questions.map((q, idx) => (
                <div key={q.id} className="flex items-start gap-3">
                  <Badge className={theme.badge}>{idx + 1}</Badge>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{q.question}</p>
                    <p>{q.options.find(opt => opt.value === answers[q.id])?.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            size="lg" 
            className={theme.button}
            onClick={() => window.location.href = '/'}
          >
            Terug naar home
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${theme.gradient} flex items-center justify-center`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl mb-4">{title}</h1>
        <p className="text-xl text-gray-600">{description}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Stap {currentStep + 1} van {totalSteps}</span>
          <span className="text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${theme.progress}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Questions */}
      <AnimatePresence mode="wait">
        {currentStep < questions.length ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            <div className="mb-8">
              <h2 className="text-2xl mb-2">{questions[currentStep].question}</h2>
              {questions[currentStep].description && (
                <p className="text-gray-600">{questions[currentStep].description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {questions[currentStep].options.map((option) => {
                const OptionIcon = option.icon;
                const isSelected = answers[questions[currentStep].id] === option.value;
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleOptionSelect(questions[currentStep].id, option.value)}
                    className={`
                      relative p-6 rounded-xl border-2 text-left transition-all
                      ${isSelected 
                        ? `${theme.option} border-transparent text-white` 
                        : `bg-white border-gray-200 ${theme.optionHover}`
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {OptionIcon && (
                      <OptionIcon className={`w-8 h-8 mb-3 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    )}
                    <div className={isSelected ? 'text-white' : 'text-gray-900'}>
                      {option.label}
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-blue-600" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex gap-4">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Vorige
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Company Data Form */
          <motion.div
            key="company-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            <div className="mb-8">
              <h2 className="text-2xl mb-2">Bijna klaar!</h2>
              <p className="text-gray-600">
                Vul uw bedrijfsgegevens in zodat we contact met u kunnen opnemen voor de scan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Bedrijfsnaam <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="companyName"
                      required
                      className="pl-10"
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                      placeholder="Uw bedrijfsnaam"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">
                    Contactpersoon <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="contactPerson"
                      required
                      className="pl-10"
                      value={companyData.contactPerson}
                      onChange={(e) => setCompanyData({ ...companyData, contactPerson: e.target.value })}
                      placeholder="Voor- en achternaam"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-mailadres <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      className="pl-10"
                      value={companyData.email}
                      onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                      placeholder="uw@email.nl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefoonnummer</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-10"
                      value={companyData.phone}
                      onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                      placeholder="06 12345678"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="website"
                    type="url"
                    className="pl-10"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                    placeholder="www.uwbedrijf.nl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Aanvullende opmerkingen</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={companyData.message}
                  onChange={(e) => setCompanyData({ ...companyData, message: e.target.value })}
                  placeholder="Heeft u specifieke wensen of vragen?"
                />
              </div>

              <div className="space-y-2">
                <Label>Verifieer dat u geen robot bent <span className="text-red-500">*</span></Label>
                <Captcha
                  onVerify={setCaptchaToken}
                  onExpire={() => setCaptchaToken(null)}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Vorige
                </Button>
                
                <Button
                  type="submit"
                  size="lg"
                  className={`flex-1 ${theme.button}`}
                  disabled={!captchaToken}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Scan aanvragen
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}