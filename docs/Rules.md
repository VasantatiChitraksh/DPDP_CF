# WCAG Accessibility Rules Analysis - 1

### 1.1.1
- **Rule Number:-** 1.1.1
- **Rule Name:-** Non-text Content
- **Conformance Level:-** A
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Use DOM inspection and accessibility APIs to detect `img`, `input type="image"`, `svg`, `canvas`, `object`, `embed`, and other elements with visual or multimedia content. Check for presence of `alt`, `aria-label`, `aria-labelledby`, or hidden roles.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Rule-based systems cannot interpret the semantic meaning or intent behind non-text content or generate equivalent, context-appropriate descriptions.
- **LLM Fix Acceptable:-** Yes

### 1.2.1
- **Rule Number:-** 1.2.1
- **Rule Name:-** Audio-only and Video-only (Prerecorded)
- **Conformance Level:-** A
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Detect presence of `<audio>` and `<video>` tags with no associated text tracks or descriptive alternatives. For `<audio>`, check for a transcript. For `<video>` (video-only), check for descriptive audio or accompanying text content.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Rule-based systems cannot generate accurate transcripts or meaningful descriptions of media content without understanding the media's content.
- **LLM Fix Acceptable:-** Yes

### 1.2.2
- **Rule Number:-** 1.2.2
- **Rule Name:-** Captions (Prerecorded)
- **Conformance Level:-** A
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Inspect `<video>` elements with audio tracks for the presence of `<track kind="captions">` or equivalent captioning. Check for embedded captions or links to caption files like `.vtt`.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Generating accurate and synchronized captions requires understanding of the spoken content, timing, and language—beyond rule-based capabilities.
- **LLM Fix Acceptable:-** Yes

### 1.2.3
- **Rule Number:-** 1.2.3
- **Rule Name:-** Audio Description or Media Alternative (Prerecorded)
- **Conformance Level:-** A
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Check `<video>` elements for associated audio description tracks or for links to text-based alternatives (e.g., transcripts describing both speech and visual context).
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Generating audio descriptions or equivalent alternatives requires interpretation of visual content and context, which rule-based systems cannot perform.
- **LLM Fix Acceptable:-** Yes

### 1.2.4
- **Rule Number:-** 1.2.4
- **Rule Name:-** Captions (Live)
- **Conformance Level:-** AA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Detect live media streams (e.g., live video or audio) and check if caption data streams or real-time captioning services are present in the media player or source.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Real-time caption generation and synchronization require human input or advanced AI beyond rule-based detection and cannot be fixed automatically by rules.
- **LLM Fix Acceptable:-** Yes

### 1.2.5
- **Rule Number:-** 1.2.5
- **Rule Name:-** Audio Description (Prerecorded)
- **Conformance Level:-** AA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Check `<video>` elements for presence of audio description tracks or alternative media providing audio description via metadata, tracks, or linked content.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Creating or improving audio descriptions requires semantic understanding of visual content and context, which cannot be done by rule-based methods alone.
- **LLM Fix Acceptable:-** Yes

### 1.2.6
- **Rule Number:-** 1.2.6
- **Rule Name:-** Sign Language (Prerecorded)
- **Conformance Level:-** AAA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Check for presence of sign language interpretation tracks or video overlays synchronized with prerecorded audio content, or linked sign language videos.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Generating or verifying sign language interpretation requires specialized knowledge and semantic understanding beyond rule-based detection capabilities.
- **LLM Fix Acceptable:-** Yes

### 1.2.7
- **Rule Number:-** 1.2.7
- **Rule Name:-** Extended Audio Description (Prerecorded)
- **Conformance Level:-** AAA
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Determining whether pauses in audio are sufficient for audio descriptions requires understanding the timing and context of the media, which cannot be detected by rule-based methods alone.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Generating extended audio descriptions involves deep semantic and temporal analysis beyond rule-based or automated capabilities.
- **LLM Fix Acceptable:-** Yes

### 1.2.8
- **Rule Number:-** 1.2.8
- **Rule Name:-** Media Alternative (Prerecorded)
- **Conformance Level:-** AAA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Check for presence of alternative time-based media such as transcripts, audio descriptions, or other media alternatives linked or embedded with the synchronized or video-only media elements.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Automatically generating full media alternatives that convey equivalent meaning requires semantic content understanding and media analysis beyond rule-based approaches.
- **LLM Fix Acceptable:-** Yes

### 1.2.9
- **Rule Number:-** 1.2.9
- **Rule Name:-** Audio-only (Live)
- **Conformance Level:-** AAA
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Detecting the presence of equivalent time-based media alternatives for live audio-only content requires understanding real-time content and context, which rule-based methods cannot perform.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Generating equivalent time-based media for live audio requires real-time semantic interpretation and content generation beyond rule-based capabilities.
- **LLM Fix Acceptable:-** Yes

### 1.3.1
- **Rule Number:-** 1.3.1
- **Rule Name:-** Info and Relationships
- **Conformance Level:-** A
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Inspect semantic HTML elements (e.g., headings, lists, tables), ARIA roles, properties, and states to verify that information structure and relationships are programmatically determinable.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Suggest using correct semantic elements, ARIA roles, and properties based on detected markup deficiencies or misuses.
- **LLM Fix Acceptable:-** Yes

### 1.3.2
- **Rule Number:-** 1.3.2
- **Rule Name:-** Meaningful Sequence
- **Conformance Level:-** A
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Analyze DOM order, tabindex, ARIA landmarks, and reading order to verify that content sequence follows a meaningful and logical order for screen readers and assistive technologies.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Recommend reordering DOM elements, adjusting tabindex, or using ARIA landmarks to ensure correct reading order.
- **LLM Fix Acceptable:-** Yes

### 1.3.3
- **Rule Number:-** 1.3.3
- **Rule Name:-** Sensory Characteristics
- **Conformance Level:-** A
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Detecting reliance solely on sensory characteristics in instructions requires understanding context, intent, and meaning, which cannot be fully captured by rule-based methods.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Suggesting alternative instruction methods requires semantic understanding of content and user needs, beyond rule-based capabilities.
- **LLM Fix Acceptable:-** Yes

