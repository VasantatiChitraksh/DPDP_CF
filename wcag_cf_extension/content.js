// Inject your custom WCAG scripts
function injectScript(file) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(file);
  script.onload = () => script.remove(); // clean after injection
  (document.head || document.documentElement).appendChild(script);
}

// Add any other rules here
// Example: injectScript("scripts/2_4_4_LinkPurposeInContext.js");
//-----
injectScript("scripts/1_1_1_NonTextContent(A).js");
injectScript("scripts/1_2_1_Audio_Video_Only_Prerecorded.js");
injectScript("scripts/1_2_2_Captions_Prerecorded.js");
injectScript("scripts/1_2_3_Audio_Description_Media_Alternative_Prerecorded.js");
injectScript("scripts/1_2_5_Audio_Description_Prerecorded.js");
injectScript("scripts/1_3_1_Info_Relationship.js");
injectScript("scripts/1_3_4_Orientation.js");
injectScript("scripts/1_3_5_Identify_Input_Purpose.js");
//-----