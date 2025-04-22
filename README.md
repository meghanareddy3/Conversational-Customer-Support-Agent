

# 🧠 AI Customer Support Chatbot (Next.js)

This project is an **AI-powered customer support chatbot** built using **Next.js**. It simulates a conversational assistant for a fictional SaaS product, capable of answering product-related queries using a **custom knowledge base** and **LLM (Large Language Model)** integration. The chatbot reduces repetitive human support by intelligently handling frequently asked questions via an interactive web-based chat interface.

---

## ⚙️ Quick Start

Follow the steps below to set up and run the project locally:

```bash
# Step 1: Install project dependencies
npm install

# Step 2: Start the development server
npm run dev

# Step 3: Open the app in your browser
http://localhost:3000
```

---

## 🏗 System Architecture & Design Decisions

- **Frontend**: Built with **Next.js** and **React**, providing a responsive UI with a real-time chat interface.
- **Backend Integration**: Uses a Python-based backend (via file-based or API-based communication) to connect with a local LLM and process user queries.
- **Knowledge Base**: A structured Markdown file containing FAQs and product documentation, parsed and used for context-aware responses.
- **LLM Integration**: Utilizes a locally hosted **LLaMA 2 7B GGUF** model (or similar) to generate relevant answers based on user input and knowledge context.
- **File-based Messaging (if applicable)**: In minimal setups, `input.txt` and `response.txt` files are used for frontend-backend communication in place of a full web server framework.

---

## ✍️ Prompt Engineering Approach

- Prompts are crafted dynamically by combining:
  - User input
  - Relevant knowledge base content
  - System-level instructions to ensure concise and factual answers
- Techniques used:
  - **Context chunking**: Only the most relevant sections from the knowledge base are used to keep the prompt within token limits.
  - **Role definition**: The model is instructed to act like a SaaS product assistant.

---

## ⚠ Limitations & Future Improvements

### Current Limitations
- Limited to static knowledge base content (no real-time updates).
- Local model may have performance/memory limitations on low-end machines.
- Basic context retrieval (could be improved with vector search or embeddings).

### Future Improvements
- Integrate vector-based semantic search (e.g., using FAISS or ChromaDB).
- Add support for user authentication and chat history.
- Deploy via serverless functions or containerized services for scalability.
- Switch from file-based I/O to API-based communication with the backend.
