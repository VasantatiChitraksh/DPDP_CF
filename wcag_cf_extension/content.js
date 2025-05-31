// Inject your custom WCAG scripts
function injectScript(file) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(file);
  script.onload = () => script.remove(); // clean after injection
  (document.head || document.documentElement).appendChild(script);
}

// Add any other rules here
injectScript("scripts/1_1_1_NonTextContent(A).js");
// Example: injectScript("scripts/2_4_4_LinkPurposeInContext.js");