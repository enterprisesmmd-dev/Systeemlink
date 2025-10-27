// Unsplash helper - provides stock images based on search terms

const unsplashSearchMap: Record<string, string> = {
  // Technology & IT
  'technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
  'computer': 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1200',
  'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200',
  'server': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
  'data center': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
  'network': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200',
  'cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
  'cloud': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
  'code': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
  'programming': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
  
  // Office & Business
  'office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
  'modern office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
  'workspace': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
  'business': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
  'meeting': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
  'team': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
  'collaboration': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
  'presentation': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200',
  'conference': 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200',
  
  // People
  'professional': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
  'businessman': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
  'businesswoman': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
  'team member': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
  'employee': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
  
  // Support & Service
  'support': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200',
  'customer service': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200',
  'helpdesk': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200',
  'call center': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200',
  
  // Security
  'security': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200',
  'lock': 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200',
  'firewall': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
  'protection': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200',
  
  // Healthcare
  'healthcare': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
  'hospital': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200',
  'medical': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
  'doctor': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200',
  
  // Education
  'education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
  'school': 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200',
  'classroom': 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200',
  'students': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
  
  // Retail & Logistics
  'retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
  'store': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
  'warehouse': 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200',
  'logistics': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200',
  'shipping': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200',
  
  // Construction & Industry
  'construction': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200',
  'industry': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
  'factory': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
  'manufacturing': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
  
  // Abstract & Background
  'abstract': 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200',
  'gradient': 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200',
  'background': 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200',
  'pattern': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200',
};

export async function unsplash_tool(query: string): Promise<string> {
  const lowerQuery = query.toLowerCase().trim();
  
  // Direct match
  if (unsplashSearchMap[lowerQuery]) {
    return unsplashSearchMap[lowerQuery];
  }
  
  // Partial match
  for (const [key, url] of Object.entries(unsplashSearchMap)) {
    if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
      return url;
    }
  }
  
  // Fallback to generic office/technology image
  return 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80';
}

// Get multiple images for variety
export async function unsplashMultiple(query: string, count: number = 4): Promise<string[]> {
  const results: string[] = [];
  const lowerQuery = query.toLowerCase();
  
  // Try to find related terms
  const relatedTerms = Object.keys(unsplashSearchMap).filter(key =>
    lowerQuery.includes(key) || key.includes(lowerQuery)
  );
  
  for (let i = 0; i < Math.min(count, relatedTerms.length); i++) {
    results.push(unsplashSearchMap[relatedTerms[i]]);
  }
  
  // Fill remaining with variations
  while (results.length < count) {
    const baseUrl = await unsplash_tool(query);
    results.push(baseUrl);
  }
  
  return results;
}