### 1.3.4
- **Rule Number:-** 1.3.4
- **Rule Name:-** Orientation
- **Conformance Level:-** AA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Analyze CSS media queries, viewport meta tags, and JavaScript orientation locks to detect restrictions on display orientation.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Suggest removing or modifying CSS/JS that locks orientation unless essential; recommend responsive design practices.
- **LLM Fix Acceptable:-** Yes

### 1.3.5
- **Rule Number:-** 1.3.5
- **Rule Name:-** Identify Input Purpose
- **Conformance Level:-** AA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Check form input elements for use of appropriate `autocomplete` attributes or equivalent markup that declares the input purpose according to the Input Purposes specification.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Suggest adding or correcting `autocomplete` attributes or ARIA input purpose properties in form controls.
- **LLM Fix Acceptable:-** Yes

### 1.3.6
- **Rule Number:-** 1.3.6
- **Rule Name:-** Identify Purpose
- **Conformance Level:-** AAA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Inspect markup for appropriate semantic elements, ARIA roles, labels, and properties that define the purpose of UI components, icons, and regions.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Suggest adding or correcting ARIA roles, labels, and semantic markup to clarify purpose programmatically.
- **LLM Fix Acceptable:-** Yes

### 1.4.1
- **Rule Number:-** 1.4.1
- **Rule Name:-** Use of Color
- **Conformance Level:-** A
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Detecting if color is the only means of conveying information requires understanding visual context and meaning, which cannot be reliably identified by automated rule-based checks.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Suggesting alternatives to color-only cues requires semantic understanding of the information conveyed and appropriate alternative methods, beyond rule-based capabilities.
- **LLM Fix Acceptable:-** Yes

### 1.4.2
- **Rule Number:-** 1.4.2
- **Rule Name:-** Audio Control
- **Conformance Level:-** A
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Detect autoplaying audio elements or scripts playing audio >3 seconds and check for presence of controls (pause/stop buttons) or volume controls independent of system volume (e.g., volume sliders).
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Adding or improving audio controls requires UI design and implementation beyond rule-based fixes; automatic injection of controls is not reliably feasible.
- **LLM Fix Acceptable:-** Yes

### 1.4.3
- **Rule Number:-** 1.4.3
- **Rule Name:-** Contrast (Minimum)
- **Conformance Level:-** AA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Analyze color contrast ratios between text (or images of text) and background using automated color sampling and calculation algorithms based on CSS or rendered pixels.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Suggest color changes to foreground or background to meet minimum contrast ratio thresholds, excluding exceptions.
- **LLM Fix Acceptable:-** Yes

### 1.4.4
- **Rule Number:-** 1.4.4
- **Rule Name:-** Resize Text
- **Conformance Level:-** AA
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Detecting if text resizes correctly without loss of content/functionality involves rendering and user interaction testing, which rule-based methods cannot fully automate.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Fixing resize issues requires design/layout adjustments and dynamic testing beyond static rule-based fixes.
- **LLM Fix Acceptable:-** Yes

### 1.4.5
- **Rule Number:-** 1.4.5
- **Rule Name:-** Images of Text
- **Conformance Level:-** AA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Detect use of images containing text by analyzing image alt text, presence of text in CSS or HTML, or using OCR techniques; check if text alternatives exist or if CSS-based text alternatives are possible.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Automatically converting images of text to actual text or verifying customization options requires manual design and content decisions.
- **LLM Fix Acceptable:-** Yes

### 1.4.6
- **Rule Number:-** 1.4.6
- **Rule Name:-** Contrast (Enhanced)
- **Conformance Level:-** AAA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Analyze color contrast ratios between text (or images of text) and background using automated color sampling and calculation algorithms, with thresholds set at 7:1 for normal text and 4.5:1 for large text.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Suggest adjustments to foreground or background colors to meet enhanced contrast ratios, considering exceptions.
- **LLM Fix Acceptable:-** Yes

### 1.4.7
- **Rule Number:-** 1.4.7
- **Rule Name:-** Low or No Background Audio
- **Conformance Level:-** AAA
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Detecting audio content characteristics like background sound levels and distinguishing foreground speech from music or vocalization requires audio signal analysis and semantic context understanding beyond rule-based methods.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Modifying audio tracks to reduce or eliminate background audio requires audio editing and content decisions that cannot be automated by rule-based fixes.
- **LLM Fix Acceptable:-** Yes

### 1.4.8
- **Rule Number:-** 1.4.8
- **Rule Name:-** Visual Presentation
- **Conformance Level:-** AAA
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Verifying user-selectable colors, text width limits, justification, line spacing, and resize behavior requires dynamic user interaction and contextual understanding beyond rule-based checks.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Implementing or suggesting fixes for these complex visual and user preference controls requires design and interaction knowledge beyond rule-based capabilities.
- **LLM Fix Acceptable:-** Yes

### 1.4.9
- **Rule Number:-** 1.4.9
- **Rule Name:-** Images of Text (No Exception)
- **Conformance Level:-** AAA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Detect images containing text by analyzing alt text, image metadata, or OCR; verify if used only for decoration or essential presentation by checking context and semantic markup where possible.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Automatically converting or verifying essential use requires human judgment and design decisions beyond rule-based methods.
- **LLM Fix Acceptable:-** Yes

### 1.4.10
- **Rule Number:-** 1.4.10
- **Rule Name:-** Reflow
- **Conformance Level:-** AA
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Detecting whether content can reflow without loss or two-dimensional scrolling requires dynamic layout testing and semantic understanding beyond static rule-based checks.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Fixing reflow issues requires responsive design techniques and layout adjustments that cannot be fully automated by rule-based methods.
- **LLM Fix Acceptable:-** Yes

