import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    // Check if API key is available
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    console.log("API Key available:", !!apiKey);

    if (!apiKey) {
      return Response.json(
        {
          error: "API key is missing. Please check your environment variables.",
        },
        { status: 500 }
      );
    }

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);

    // List available models
    const models = await genAI.listModels();
    console.log("Available models:", models);

    // Try to use a simple model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Generate content
    const result = await model.generateContent("Hello, how are you?");
    const response = await result.response;
    const text = response.text();

    return Response.json({
      success: true,
      message: "Gemini API is working",
      response: text,
      models: models,
    });
  } catch (error) {
    console.error("Error testing Gemini API:", error);
    return Response.json(
      {
        error: "Failed to test Gemini API",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
