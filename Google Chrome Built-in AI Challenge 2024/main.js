document.getElementById("rewriteBtn").addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value;

  
  if (!inputText) {
    alert("Please enter some text to rewrite.");
    return;
  }

  try {
 
    const response = await fetch("http://localhost:3000/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: inputText })
    });

  
    const data = await response.json();
    console.log("Response from backend:", data);

   
    if (response.ok) {
      
      document.getElementById("outputText").innerText = data.rewrittenText;
    } else {
     
      console.error("Backend error:", data.error);
      alert("Error: " + (data.error || "An unknown error occurred."));
    }
  } catch (error) {
    
    console.error("Network or other error:", error);
    alert("An error occurred while processing the text. Please try again.");
  }
});
document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value;

  
  if (!inputText) {
    alert("Please enter some text to summarize.");
    return;
  }

  try {
    
    const response = await fetch("http://localhost:3000/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: inputText })
    });

   
    const data = await response.json();
    console.log("Response from backend:", data);

   
    if (response.ok) {
     
      document.getElementById("outputText").innerText = data.rewrittenText;
    } else {
      
      console.error("Backend error:", data.error);
      alert("Error: " + (data.error || "An unknown error occurred."));
    }
  } catch (error) {
    
    console.error("Network or other error:", error);
    alert("An error occurred while processing the text. Please try again.");
  }
});
document.getElementById("translateBtn").addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value;

 
  if (!inputText) {
    alert("Please enter some text to translate to english.");
    return;
  }

  try {
    
    const response = await fetch("http://localhost:3000/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: inputText })
    });

    
    const data = await response.json();
    console.log("Response from backend:", data);

   
    if (response.ok) {
     
      document.getElementById("outputText").innerText = data.rewrittenText;
    } else {
      
      console.error("Backend error:", data.error);
      alert("Error: " + (data.error || "An unknown error occurred."));
    }
  } catch (error) {
    console.error("Network or other error:", error);
    alert("An error occurred while processing the text. Please try again.");
  }
});
