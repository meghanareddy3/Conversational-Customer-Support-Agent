"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    console.log("Submitting message:", trimmedInput);


    const promptText = `
    You are an AI assistant for FlowPilot, a fictional SaaS workflow automation platform.
    
    About FlowPilot:
    - FlowPilot helps businesses automate repetitive tasks and workflows
    - Key features include visual workflow builder, integrations with 100+ apps, templates, and analytics
    - Pricing tiers: Free (basic), Pro ($29/mo), Business ($99/mo), Enterprise (custom)
    - Common use cases: customer onboarding, approval processes, data synchronization
    
    Be helpful, concise, and friendly. If you don't know something, admit it and suggest the user contact support.
    
    Here’s the user’s message:
    "${trimmedInput}"
    `;
    try {
      const { data } = await axios.post("/api/chat", {
        messages: [{ content: promptText }],
      });

      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.result || "No response from assistant.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error while fetching assistant reply:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="border rounded-lg shadow-sm">
        <div className="p-4 border-b bg-muted/50">
          <h1 className="text-xl font-semibold">FlowPilot Assistant</h1>
          <p className="text-sm text-muted-foreground">
            Ask me anything about FlowPilot's features, pricing, or how to get started.
          </p>
        </div>

        <div className="p-4 h-[60vh] overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              className="flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <div className="rounded-full bg-primary/10 p-4">
        <MessageSquare className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-semibold text-lg">Welcome to FlowPilot Chat</h3>
      <p className="text-muted-foreground max-w-md">
        I'm here to help you with any questions about our workflow automation platform.
      </p>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[80%] rounded-lg p-4", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        <div className="flex items-start gap-3">
          {!isUser && (
            <Avatar className="h-8 w-8 border">
              <div className="flex h-full w-full items-center justify-center bg-primary text-xs text-primary-foreground">
                FP
              </div>
            </Avatar>
          )}
          <div className="flex-1">
            <div className="mb-1 font-semibold">{isUser ? "You" : "FlowPilot Assistant"}</div>
            <div className="whitespace-pre-wrap">{message.content}</div>
            {!isUser && (
              <div className="mt-2 flex justify-end gap-2">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