### 1.4.11
- **Rule Number:-** 1.4.11
- **Rule Name:-** Non-text Contrast
- **Conformance Level:-** AA
- **Rule-Based Check:-** True
- **Rule-Based Check Method:-** Analyze color contrast ratios of user interface components and graphical objects against adjacent colors using automated color sampling and calculation to verify minimum 3:1 contrast.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Suggest color adjustments to meet minimum contrast ratios for UI components and graphical objects, considering exceptions.
- **LLM Fix Acceptable:-** Yes

### 1.4.12
- **Rule Number:-** 1.4.12
- **Rule Name:-** Text Spacing
- **Conformance Level:-** AA
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Verifying no loss of content/functionality after applying specific text spacing properties requires dynamic rendering and interaction testing, which cannot be fully automated by rule-based checks.
- **Rule-Based Fix:-** True
- **Rule-Based Fix Method:-** Suggest CSS style updates for line height, paragraph spacing, letter spacing, and word spacing as per the rule's numeric ratios.
- **LLM Fix Acceptable:-** Yes

### 1.4.13
- **Rule Number:-** 1.4.13
- **Rule Name:-** Content on Hover or Focus
- **Conformance Level:-** AA
- **Rule-Based Check:-** False
- **Rule-Based Check Fail Reason:-** Checking dismissibility, hover persistence, and focus behavior requires interactive testing and user input simulation beyond rule-based static analysis.
- **Rule-Based Fix:-** False
- **Rule-Based Fix Fail Reason:-** Fixes involve UI/UX design changes and scripting adjustments that cannot be fully automated through rule-based methods.
- **LLM Fix Acceptable:-** Yes
### 2.1.1
- **Rule Number:** 2.1.1
- **Rule Name:** Keyboard
- **Conformance Level:** Level A
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Verifying full keyboard operability and timing independence requires interactive testing and simulation of keyboard input beyond static rule-based checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixes often require redesign of interaction logic and event handling that cannot be fully automated through rule-based methods.
- **LLM Fix Acceptable:** Yes

### 2.1.2
- **Rule Number:** 2.1.2
- **Rule Name:** No Keyboard Trap
- **Conformance Level:** Level A
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Detecting keyboard traps and verifying focus can be moved away using only keyboard requires interactive testing and keyboard input simulation beyond static rule-based analysis.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixing keyboard traps involves updating focus management and scripting logic, which cannot be fully automated through rule-based methods.
- **LLM Fix Acceptable:** Yes

### 2.1.3
- **Rule Number:** 2.1.3
- **Rule Name:** Keyboard (No Exception)
- **Conformance Level:** Level AAA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Verifying full keyboard operability without exception requires interactive testing and simulation of keyboard input beyond static rule-based analysis.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixes often require comprehensive redesign of interaction logic and event handling that cannot be fully automated through rule-based methods.
- **LLM Fix Acceptable:** Yes

### 2.1.4
- **Rule Number:** 2.1.4
- **Rule Name:** Character Key Shortcuts
- **Conformance Level:** Level A
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining the presence of character key shortcuts and verifying mechanisms to turn off, remap, or restrict activation requires interactive and semantic analysis beyond static rule-based checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixes involve UI behavior changes and user preference controls that cannot be fully automated by rule-based methods.
- **LLM Fix Acceptable:** Yes

### 2.2.1
- **Rule Number:** 2.2.1
- **Rule Name:** Timing Adjustable
- **Conformance Level:** Level A
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Verifying user controls for turning off, adjusting, or extending time limits requires interactive testing and user interaction simulation beyond static rule-based analysis.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixes involve adding or modifying UI controls and logic related to timing mechanisms, which cannot be fully automated through rule-based methods.
- **LLM Fix Acceptable:** Yes

### 2.2.2
- **Rule Number:** 2.2.2
- **Rule Name:** Pause, Stop, Hide
- **Conformance Level:** Level A
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining the presence and functionality of user controls to pause, stop, or hide moving or auto-updating content requires interactive testing and dynamic analysis beyond static rule-based checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Implementing or fixing these controls requires UI and scripting changes that cannot be fully automated using rule-based methods.
- **LLM Fix Acceptable:** Yes

### 2.2.3
- **Rule Number:** 2.2.3
- **Rule Name:** No Timing
- **Conformance Level:** Level AAA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Verifying that timing is non-essential requires semantic understanding of the content and context, which cannot be determined by static rule-based methods.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixing timing dependencies often involves redesigning the content or interaction logic, which cannot be fully automated through rule-based fixes.
- **LLM Fix Acceptable:** Yes

### 2.2.4
- **Rule Number:** 2.2.4
- **Rule Name:** Interruptions
- **Conformance Level:** Level AAA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining if interruptions can be postponed or suppressed requires dynamic testing of interaction behavior and user control options, which static rule-based methods cannot assess.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixing interruptions involves adding or modifying UI control mechanisms and event handling that cannot be automated via rule-based methods.
- **LLM Fix Acceptable:** Yes

### 2.2.5
- **Rule Number:** 2.2.5
- **Rule Name:** Re-authenticating
- **Conformance Level:** Level AAA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Verifying that users can continue activities without data loss after re-authentication requires interactive testing of session management and application behavior beyond static rule-based checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixing this requires application-level session handling and state preservation logic that cannot be implemented fully by rule-based fixes.
- **LLM Fix Acceptable:** Yes

### 2.2.6
- **Rule Number:** 2.2.6
- **Rule Name:** Timeouts
- **Conformance Level:** Level AAA (Added in 2.1)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Detecting warnings about inactivity duration and potential data loss requires dynamic interaction analysis and semantic understanding beyond static rule-based checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Implementing warnings and inactivity timers involves application logic and UI changes that cannot be fully automated via rule-based fixes.
- **LLM Fix Acceptable:** Yes

