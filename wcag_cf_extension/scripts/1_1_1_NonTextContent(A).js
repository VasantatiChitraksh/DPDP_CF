// WCAG 1.1.1 Non-Text Content Accessibility Checker
// Production version - Clean and professional

(() => {
  'use strict';
  console.log('%cWCAG 1.1.1', 'color:white;background-color:green; padding: 5px 50px; font-weight: bold;');
  
  console.log('🔍 WCAG 1.1.1 Checker initializing...');
  
  // Configuration
  const config = {
    highlightViolations: true,
    logViolations: true,
    showSummary: true,
    violationStyles: {
      image: { border: '2px solid #e74c3c', boxShadow: '0 0 5px #e74c3c' },
      media: { border: '2px solid #f39c12', boxShadow: '0 0 5px #f39c12' },
      interactive: { border: '2px solid #9b59b6', boxShadow: '0 0 5px #9b59b6' }
    }
  };
  
  // Violation tracking
  let violations = {
    images: [],
    media: [],
    interactive: [],
    total: 0
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
    console.log('🎯 Running WCAG 1.1.1 compliance check...');
    
    try {
      checkImages();
      checkMediaElements();
      checkInteractiveElements();
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error during WCAG checks:', error);
      executeWithVanillaJS();
    }
  }
  
  // Check images for alt text
  function checkImages() {
    $('img').each(function() {
      const $img = $(this);
      const alt = $img.attr('alt');
      const src = $img.attr('src');
      const isDecorative = $img.attr('role') === 'presentation' || $img.attr('role') === 'none';
      
      // Skip if explicitly marked as decorative
      if (isDecorative) return;
      
      // Check for missing or empty alt text
      if (alt === undefined || alt.trim() === '') {
        const violation = {
          element: this,
          type: 'image',
          issue: 'Missing alt text',
          src: src || 'No src attribute',
          suggestion: 'Add descriptive alt text or role="presentation" if decorative'
        };
        
        violations.images.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.1.1: Image missing alt text', {
            element: this,
            src: violation.src
          });
        }
        
        if (config.highlightViolations) {
          highlightElement($img, 'image', 'Missing alt text');
        }
      }
    });
  }
  
  // Check media elements (video, audio, canvas, svg, etc.)
  function checkMediaElements() {
    $('video, audio, canvas, svg, object, embed').each(function() {
      const $element = $(this);
      const tagName = this.tagName.toLowerCase();
      
      const hasAccessibleName = $element.attr('aria-label') || 
                               $element.attr('aria-labelledby') || 
                               $element.attr('title') ||
                               $element.attr('alt') ||
                               (tagName === 'video' && $element.find('track[kind="captions"], track[kind="subtitles"]').length > 0);
      
      if (!hasAccessibleName) {
        const violation = {
          element: this,
          type: 'media',
          issue: `${tagName} without accessible name`,
          suggestion: `Add aria-label, title, or appropriate alternative content for ${tagName}`
        };
        
        violations.media.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn(`🚨 WCAG 1.1.1: ${tagName} missing accessible name`, this);
        }
        
        if (config.highlightViolations) {
          highlightElement($element, 'media', `${tagName} needs accessible name`);
        }
      }
    });
  }
  
  // Check interactive elements that might contain non-text content
  function checkInteractiveElements() {
    $('button, a, input[type="image"], area').each(function() {
      const $element = $(this);
      const tagName = this.tagName.toLowerCase();
      
      // Skip if has text content
      if ($element.text().trim() !== '') return;
      
      const hasAccessibleName = $element.attr('aria-label') || 
                               $element.attr('aria-labelledby') || 
                               $element.attr('title') ||
                               $element.attr('alt') ||
                               (tagName === 'input' && $element.attr('value'));
      
      if (!hasAccessibleName) {
        const violation = {
          element: this,
          type: 'interactive',
          issue: `${tagName} without accessible name`,
          suggestion: `Add aria-label, title, or text content for ${tagName}`
        };
        
        violations.interactive.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn(`🚨 WCAG 1.1.1: ${tagName} missing accessible name`, this);
        }
        
        if (config.highlightViolations) {
          highlightElement($element, 'interactive', `${tagName} needs accessible name`);
        }
      }
    });
  }
  
  // Highlight violation elements
  function highlightElement($element, type, message) {
    const styles = config.violationStyles[type];
    $element.css(styles);
    $element.attr('data-wcag-violation', message);
    
    // Add tooltip
    if (!$element.attr('title')) {
      $element.attr('title', `WCAG 1.1.1: ${message}`);
    }
  }
  
  // Display summary of findings
  function displaySummary() {
    if (config.showSummary) {
      console.log('📊 WCAG 1.1.1 Compliance Summary:');
      console.log(`   Images: ${violations.images.length} violations`);
      console.log(`   Media: ${violations.media.length} violations`);
      console.log(`   Interactive: ${violations.interactive.length} violations`);
      console.log(`   Total: ${violations.total} violations found`);
      
      if (violations.total === 0) {
        console.log('✅ No WCAG 1.1.1 violations detected!');
      } else {
        console.log('🔧 Review highlighted elements and add appropriate alternative text');
      }
    }
  }
  
  // Vanilla JS fallback
  function executeWithVanillaJS() {
    console.log('📱 Using vanilla JavaScript fallback...');
    
    try {
      // Check images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const alt = img.getAttribute('alt');
        const isDecorative = img.getAttribute('role') === 'presentation' || img.getAttribute('role') === 'none';
        
        if (!isDecorative && (!alt || alt.trim() === '')) {
          violations.images.push({
            element: img,
            type: 'image',
            issue: 'Missing alt text'
          });
          violations.total++;
          
          if (config.highlightViolations) {
            Object.assign(img.style, config.violationStyles.image);
            img.setAttribute('title', 'WCAG 1.1.1: Missing alt text');
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
  
})();