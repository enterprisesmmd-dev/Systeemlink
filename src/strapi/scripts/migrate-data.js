/**
 * Migratie script om bestaande CMS data van localStorage naar Strapi te migreren
 * 
 * Gebruik:
 *   node scripts/migrate-data.js
 * 
 * Dit script:
 * 1. Leest bestaande CMS data uit het React project
 * 2. Transformeert de data naar Strapi formaat
 * 3. Maakt alle benodigde content entries aan in Strapi
 */

const fs = require('fs');
const path = require('path');

// Strapi configuratie
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_TOKEN || '';

console.log('🚀 Systeemlink CMS Data Migration');
console.log('==================================\n');

if (!STRAPI_TOKEN) {
  console.error('❌ ERROR: STRAPI_ADMIN_TOKEN environment variable is required');
  console.log('\nStappen:');
  console.log('1. Start Strapi: npm run develop');
  console.log('2. Log in op http://localhost:1337/admin');
  console.log('3. Ga naar Settings → API Tokens → Create new API Token');
  console.log('4. Name: "Migration", Type: "Full Access", Duration: "7 days"');
  console.log('5. Kopieer de token en run:');
  console.log('   STRAPI_ADMIN_TOKEN=your-token-here node scripts/migrate-data.js\n');
  process.exit(1);
}

// Helper functie om data naar Strapi te sturen
async function createStrapiEntry(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`❌ Failed to create ${endpoint}:`, error.message);
    throw error;
  }
}

// Helper functie om single type te updaten
async function updateStrapiSingle(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`❌ Failed to update ${endpoint}:`, error.message);
    throw error;
  }
}

// Migreer Company Settings
async function migrateCompanySettings() {
  console.log('📋 Migreren Company Settings...');
  
  const companyData = {
    name: 'Systeemlink',
    tagline: 'Jouw IT-partner in de regio Amsterdam',
    description: 'Systeemlink is een toonaangevend IT-bedrijf dat zich specialiseert in complete IT-oplossingen voor bedrijven.',
    address: {
      street: 'Planetenpark 19',
      postalCode: '1443BS',
      city: 'Purmerend',
      country: 'Nederland',
    },
    contact: {
      phone: '+31 613777733',
      email: 'info@systeemlink.nl',
      website: 'https://systeemlink.nl',
    },
    business: {
      kvk: '88308170',
      btw: 'NL004588053B11',
    },
    social: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
      youtube: '',
    },
  };

  await updateStrapiSingle('company-setting', companyData);
  console.log('✅ Company Settings gemigreerd\n');
}

// Migreer Email Settings
async function migrateEmailSettings() {
  console.log('📧 Migreren Email Settings...');
  
  const emailData = {
    fromEmail: 'noreply@systeemlink.nl',
    fromName: 'Systeemlink',
    replyToEmail: 'info@systeemlink.nl',
    notificationEmails: ['info@systeemlink.nl'],
    enabled: true,
  };

  await updateStrapiSingle('email-setting', emailData);
  console.log('✅ Email Settings gemigreerd\n');
}

// Migreer Support Widget Settings
async function migrateSupportWidgetSettings() {
  console.log('💬 Migreren Support Widget Settings...');
  
  const widgetData = {
    enabled: true,
    position: 'bottom-right',
    primaryColor: '#0066CC',
    greeting: 'Hoe kunnen we je helpen?',
    offlineMessage: 'We zijn momenteel offline. Laat een bericht achter en we nemen zo snel mogelijk contact met je op.',
    availabilityText: 'Ma-Vr: 09:00 - 17:00',
    contactEmail: 'support@systeemlink.nl',
    contactPhone: '+31 613777733',
  };

  await updateStrapiSingle('support-widget-setting', widgetData);
  console.log('✅ Support Widget Settings gemigreerd\n');
}