### 2.3.1
- **Rule Number:** 2.3.1
- **Rule Name:** Three Flashes or Below Threshold
- **Conformance Level:** Level A
- **Rule-Based Check:** True
- **Rule-Based Check Method:** Automated detection of flashing elements and analysis of their flash frequency and intensity against established thresholds.
- **Rule-Based Check Partial:** Can detect flashes exceeding frequency and intensity thresholds; cannot assess contextual impact on users with photosensitive conditions.
- **Rule-Based Check Fail Parts:** Contextual evaluation of user sensitivity and environmental factors affecting flash impact.
- **Rule-Based Fix:** True
- **Rule-Based Fix Method:** Automated adjustment or removal of flashing content exceeding thresholds by modifying CSS animations or media elements.
- **LLM Fix Acceptable:** Yes

### 2.3.2
- **Rule Number:** 2.3.2
- **Rule Name:** Three Flashes
- **Conformance Level:** Level AAA
- **Rule-Based Check:** True
- **Rule-Based Check Method:** Automated detection of flashing elements and analysis of flash frequency to ensure it does not exceed three flashes per second.
- **Rule-Based Check Partial:** Can detect flash frequency but cannot fully evaluate contextual impact on sensitive users.
- **Rule-Based Check Fail Parts:** Contextual and environmental sensitivity analysis.
- **Rule-Based Fix:** True
- **Rule-Based Fix Method:** Automated modification or removal of flashing content exceeding the flash frequency limit via CSS or media adjustments.
- **LLM Fix Acceptable:** Yes

### 2.3.3
- **Rule Number:** 2.3.3
- **Rule Name:** Animation from Interactions
- **Conformance Level:** Level AAA (Added in 2.1)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining whether motion animation is triggered by interaction and if it is essential requires semantic understanding and dynamic user interaction analysis beyond static rules.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Providing mechanism to disable animation typically requires UI design changes and user preferences that cannot be fully automated by rule-based fixes.
- **LLM Fix Acceptable:** Yes

### 2.4.1
- **Rule Number:** 2.4.1
- **Rule Name:** Bypass Blocks
- **Conformance Level:** Level A
- **Rule-Based Check:** True
- **Rule-Based Check Method:** Check presence of mechanisms like "skip to main content" links, landmarks, or other navigation aids.
- **Rule-Based Fix:** True
- **Rule-Based Fix Method:** Add standard skip links or ARIA landmarks to bypass repeated content.
- **LLM Fix Acceptable:** Yes

### 2.4.2
- **Rule Number:** 2.4.2
- **Rule Name:** Page Titled
- **Conformance Level:** Level A
- **Rule-Based Check:** True
- **Rule-Based Check Method:** Verify presence and meaningfulness of the \<title> element in the HTML document head.
- **Rule-Based Fix:** True
- **Rule-Based Fix Method:** Suggest adding or improving the \<title> element to describe the page topic or purpose.
- **LLM Fix Acceptable:** Yes

### 2.4.3
- **Rule Number:** 2.4.3
- **Rule Name:** Focus Order
- **Conformance Level:** Level A
- **Rule-Based Check:** Partially
- **Rule-Based Check Partial:** Can detect DOM/tabindex order and focusable elements sequence.
- **Rule-Based Check Fail Parts:** Cannot fully determine if focus order preserves meaning and operability without semantic understanding.
- **Rule-Based Fix:** Partially
- **Rule-Based Fix Method:** Can reorder tabindex or DOM elements to follow a logical sequence, but full meaning preservation needs manual review.
- **Rule-Based Fix Fail Reason:** Semantic context and user intent require human judgment beyond automated fixes.
- **LLM Fix Acceptable:** Yes

### 2.4.4
- **Rule Number:** 2.4.4
- **Rule Name:** Link Purpose (In Context)
- **Conformance Level:** Level A
- **Rule-Based Check:** Partially
- **Rule-Based Check Partial:** Can analyze link text and some programmatically determinable context (e.g., surrounding text, ARIA labels).
- **Rule-Based Check Fail Parts:** Cannot reliably detect ambiguous link purposes requiring user interpretation or broader context understanding.
- **Rule-Based Fix:** Partially
- **Rule-Based Fix Method:** Can suggest improving link text or adding ARIA labels based on link context, but ambiguity resolution may need manual review.
- **Rule-Based Fix Fail Reason:** Disambiguation often requires semantic and contextual understanding beyond automated methods.
- **LLM Fix Acceptable:** Yes

### 2.4.5
- **Rule Number:** 2.4.5
- **Rule Name:** Multiple Ways
- **Conformance Level:** Level AA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining the presence of multiple distinct navigation methods requires semantic understanding and analysis beyond static rule-based checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Suggesting additional navigation mechanisms involves design decisions and user experience considerations that cannot be fully automated.
- **LLM Fix Acceptable:** Yes

### 2.4.6
- **Rule Number:** 2.4.6
- **Rule Name:** Headings and Labels
- **Conformance Level:** Level AA
- **Rule-Based Check:** Partially
- **Rule-Based Check Partial:** Can detect presence of headings and labels, and check for empty or missing text.
- **Rule-Based Check Fail Parts:** Assessing if headings and labels appropriately describe the topic or purpose requires semantic understanding.
- **Rule-Based Fix:** Partially
- **Rule-Based Fix Method:** Can suggest adding missing labels/headings or fixing empty text; cannot guarantee semantic correctness.
- **Rule-Based Fix Fail Reason:** Proper descriptive quality requires human judgment or LLM semantic analysis.
- **LLM Fix Acceptable:** Yes

### 2.4.7
- **Rule Number:** 2.4.7
- **Rule Name:** Focus Visible
- **Conformance Level:** Level AA
- **Rule-Based Check:** True
- **Rule-Based Check Method:** Check CSS styles and browser default focus indicators on keyboard operable UI elements.
- **Rule-Based Check Partial:** Can detect presence of focus indicators and if they become visible on keyboard focus.
- **Rule-Based Check Fail Parts:** May not detect custom scripts that override or hide focus indicators under certain conditions.
- **Rule-Based Fix:** True
- **Rule-Based Fix Method:** Suggest adding or improving CSS :focus styles to ensure visible focus indicators.
- **LLM Fix Acceptable:** Yes

