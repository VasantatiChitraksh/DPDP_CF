// WCAG 1.2.3 Audio Description or Media Alternative Checker
// Production version - Clean and professional

(() => {
  'use strict';
  console.log('%cWCAG 1.2.3', 'color:white;background-color:green; padding: 5px 50px; font-weight: bold;');

  console.log('🔍 WCAG 1.2.3 Checker initializing...');
  
  // Configuration
  const config = {
    highlightViolations: true,
    logViolations: true,
    showSummary: true,
    violationStyles: {
      video: { border: '3px solid #e74c3c', boxShadow: '0 0 8px #e74c3c' },
      media: { border: '3px solid #f39c12', boxShadow: '0 0 8px #f39c12' }
    }
  };
  
  // Violation tracking
  let violations = {
    videos: [],
    media: [],
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
    console.log('🎯 Running WCAG 1.2.3 compliance check...');
    
    try {
      checkVideoElements();
      checkMediaElements();
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error during WCAG checks:', error);
      executeWithVanillaJS();
    }
  }
  
  // Check if element is clearly labeled as text alternative
  function isMediaAlternativeForText(element) {
    const $element = $(element);
    const ariaLabel = $element.attr('aria-label') || '';
    const title = $element.attr('title') || '';
    const nearbyText = $element.prev().text() + ' ' + $element.next().text();
    
    const textAlternativeKeywords = [
      'alternative', 'transcript', 'text version', 'text alternative',
      'audio description', 'described version', 'accessibility version'
    ];
    
    const combinedText = (ariaLabel + ' ' + title + ' ' + nearbyText).toLowerCase();
    
    return textAlternativeKeywords.some(keyword => 
      combinedText.includes(keyword.toLowerCase())
    );
  }
  
  // Check if video has audio description or media alternative
  function hasAudioDescriptionOrAlternative(videoElement) {
    const $video = $(videoElement);
    
    // Check for audio description tracks
    const audioDescriptionTrack = $video.find('track[kind="descriptions"]').length > 0;
    
    // Check for alternative audio track (multiple audio tracks might indicate audio description)
    const hasMultipleAudioTracks = videoElement.audioTracks && videoElement.audioTracks.length > 1;
    
    // Check for aria-describedby pointing to audio description
    const ariaDescribedBy = $video.attr('aria-describedby');
    let hasAriaDescription = false;
    if (ariaDescribedBy) {
      const describedElement = document.getElementById(ariaDescribedBy);
      if (describedElement) {
        const descriptionText = describedElement.textContent.toLowerCase();
        hasAriaDescription = descriptionText.includes('audio description') || 
                           descriptionText.includes('described version') ||
                           descriptionText.length > 50; // Assume lengthy description is alternative
      }
    }
    
    // Check for nearby transcript or alternative content
    const $container = $video.closest('div, section, article, figure');
    const hasNearbyTranscript = $container.find('[class*="transcript"], [id*="transcript"], [class*="alternative"], [id*="alternative"]').length > 0;
    
    // Check for data attributes indicating audio description
    const hasDataAD = $video.attr('data-audio-description') === 'true' || 
                      $video.attr('data-described') === 'true';
    
    return {
      hasAudioDescription: audioDescriptionTrack || hasMultipleAudioTracks || hasDataAD,
      hasAlternative: hasAriaDescription || hasNearbyTranscript,
      trackCount: $video.find('track').length,
      details: {
        audioDescriptionTrack,
        hasMultipleAudioTracks,
        hasAriaDescription,
        hasNearbyTranscript,
        hasDataAD
      }
    };
  }
  
  // Check video elements for WCAG 1.2.3 compliance
  function checkVideoElements() {
    $('video').each(function() {
      const $video = $(this);
      const videoElement = this;
      
      // Skip if this is clearly a media alternative for text
      if (isMediaAlternativeForText(videoElement)) {
        // console.log('ℹ️ Video skipped - appears to be media alternative for text', videoElement);
        return;
      }
      
      // Skip if video has no visual content (audio-only, though this should be rare for video elements)
      const hasVisualContent = !$video.attr('data-audio-only');
      if (!hasVisualContent) return;
      
      // Check for prerecorded content (assume prerecorded unless explicitly marked as live)
      const isLive = $video.attr('data-live') === 'true' || 
                     $video.attr('data-broadcast') === 'true' ||
                     $video.hasClass('live-stream');
      
      if (isLive) {
        // console.log('ℹ️ Live video detected - WCAG 1.2.3 applies to prerecorded content only', videoElement);
        return;
      }
      
      const accessibilityCheck = hasAudioDescriptionOrAlternative(videoElement);
      
      // Video needs either audio description OR media alternative
      if (!accessibilityCheck.hasAudioDescription && !accessibilityCheck.hasAlternative) {
        const violation = {
          element: videoElement,
          type: 'video',
          issue: 'Missing audio description or media alternative',
          src: $video.attr('src') || 'Embedded/source element',
          suggestion: 'Add audio description track, transcript, or media alternative',
          details: accessibilityCheck.details
        };
        
        violations.videos.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.2.3: Video missing audio description or alternative', {
            element: videoElement,
            src: violation.src,
            trackCount: accessibilityCheck.trackCount,
            details: accessibilityCheck.details
          });
        }
        
        if (config.highlightViolations) {
          highlightElement($video, 'video', 'Missing audio description or media alternative');
        }
      } else {
        console.log('✅ Video has audio description or alternative', 
          {
          element: videoElement,
          hasAudioDescription: accessibilityCheck.hasAudioDescription,
          hasAlternative: accessibilityCheck.hasAlternative
        });
      }
    });
  }
  
  // Check other media elements that might contain video content
  function checkMediaElements() {
    $('object, embed, iframe').each(function() {
      const $element = $(this);
      const tagName = this.tagName.toLowerCase();
      
      // Check if this might contain video content
      const src = $element.attr('src') || $element.attr('data') || '';
      const type = $element.attr('type') || '';
      
      const mightContainVideo = src.includes('video') || 
                               src.includes('youtube') || 
                               src.includes('vimeo') || 
                               src.includes('player') ||
                               type.includes('video') ||
                               $element.attr('data-video') === 'true';
      
      if (!mightContainVideo) return;
      
      // Skip if clearly labeled as media alternative for text
      if (isMediaAlternativeForText(this)) return;
      
      // Check for accessibility features
      const hasAccessibilityFeatures = $element.attr('aria-describedby') || 
                                      $element.attr('data-audio-description') === 'true' ||
                                      $element.attr('title')?.toLowerCase().includes('described') ||
                                      $element.closest('div, section').find('[class*="transcript"], [id*="transcript"]').length > 0;
      
      if (!hasAccessibilityFeatures) {
        const violation = {
          element: this,
          type: 'media',
          issue: `${tagName} with potential video content missing accessibility features`,
          src: src || 'No src/data attribute',
          suggestion: `Add audio description, transcript, or accessibility attributes for ${tagName}`
        };
        
        violations.media.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn(`🚨 WCAG 1.2.3: ${tagName} with video content may lack audio description`, {
            element: this,
            src: violation.src
          });
        }
        
        if (config.highlightViolations) {
          highlightElement($element, 'media', `${tagName} may need audio description`);
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
    const existingTitle = $element.attr('title') || '';
    const wcagMessage = `WCAG 1.2.3: ${message}`;
    $element.attr('title', existingTitle ? `${existingTitle} | ${wcagMessage}` : wcagMessage);
  }
  
  // Display summary of findings
  function displaySummary() {
    if (config.showSummary) {
      console.log('📊 WCAG 1.2.3 Compliance Summary:');
      console.log(`   Videos: ${violations.videos.length} violations`);
      console.log(`   Media Elements: ${violations.media.length} violations`);
      console.log(`   Total: ${violations.total} violations found`);
      
      if (violations.total === 0) {
        console.log('✅ No WCAG 1.2.3 violations detected!');
        console.log('ℹ️ All videos appear to have audio descriptions or media alternatives');
      } else {
        console.log('🔧 Review highlighted elements and add:');
        console.log('   • Audio description tracks (<track kind="descriptions">)');
        console.log('   • Transcripts or text alternatives');
        console.log('   • Media alternatives clearly labeled as such');
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
        // Skip if media alternative for text
        const nearbyText = (video.previousElementSibling?.textContent || '') + 
                          (video.nextElementSibling?.textContent || '');
        if (nearbyText.toLowerCase().includes('alternative') || 
            nearbyText.toLowerCase().includes('transcript')) {
          return;
        }
        
        // Check for audio description track
        const hasDescriptionTrack = video.querySelector('track[kind="descriptions"]') !== null;
        
        // Check for nearby transcript
        const container = video.closest('div, section, article, figure');
        const hasTranscript = container && 
                             (container.querySelector('[class*="transcript"]') !== null ||
                              container.querySelector('[id*="transcript"]') !== null);
        
        if (!hasDescriptionTrack && !hasTranscript) {
          violations.videos.push({
            element: video,
            type: 'video',
            issue: 'Missing audio description or media alternative'
          });
          violations.total++;
          
          if (config.highlightViolations) {
            Object.assign(video.style, config.violationStyles.video);
            video.setAttribute('title', 'WCAG 1.2.3: Missing audio description or media alternative');
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