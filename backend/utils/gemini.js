import { GoogleGenerativeAI } from "@google/generative-ai";

const generateWithGemini = async (inputText) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    //model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    //prompt
    const prompt = `
      You are a senior software architect.

      A developer submitted this startup idea:
      "${inputText}"

      Generate a concise structured technical blueprint.

      IMPORTANT INSTRUCTIONS:
      - Respond ONLY with valid raw JSON.
      - Do NOT include markdown.
      - Do NOT wrap the response in markdown code blocks.
      - Do NOT include explanations before or after the JSON.
      - Ensure the output is strictly parseable by JSON.parse().
      - Keep the total response under 1000 words.

      Use the following exact structure:

      {
        "systemArchitecture": {
          "summary": "",
          "bullets": []
        },
        "backendStructure": {
          "summary": "",
          "bullets": []
        },
        "databaseSchema": {
          "summary": "",
          "bullets": []
        },
        "apiDesign": {
          "summary": "",
          "bullets": []
        },
        "folderStructure": {
          "summary": "",
          "bullets": []
        },
        "authenticationFlow": {
          "summary": "",
          "bullets": []
        },
        "devOpsPlan": {
          "summary": "",
          "bullets": []
        },
        "scalingStrategy": {
          "summary": "",
          "bullets": []
        },
        "securityBestPractices": {
          "summary": "",
          "bullets": []
        },
        "techStackRecommendation": {
          "summary": "",
          "bullets": []
        }
      }
    `;



//generate
const result = await model.generateContent(prompt);

//response
const response = result.response.text();

return response;

  } catch (error) {
    console.log(error);
    throw new Error("Gemini generation failed");
  }
};

export default generateWithGemini;