### 2.4.8
- **Rule Number:** 2.4.8
- **Rule Name:** Location
- **Conformance Level:** Level AAA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining if meaningful location information is provided contextually requires semantic understanding beyond static rules.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Suggesting location indicators involves understanding site structure and user context, which rule-based fixes cannot fully automate.
- **LLM Fix Acceptable:** Yes

### 2.4.9
- **Rule Number:** 2.4.9
- **Rule Name:** Link Purpose (Link Only)
- **Conformance Level:** Level AAA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining if link purpose is clear from link text alone often requires semantic and contextual understanding beyond static checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixing unclear link text to convey purpose clearly needs contextual and linguistic insight, which rule-based fixes cannot fully provide.
- **LLM Fix Acceptable:** Yes

### 2.4.10
- **Rule Number:** 2.4.10
- **Rule Name:** Section Headings
- **Conformance Level:** Level AAA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Verifying that section headings are used appropriately requires semantic understanding of content structure.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Adding or correcting section headings to properly organize content involves context-aware decisions.
- **LLM Fix Acceptable:** Yes

### 2.4.11
- **Rule Number:** 2.4.11
- **Rule Name:** Focus Not Obscured (Minimum)
- **Conformance Level:** Level AA (Added in 2.2)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Detecting if keyboard focus is obscured by author-created content requires dynamic interaction and visual rendering analysis beyond static checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixes involve layout and style adjustments that depend on content context and user interaction.
- **LLM Fix Acceptable:** Yes

### 2.4.12
- **Rule Number:** 2.4.12
- **Rule Name:** Focus Not Obscured (Enhanced)
- **Conformance Level:** Level AAA (Added in 2.2)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining if any part of a focused UI component is hidden by author-created content requires dynamic, visual, and interactive analysis beyond static rule checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixes require layout and styling changes based on visual rendering and interaction context, which cannot be fully automated by rule-based methods.
- **LLM Fix Acceptable:** Yes

### 2.4.13
- **Rule Number:** 2.4.13
- **Rule Name:** Focus Appearance
- **Conformance Level:** Level AAA (Added in 2.2)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Verifying that the focus indicator meets size and contrast requirements requires visual and interactive analysis beyond static code checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixes involve UI styling changes that depend on dynamic visual rendering and user agent behavior, which cannot be fully automated.
- **LLM Fix Acceptable:** Yes

### 2.5.1
- **Rule Number:** 2.5.1
- **Rule Name:** Pointer Gestures
- **Conformance Level:** Level A (Added in 2.1)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining if all multipoint or path-based gestures have single-pointer alternatives requires dynamic interaction testing beyond static analysis.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixing involves redesigning interaction methods to provide single-pointer alternatives, which cannot be fully automated.
- **LLM Fix Acceptable:** Yes

### 2.5.2
- **Rule Number:** 2.5.2
- **Rule Name:** Pointer Cancellation
- **Conformance Level:** Level A (Added in 2.1)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Verifying pointer event handling and availability of abort/undo mechanisms requires interactive testing beyond static analysis.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Implementing pointer cancellation involves changes in UI event handling and user feedback that cannot be automated purely through static fixes.
- **LLM Fix Acceptable:** Yes

### 2.5.3
- **Rule Number:** 2.5.3
- **Rule Name:** Label in Name
- **Conformance Level:** Level A (Added in 2.1)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Checking if the accessible name of UI components matches the visible label requires semantic understanding and dynamic analysis beyond static code inspection.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixing accessible names involves updating ARIA attributes or element properties that depend on context, not purely automatic code changes.
- **LLM Fix Acceptable:** Yes

### 2.5.4
- **Rule Number:** 2.5.4
- **Rule Name:** Motion Actuation
- **Conformance Level:** Level A (Added in 2.1)
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Detecting device or user motion functionality and ensuring alternative UI components or disable options requires dynamic analysis and contextual understanding beyond static checks.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Implementing alternative controls and disabling motion-based actuation requires UI design and user interaction changes not automatable by static rule fixes.
- **LLM Fix Acceptable:** Yes

### 2.5.5
- **Rule Number:** 2.5.5
- **Rule Name:** Target Size (Enhanced)
- **Conformance Level:** AAA
- **Rule-Based Check:** True
- **Rule-Based Check Method:** Measure the rendered size of interactive elements (e.g., buttons, links) in CSS pixels and compare to the 44x44 threshold, while accounting for exceptions.
- **Rule-Based Check Partial:** Can detect target size and flag elements under 44x44 CSS pixels.
- **Rule-Based Check Fail Parts:** Cannot fully determine context such as "Essential", "Inline", or equivalence of links.
- **Rule-Based Check Fail Reason:** Determining whether a target is essential, inline, or has an equivalent alternative often requires semantic/contextual understanding beyond simple rules.
- **Rule-Based Fix:** True
- **Rule-Based Fix Method:** Suggest increasing the size of small targets to at least 44x44 CSS pixels, unless an exception applies.
- **LLM Fix Acceptable:** True

### 2.5.6
- **Rule Number:** 2.5.6
- **Rule Name:** Concurrent Input Mechanisms
- **Conformance Level:** AAA
- **Rule-Based Check:** False
- **Rule-Based Check Fail Reason:** Determining whether input modalities are restricted without justification requires understanding author intent and platform capabilities.
- **Rule-Based Fix:** False
- **Rule-Based Fix Fail Reason:** Fixing this rule would require understanding the essential nature of input restrictions and user context, which rule-based methods cannot assess.
- **LLM Fix Acceptable:** Yes

