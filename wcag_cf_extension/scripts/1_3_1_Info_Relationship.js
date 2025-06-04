// WCAG 1.3.1 Info and Relationships Accessibility Checker
// Production version - Clean and professional

(() => {
  'use strict';
  console.log('%cWCAG 1.3.1', 'color:white;background-color:green; padding: 5px 50px; font-weight: bold;');
  
  console.log('🔍 WCAG 1.3.1 Checker initializing...');
  
  // Configuration
  const config = {
    highlightViolations: true,
    logViolations: true,
    showSummary: true,
    violationStyles: {
      heading: { border: '2px solid #e74c3c', boxShadow: '0 0 5px #e74c3c' },
      list: { border: '2px solid #f39c12', boxShadow: '0 0 5px #f39c12' },
      table: { border: '2px solid #9b59b6', boxShadow: '0 0 5px #9b59b6' },
      form: { border: '2px solid #27ae60', boxShadow: '0 0 5px #27ae60' },
      semantic: { border: '2px solid #34495e', boxShadow: '0 0 5px #34495e' }
    }
  };
  
  // Violation tracking
  let violations = {
    headings: [],
    lists: [],
    tables: [],
    forms: [],
    semantic: [],
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
    console.log('🎯 Running WCAG 1.3.1 compliance check...');
    
    try {
      checkHeadingStructure();
      checkListStructure();
      checkTableStructure();
      checkFormStructure();
      checkSemanticStructure();
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error during WCAG checks:', error);
      executeWithVanillaJS();
    }
  }
  
  // Check heading structure and hierarchy
  function checkHeadingStructure() {
    const headings = $('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    // Check for styled elements that look like headings but aren't semantic headings
    $('*').each(function() {
      const $element = $(this);
      const text = $element.text().trim();
      
      // Skip if already a heading or empty
      if ($element.is('h1, h2, h3, h4, h5, h6') || text === '') return;
      
      const computedStyle = window.getComputedStyle(this);
      const fontSize = parseFloat(computedStyle.fontSize);
      const fontWeight = computedStyle.fontWeight;
      const isLargeText = fontSize > 18;
      const isBold = fontWeight === 'bold' || parseInt(fontWeight) >= 700;
      
      // Check if element looks like a heading (large/bold text, short text)
      if ((isLargeText || isBold) && text.length < 200 && text.split(' ').length < 10) {
        const violation = {
          element: this,
          type: 'heading',
          issue: 'Visual heading without semantic markup',
          text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
          suggestion: 'Use proper heading tags (h1-h6) or add role="heading" with aria-level'
        };
        
        violations.headings.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Visual heading without semantic markup', {
            element: this,
            text: violation.text
          });
        }
        
        if (config.highlightViolations) {
          highlightElement($element, 'heading', 'Visual heading needs semantic markup');
        }
      }
    });
    
    // Check heading level hierarchy
    headings.each(function() {
      const level = parseInt(this.tagName.charAt(1));
      
      if (previousLevel > 0 && level > previousLevel + 1) {
        const violation = {
          element: this,
          type: 'heading',
          issue: `Heading level skipped (${previousLevel} to ${level})`,
          suggestion: 'Use proper heading hierarchy without skipping levels'
        };
        
        violations.headings.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Heading level skipped', {
            element: this,
            from: previousLevel,
            to: level
          });
        }
        
        if (config.highlightViolations) {
          highlightElement($(this), 'heading', `Skipped heading level (${previousLevel} to ${level})`);
        }
      }
      
      previousLevel = level;
    });
  }
  
  // Check list structure
  function checkListStructure() {
    // Check for visual lists that aren't semantic lists
    $('div, p, span').each(function() {
      const $element = $(this);
      const text = $element.text().trim();
      
      // Look for patterns that suggest lists
      const listPatterns = [
        /^\s*[\*\-\•]\s+/m,  // Bullet points
        /^\s*\d+[\.\)]\s+/m, // Numbered lists
        /^\s*[a-zA-Z][\.\)]\s+/m // Lettered lists
      ];
      
      const hasListPattern = listPatterns.some(pattern => pattern.test(text));
      const hasMultipleLines = text.split('\n').length > 2;
      
      if (hasListPattern && hasMultipleLines) {
        const violation = {
          element: this,
          type: 'list',
          issue: 'Visual list without semantic markup',
          suggestion: 'Use proper list elements (ul, ol, dl) instead of visual formatting'
        };
        
        violations.lists.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Visual list without semantic markup', this);
        }
        
        if (config.highlightViolations) {
          highlightElement($element, 'list', 'Visual list needs semantic markup');
        }
      }
    });
    
    // Check for empty list items
    $('li').each(function() {
      const $li = $(this);
      if ($li.text().trim() === '' && $li.children().length === 0) {
        const violation = {
          element: this,
          type: 'list',
          issue: 'Empty list item',
          suggestion: 'Remove empty list items or add meaningful content'
        };
        
        violations.lists.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Empty list item', this);
        }
        
        if (config.highlightViolations) {
          highlightElement($li, 'list', 'Empty list item');
        }
      }
    });
  }
  
  // Check table structure
  function checkTableStructure() {
    $('table').each(function() {
      const $table = $(this);
      
      // Check for missing table headers
      const hasHeaders = $table.find('th').length > 0 || 
                        $table.find('[scope]').length > 0 ||
                        $table.find('[headers]').length > 0;
      
      if (!hasHeaders && $table.find('tr').length > 1) {
        const violation = {
          element: this,
          type: 'table',
          issue: 'Data table without headers',
          suggestion: 'Add proper table headers using th elements with scope attributes'
        };
        
        violations.tables.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Data table without headers', this);
        }
        
        if (config.highlightViolations) {
          highlightElement($table, 'table', 'Data table needs headers');
        }
      }
      
      // Check for missing caption on complex tables
      const rowCount = $table.find('tr').length;
      const colCount = Math.max(...$table.find('tr').map(function() {
        return $(this).find('td, th').length;
      }).get());
      
      if (rowCount > 3 && colCount > 3 && !$table.find('caption').length && !$table.attr('aria-label') && !$table.attr('aria-labelledby')) {
        const violation = {
          element: this,
          type: 'table',
          issue: 'Complex table without caption or label',
          suggestion: 'Add a caption element or aria-label to describe the table purpose'
        };
        
        violations.tables.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Complex table without caption', this);
        }
        
        if (config.highlightViolations) {
          highlightElement($table, 'table', 'Complex table needs caption');
        }
      }
    });
    
    // Check for layout tables that should be divs
    $('table').each(function() {
      const $table = $(this);
      const hasDataContent = $table.find('th').length > 0 || 
                            $table.find('[scope]').length > 0 ||
                            $table.text().match(/\d+/) !== null;
      
      if (!hasDataContent && $table.attr('role') !== 'presentation') {
        const violation = {
          element: this,
          type: 'table',
          issue: 'Layout table without role="presentation"',
          suggestion: 'Use CSS for layout or add role="presentation" if table is purely for layout'
        };
        
        violations.tables.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Layout table without proper role', this);
        }
        
        if (config.highlightViolations) {
          highlightElement($table, 'table', 'Layout table needs role="presentation"');
        }
      }
    });
  }
  
  // Check form structure and relationships
  function checkFormStructure() {
    // Check for form controls without labels
    $('input, select, textarea').each(function() {
      const $input = $(this);
      const type = $input.attr('type');
      
      // Skip hidden inputs and buttons
      if (type === 'hidden' || type === 'submit' || type === 'button' || type === 'image') return;
      
      const hasLabel = $input.attr('aria-label') ||
                      $input.attr('aria-labelledby') ||
                      $input.attr('title') ||
                      $(`label[for="${$input.attr('id')}"]`).length > 0 ||
                      $input.closest('label').length > 0;
      
      if (!hasLabel) {
        const violation = {
          element: this,
          type: 'form',
          issue: 'Form control without label',
          suggestion: 'Add a label element or aria-label to identify the form control'
        };
        
        violations.forms.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Form control without label', this);
        }
        
        if (config.highlightViolations) {
          highlightElement($input, 'form', 'Form control needs label');
        }
      }
    });
    
    // Check for fieldsets without legends for grouped controls
    $('fieldset').each(function() {
      const $fieldset = $(this);
      if (!$fieldset.find('legend').length) {
        const violation = {
          element: this,
          type: 'form',
          issue: 'Fieldset without legend',
          suggestion: 'Add a legend element to describe the group of form controls'
        };
        
        violations.forms.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Fieldset without legend', this);
        }
        
        if (config.highlightViolations) {
          highlightElement($fieldset, 'form', 'Fieldset needs legend');
        }
      }
    });
  }
  
  // Check semantic structure
  function checkSemanticStructure() {
    // Check for divs used for interactive elements
    $('div').each(function() {
      const $div = $(this);
      
      // Check if div has click handlers or looks interactive
      const hasClickHandler = $div.attr('onclick') || 
                             $div.data('events') && $div.data('events').click ||
                             $div.css('cursor') === 'pointer';
      
      if (hasClickHandler && !$div.attr('role') && !$div.attr('tabindex')) {
        const violation = {
          element: this,
          type: 'semantic',
          issue: 'Interactive div without proper semantics',
          suggestion: 'Use button/link elements or add appropriate role and tabindex'
        };
        
        violations.semantic.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Interactive div without semantics', this);
        }
        
        if (config.highlightViolations) {
          highlightElement($div, 'semantic', 'Interactive div needs proper semantics');
        }
      }
    });
    
    // Check for missing main landmark
    if ($('main, [role="main"]').length === 0) {
      const bodyContent = $('body').children().not('script, style, meta, link, title');
      if (bodyContent.length > 0) {
        const violation = {
          element: document.body,
          type: 'semantic',
          issue: 'Missing main landmark',
          suggestion: 'Add a main element or role="main" to identify the primary content'
        };
        
        violations.semantic.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.1: Missing main landmark');
        }
      }
    }
  }
  
  // Highlight violation elements
  function highlightElement($element, type, message) {
    const styles = config.violationStyles[type];
    $element.css(styles);
    $element.attr('data-wcag-violation', message);
    
    // Add tooltip
    if (!$element.attr('title')) {
      $element.attr('title', `WCAG 1.3.1: ${message}`);
    }
  }
  
  // Display summary of findings
  function displaySummary() {
    if (config.showSummary) {
      console.log('📊 WCAG 1.3.1 Compliance Summary:');
      console.log(`   Headings: ${violations.headings.length} violations`);
      console.log(`   Lists: ${violations.lists.length} violations`);
      console.log(`   Tables: ${violations.tables.length} violations`);
      console.log(`   Forms: ${violations.forms.length} violations`);
      console.log(`   Semantic: ${violations.semantic.length} violations`);
      console.log(`   Total: ${violations.total} violations found`);
      
      if (violations.total === 0) {
        console.log('✅ No WCAG 1.3.1 violations detected!');
      } else {
        console.log('🔧 Review highlighted elements and ensure structure is programmatically determinable');
      }
    }
  }
  
  // Vanilla JS fallback
  function executeWithVanillaJS() {
    console.log('📱 Using vanilla JavaScript fallback...');
    
    try {
      // Basic checks without jQuery
      const images = document.querySelectorAll('img[alt=""], img:not([alt])');
      images.forEach(img => {
        violations.total++;
        if (config.highlightViolations) {
          Object.assign(img.style, config.violationStyles.semantic);
          img.setAttribute('title', 'WCAG 1.3.1: Review semantic structure');
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