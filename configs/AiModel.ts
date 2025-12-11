// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "AIzaSyAt39dcnmj9mlbesS0Ku5zRNZKRxQXaYO4" });

// const PROMPT = 'on the basis of description please give form in json format with formTitle, formSubheading, formFields fieldName, fieldType, fieldLabel, placeholder, required in json format give only json data no extra text.';

// const generateAi = async (userInput : string) => {
//   console.log(userInput)
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `Description: ${userInput}. ${PROMPT}`,
//   });
//   console.log('Description',userInput,PROMPT)
//   return (response.text);
// }

// export default generateAi;

import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the client with your API Key
const genAI = new GoogleGenerativeAI("");
// ^ Make sure your .env file has this key!

const PROMPT = 'on the basis of description please give form in json format with formTitle, formSubheading, formFields fieldName, fieldType, fieldLabel, placeholder, required in json format give only json data no extra text.';

const generateAi = async (userInput: string) => {
  try {
    // 2. Get the model instance
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Use a valid model name (1.5, not 2.5)
      generationConfig: {
        responseMimeType: "application/json", // Enforces JSON output
      }
    });

    const prompt = `Description: ${userInput}. ${PROMPT}`;

    // 3. Generate content
    const result = await model.generateContent(prompt);

    // 4. Return text string
    return result.response.text();

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

export default generateAi;