### 2.5.7
- **Rule Number:** 2.5.7
- **Rule Name:** Dragging Movements
- **Conformance Level:** AA
- **Rule-Based Check:** Partial
- **Rule-Based Check Method:** Automated tools can detect common draggable elements via ARIA roles or event listeners (e.g., `dragstart`, `mousemove`) and flag if no alternatives are present.
- **Rule-Based Check Partial:** Detection of draggable elements and absence of alternative interaction methods.
- **Rule-Based Check Fail Parts:** Determining whether dragging is essential, or if alternative input methods exist outside typical patterns.
- **Rule-Based Fix:** Partial
- **Rule-Based Fix Method:** Suggest adding keyboard or tap-based alternatives if none are detected.
- **Rule-Based Fix Fail Reason:** Cannot determine whether a dragging operation is essential without understanding functional and contextual design.
- **LLM Fix Acceptable:** Yes

### 2.5.8
- **Rule Number:** 2.5.8
- **Rule Name:** Target Size (Minimum)
- **Conformance Level:** AA
- **Rule-Based Check:** Partial
- **Rule-Based Check Method:** Tools can measure element dimensions and spacing to verify if targets meet or exceed 24x24 CSS pixels and check for spacing to avoid overlap of 24px circles.
- **Rule-Based Check Partial:** Target size and proximity of targets can be checked programmatically.
- **Rule-Based Check Fail Parts:** Cannot determine if exceptions like "Essential", "Equivalent", or "User agent control" apply without human judgment.
- **Rule-Based Fix:** Partial
- **Rule-Based Fix Method:** Suggest increasing the size of small targets or spacing them out, unless they fall under an exception.
- **Rule-Based Fix Fail Reason:** Cannot suggest fixes that account for essential presentation, legal constraints, or equivalent controls without context.
- **LLM Fix Acceptable:** Yes

### 3.1.1

- Rule Number:- 3.1.1
- Rule Name:- Language of Page
- Conformance Level:- A
- Rule-Based Check:- True
- Rule-Based Check Method:- Check if the <html> element contains a lang attribute and validate it against recognized BCP 47 language codes (e.g., en, fr, es).
- Rule-Based Fix:- True
- Rule-Based Fix Method:- Use language detection on the document's visible text to determine the dominant language and insert or correct the lang attribute.
- LLM Fix Acceptable:- True

---

### 3.1.2

- Rule Number:- 3.1.2
- Rule Name:- Language of Parts
- Conformance Level:- AA
- Rule-Based Check:- True
- Rule-Based Check Method:- Search for text nodes that differ from the primary document language and check if they have a valid lang attribute.
- Rule-Based Check Partial:- Detect presence of lang attributes and identify common language mismatches using dictionary or statistical models.
- Rule-Based Check Fail Parts:- Determining the actual language of mixed-language phrases or idiomatic expressions with high accuracy.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Automatically determining the correct language for inline content is context-sensitive and may require cultural or idiomatic understanding.
- LLM Fix Acceptable:- True

---

### 3.1.3

- Rule Number:- 3.1.3
- Rule Name:- Unusual Words
- Conformance Level:- AAA
- Rule-Based Check:- False
- Rule-Based Check Fail Reason:- Determining whether a word is unusual, jargon, idiomatic, or requires explanation depends heavily on context and user familiarity.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Explaining unusual words requires understanding the intended meaning, context, and audience — which cannot be reliably done without human input.
- LLM Fix Acceptable:- True

---

### 3.1.4

- Rule Number:- 3.1.4
- Rule Name:- Abbreviations
- Conformance Level:- AAA
- Rule-Based Check:- False
- Rule-Based Check Fail Reason:- Identifying all abbreviations and determining whether they are explained depends on domain-specific knowledge and user context.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Expanding abbreviations accurately requires understanding their meaning in context, which is often ambiguous or specialized.
- LLM Fix Acceptable:- True

---

### 3.1.5

- Rule Number:- 3.1.5
- Rule Name:- Reading Level
- Conformance Level:- AAA
- Rule-Based Check:- True
- Rule-Based Check Method:- Use readability formulas (e.g., Flesch-Kincaid, Gunning Fog Index) to estimate the education level required to understand the content.
- Rule-Based Check Partial:- Estimating average reading level using standard formulas.
- Rule-Based Check Fail Parts:- Determining whether supplemental content is provided for complex passages or whether simpler alternatives are meaningful and equivalent.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Simplifying content while preserving original meaning and tone requires nuanced understanding and rewriting that can't be reliably automated.
- LLM Fix Acceptable:- True

---

### 3.1.6

- Rule Number:- 3.1.6
- Rule Name:- Pronunciation
- Conformance Level:- AAA
- Rule-Based Check:- False
- Rule-Based Check Fail Reason:- Determining if pronunciation is needed for understanding relies on human interpretation of context, audience, and ambiguity in spoken forms.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Providing pronunciation guidance (e.g., phonetic spelling or audio) requires understanding which terms may be misread, which is highly context-dependent.
- LLM Fix Acceptable:- True

---

### 3.2.1

- Rule Number:- 3.2.1
- Rule Name:- On Focus
- Conformance Level:- A
- Rule-Based Check:- True
- Rule-Based Check Method:- Detect event listeners (e.g., onfocus, focusin) that trigger changes to context, such as navigation, modal opening, or dynamic content updates.
- Rule-Based Check Partial:- Identification of elements that alter DOM, route, or visibility on focus.
- Rule-Based Check Fail Parts:- Determining if the context change is unexpected or confusing for users depends on user intent and design purpose.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Automatically preventing all context changes on focus may break intended functionality or user flow; requires design-specific intent to resolve correctly.
- LLM Fix Acceptable:- True

---

### 3.2.2

- Rule Number:- 3.2.2
- Rule Name:- On Input
- Conformance Level:- A
- Rule-Based Check:- True
- Rule-Based Check Method:- Detect if input events (e.g., onchange, oninput, onclick) cause a change of context — like auto-submitting a form, redirecting, or replacing large DOM areas.
- Rule-Based Check Partial:- Detection of handlers that invoke navigation or major DOM changes as a result of input value changes.
- Rule-Based Check Fail Parts:- Determining whether the context change is user-expected or disruptive depends on the design and task flow, which may require human judgment.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Preventing all context changes on input could interfere with intended UX flows; fix needs to be tailored based on form logic and purpose.
- LLM Fix Acceptable:- True

