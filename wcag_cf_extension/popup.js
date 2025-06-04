document.getElementById("runChecks").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/1_1_1_NonTextContent(A).js","scripts/1_2_1_Audio_Video_Only_Prerecorded.js","scripts/1_2_2_Captions_Prerecorded.js"]
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/1_2_3_Audio_Description_Media_Alternative_Prerecorded.js"]
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/1_2_5_Audio_Description_Prerecorded.js"]
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/1_3_1_Info_Relationship.js","scripts/1_3_4_Orientation.js","scripts/1_3_5_Identify_Input_Purpose.js"]
  });
});
