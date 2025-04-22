import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function embedTextChunks(text: string) {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });

  const chunks = splitTextIntoChunks(text, 300);

  const embeddings = await Promise.all(
    chunks.map(async (chunk) => {
      const result = await model.embedContent({
        content: {
          role: "user",
          parts: [{ text: chunk }],
        },
      });

      return {
        embedding: result.embedding.values,
        text: chunk,
      };
    })
  );

  return embeddings;
}

function splitTextIntoChunks(text: string, maxWords = 300): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(" "));
  }

  return chunks;
}