---

### 3.2.3

- Rule Number:- 3.2.3
- Rule Name:- Consistent Navigation
- Conformance Level:- AA
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Detection of repeated navigation components (e.g., headers, menus) and their structure/position across pages using DOM comparison.
- Rule-Based Check Fail Parts:- Determining whether the order and position are functionally consistent across all instances requires understanding of layout and visual structure.
- Rule-Based Check Fail Reason:- Consistency in navigation is partially visual and contextual, making full validation difficult with only code analysis.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Automatically enforcing consistent navigation order may alter intended UX or design, and requires understanding site-wide design principles.
- LLM Fix Acceptable:- True

---

### 3.2.4

- Rule Number:- 3.2.4
- Rule Name:- Consistent Identification
- Conformance Level:- AA
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Detection of repeated elements (e.g., buttons, links, icons) with identical roles or purposes across pages using semantic or ARIA role comparison.
- Rule-Based Check Fail Parts:- Verifying whether labels, alt texts, or roles are consistent in meaning requires understanding of user intent and domain-specific use cases.
- Rule-Based Check Fail Reason:- Full semantic consistency depends on human interpretation of purpose and cannot always be verified through structural or code-based checks.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Automatically standardizing naming or roles across components risks altering intended meaning or use in varying contexts.
- LLM Fix Acceptable:- True

---

### 3.2.5

- Rule Number:- 3.2.5
- Rule Name:- Change on Request
- Conformance Level:- AAA
- Rule-Based Check:- False
- Rule-Based Check Fail Reason:- Determining whether changes to content or context only occur on explicit user request requires understanding user intent and interface behavior.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Implementing all changes strictly on user request often depends on complex interaction design that cannot be fully automated or generalized.
- LLM Fix Acceptable:- True

---

### 3.2.6

- Rule Number:- 3.2.6
- Rule Name:- Consistent Help
- Conformance Level:- A
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Detect presence of help mechanisms (e.g., tooltips, help links) across pages and consistency in their placement and labeling via DOM analysis.
- Rule-Based Check Fail Parts:- Evaluating whether help is consistent in content, tone, and usability requires human judgment and context understanding.
- Rule-Based Check Fail Reason:- Full validation depends on subjective content quality and contextual appropriateness beyond code structure.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Automatically ensuring help content is consistent and useful requires content rewriting and UX design, which cannot be fully automated.
- LLM Fix Acceptable:- True

---

### 3.3.1

- Rule Number:- 3.3.1
- Rule Name:- Error Identification
- Conformance Level:- A
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Detect if form inputs have associated error messages or ARIA attributes (e.g., aria-invalid, aria-describedby) upon invalid user input.
- Rule-Based Check Fail Parts:- Verifying if error messages are clear, specific, and correctly linked to the input depends on content quality and human judgment.
- Rule-Based Check Fail Reason:- The clarity and helpfulness of error identification require contextual and user-centered assessment beyond code inspection.
- Rule-Based Fix:- Partial
- Rule-Based Fix Method:- Suggest adding aria-invalid, linking error messages to inputs with aria-describedby, and displaying visible error messages near fields.
- Rule-Based Fix Fail Reason:- Crafting user-friendly, context-appropriate error messages requires subjective judgment and cannot be fully automated.
- LLM Fix Acceptable:- True

---

### 3.3.2

- Rule Number:- 3.3.2
- Rule Name:- Labels or Instructions
- Conformance Level:- A
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Detect presence of labels linked to form controls (using <label> or aria-label) and basic instructions near inputs in the DOM.
- Rule-Based Check Fail Parts:- Assessing if instructions are clear, sufficient, and appropriate for the input requires human judgment and content review.
- Rule-Based Check Fail Reason:- Instruction clarity and adequacy depend on language, context, and user needs, which cannot be fully validated by code inspection.
- Rule-Based Fix:- Partial
- Rule-Based Fix Method:- Suggest adding missing labels and associating them properly with inputs via for attribute or ARIA roles, and recommend adding instructions text.
- Rule-Based Fix Fail Reason:- Generating clear, user-appropriate instructions requires subjective content creation beyond rule-based automation.
- LLM Fix Acceptable:- True

---

### 3.3.3

- Rule Number:- 3.3.3
- Rule Name:- Error Suggestion
- Conformance Level:- AA
- Rule-Based Check:- False
- Rule-Based Check Fail Reason:- Providing meaningful error suggestions involves understanding user input errors, context, and likely corrections, which is complex and context-dependent.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Suggesting appropriate corrections or alternatives to errors requires semantic understanding and UX design, which cannot be automated reliably.
- LLM Fix Acceptable:- True

---

### 3.3.4

- Rule Number:- 3.3.4
- Rule Name:- Error Prevention (Legal, Financial, Data)
- Conformance Level:- AAA
- Rule-Based Check:- False
- Rule-Based Check Fail Reason:- Ensuring error prevention mechanisms (e.g., confirmations, reversible actions) for sensitive transactions requires design-specific implementation and user flow analysis.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Automatically enforcing error prevention steps requires complex UX design and domain knowledge beyond static code analysis.
- LLM Fix Acceptable:- True

---

### 3.3.5

- rule_number: 3.3.5
- rule_name: Help
- conformance_level: AAA
- rule_based_check: partial
- rule_based_check_partial: Detect presence of help or support mechanisms (e.g., help links, FAQs, tooltips) through DOM inspection and presence of standard attributes or patterns.
- rule_based_check_fail_parts: Evaluating adequacy, clarity, and accessibility of help content requires subjective human judgment and context understanding.
- rule_based_check_fail_reason: Help quality and relevance depend on content and user needs, which cannot be fully validated by automated code analysis.
- rule_based_fix: false
- rule_based_fix_fail_reason: Automatically generating or improving help content requires content authoring and UX design that cannot be fully automated.
- llm_fix_acceptable: true

