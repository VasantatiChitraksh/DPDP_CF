// WCAG 1.2.2 Captions (Prerecorded) Accessibility Checker
// Production version - Clean and professional

(() => {
  'use strict';
  
  console.log('%cWCAG 1.2.2', 'color:white;background-color:green; padding: 5px 50px; font-weight: bold;');
  
  console.log('🔍 WCAG 1.2.2 Checker initializing...');
  
  // Configuration
  const config = {
    highlightViolations: true,
    logViolations: true,
    showSummary: true,
    violationStyles: {
      video: { border: '3px solid #e74c3c', boxShadow: '0 0 8px #e74c3c' },
      audio: { border: '3px solid #f39c12', boxShadow: '0 0 8px #f39c12' },
      iframe: { border: '3px solid #9b59b6', boxShadow: '0 0 8px #9b59b6' }
    }
  };
  
  // Violation tracking
  let violations = {
    videos: [],
    audios: [],
    iframes: [],
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
    console.log('🎯 Running WCAG 1.2.2 compliance check...');
    
    try {
      checkVideoElements();
      checkAudioElements();
      checkIframeElements();
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error during WCAG checks:', error);
      executeWithVanillaJS();
    }
  }
  
  // Check video elements for captions
  function checkVideoElements() {
    $('video').each(function() {
      const $video = $(this);
      const src = $video.attr('src') || $video.find('source').first().attr('src');
      
      // Skip if this is explicitly marked as a media alternative for text
      if (isMediaAlternativeForText($video)) {
        return;
      }
      
      // Check for caption tracks
      const captionTracks = $video.find('track[kind="captions"], track[kind="subtitles"]');
      const hasClosedCaptions = captionTracks.length > 0;
      
      // Check for external caption indicators
      const hasExternalCaptionIndicator = $video.attr('data-captions') === 'true' ||
                                         $video.attr('aria-describedby') ||
                                         $video.closest('.video-container').find('.captions, .cc, .closed-captions').length > 0;
      
      if (!hasClosedCaptions && !hasExternalCaptionIndicator) {
        const violation = {
          element: this,
          type: 'video',
          issue: 'Video missing captions',
          src: src || 'No src attribute',
          suggestion: 'Add <track kind="captions"> or <track kind="subtitles"> elements, or indicate external captions'
        };
        
        violations.videos.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.2.2: Video missing captions', {
            element: this,
            src: violation.src,
            trackElements: captionTracks.length
          });
        }
        
        if (config.highlightViolations) {
          highlightElement($video, 'video', 'Video needs captions');
        }
      } else if (hasClosedCaptions) {
        // Validate caption track attributes
        captionTracks.each(function() {
          const track = $(this);
          const trackSrc = track.attr('src');
          const trackLabel = track.attr('label');
          const trackSrcLang = track.attr('srclang');
          
          if (!trackSrc) {
            console.warn('🔶 WCAG 1.2.2: Caption track missing src attribute', this);
          }
          if (!trackLabel && !trackSrcLang) {
            console.warn('🔶 WCAG 1.2.2: Caption track missing label or srclang attribute', this);
          }
        });
      }
    });
  }
  
  // Check audio elements (when part of synchronized media)
  function checkAudioElements() {
    $('audio').each(function() {
      const $audio = $(this);
      const src = $audio.attr('src') || $audio.find('source').first().attr('src');
      
      // Skip if this is explicitly marked as a media alternative for text
      if (isMediaAlternativeForText($audio)) {
        return;
      }
      
      // Check if this audio is part of synchronized media (has visual component)
      const isPartOfSynchronizedMedia = $audio.closest('.video-container, .media-player, .slideshow').length > 0 ||
                                       $audio.attr('data-synchronized') === 'true' ||
                                       $audio.siblings('img, canvas, svg').length > 0;
      
      if (isPartOfSynchronizedMedia) {
        // Check for transcript or captions
        const hasTranscript = $audio.attr('data-transcript') ||
                             $audio.closest('.media-container').find('.transcript, .captions').length > 0 ||
                             $audio.siblings('.transcript, .captions').length > 0;
        
        if (!hasTranscript) {
          const violation = {
            element: this,
            type: 'audio',
            issue: 'Synchronized audio missing captions/transcript',
            src: src || 'No src attribute',
            suggestion: 'Add transcript or captions for synchronized audio content'
          };
          
          violations.audios.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.2.2: Synchronized audio missing captions', {
              element: this,
              src: violation.src
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($audio, 'audio', 'Synchronized audio needs captions');
          }
        }
      }
    });
  }
  
  // Check iframe elements for embedded video content
  function checkIframeElements() {
    $('iframe').each(function() {
      const $iframe = $(this);
      const src = $iframe.attr('src');
      
      if (!src) return;
      
      // Check for common video platforms
      const isVideoEmbed = /youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|wistia\.com|brightcove\.com/i.test(src);
      
      if (isVideoEmbed) {
        // Skip if this is explicitly marked as a media alternative for text
        if (isMediaAlternativeForText($iframe)) {
          return;
        }
        
        // Check for caption indicators in URL or surrounding content
        const urlHasCaptions = /cc_load_policy=1|captions=1|cc=1/i.test(src);
        const hasExternalCaptionNote = $iframe.closest('.video-container').find('.captions-note, .cc-note').length > 0 ||
                                      $iframe.attr('data-captions') === 'true';
        
        if (!urlHasCaptions && !hasExternalCaptionNote) {
          const violation = {
            element: this,
            type: 'iframe',
            issue: 'Embedded video may be missing captions',
            src: src,
            suggestion: 'Ensure embedded video has captions enabled or add caption note'
          };
          
          violations.iframes.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.2.2: Embedded video may be missing captions', {
              element: this,
              src: src
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($iframe, 'iframe', 'Embedded video needs caption verification');
          }
        }
      }
    });
  }
  
  // Check if media is marked as alternative for text
  function isMediaAlternativeForText($element) {
    const hasTextAlternativeLabel = $element.attr('aria-label') && 
                                   /alternative.*text|text.*alternative/i.test($element.attr('aria-label'));
    
    const hasTextAlternativeNote = $element.closest('.media-container').find('.text-alternative-note').length > 0 ||
                                  $element.siblings('.text-alternative-note').length > 0;
    
    const hasTextAlternativeAttribute = $element.attr('data-text-alternative') === 'true';
    
    return hasTextAlternativeLabel || hasTextAlternativeNote || hasTextAlternativeAttribute;
  }
  
  // Highlight violation elements
  function highlightElement($element, type, message) {
    const styles = config.violationStyles[type];
    $element.css(styles);
    $element.attr('data-wcag-violation', message);
    
    // Add tooltip
    const existingTitle = $element.attr('title');
    const wcagMessage = `WCAG 1.2.2: ${message}`;
    $element.attr('title', existingTitle ? `${existingTitle} | ${wcagMessage}` : wcagMessage);
  }
  
  // Display summary of findings
  function displaySummary() {
    if (config.showSummary) {
      console.log('📊 WCAG 1.2.2 Compliance Summary:');
      console.log(`   Videos: ${violations.videos.length} violations`);
      console.log(`   Synchronized Audio: ${violations.audios.length} violations`);
      console.log(`   Embedded Videos: ${violations.iframes.length} violations`);
      console.log(`   Total: ${violations.total} violations found`);
      
      if (violations.total === 0) {
        console.log('✅ No WCAG 1.2.2 violations detected!');
      } else {
        console.log('🔧 Review highlighted elements and add appropriate captions');
        console.log('💡 Tips:');
        console.log('   - Add <track kind="captions"> to video elements');
        console.log('   - Include transcripts for synchronized audio');
        console.log('   - Enable captions on embedded videos');
        console.log('   - Mark media alternatives for text with appropriate attributes');
      }
    }
  }
  
  // Vanilla JS fallback
  function executeWithVanillaJS() {
    console.log('📱 Using vanilla JavaScript fallback...');
    
    try {
      // Check video elements
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (isMediaAlternativeForTextVanilla(video)) return;
        
        const captionTracks = video.querySelectorAll('track[kind="captions"], track[kind="subtitles"]');
        const hasExternalCaptions = video.getAttribute('data-captions') === 'true';
        
        if (captionTracks.length === 0 && !hasExternalCaptions) {
          violations.videos.push({
            element: video,
            type: 'video',
            issue: 'Missing captions'
          });
          violations.total++;
          
          if (config.highlightViolations) {
            Object.assign(video.style, config.violationStyles.video);
            video.setAttribute('title', 'WCAG 1.2.2: Video needs captions');
          }
        }
      });
      
      // Check iframe embeds
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        const src = iframe.getAttribute('src');
        if (!src) return;
        
        const isVideoEmbed = /youtube\.com|youtu\.be|vimeo\.com/i.test(src);
        if (isVideoEmbed && !isMediaAlternativeForTextVanilla(iframe)) {
          const urlHasCaptions = /cc_load_policy=1|captions=1/i.test(src);
          const hasExternalCaptions = iframe.getAttribute('data-captions') === 'true';
          
          if (!urlHasCaptions && !hasExternalCaptions) {
            violations.iframes.push({
              element: iframe,
              type: 'iframe',
              issue: 'Embedded video may be missing captions'
            });
            violations.total++;
            
            if (config.highlightViolations) {
              Object.assign(iframe.style, config.violationStyles.iframe);
              iframe.setAttribute('title', 'WCAG 1.2.2: Embedded video needs caption verification');
            }
          }
        }
      });
      
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error in vanilla JS fallback:', error);
    }
  }
  
  // Vanilla JS helper for checking text alternatives
  function isMediaAlternativeForTextVanilla(element) {
    const ariaLabel = element.getAttribute('aria-label');
    return (ariaLabel && /alternative.*text|text.*alternative/i.test(ariaLabel)) ||
           element.getAttribute('data-text-alternative') === 'true';
  }
  
  // Public API for manual checking
  window.WCAG122Checker = {
    run: () => executeWithJQuery(runWCAGChecks),
    getViolations: () => violations,
    config: config
  };
  
  // Initialize the checker
  executeWithJQuery(runWCAGChecks);
  
})();