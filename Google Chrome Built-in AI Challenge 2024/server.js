
import express from 'express';  
import cors from 'cors';       
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import pkg from '@google-cloud/translate';
const { Translate } = pkg;

const app = express();
const port = 3000; 

app.use(cors());
app.use(express.json());  

const genAI = new GoogleGenerativeAI(''); // enter your API key here
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-exp-0827" });

app.post("/rewrite", async (req, res) => {
  const { text } = req.body; 

  console.log("Received input:", text); 

  try {
    const result = await model.generateContent(`Rewrite this text in a more engaging way: ${text}`);
    
    res.json({ rewrittenText: result.response.text() });
    console.log("Expected Output:", result.response.text());
  } catch (error) {
    console.error("Error processing the AI request:", error);
    
    
    res.status(500).json({ error: "Error processing the text. Please try again later." });
  }
});
app.post("/summarize", async (req, res) => {
  const { text } = req.body; 

  console.log("Received input", text); 

  try {
    const result = await model.generateContent(`Summarize this text and make it short and simple words: ${text}`);
    

    res.json({ rewrittenText: result.response.text() });
    console.log("Expected Output:", result.response.text());
  } catch (error) {
 
    console.error("Error processing the AI request:", error);
    

    res.status(500).json({ error: "Error processing the text. Please try again later." });
  }
});
app.post("/translate", async (req, res) => {
  const { text, targetLanguage = 'en' } = req.body;  
  
  console.log("Received input:", text); 

  try {
    // Using Google Cloud Translate API for translation
    const [translation] = await translate.translate(text, 'en');
    
    // Send translated text as response
    res.json({ translatedText: translation });
    console.log("Google Cloud Translation Output:", translation);
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Error processing the text. Please try again later." });
  }
});

app.use(cors({
  origin: 'chrome-extension://<your-extension-id>', 
  methods: ['GET', 'POST'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
