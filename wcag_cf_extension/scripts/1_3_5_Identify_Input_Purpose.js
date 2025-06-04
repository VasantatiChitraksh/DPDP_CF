// WCAG 1.3.5 Identify Input Purpose Accessibility Checker
// Production version - Clean and professional

(() => {
  'use strict';
  console.log('%cWCAG 1.3.5', 'color:white;background-color:teal; padding: 5px 50px; font-weight: bold;');
  
  console.log('🔍 WCAG 1.3.5 Checker initializing...');
  
  // Configuration
  const config = {
    highlightViolations: true,
    logViolations: true,
    showSummary: true,
    violationStyles: {
      personal: { border: '2px solid #e74c3c', boxShadow: '0 0 5px #e74c3c' },
      contact: { border: '2px solid #f39c12', boxShadow: '0 0 5px #f39c12' },
      address: { border: '2px solid #9b59b6', boxShadow: '0 0 5px #9b59b6' },
      payment: { border: '2px solid #27ae60', boxShadow: '0 0 5px #27ae60' },
      other: { border: '2px solid #34495e', boxShadow: '0 0 5px #34495e' }
    }
  };
  
  // Violation tracking
  let violations = {
    personal: [],
    contact: [],
    address: [],
    payment: [],
    other: [],
    total: 0
  };
  
  // WCAG 1.3.5 Input Purpose Tokens (official list from WCAG 2.1)
  const inputPurposeTokens = {
    personal: [
      'name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 
      'honorific-suffix', 'nickname', 'username', 'new-password', 'current-password',
      'organization-title', 'organization', 'bday', 'bday-day', 'bday-month', 'bday-year',
      'sex', 'photo', 'language'
    ],
    contact: [
      'email', 'tel', 'tel-country-code', 'tel-national', 'tel-area-code', 
      'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-extension',
      'impp', 'url'
    ],
    address: [
      'street-address', 'address-line1', 'address-line2', 'address-line3',
      'address-level4', 'address-level3', 'address-level2', 'address-level1',
      'country', 'country-name', 'postal-code'
    ],
    payment: [
      'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name',
      'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-csc',
      'cc-type', 'transaction-currency', 'transaction-amount'
    ]
  };
  
  // Patterns to identify input purposes from labels/placeholders/names
  const purposePatterns = {
    personal: {
      'name': /\b(full\s*name|complete\s*name|your\s*name|user\s*name|username|login|account\s*name)\b/i,
      'given-name': /\b(first\s*name|given\s*name|forename)\b/i,
      'family-name': /\b(last\s*name|family\s*name|surname|lastname)\b/i,
      'nickname': /\b(nickname|display\s*name|screen\s*name)\b/i,
      'honorific-prefix': /\b(title|prefix|mr|mrs|ms|dr|prof)\b/i,
      'honorific-suffix': /\b(suffix|jr|sr|phd|md)\b/i,
      'new-password': /\b(new\s*password|create\s*password|set\s*password|password\s*confirmation)\b/i,
      'current-password': /\b(current\s*password|existing\s*password|password|pwd)\b/i,
      'organization': /\b(company|organization|employer|business)\b/i,
      'organization-title': /\b(job\s*title|position|role)\b/i,
      'bday': /\b(birth\s*date|birthday|date\s*of\s*birth|dob)\b/i,
      'sex': /\b(gender|sex)\b/i,
      'language': /\b(language|locale|lang)\b/i
    },
    contact: {
      'email': /\b(email|e-mail|electronic\s*mail)\b/i,
      'tel': /\b(phone|telephone|mobile|cell|tel)\b/i,
      'url': /\b(website|url|homepage|web\s*address)\b/i,
      'impp': /\b(skype|messenger|chat|im)\b/i
    },
    address: {
      'street-address': /\b(address|street|location)\b/i,
      'address-line1': /\b(address\s*line\s*1|street\s*address|address\s*1)\b/i,
      'address-line2': /\b(address\s*line\s*2|apartment|apt|suite|unit|address\s*2)\b/i,
      'address-level1': /\b(state|province|region)\b/i,
      'address-level2': /\b(city|town|locality)\b/i,
      'country': /\b(country|nation)\b/i,
      'postal-code': /\b(zip|postal\s*code|postcode|zip\s*code)\b/i
    },
    payment: {
      'cc-name': /\b(card\s*holder|name\s*on\s*card|cardholder\s*name)\b/i,
      'cc-number': /\b(card\s*number|credit\s*card|debit\s*card|cc\s*number)\b/i,
      'cc-exp': /\b(expir|exp\s*date|expiration)\b/i,
      'cc-exp-month': /\b(exp\s*month|expir.*month)\b/i,
      'cc-exp-year': /\b(exp\s*year|expir.*year)\b/i,
      'cc-csc': /\b(cvv|cvc|security\s*code|card\s*code|csc)\b/i,
      'cc-type': /\b(card\s*type|payment\s*type)\b/i
    }
  };
  
  // Safe jQuery execution
  function executeWithJQuery(callback) {
    if (typeof $ !== 'undefined') {
      callback();
    } else if (typeof jQuery !== 'undefined') {
      window.$ = jQuery;
      callback();
    } else {
      // Fallback to vanilla JS after short wait
      setTimeout(() => {
        if (typeof $ !== 'undefined' || typeof jQuery !== 'undefined') {
          if (typeof $ === 'undefined') window.$ = jQuery;
          callback();
        } else {
          executeWithVanillaJS();
        }
      }, 500);
    }
  }
  
  // Main WCAG checker with jQuery
  function runWCAGChecks() {
    console.log('🎯 Running WCAG 1.3.5 compliance check...');
    
    try {
      checkInputPurposes();
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error during WCAG checks:', error);
      executeWithVanillaJS();
    }
  }
  
  // Check input purposes
  function checkInputPurposes() {
    $('input, select, textarea').each(function() {
      const $input = $(this);
      const inputType = $input.attr('type') || 'text';
      
      // Skip non-relevant input types
      if (['submit', 'reset', 'button', 'hidden', 'image', 'file'].includes(inputType)) {
        return;
      }
      
      // Get various attributes and associated text
      const autocomplete = $input.attr('autocomplete');
      const name = $input.attr('name') || '';
      const id = $input.attr('id') || '';
      const placeholder = $input.attr('placeholder') || '';
      
      // Get associated label text
      let labelText = '';
      const labelFor = $(`label[for="${id}"]`);
      const parentLabel = $input.closest('label');
      const ariaLabel = $input.attr('aria-label') || '';
      const ariaLabelledBy = $input.attr('aria-labelledby');
      
      if (labelFor.length) {
        labelText = labelFor.text().trim();
      } else if (parentLabel.length) {
        labelText = parentLabel.text().trim();
      } else if (ariaLabel) {
        labelText = ariaLabel;
      } else if (ariaLabelledBy) {
        const labelElements = ariaLabelledBy.split(' ')
          .map(id => $(`#${id}`))
          .filter(el => el.length);
        labelText = labelElements.map(el => el.text().trim()).join(' ');
      }
      
      // Combine all text sources for analysis
      const allText = `${labelText} ${placeholder} ${name}`.toLowerCase();
      
      // Check if this input collects user information
      const collectsUserInfo = detectsUserInformation(allText, inputType);
      
      if (collectsUserInfo) {
        const detectedPurpose = detectInputPurpose(allText, inputType);
        
        // Check if autocomplete attribute is present and valid
        const hasValidAutocomplete = autocomplete && isValidAutocompleteValue(autocomplete);
        
        if (!hasValidAutocomplete) {
          const violation = {
            element: this,
            type: detectedPurpose.category,
            issue: `Input collecting user information missing autocomplete attribute`,
            detectedPurpose: detectedPurpose.purpose,
            suggestedAutocomplete: detectedPurpose.purpose,
            inputType: inputType,
            labelText: labelText || 'No label found',
            suggestion: `Add autocomplete="${detectedPurpose.purpose}" to identify input purpose`
          };
          
          violations[detectedPurpose.category].push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.3.5: Input missing autocomplete attribute', {
              element: this,
              detectedPurpose: detectedPurpose.purpose,
              labelText: labelText,
              inputType: inputType
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($input, detectedPurpose.category, 
              `Missing autocomplete="${detectedPurpose.purpose}"`);
          }
        } else if (!detectedPurpose.purpose || 
                   !autocomplete.split(' ').some(token => 
                     Object.values(inputPurposeTokens).flat().includes(token))) {
          // Has autocomplete but it might not be a valid WCAG token
          const violation = {
            element: this,
            type: 'other',
            issue: `Autocomplete value may not be a valid WCAG token`,
            currentAutocomplete: autocomplete,
            suggestion: 'Ensure autocomplete uses valid WCAG 1.3.5 tokens'
          };
          
          violations.other.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.3.5: Potentially invalid autocomplete token', {
              element: this,
              autocomplete: autocomplete
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($input, 'other', 'Check autocomplete validity');
          }
        }
      }
    });
  }
  
  // Detect if input collects user information
  function detectsUserInformation(text, inputType) {
    const userInfoPatterns = [
      // Personal information
      /\b(name|email|phone|address|birthday|age|gender|title)\b/i,
      // Contact information
      /\b(contact|telephone|mobile|website|url)\b/i,
      // Address information
      /\b(street|city|state|country|zip|postal)\b/i,
      // Payment information
      /\b(card|credit|debit|payment|billing|cvv|expir)\b/i,
      // Account information
      /\b(username|password|account|login|profile)\b/i
    ];
    
    // Password inputs almost always collect user info
    if (inputType === 'password') return true;
    
    // Email inputs collect user info
    if (inputType === 'email') return true;
    
    // Tel inputs collect user info
    if (inputType === 'tel') return true;
    
    return userInfoPatterns.some(pattern => pattern.test(text));
  }
  
  // Detect the specific input purpose
  function detectInputPurpose(text, inputType) {
    // Check input type first
    if (inputType === 'email') {
      return { category: 'contact', purpose: 'email' };
    }
    if (inputType === 'tel') {
      return { category: 'contact', purpose: 'tel' };
    }
    if (inputType === 'password') {
      if (text.includes('new') || text.includes('confirm') || text.includes('create')) {
        return { category: 'personal', purpose: 'new-password' };
      }
      return { category: 'personal', purpose: 'current-password' };
    }
    
    // Check against patterns
    for (const [category, patterns] of Object.entries(purposePatterns)) {
      for (const [purpose, pattern] of Object.entries(patterns)) {
        if (pattern.test(text)) {
          return { category, purpose };
        }
      }
    }
    
    // Default category based on common patterns
    if (text.includes('address') || text.includes('city') || text.includes('zip')) {
      return { category: 'address', purpose: 'street-address' };
    }
    if (text.includes('card') || text.includes('payment')) {
      return { category: 'payment', purpose: 'cc-number' };
    }
    if (text.includes('email')) {
      return { category: 'contact', purpose: 'email' };
    }
    if (text.includes('name')) {
      return { category: 'personal', purpose: 'name' };
    }
    
    return { category: 'other', purpose: 'unknown' };
  }
  
  // Check if autocomplete value is valid WCAG token
  function isValidAutocompleteValue(autocompleteValue) {
    if (!autocompleteValue) return false;
    
    const tokens = autocompleteValue.toLowerCase().split(' ');
    const validTokens = Object.values(inputPurposeTokens).flat();
    
    // Allow 'on' and 'off' as they're valid but not purpose-specific
    if (tokens.includes('on') || tokens.includes('off')) {
      return tokens.length === 1; // 'on'/'off' should be alone
    }
    
    // Check if any token is a valid WCAG purpose token
    return tokens.some(token => validTokens.includes(token));
  }
  
  // Highlight violation elements
  function highlightElement($element, type, message) {
    const styles = config.violationStyles[type];
    $element.css(styles);
    $element.attr('data-wcag-violation', message);
    
    // Add tooltip
    const currentTitle = $element.attr('title') || '';
    $element.attr('title', currentTitle ? 
      `${currentTitle} | WCAG 1.3.5: ${message}` : 
      `WCAG 1.3.5: ${message}`);
  }
  
  // Display summary of findings
  function displaySummary() {
    if (config.showSummary) {
      console.log('📊 WCAG 1.3.5 Compliance Summary:');
      console.log(`   Personal Info: ${violations.personal.length} violations`);
      console.log(`   Contact Info: ${violations.contact.length} violations`);
      console.log(`   Address Info: ${violations.address.length} violations`);
      console.log(`   Payment Info: ${violations.payment.length} violations`);
      console.log(`   Other: ${violations.other.length} violations`);
      console.log(`   Total: ${violations.total} violations found`);
      
      if (violations.total === 0) {
        console.log('✅ No WCAG 1.3.5 violations detected!');
        console.log('🎯 All user information inputs have proper purpose identification');
      } else {
        console.log('🔧 Review highlighted inputs and add appropriate autocomplete attributes');
        
        // Show some examples of missing autocomplete attributes
        const examples = [];
        Object.entries(violations).forEach(([category, categoryViolations]) => {
          if (categoryViolations.length > 0 && category !== 'total') {
            const example = categoryViolations[0];
            if (example.suggestedAutocomplete && example.suggestedAutocomplete !== 'unknown') {
              examples.push(`   💡 ${example.labelText || 'Input'} → autocomplete="${example.suggestedAutocomplete}"`);
            }
          }
        });
        
        if (examples.length > 0) {
          console.log('\n📝 Suggested fixes:');
          examples.slice(0, 5).forEach(example => console.log(example));
          if (examples.length > 5) {
            console.log(`   ... and ${examples.length - 5} more`);
          }
        }
      }
      
      // Additional guidance
      console.log('\n📋 WCAG 1.3.5 Guidance:');
      console.log('   ✓ Use autocomplete attributes for user information inputs');
      console.log('   ✓ Valid tokens: name, email, tel, address-line1, cc-number, etc.');
      console.log('   ✓ Helps users with cognitive disabilities and assistive technology');
      console.log('   ✓ Enables auto-fill functionality for better user experience');
      console.log('   📖 Full token list: https://www.w3.org/TR/WCAG21/#input-purposes');
    }
  }
  
  // Vanilla JS fallback
  function executeWithVanillaJS() {
    console.log('📱 Using vanilla JavaScript fallback...');
    
    try {
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const type = input.getAttribute('type') || 'text';
        const autocomplete = input.getAttribute('autocomplete');
        const name = input.getAttribute('name') || '';
        
        // Skip non-relevant types
        if (['submit', 'reset', 'button', 'hidden', 'image', 'file'].includes(type)) {
          return;
        }
        
        // Basic check for user information inputs without autocomplete
        const isUserInfoInput = type === 'email' || type === 'tel' || type === 'password' ||
                               name.toLowerCase().includes('name') ||
                               name.toLowerCase().includes('email') ||
                               name.toLowerCase().includes('phone');
        
        if (isUserInfoInput && !autocomplete) {
          violations.other.push({
            element: input,
            type: 'other',
            issue: 'Input may need autocomplete attribute'
          });
          violations.total++;
          
          if (config.highlightViolations) {
            Object.assign(input.style, config.violationStyles.other);
            input.setAttribute('title', 'WCAG 1.3.5: May need autocomplete attribute');
          }
        }
      });
      
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error in vanilla JS fallback:', error);
    }
  }
  
  // Initialize the checker
  executeWithJQuery(runWCAGChecks);
  
})();222222222222