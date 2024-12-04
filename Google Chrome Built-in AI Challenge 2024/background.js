chrome.runtime.onInstalled.addListener(() => {
  console.log("AI Text Rewriter Extension installed.");
  

  chrome.contextMenus.create({
    id: "copyToChrome",
    title: "Copy to Clipboard",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.create({
    id: "Translate",
    title: "Translate",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.create({
    id: "Rewrite",
    title: "Rewrite",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.create({
    id: "summarize",
    title: "Summarize",
    contexts: ["selection"]
  });
});
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.selectionText) {
    const selectedText = info.selectionText;

    if (info.menuItemId === "copyToChrome") {
      const data = {
        text: selectedText,
        url: tab.url,
        timestamp: new Date().toISOString()
      };
      
      chrome.storage.local.get({ savedTexts: [] }, (result) => {
        const updatedTexts = [...result.savedTexts, data];
        chrome.storage.local.set({ savedTexts: updatedTexts });
      });
    }
  }
});
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.selectionText && info.menuItemId === "Rewrite") {
    const selectedText = info.selectionText;
    try {

      const response = await fetch("http://localhost:3000/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: selectedText })
      });

      const data = await response.json();

      if (response.ok) {

        chrome.runtime.sendMessage({
          action: "displayRewrittenText",
          rewrittenText: data.rewrittenText
        });
      } else {
        console.error("Backend error:", data.error);
        alert("Error: " + (data.error || "An unknown error occurred."));
      }
    } catch (error) {
      console.error("Network or other error:", error);
      alert("An error occurred while processing the text. Please try again.");
    }
  }
  else if (info.selectionText && info.menuItemId === "Translate") {
    const selectedText = info.selectionText;
    try {
      
      const response = await fetch("http://localhost:3000/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: selectedText })
      });

      const data = await response.json();

      if (response.ok) {
        
        chrome.runtime.sendMessage({
          action: "displayRewrittenText",
          rewrittenText: data.rewrittenText
        });
      } else {
        console.error("Backend error:", data.error);
        alert("Error: " + (data.error || "An unknown error occurred."));
      }
    } catch (error) {
      console.error("Network or other error:", error);
      alert("An error occurred while processing the text. Please try again.");
    }
  }
  else if (info.selectionText && info.menuItemId === "summarize") {
    const selectedText = info.selectionText;
    try {
     
      const response = await fetch("http://localhost:3000/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: selectedText })
      });

      const data = await response.json();

      if (response.ok) {
        
        chrome.runtime.sendMessage({
          action: "displayRewrittenText",
          rewrittenText: data.rewrittenText
        });
      } else {
        console.error("Backend error:", data.error);
        alert("Error: " + (data.error || "An unknown error occurred."));
      }
    } catch (error) {
      console.error("Network or other error:", error);
      alert("An error occurred while processing the text. Please try again.");
    }
  }
});
