import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Furly Assistant, a friendly and knowledgeable pet care expert for the Furly platform.

Your job:
- Give practical pet-care advice for dogs, cats, and small pets
- Help users with feeding, grooming, exercise, hygiene, behavior, and daily routines
- Recommend when a user should contact a real vet for urgent or medical concerns
- Help users discover relevant Furly caretakers like groomers, walkers, trainers, sitters, and vets

Response style:
- Be warm, clear, and concise
- Give directly useful advice, not generic filler
- Prefer short paragraphs or small bullet lists when helpful
- If the issue sounds urgent, say so clearly and advise speaking to a licensed vet
- When relevant, mention healthy routines like water, food, exercise, rest, hygiene, and observation of symptoms`;

const NVIDIA_API_URL = "/api/chat";
const MODEL = "google/gemma-3n-e4b-it";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! 🐾 I'm Furly AI — your pet care companion. Ask me anything about pet care, grooming, training, or finding caretakers on Furly!" },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    const userText = input.trim();
    if (!userText || streaming) return;

    setInput("");
    const nextMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(nextMessages);
    setStreaming(true);

    const assistantPlaceholder: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantPlaceholder]);

    abortRef.current = new AbortController();

    try {
      const response = await fetch(NVIDIA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 512,
          temperature: 0.2,
          top_p: 0.7,
          frequency_penalty: 0,
          presence_penalty: 0,
          stream: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...nextMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (!response.ok || !response.body) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} ${errorText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") {
            setStreaming(false);
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content ?? parsed.choices?.[0]?.message?.content ?? "";
            accumulated += delta;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: accumulated };
              return updated;
            });
          } catch {
            // skip non-JSON SSE lines
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I couldn't connect right now. Please try again in a moment! 🐾",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleClose() {
    abortRef.current?.abort();
    setOpen(false);
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            aria-label="Open Furly AI chat"
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 50,
            }}
            className="rounded-full shadow-xl w-14 h-14 overflow-hidden border-2 border-white hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <video
              src="/curious%20dog.webm"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 50,
              width: "360px",
              maxHeight: "520px",
              display: "flex",
              flexDirection: "column",
            }}
            className="rounded-3xl shadow-2xl overflow-hidden bg-white border border-orange-100"
          >
            {/* Header */}
            <div className="furly-gradient px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Furly AI</p>
                  <p className="text-white/80 text-xs mt-0.5">Pet care assistant</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ maxHeight: "360px" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 items-end ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "assistant" ? "furly-gradient" : "bg-gray-200"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <User className="h-3.5 w-3.5 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-orange-500 text-white rounded-br-sm"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                    }`}
                  >
                    {msg.content || (
                      <span className="animate-pulse text-gray-400 text-xs">Thinking…</span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about pet care…"
                disabled={streaming}
                className="flex-1 rounded-xl border-gray-200 text-sm h-10 focus-visible:ring-orange-300"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || streaming}
                size="icon"
                className="furly-gradient text-primary-foreground border-0 rounded-xl h-10 w-10 shrink-0 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
