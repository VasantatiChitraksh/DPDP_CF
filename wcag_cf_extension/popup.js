document.getElementById("runChecks").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/1_1_1_NonTextContent(A).js"]
  });
});
