import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("Received message:", messages);

    const promptText = messages[0]?.content;
    if (!promptText) {
      console.warn("Empty message received.");
      return new Response("Invalid message format.", { status: 400 });
    }

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const requestBody = {
      contents: [
        {
          parts: [{ text: promptText }],
        },
      ],
    };

    console.log("Sending request to Gemini API with prompt:", promptText);

    const response = await axios.post(geminiEndpoint, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    const geminiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply generated.";

    console.log("Gemini API Response:", geminiReply);

    return new Response(JSON.stringify({ result: geminiReply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const axiosErr = err as axios.AxiosError;
    console.error("Gemini API Error:", axiosErr.message);

    if (axiosErr.response) {
      console.error("Error Response:", axiosErr.response.data);
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
