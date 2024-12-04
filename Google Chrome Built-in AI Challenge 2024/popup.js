document.addEventListener("DOMContentLoaded", () => {
    const savedTextsContainer = document.getElementById("savedTexts");
  
    const renderSavedTexts = () => {
      chrome.storage.local.get({ savedTexts: [] }, (result) => {
        savedTextsContainer.innerHTML = "";
        result.savedTexts.forEach((item, index) => {
          const listItem = document.createElement("li");
          listItem.classList.add("text-item");
          listItem.innerHTML = `
            <p>${item.text}</p>
            <small>${item.url} - ${new Date(item.timestamp).toLocaleString()}</small>
            <button data-index="${index}" class="delete-btn">Delete</button>
          `;
          savedTextsContainer.appendChild(listItem);
        });
  
        document.querySelectorAll(".delete-btn").forEach((button) => {
          button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            chrome.storage.local.get({ savedTexts: [] }, (result) => {
              const updatedTexts = result.savedTexts.filter((_, i) => i !== parseInt(index));
              chrome.storage.local.set({ savedTexts: updatedTexts }, renderSavedTexts);
            });
          });
        });
      });
    };
  
    renderSavedTexts();
  });
  
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayRewrittenText") {
    const rewrittenText = message.rewrittenText;

    document.getElementById("outputText").innerText = rewrittenText;
  }
});