---

### 3.3.6

- rule_number: 3.3.6
- rule_name: Error Prevention (All)
- conformance_level: AAA
- rule_based_check: false
- rule_based_check_fail_reason: Verifying comprehensive error prevention for all submissions requires understanding complex user workflows and contextual risk beyond static analysis.
- rule_based_fix: false
- rule_based_fix_fail_reason: Implementing thorough error prevention depends on domain-specific logic, user interaction design, and business rules that cannot be fully automated.
- llm_fix_acceptable: true

---

### 3.3.7

- rule_number: 3.3.7
- rule_name: Redundant Entry
- conformance_level: A
- rule_based_check: partial
- rule_based_check_partial: Detect duplicate form submissions or repeated input fields by analyzing form structure, IDs, and submission events.
- rule_based_check_fail_parts: Determining true redundancy from user intent and context requires human judgment beyond code analysis.
- rule_based_check_fail_reason: User context and intent in data entry cannot be fully captured by automated rules.
- rule_based_fix: partial
- rule_based_fix_method: Suggest disabling or hiding repeated form elements or preventing multiple identical submissions using scripting or form attributes.
- rule_based_fix_fail_reason: Handling all cases of redundancy needs contextual understanding of workflows and user behavior that can't be fully automated.
- llm_fix_acceptable: true

---

### 3.3.8

- rule_number: 3.3.8
- rule_name: Accessible Authentication (Minimum)
- conformance_level: AA
- rule_based_check: partial
- rule_based_check_partial: Detect presence of accessible authentication methods, such as alternative login options and user feedback on errors, through UI and ARIA attributes analysis.
- rule_based_check_fail_parts: Assessing whether authentication meets minimum accessibility for all users requires user context and experience evaluation beyond code analysis.
- rule_based_check_fail_reason: Accessibility of authentication workflows depends on usability and context that cannot be fully verified via automated methods.
- rule_based_fix: partial
- rule_based_fix_method: Suggest adding alternative authentication methods and clear instructions based on detected issues in form fields and error messages.
- rule_based_fix_fail_reason: Designing accessible authentication flows requires UX and content decisions that cannot be fully automated.
- llm_fix_acceptable: true

---

### 3.3.9

- rule_number: 3.3.9
- rule_name: Accessible Authentication (Enhanced)
- conformance_level: AAA
- rule_based_check: false
- rule_based_check_fail_reason: Evaluating enhanced authentication accessibility requires understanding of complex user needs and advanced context, which cannot be done via rule-based checks.
- rule_based_fix: false
- rule_based_fix_fail_reason: Implementing enhanced accessible authentication involves subjective design decisions and user testing that cannot be automated.
- llm_fix_acceptable: true

### 4.1.1

- Rule Number:- 4.1.1
- Rule Name:- Parsing
- Conformance Level:- A
- Rule-Based Check:- True
- Rule-Based Check Method:- Validate that the document is well-formed and parses without errors using HTML/XML parsers.
- Rule-Based Fix:- True
- Rule-Based Fix Method:- Correct common markup errors like unclosed tags, improperly nested elements, and invalid attribute usage.
- LLM Fix Acceptable:- True

---

### 4.1.2

- Rule Number:- 4.1.2
- Rule Name:- Name, Role, Value
- Conformance Level:- A
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Check presence of accessible names and roles for UI components and whether current values reflect their state.
- Rule-Based Check Fail Parts:- Verifying the semantic correctness of roles and whether values dynamically update appropriately can require runtime context.
- Rule-Based Fix:- Partial
- Rule-Based Fix Method:- Add missing ARIA roles, labels, and ensure properties like aria-valuenow reflect the current state.
- LLM Fix Acceptable:- True

---

### 4.1.3

- Rule Number:- 4.1.3
- Rule Name:- Status Messages
- Conformance Level:- AA
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Detect use of ARIA live regions (e.g., aria-live="polite") to announce dynamic content changes.
- Rule-Based Check Fail Parts:- Determining if status messages provide meaningful, timely, and relevant updates to users needs contextual understanding.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Crafting useful status messages requires understanding the user workflow and content semantics, which is context-dependent.
- LLM Fix Acceptable:- True

---

### 4.1.4

- Rule Number:- 4.1.4
- Rule Name:- Link Purpose (In Context)
- Conformance Level:- A
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Analyze link text to check if it is descriptive when read in context (e.g., avoid “click here”).
- Rule-Based Check Fail Parts:- Determining if the link text is meaningful in context can be difficult without understanding the surrounding content fully.
- Rule-Based Fix:- Partial
- Rule-Based Fix Method:- Suggest replacing generic link text with descriptive phrases or adding aria-label attributes.
- LLM Fix Acceptable:- True

---

### 4.1.5

- Rule Number:- 4.1.5
- Rule Name:- Multiple Ways
- Conformance Level:- AA
- Rule-Based Check:- False
- Rule-Based Check Fail Reason:- Verifying the presence of multiple navigation mechanisms (e.g., search, site map, navigation menus) requires a holistic site-level analysis beyond single pages.
- Rule-Based Fix:- False
- Rule-Based Fix Fail Reason:- Adding multiple navigation ways requires design and site architecture changes that can’t be automated reliably.
- LLM Fix Acceptable:- True

---

### 4.1.6
- Rule Number:- 4.1.6
- Rule Name:- Headings and Labels
- Conformance Level:- A
- Rule-Based Check:- Partial
- Rule-Based Check Partial:- Detect presence of headings (<h1>-<h6>) and labels associated with form controls or interactive elements.
- Rule-Based Check Fail Parts:- Determining if headings and labels are meaningful and correctly structured in hierarchy requires content analysis.
- Rule-Based Fix:- Partial
- Rule-Based Fix Method:- Suggest adding missing headings and labels, and improving hierarchical structure of headings.
- LLM Fix Acceptable:- True
