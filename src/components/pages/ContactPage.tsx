import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { SEO } from '../SEO';
import { PageHero, ContentSection, FeatureSection } from '../sections';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { AnimatedSection } from '../AnimatedSection';
import { Captcha } from '../Captcha';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefoon',
      description: '+31 613777733',
      subtext: 'Ma-vr: 08:00 - 18:00'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'info@systeemlink.nl',
      subtext: 'We reageren binnen 24 uur'
    },
    {
      icon: MapPin,
      title: 'Locatie',
      description: 'Planetenpark 19, 1443BS Purmerend',
      subtext: 'Bezoek op afspraak'
    },
    {
      icon: Clock,
      title: 'Openingstijden',
      description: 'Ma-vr: 08:00 - 18:00',
      subtext: '24/7 Support voor klanten'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        })
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        setCaptchaToken(null);
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SEO
        title="Contact - Neem contact op met Systeemlink | Systeemlink"
        description="Neem contact op met Systeemlink voor al uw IT-vragen. Telefoon, email of plan direct een afspraak. We helpen u graag verder."
        keywords="contact, IT-support contact, offerte aanvragen, bereikbaarheid, Systeemlink contact"
        canonical="https://systeemlink.nl/bedrijfsinformatie/contact"
      />

      <PageHero
        breadcrumbs={[
          { label: 'Bedrijfsinformatie', path: '/bedrijfsinformatie/over-ons' },
          { label: 'Contact', path: '/bedrijfsinformatie/contact' }
        ]}
        badge={{ text: 'Neem contact op' }}
        title="Laten we kennismaken"
        description="Heeft u vragen over onze diensten of wilt u een vrijblijvend gesprek? Neem gerust contact met ons op."
        gradient="from-sky-600 via-blue-700 to-indigo-800"
        buttons={[
          { text: 'Bel direct', link: 'tel:+31201234567', variant: 'primary' },
          { text: 'Stuur een email', link: 'mailto:info@systeemlink.nl', variant: 'secondary' }
        ]}
      />

      {/* Contact Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
                <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg mb-2">{info.title}</h3>
                  <p className="mb-1">{info.description}</p>
                  <p className="text-sm text-gray-600">{info.subtext}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl mb-4">
                Stuur ons een bericht
              </h2>
              <p className="text-xl text-gray-600">
                Vul het formulier in en we nemen zo snel mogelijk contact met u op
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={0.2}>
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Naam *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Uw naam"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Bedrijfsnaam</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Uw bedrijf"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="uw.email@bedrijf.nl"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefoon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+31 6 12345678"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Bericht *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Vertel ons waar we u mee kunnen helpen..."
                    rows={6}
                    required
                  />
                </div>

                <Captcha
                  onVerify={setCaptchaToken}
                  onExpire={() => setCaptchaToken(null)}
                />

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white" disabled={isSubmitting || !captchaToken}>
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                </Button>

                {submitSuccess && (
                  <p className="text-sm text-gray-600 text-center">
                    Uw bericht is succesvol verzonden. We nemen zo snel mogelijk contact met u op.
                  </p>
                )}

                <p className="text-sm text-gray-600 text-center">
                  Door dit formulier te versturen gaat u akkoord met onze{' '}
                  <a href="#" className="text-sky-600 hover:underline">privacy policy</a>
                </p>
              </form>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-96 bg-gray-200">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4" />
            <p>Google Maps integratie</p>
          </div>
        </div>
      </section>
    </div>
  );
}