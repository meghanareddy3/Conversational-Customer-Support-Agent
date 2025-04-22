// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { embedTextChunks } from "../../lib/vector";

const STORAGE_DIR = path.resolve("./upload/storage");

export async function GET() {
  try {
    console.log("🟡 STORAGE_DIR:", STORAGE_DIR);

    // Lazy load pdf-parse to avoid test/demo file execution
    const pdfParse = (await import("pdf-parse")).default;

    const files = await readdir(STORAGE_DIR);
    console.log("📁 Files found in storage:", files);

    const pdfFiles = files.filter((file) => file.endsWith(".pdf"));
    console.log("📄 PDF files filtered:", pdfFiles);

    let allEmbeddings: any[] = [];

    for (const filename of pdfFiles) {
      try {
        const filePath = path.join(STORAGE_DIR, filename);
        console.log(`🔍 Processing file: ${filename} at path: ${filePath}`);

        const fileBuffer = await readFile(filePath);
        console.log(`✅ Read file: ${filename}, size: ${fileBuffer.length} bytes`);

        const parsed = await pdfParse(fileBuffer);
        console.log(`📜 Parsed PDF text length: ${parsed.text.length}`);

        const embeddings = await embedTextChunks(parsed.text);
        console.log(`🔢 Got ${embeddings.length} embeddings for: ${filename}`);

        allEmbeddings.push({
          filename,
          chunks: embeddings,
        });
      } catch (fileError) {
        console.error(`❌ Error processing file: ${filename}`, fileError);
      }
    }

    return NextResponse.json({
      message: `${allEmbeddings.length} PDF(s) processed successfully.`,
      data: allEmbeddings,
    });
  } catch (error) {
    console.error("❌ Error reading from storage or processing PDFs:", error);
    return NextResponse.json({ error: "Failed to read or process PDFs." }, { status: 500 });
  }
}