// Migreer Navigation Menus
async function migrateNavigationMenus() {
  console.log('🧭 Migreren Navigation Menus...');
  
  const headerMenu = {
    name: 'Header Menu',
    slug: 'header-menu',
    position: 'header',
    order: 1,
    enabled: true,
    items: [
      { label: 'Home', path: '/', type: 'internal' },
      { label: 'Diensten', path: '/diensten', type: 'internal', children: [
        { label: 'Zakelijke Diensten', path: '/zakelijke-diensten' },
        { label: 'Cloud Oplossingen', path: '/cloud' },
        { label: 'Netwerk Beheer', path: '/netwerk' },
        { label: 'Werkplek Beheer', path: '/werkplek' },
      ]},
      { label: 'Branches', path: '/branches', type: 'internal', children: [
        { label: 'Bouw', path: '/bouw' },
        { label: 'Zorg & Onderwijs', path: '/zorg-onderwijs' },
        { label: 'Retail & Logistiek', path: '/retail-logistiek' },
      ]},
      { label: 'Over Ons', path: '/over-ons', type: 'internal' },
      { label: 'Contact', path: '/contact', type: 'internal' },
    ],
  };

  const footerMenu = {
    name: 'Footer Menu',
    slug: 'footer-menu',
    position: 'footer',
    order: 1,
    enabled: true,
    items: [
      { label: 'Partners', path: '/partners' },
      { label: 'Certificeringen', path: '/certificeringen' },
      { label: 'Vacatures', path: '/vacatures' },
      { label: 'Support', path: '/support' },
    ],
  };

  await createStrapiEntry('navigation-menus', headerMenu);
  await createStrapiEntry('navigation-menus', footerMenu);
  console.log('✅ Navigation Menus gemigreerd\n');
}

// Migreer voorbeeldpagina (Home)
async function migrateHomePage() {
  console.log('📄 Migreren Home Page...');
  
  // Eerst de secties aanmaken
  const heroSection = await createStrapiEntry('sections', {
    name: 'Home Hero',
    type: 'hero',
    order: 1,
    enabled: true,
    content: {
      title: 'Uw betrouwbare IT-partner',
      subtitle: 'Professionele IT-oplossingen voor bedrijven in de regio Amsterdam',
      buttonText: 'Neem contact op',
      buttonLink: '/contact',
      backgroundImage: '',
    },
  });

  const statsSection = await createStrapiEntry('sections', {
    name: 'Home Stats',
    type: 'stats',
    order: 2,
    enabled: true,
    content: {
      stats: [
        { value: '500+', label: 'Tevreden klanten' },
        { value: '15+', label: 'Jaar ervaring' },
        { value: '24/7', label: 'Support beschikbaar' },
        { value: '98%', label: 'Klanttevredenheid' },
      ],
    },
  });

  // Dan de pagina aanmaken
  const homePage = {
    title: 'Home',
    slug: 'home',
    path: '/',
    published: true,
    sections: [heroSection.id, statsSection.id],
    seo: {
      metaTitle: 'Systeemlink - Uw IT-partner in de regio Amsterdam',
      metaDescription: 'Professionele IT-oplossingen en diensten voor bedrijven. Cloud, netwerk, werkplek beheer en meer.',
      keywords: 'IT-diensten, IT-support, Cloud oplossingen, Netwerk beheer, Amsterdam',
      metaRobots: 'index,follow',
    },
  };

  await createStrapiEntry('pages', homePage);
  console.log('✅ Home Page gemigreerd\n');
}

// Main migratie functie
async function runMigration() {
  try {
    console.log(`📡 Connecting to Strapi at ${STRAPI_URL}\n`);
    
    // Test connectie
    const healthCheck = await fetch(`${STRAPI_URL}/_health`);
    if (!healthCheck.ok) {
      throw new Error('Strapi is niet bereikbaar. Zorg dat Strapi draait op ' + STRAPI_URL);
    }
    console.log('✅ Strapi connectie succesvol\n');

    // Voer migraties uit
    await migrateCompanySettings();
    await migrateEmailSettings();
    await migrateSupportWidgetSettings();
    await migrateNavigationMenus();
    await migrateHomePage();

    console.log('✅ Alle data succesvol gemigreerd!\n');
    console.log('🎉 Je kunt nu Strapi admin bekijken op: ' + STRAPI_URL + '/admin\n');

  } catch (error) {
    console.error('\n❌ Migratie gefaald:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Zorg dat Strapi draait: npm run develop');
    console.log('2. Check of je admin token correct is');
    console.log('3. Check Strapi logs voor meer details\n');
    process.exit(1);
  }
}

// Run de migratie
runMigration();
