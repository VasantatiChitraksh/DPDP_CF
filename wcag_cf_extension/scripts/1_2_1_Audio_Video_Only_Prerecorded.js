// WCAG 1.2.1 Audio-only and Video-only (Prerecorded) Accessibility Checker
// Production version - Clean and professional

(() => {
  'use strict';
  
  console.log('%cWCAG 1.2.1', 'color:white;background-color:green; padding: 5px 50px; font-weight: bold;');
  
  console.log('🔍 WCAG 1.2.1 Checker initializing...');
  
  // Configuration
  const config = {
    highlightViolations: true,
    logViolations: true,
    showSummary: true,
    violationStyles: {
      audioOnly: { border: '2px solid #e74c3c', boxShadow: '0 0 5px #e74c3c' },
      videoOnly: { border: '2px solid #f39c12', boxShadow: '0 0 5px #f39c12' },
      mediaAlternative: { border: '2px solid #3498db', boxShadow: '0 0 5px #3498db' }
    }
  };
  
  // Violation tracking
  let violations = {
    audioOnly: [],
    videoOnly: [],
    mediaAlternatives: [],
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
    console.log('🎯 Running WCAG 1.2.1 compliance check...');
    
    try {
      checkAudioOnlyElements();
      checkVideoOnlyElements();
      checkMediaAlternatives();
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error during WCAG checks:', error);
      executeWithVanillaJS();
    }
  }
  
  // Check audio-only elements for alternatives
  function checkAudioOnlyElements() {
    $('audio').each(function() {
      const $audio = $(this);
      const isMediaAlternative = isLabeledAsMediaAlternative($audio);
      
      // Skip if clearly labeled as media alternative for text
      if (isMediaAlternative) return;
      
      // Check if it's audio-only (no video track)
      if (isAudioOnly($audio)) {
        const hasAlternative = hasTimeBasedMediaAlternative($audio);
        
        if (!hasAlternative) {
          const violation = {
            element: this,
            type: 'audioOnly',
            issue: 'Audio-only content without alternative',
            src: $audio.attr('src') || 'No src attribute',
            suggestion: 'Provide a transcript or equivalent text alternative for audio-only content'
          };
          
          violations.audioOnly.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.2.1: Audio-only content missing alternative', {
              element: this,
              src: violation.src
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($audio, 'audioOnly', 'Audio-only needs transcript or text alternative');
          }
        }
      }
    });
    
    // Also check embedded audio objects
    $('object, embed').each(function() {
      const $element = $(this);
      const type = $element.attr('type') || '';
      const src = $element.attr('src') || $element.attr('data') || '';
      
      // Check if it's audio content
      if (type.startsWith('audio/') || src.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)) {
        const isMediaAlternative = isLabeledAsMediaAlternative($element);
        if (isMediaAlternative) return;
        
        const hasAlternative = hasTimeBasedMediaAlternative($element);
        
        if (!hasAlternative) {
          const violation = {
            element: this,
            type: 'audioOnly',
            issue: 'Embedded audio content without alternative',
            src: src || 'No source identified',
            suggestion: 'Provide a transcript or equivalent text alternative'
          };
          
          violations.audioOnly.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.2.1: Embedded audio missing alternative', this);
          }
          
          if (config.highlightViolations) {
            highlightElement($element, 'audioOnly', 'Audio content needs alternative');
          }
        }
      }
    });
  }
  
  // Check video-only elements for alternatives
  function checkVideoOnlyElements() {
    $('video').each(function() {
      const $video = $(this);
      const isMediaAlternative = isLabeledAsMediaAlternative($video);
      
      // Skip if clearly labeled as media alternative for text
      if (isMediaAlternative) return;
      
      // Check if it's video-only (no audio track)
      if (isVideoOnly($video)) {
        const hasAlternative = hasTimeBasedMediaAlternative($video) || hasAudioTrack($video);
        
        if (!hasAlternative) {
          const violation = {
            element: this,
            type: 'videoOnly',
            issue: 'Video-only content without alternative',
            src: $video.attr('src') || 'No src attribute',
            suggestion: 'Provide a transcript, audio description, or equivalent text alternative for video-only content'
          };
          
          violations.videoOnly.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.2.1: Video-only content missing alternative', {
              element: this,
              src: violation.src
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($video, 'videoOnly', 'Video-only needs transcript or audio track');
          }
        }
      }
    });
    
    // Also check embedded video objects
    $('object, embed').each(function() {
      const $element = $(this);
      const type = $element.attr('type') || '';
      const src = $element.attr('src') || $element.attr('data') || '';
      
      // Check if it's video content
      if (type.startsWith('video/') || src.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/i)) {
        const isMediaAlternative = isLabeledAsMediaAlternative($element);
        if (isMediaAlternative) return;
        
        const hasAlternative = hasTimeBasedMediaAlternative($element);
        
        if (!hasAlternative) {
          const violation = {
            element: this,
            type: 'videoOnly',
            issue: 'Embedded video content without alternative',
            src: src || 'No source identified',
            suggestion: 'Provide a transcript, audio description, or equivalent text alternative'
          };
          
          violations.videoOnly.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.2.1: Embedded video missing alternative', this);
          }
          
          if (config.highlightViolations) {
            highlightElement($element, 'videoOnly', 'Video content needs alternative');
          }
        }
      }
    });
  }
  
  // Check for elements that are media alternatives for text
  function checkMediaAlternatives() {
    $('audio, video, object, embed').each(function() {
      const $element = $(this);
      const isMediaAlternative = isLabeledAsMediaAlternative($element);
      
      if (isMediaAlternative) {
        // Media alternatives should be clearly labeled
        const isWellLabeled = $element.attr('aria-label')?.toLowerCase().includes('alternative') ||
                             $element.attr('title')?.toLowerCase().includes('alternative') ||
                             $element.closest('figure').find('figcaption').text().toLowerCase().includes('alternative') ||
                             $element.prev().text().toLowerCase().includes('alternative') ||
                             $element.next().text().toLowerCase().includes('alternative');
        
        if (!isWellLabeled) {
          const violation = {
            element: this,
            type: 'mediaAlternative',
            issue: 'Media alternative not clearly labeled',
            suggestion: 'Clearly label that this media is an alternative for text content'
          };
          
          violations.mediaAlternatives.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.2.1: Media alternative not clearly labeled', this);
          }
          
          if (config.highlightViolations) {
            highlightElement($element, 'mediaAlternative', 'Label as text alternative');
          }
        }
      }
    });
  }
  
  // Helper function to check if element is labeled as media alternative
  function isLabeledAsMediaAlternative($element) {
    const ariaLabel = $element.attr('aria-label') || '';
    const title = $element.attr('title') || '';
    const description = $element.attr('aria-describedby') ? 
                       $('#' + $element.attr('aria-describedby')).text() : '';
    
    const alternativeKeywords = ['alternative', 'transcript', 'text version', 'equivalent'];
    const textToCheck = (ariaLabel + ' ' + title + ' ' + description).toLowerCase();
    
    return alternativeKeywords.some(keyword => textToCheck.includes(keyword));
  }
  
  // Helper function to check if audio element is audio-only
  function isAudioOnly($audio) {
    // For audio elements, they are inherently audio-only unless they have video tracks
    // This is a simplified check - in practice, you might need to inspect the media more deeply
    return $audio[0].tagName.toLowerCase() === 'audio';
  }
  
  // Helper function to check if video element is video-only
  function isVideoOnly($video) {
    // Check if video has no audio tracks or is muted permanently
    const video = $video[0];
    
    // This is a heuristic check - in practice, you'd need to inspect the actual media
    // Check for muted attribute or data attributes indicating no audio
    return video.muted && video.hasAttribute('data-no-audio') ||
           $video.attr('data-video-only') === 'true' ||
           $video.hasClass('video-only');
  }
  
  // Helper function to check for time-based media alternatives
  function hasTimeBasedMediaAlternative($element) {
    const elementId = $element.attr('id');
    
    // Look for associated transcript or alternative content
    const hasTranscript = $element.attr('aria-describedby') ||
                         $element.siblings('.transcript, .alternative-text, [data-transcript]').length > 0 ||
                         $element.closest('figure').find('.transcript, .alternative-text').length > 0 ||
                         (elementId && $(`[data-transcript-for="${elementId}"], [data-alternative-for="${elementId}"]`).length > 0);
    
    // Check for links to transcripts
    const hasTranscriptLink = $element.siblings('a[href*="transcript"], a[href*="alternative"]').length > 0 ||
                             $element.closest('figure').find('a[href*="transcript"], a[href*="alternative"]').length > 0;
    
    return hasTranscript || hasTranscriptLink;
  }
  
  // Helper function to check if video has audio track
  function hasAudioTrack($video) {
    // Check for audio tracks or audio description
    const video = $video[0];
    
    // Check for audio tracks (simplified check)
    const hasAudio = !video.muted && 
                    !$video.attr('data-no-audio') &&
                    !$video.hasClass('no-audio');
    
    // Check for audio description tracks
    const hasAudioDescription = $video.find('track[kind="descriptions"]').length > 0;
    
    return hasAudio || hasAudioDescription;
  }
  
  // Highlight violation elements
  function highlightElement($element, type, message) {
    const styles = config.violationStyles[type];
    $element.css(styles);
    $element.attr('data-wcag-violation', message);
    
    // Add tooltip
    if (!$element.attr('title')) {
      $element.attr('title', `WCAG 1.2.1: ${message}`);
    }
  }
  
  // Display summary of findings
  function displaySummary() {
    if (config.showSummary) {
      console.log('📊 WCAG 1.2.1 Compliance Summary:');
      console.log(`   Audio-only: ${violations.audioOnly.length} violations`);
      console.log(`   Video-only: ${violations.videoOnly.length} violations`);
      console.log(`   Media alternatives: ${violations.mediaAlternatives.length} violations`);
      console.log(`   Total: ${violations.total} violations found`);
      
      if (violations.total === 0) {
        console.log('✅ No WCAG 1.2.1 violations detected!');
      } else {
        console.log('🔧 Review highlighted elements and provide appropriate alternatives:');
        console.log('   • Audio-only: Provide transcripts or text equivalents');
        console.log('   • Video-only: Provide transcripts or audio tracks');
        console.log('   • Media alternatives: Clearly label as text alternatives');
      }
    }
  }
  
  // Vanilla JS fallback
  function executeWithVanillaJS() {
    console.log('📱 Using vanilla JavaScript fallback...');
    
    try {
      // Check audio elements
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (!isLabeledAsMediaAlternativeVanilla(audio)) {
          const hasAlternative = hasTimeBasedMediaAlternativeVanilla(audio);
          
          if (!hasAlternative) {
            violations.audioOnly.push({
              element: audio,
              type: 'audioOnly',
              issue: 'Audio-only content without alternative'
            });
            violations.total++;
            
            if (config.highlightViolations) {
              Object.assign(audio.style, config.violationStyles.audioOnly);
              audio.setAttribute('title', 'WCAG 1.2.1: Audio-only needs transcript');
            }
          }
        }
      });
      
      // Check video elements  
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach(video => {
        if (!isLabeledAsMediaAlternativeVanilla(video) && isVideoOnlyVanilla(video)) {
          const hasAlternative = hasTimeBasedMediaAlternativeVanilla(video) || hasAudioTrackVanilla(video);
          
          if (!hasAlternative) {
            violations.videoOnly.push({
              element: video,
              type: 'videoOnly', 
              issue: 'Video-only content without alternative'
            });
            violations.total++;
            
            if (config.highlightViolations) {
              Object.assign(video.style, config.violationStyles.videoOnly);
              video.setAttribute('title', 'WCAG 1.2.1: Video-only needs transcript or audio');
            }
          }
        }
      });
      
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error in vanilla JS fallback:', error);
    }
  }
  
  // Vanilla JS helper functions
  function isLabeledAsMediaAlternativeVanilla(element) {
    const ariaLabel = element.getAttribute('aria-label') || '';
    const title = element.getAttribute('title') || '';
    const alternativeKeywords = ['alternative', 'transcript', 'text version'];
    const textToCheck = (ariaLabel + ' ' + title).toLowerCase();
    
    return alternativeKeywords.some(keyword => textToCheck.includes(keyword));
  }
  
  function hasTimeBasedMediaAlternativeVanilla(element) {
    return element.hasAttribute('aria-describedby') ||
           element.parentElement.querySelector('.transcript, .alternative-text') !== null;
  }
  
  function isVideoOnlyVanilla(video) {
    return video.muted && video.hasAttribute('data-no-audio');
  }
  
  function hasAudioTrackVanilla(video) {
    return !video.muted && !video.hasAttribute('data-no-audio');
  }
  
  // Initialize the checker
  executeWithJQuery(runWCAGChecks);
  
})();