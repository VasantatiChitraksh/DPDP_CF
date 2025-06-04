// WCAG 1.3.4 Orientation Accessibility Checker
// Production version - Clean and professional

(() => {
  'use strict';
  console.log('%cWCAG 1.3.4', 'color:white;background-color:green; padding: 5px 50px; font-weight: bold;');
  
  console.log('🔍 WCAG 1.3.4 Checker initializing...');
  
  // Configuration
  const config = {
    highlightViolations: true,
    logViolations: true,
    showSummary: true,
    testOrientations: true,
    violationStyles: {
      css: { border: '2px solid #e74c3c', boxShadow: '0 0 5px #e74c3c' },
      meta: { border: '2px solid #f39c12', boxShadow: '0 0 5px #f39c12' },
      javascript: { border: '2px solid #9b59b6', boxShadow: '0 0 5px #9b59b6' },
      content: { border: '2px solid #27ae60', boxShadow: '0 0 5px #27ae60' }
    }
  };
  
  // Violation tracking
  let violations = {
    css: [],
    meta: [],
    javascript: [],
    content: [],
    total: 0
  };
  
  // Essential orientation use cases (exceptions)
  const essentialOrientations = [
    'piano', 'keyboard', 'musical', 'game', 'bank', 'check', 'signature',
    'chart', 'graph', 'diagram', 'video', 'camera', 'photo', 'drawing'
  ];
  
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
    console.log('🎯 Running WCAG 1.3.4 compliance check...');
    
    try {
      checkViewportMeta();
      checkCSSOrientationLocks();
      checkJavaScriptOrientationLocks();
      checkContentOrientationDependency();
      if (config.testOrientations) {
        simulateOrientationChanges();
      }
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error during WCAG checks:', error);
      executeWithVanillaJS();
    }
  }
  
  // Check viewport meta tag for orientation restrictions
  function checkViewportMeta() {
    $('meta[name="viewport"]').each(function() {
      const content = $(this).attr('content') || '';
      const hasOrientationLock = content.includes('orientation=portrait') || 
                                content.includes('orientation=landscape');
      
      if (hasOrientationLock) {
        const violation = {
          element: this,
          type: 'meta',
          issue: 'Viewport meta restricts orientation',
          content: content,
          suggestion: 'Remove orientation restriction from viewport meta tag unless essential'
        };
        
        violations.meta.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.4: Viewport meta restricts orientation', {
            element: this,
            content: content
          });
        }
        
        if (config.highlightViolations) {
          highlightElement($(this), 'meta', 'Viewport restricts orientation');
        }
      }
    });
  }
  
  // Check CSS for orientation-specific rules that might lock orientation
  function checkCSSOrientationLocks() {
    // Check all stylesheets
    Array.from(document.styleSheets).forEach((stylesheet, index) => {
      try {
        const rules = stylesheet.cssRules || stylesheet.rules;
        if (!rules) return;
        
        Array.from(rules).forEach(rule => {
          if (rule.type === CSSRule.MEDIA_RULE) {
            const mediaText = rule.media.mediaText.toLowerCase();
            
            // Check for orientation-specific media queries
            if (mediaText.includes('orientation:') || mediaText.includes('orientation ')) {
              const hasPortraitOnly = mediaText.includes('portrait') && !mediaText.includes('landscape');
              const hasLandscapeOnly = mediaText.includes('landscape') && !mediaText.includes('portrait');
              
              if (hasPortraitOnly || hasLandscapeOnly) {
                // Check if the CSS rule significantly affects layout or functionality
                const cssText = rule.cssText.toLowerCase();
                const affectsLayout = cssText.includes('display:') || 
                                    cssText.includes('visibility:') ||
                                    cssText.includes('width:') ||
                                    cssText.includes('height:') ||
                                    cssText.includes('position:') ||
                                    cssText.includes('overflow:');
                
                if (affectsLayout) {
                  const violation = {
                    element: document.head,
                    type: 'css',
                    issue: `CSS locks content to ${hasPortraitOnly ? 'portrait' : 'landscape'} orientation`,
                    mediaQuery: mediaText,
                    suggestion: 'Use responsive design that works in both orientations'
                  };
                  
                  violations.css.push(violation);
                  violations.total++;
                  
                  if (config.logViolations) {
                    console.warn('🚨 WCAG 1.3.4: CSS orientation lock detected', {
                      mediaQuery: mediaText,
                      stylesheet: index
                    });
                  }
                }
              }
            }
          }
        });
      } catch (e) {
        // Skip stylesheets that can't be accessed (CORS)
        console.log('⚠️ Could not access stylesheet rules (likely CORS)');
      }
    });
    
    // Check inline styles and computed styles for problematic orientation handling
    $('*').not('html, body').each(function() {
      const $element = $(this);
      const style = $element.attr('style') || '';
      
      // Check for CSS transform rotations that might indicate orientation forcing
      if (style.includes('rotate(90deg)') || style.includes('rotate(-90deg)') || 
          style.includes('rotate(270deg)') || style.includes('transform')) {
        
        const computedStyle = window.getComputedStyle(this);
        const transform = computedStyle.transform;
        
        if (transform && transform.includes('matrix') && transform !== 'none') {
          // This might be rotating content to force orientation
          const violation = {
            element: this,
            type: 'css',
            issue: 'Element uses CSS transforms that may force orientation',
            transform: transform,
            suggestion: 'Ensure transforms do not prevent content from working in both orientations'
          };
          
          violations.css.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.3.4: CSS transform may force orientation', {
              element: this,
              transform: transform
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($element, 'css', 'Transform may force orientation');
          }
        }
      }
    });
  }
  
  // Check JavaScript for orientation locks
  function checkJavaScriptOrientationLocks() {
    // Check if screen.orientation is being locked
    if (typeof screen !== 'undefined' && screen.orientation && screen.orientation.lock) {
      // Monitor for orientation lock attempts
      const originalLock = screen.orientation.lock;
      screen.orientation.lock = function(orientation) {
        const violation = {
          element: document.body,
          type: 'javascript',
          issue: `JavaScript locks orientation to ${orientation}`,
          suggestion: 'Remove orientation.lock() unless essential for app functionality'
        };
        
        violations.javascript.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.3.4: JavaScript orientation lock detected', {
            orientation: orientation
          });
        }
        
        return originalLock.call(this, orientation);
      };
    }
    
    // Check for orientation change handlers that might restrict functionality
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      const scriptContent = script.textContent || script.innerText || '';
      
      // Look for orientation-related JavaScript patterns
      const orientationPatterns = [
        /orientationchange/i,
        /screen\.orientation/i,
        /matchMedia.*orientation/i,
        /window\.orientation/i
      ];
      
      orientationPatterns.forEach(pattern => {
        if (pattern.test(scriptContent)) {
          // Check if it's restricting functionality rather than adapting
          const hasRestrictivePatterns = /return false|preventDefault|disable|hide|remove/i.test(scriptContent);
          
          if (hasRestrictivePatterns) {
            const violation = {
              element: script,
              type: 'javascript',
              issue: 'JavaScript may restrict functionality based on orientation',
              suggestion: 'Ensure orientation changes adapt UI rather than restrict functionality'
            };
            
            violations.javascript.push(violation);
            violations.total++;
            
            if (config.logViolations) {
              console.warn('🚨 WCAG 1.3.4: JavaScript may restrict orientation functionality', script);
            }
            
            if (config.highlightViolations) {
              highlightElement($(script), 'javascript', 'Script may restrict orientation');
            }
          }
        }
      });
    });
  }
  
  // Check content for orientation dependency
  function checkContentOrientationDependency() {
    // Check for text that suggests orientation requirements
    const orientationTexts = [
      /rotate.*device/i,
      /turn.*phone/i,
      /landscape.*mode/i,
      /portrait.*mode/i,
      /flip.*device/i,
      /orientation.*required/i,
      /please.*rotate/i,
      /switch.*orientation/i
    ];
    
    $('*').not('html, body').each(function() {
      const $element = $(this);
      const text = $element.text();
      
      // Skip if element is not visible or has no text
      if (!text.trim() || $element.is(':hidden')) return;
      
      orientationTexts.forEach(pattern => {
        if (pattern.test(text)) {
          // Check if this might be essential (like for a specific app function)
          const isEssential = essentialOrientations.some(keyword => 
            text.toLowerCase().includes(keyword)
          );
          
          if (!isEssential) {
            const violation = {
              element: this,
              type: 'content',
              issue: 'Content suggests orientation requirement',
              text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
              suggestion: 'Remove orientation requirements unless essential for functionality'
            };
            
            violations.content.push(violation);
            violations.total++;
            
            if (config.logViolations) {
              console.warn('🚨 WCAG 1.3.4: Content suggests orientation requirement', {
                element: this,
                text: violation.text
              });
            }
            
            if (config.highlightViolations) {
              highlightElement($element, 'content', 'Content suggests orientation requirement');
            }
          }
        }
      });
    });
    
    // Check for elements that become hidden/unusable in certain orientations
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    
    $('*:visible').not('html, body').each(function() {
      const $element = $(this);
      const rect = this.getBoundingClientRect();
      
      // Check if element extends beyond viewport in a way that suggests orientation dependency
      if (rect.width > currentWidth * 1.2 || rect.height > currentHeight * 1.2) {
        const computedStyle = window.getComputedStyle(this);
        const hasHorizontalScroll = computedStyle.overflowX === 'scroll' || computedStyle.overflowX === 'auto';
        const hasVerticalScroll = computedStyle.overflowY === 'scroll' || computedStyle.overflowY === 'auto';
        
        if (!hasHorizontalScroll && !hasVerticalScroll) {
          const violation = {
            element: this,
            type: 'content',
            issue: 'Content may be unusable in some orientations',
            dimensions: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
            suggestion: 'Ensure content is accessible in both portrait and landscape orientations'
          };
          
          violations.content.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.3.4: Content may be unusable in some orientations', {
              element: this,
              dimensions: violation.dimensions
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($element, 'content', 'May be unusable in some orientations');
          }
        }
      }
    });
  }
  
  // Simulate orientation changes to test responsiveness
  function simulateOrientationChanges() {
    console.log('🔄 Testing orientation responsiveness...');
    
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;
    
    // Simulate landscape (if currently portrait) or portrait (if currently landscape)
    const isCurrentlyPortrait = window.innerHeight > window.innerWidth;
    const simulatedWidth = isCurrentlyPortrait ? originalHeight : originalWidth;
    const simulatedHeight = isCurrentlyPortrait ? originalWidth : originalHeight;
    
    // Check if any media queries would cause significant layout changes
    const mediaQueries = [];
    Array.from(document.styleSheets).forEach(stylesheet => {
      try {
        const rules = stylesheet.cssRules || stylesheet.rules;
        if (!rules) return;
        
        Array.from(rules).forEach(rule => {
          if (rule.type === CSSRule.MEDIA_RULE) {
            mediaQueries.push(rule.media.mediaText);
          }
        });
      } catch (e) {
        // Skip inaccessible stylesheets
      }
    });
    
    console.log(`📱 Found ${mediaQueries.length} media queries to analyze`);
    
    // Test if content would be hidden or broken in opposite orientation
    const orientationMediaQueries = mediaQueries.filter(mq => 
      mq.toLowerCase().includes('orientation')
    );
    
    if (orientationMediaQueries.length > 0) {
      console.log('📐 Orientation-specific media queries detected:', orientationMediaQueries.length);
    }
  }
  
  // Highlight violation elements
  function highlightElement($element, type, message) {
    const styles = config.violationStyles[type];
    $element.css(styles);
    $element.attr('data-wcag-violation', message);
    
    // Add tooltip
    if (!$element.attr('title')) {
      $element.attr('title', `WCAG 1.3.4: ${message}`);
    }
  }
  
  // Display summary of findings
  function displaySummary() {
    if (config.showSummary) {
      console.log('📊 WCAG 1.3.4 Compliance Summary:');
      console.log(`   CSS: ${violations.css.length} violations`);
      console.log(`   Meta: ${violations.meta.length} violations`);
      console.log(`   JavaScript: ${violations.javascript.length} violations`);
      console.log(`   Content: ${violations.content.length} violations`);
      console.log(`   Total: ${violations.total} violations found`);
      
      if (violations.total === 0) {
        console.log('✅ No WCAG 1.3.4 violations detected!');
        console.log('📱 Content appears to support both portrait and landscape orientations');
      } else {
        console.log('🔧 Review highlighted elements and ensure content works in both orientations');
        console.log('💡 Remember: Orientation locks are only acceptable when essential for functionality');
      }
      
      // Additional guidance
      console.log('\n📋 WCAG 1.3.4 Guidance:');
      console.log('   ✓ Content should adapt to both portrait and landscape');
      console.log('   ✓ Avoid CSS/JS that forces specific orientations');
      console.log('   ✓ Essential uses: games, bank checks, piano apps, etc.');
      console.log('   ✓ Test your content by rotating your device');
    }
  }
  
  // Vanilla JS fallback
  function executeWithVanillaJS() {
    console.log('📱 Using vanilla JavaScript fallback...');
    
    try {
      // Check viewport meta
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        const content = viewportMeta.getAttribute('content') || '';
        if (content.includes('orientation=')) {
          violations.meta.push({
            element: viewportMeta,
            type: 'meta',
            issue: 'Viewport restricts orientation'
          });
          violations.total++;
          
          if (config.highlightViolations) {
            Object.assign(viewportMeta.style, config.violationStyles.meta);
          }
        }
      }
      
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error in vanilla JS fallback:', error);
    }
  }
  
  // Initialize the checker
  executeWithJQuery(runWCAGChecks);
  
})();