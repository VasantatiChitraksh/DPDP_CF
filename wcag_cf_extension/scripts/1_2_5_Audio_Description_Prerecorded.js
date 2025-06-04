// WCAG 1.2.5 Audio Description (Prerecorded) Accessibility Checker
// Production version - Clean and professional

(() => {
  'use strict';
  console.log('%cWCAG 1.2.5', 'color:white;background-color:green; padding: 5px 50px; font-weight: bold;');
  
  console.log('🔍 WCAG 1.2.5 Checker initializing...');
  
  // Configuration
  const config = {
    highlightViolations: true,
    logViolations: true,
    showSummary: true,
    violationStyles: {
      video: { border: '3px solid #e74c3c', boxShadow: '0 0 8px #e74c3c', outline: '2px solid #c0392b' },
      iframe: { border: '3px solid #f39c12', boxShadow: '0 0 8px #f39c12', outline: '2px solid #d68910' },
      object: { border: '3px solid #9b59b6', boxShadow: '0 0 8px #9b59b6', outline: '2px solid #7d3c98' }
    }
  };
  
  // Violation tracking
  let violations = {
    videos: [],
    iframes: [],
    objects: [],
    total: 0
  };
  
  // Common video hosting patterns
  const videoHostPatterns = [
    /youtube\.com\/(?:watch|embed)/i,
    /youtu\.be\//i,
    /vimeo\.com/i,
    /dailymotion\.com/i,
    /wistia\.(?:com|net)/i,
    /brightcove\.(?:com|net)/i,
    /jwplayer\.com/i,
    /videojs\.com/i,
    /kaltura\.com/i,
    /twitch\.tv/i
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
    console.log('🎯 Running WCAG 1.2.5 compliance check...');
    
    try {
      checkVideoElements();
      checkIframeEmbeds();
      checkObjectEmbeds();
      displaySummary();
      
    } catch (error) {
      console.error('❌ Error during WCAG checks:', error);
      executeWithVanillaJS();
    }
  }
  
  // Check native HTML5 video elements
  function checkVideoElements() {
    $('video').each(function() {
      const $video = $(this);
      const src = $video.attr('src') || $video.find('source').first().attr('src');
      
      // Skip if this is likely live content
      if (isLiveContent($video)) return;
      
      // Check for audio description indicators
      const hasAudioDescription = checkForAudioDescription($video);
      
      if (!hasAudioDescription.found) {
        const violation = {
          element: this,
          type: 'video',
          issue: 'Video may be missing audio description',
          src: src || 'Multiple sources',
          details: hasAudioDescription.details,
          suggestion: 'Provide audio description track or ensure video includes integrated audio description'
        };
        
        violations.videos.push(violation);
        violations.total++;
        
        if (config.logViolations) {
          console.warn('🚨 WCAG 1.2.5: Video may be missing audio description', {
            element: this,
            src: violation.src,
            details: hasAudioDescription.details
          });
        }
        
        if (config.highlightViolations) {
          highlightElement($video, 'video', 'May need audio description');
        }
      }
    });
  }
  
  // Check iframe embeds (YouTube, Vimeo, etc.)
  function checkIframeEmbeds() {
    $('iframe').each(function() {
      const $iframe = $(this);
      const src = $iframe.attr('src');
      
      if (!src) return;
      
      // Check if this is a video hosting service
      const isVideoHost = videoHostPatterns.some(pattern => pattern.test(src));
      
      if (isVideoHost) {
        // Check for audio description indicators
        const hasAudioDescription = checkForAudioDescriptionIframe($iframe, src);
        
        if (!hasAudioDescription.found) {
          const violation = {
            element: this,
            type: 'iframe',
            issue: 'Embedded video may be missing audio description',
            src: src,
            platform: identifyVideoPlatform(src),
            details: hasAudioDescription.details,
            suggestion: 'Verify that embedded video has audio description available on the hosting platform'
          };
          
          violations.iframes.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn('🚨 WCAG 1.2.5: Embedded video may be missing audio description', {
              element: this,
              platform: violation.platform,
              src: src
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($iframe, 'iframe', `${violation.platform} video may need audio description`);
          }
        }
      }
    });
  }
  
  // Check object/embed elements
  function checkObjectEmbeds() {
    $('object, embed').each(function() {
      const $element = $(this);
      const tagName = this.tagName.toLowerCase();
      const src = $element.attr('data') || $element.attr('src');
      const type = $element.attr('type');
      
      // Check if this might be video content
      if (isLikelyVideoContent(src, type)) {
        const hasAudioDescription = checkForAudioDescriptionObject($element);
        
        if (!hasAudioDescription.found) {
          const violation = {
            element: this,
            type: 'object',
            issue: `${tagName} video content may be missing audio description`,
            src: src || 'No source specified',
            details: hasAudioDescription.details,
            suggestion: `Verify that ${tagName} video content includes audio description`
          };
          
          violations.objects.push(violation);
          violations.total++;
          
          if (config.logViolations) {
            console.warn(`🚨 WCAG 1.2.5: ${tagName} video may be missing audio description`, {
              element: this,
              src: src
            });
          }
          
          if (config.highlightViolations) {
            highlightElement($element, 'object', `${tagName} may need audio description`);
          }
        }
      }
    });
  }
  
  // Check for audio description in video elements
  function checkForAudioDescription($video) {
    const details = [];
    
    // Check for track elements with kind="descriptions"
    const descriptionTracks = $video.find('track[kind="descriptions"]');
    if (descriptionTracks.length > 0) {
      return { found: true, details: ['Has description track elements'] };
    }
    
    // Check for multiple audio tracks (might indicate audio description)
    const audioTracks = $video.find('source[type*="audio"], track[kind="audio"]');
    if (audioTracks.length > 1) {
      details.push('Multiple audio sources found - verify if one is audio description');
    }
    
    // Check for aria-describedby pointing to audio description
    const describedBy = $video.attr('aria-describedby');
    if (describedBy) {
      const descElement = $(`#${describedBy}`);
      if (descElement.length && descElement.text().toLowerCase().includes('audio description')) {
        return { found: true, details: ['Has aria-describedby referencing audio description'] };
      }
      details.push('Has aria-describedby but unclear if it references audio description');
    }
    
    // Check for data attributes that might indicate audio description
    const dataAttrs = $video.get(0).attributes;
    for (let attr of dataAttrs) {
      if (attr.name.includes('description') || attr.name.includes('audio-desc')) {
        details.push(`Found data attribute: ${attr.name}`);
      }
    }
    
    return { found: false, details: details.length ? details : ['No audio description indicators found'] };
  }
  
  // Check for audio description in iframe embeds
  function checkForAudioDescriptionIframe($iframe, src) {
    const details = [];
    
    // Check URL parameters that might indicate audio description
    const urlParams = new URL(src, window.location.href).searchParams;
    
    // YouTube specific checks
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      if (urlParams.has('cc_lang_pref') || urlParams.has('hl')) {
        details.push('Has language preferences - may support audio description');
      }
    }
    
    // Check for aria-describedby
    const describedBy = $iframe.attr('aria-describedby');
    if (describedBy) {
      details.push('Has aria-describedby - verify it references audio description');
    }
    
    // Check title for audio description mentions
    const title = $iframe.attr('title');
    if (title && title.toLowerCase().includes('audio description')) {
      return { found: true, details: ['Title mentions audio description'] };
    }
    
    return { found: false, details: details.length ? details : ['Cannot verify audio description in embedded content'] };
  }
  
  // Check for audio description in object/embed elements
  function checkForAudioDescriptionObject($element) {
    const details = [];
    
    // Check for param elements that might indicate audio description
    const params = $element.find('param');
    params.each(function() {
      const name = $(this).attr('name');
      const value = $(this).attr('value');
      if (name && (name.includes('description') || name.includes('audio'))) {
        details.push(`Found param: ${name}=${value}`);
      }
    });
    
    return { found: false, details: details.length ? details : ['Cannot verify audio description in object/embed'] };
  }
  
  // Check if content is likely live (which would be exempt from 1.2.5)
  function isLiveContent($element) {
    const src = $element.attr('src') || '';
    const title = $element.attr('title') || '';
    const liveIndicators = ['live', 'stream', 'broadcast'];
    
    return liveIndicators.some(indicator => 
      src.toLowerCase().includes(indicator) || title.toLowerCase().includes(indicator)
    );
  }
  
  // Check if content is likely video
  function isLikelyVideoContent(src, type) {
    if (!src && !type) return false;
    
    const videoTypes = ['video/', 'application/x-shockwave-flash'];
    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'];
    
    if (type && videoTypes.some(vType => type.includes(vType))) return true;
    if (src && videoExtensions.some(ext => src.toLowerCase().includes(ext))) return true;
    
    return false;
  }
  
  // Identify video platform from URL
  function identifyVideoPlatform(src) {
    if (src.includes('youtube.com') || src.includes('youtu.be')) return 'YouTube';
    if (src.includes('vimeo.com')) return 'Vimeo';
    if (src.includes('dailymotion.com')) return 'Dailymotion';
    if (src.includes('wistia.')) return 'Wistia';
    if (src.includes('brightcove.')) return 'Brightcove';
    if (src.includes('twitch.tv')) return 'Twitch';
    return 'Unknown platform';
  }
  
  // Highlight violation elements
  function highlightElement($element, type, message) {
    const styles = config.violationStyles[type];
    $element.css(styles);
    $element.attr('data-wcag-violation', message);
    
    // Add tooltip
    const currentTitle = $element.attr('title') || '';
    const newTitle = currentTitle ? `${currentTitle} | WCAG 1.2.5: ${message}` : `WCAG 1.2.5: ${message}`;
    $element.attr('title', newTitle);
  }
  
  // Display summary of findings
  function displaySummary() {
    if (config.showSummary) {
      console.log('📊 WCAG 1.2.5 Audio Description Summary:');
      console.log(`   HTML5 Videos: ${violations.videos.length} potential violations`);
      console.log(`   Embedded Videos: ${violations.iframes.length} potential violations`);
      console.log(`   Object/Embed Videos: ${violations.objects.length} potential violations`);
      console.log(`   Total: ${violations.total} potential violations found`);
      
      if (violations.total === 0) {
        console.log('✅ No obvious WCAG 1.2.5 violations detected!');
        console.log('💡 Note: Manual verification is still recommended for video content');
      } else {
        console.log('🔧 Manual verification required for highlighted video elements');
        console.log('📋 Ensure all prerecorded videos have audio descriptions available');
        
        // Provide detailed violation information
        violations.videos.forEach((v, i) => {
          console.log(`   Video ${i + 1}: ${v.details.join(', ')}`);
        });
        violations.iframes.forEach((v, i) => {
          console.log(`   Embed ${i + 1} (${v.platform}): ${v.details.join(', ')}`);
        });
      }
    }
  }
  
  // Vanilla JS fallback
  function executeWithVanillaJS() {
    console.log('📱 Using vanilla JavaScript fallback...');
    
    try {
      // Check HTML5 video elements
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        const tracks = video.querySelectorAll('track[kind="descriptions"]');
        
        if (tracks.length === 0) {
          violations.videos.push({
            element: video,
            type: 'video',
            issue: 'Video may be missing audio description'
          });
          violations.total++;
          
          if (config.highlightViolations) {
            Object.assign(video.style, config.violationStyles.video);
            video.setAttribute('title', 'WCAG 1.2.5: May need audio description');
          }
        }
      });
      
      // Check iframe embeds
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        const src = iframe.getAttribute('src');
        if (src && videoHostPatterns.some(pattern => pattern.test(src))) {
          violations.iframes.push({
            element: iframe,
            type: 'iframe',
            issue: 'Embedded video may be missing audio description'
          });
          violations.total++;
          
          if (config.highlightViolations) {
            Object.assign(iframe.style, config.violationStyles.iframe);
            iframe.setAttribute('title', 'WCAG 1.2.5: Embedded video may need audio description');
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