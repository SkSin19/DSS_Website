"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUp, CalendarCheck, Loader2, RotateCcw, Sparkles, X } from "lucide-react";
import {
  OPEN_CHAT_EVENT,
  sendChatMessage,
  type ChatMessage,
  type OpenChatDetail,
} from "@/lib/chat-api";
import { trackEvent } from "@/lib/analytics";
import { SITE_WHATSAPP_URL } from "@/lib/constants";

const STORAGE_KEY = "dss_chat_v1";
const MAX_INPUT = 500;

const GREETING =
  "Hi! I'm the Digital Security Solutions assistant. Ask me about CCTV cameras, access control, biometric attendance, alarms, installation or AMC, and I'll help you find the right setup.";

const SUGGESTIONS = [
  "Which CCTV camera is best for my home?",
  "Do you repair existing CCTV systems?",
  "How many cameras does a society need?",
  "Which areas do you serve?",
];

const loadMessages = (): ChatMessage[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

/* ── Minimal, safe formatting for replies: **bold**, [label](/path), "- " bullets ── */

const renderInline = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g).map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return (
          <Link key={i} href={href} className="font-semibold text-red-600! underline! underline-offset-2">
            {label}
          </Link>
        );
      }
      if (href.startsWith("https://")) {
        return (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-red-600! underline! underline-offset-2">
            {label}
          </a>
        );
      }
      return label;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });

function FormattedText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-1 list-disc space-y-0.5 pl-5">
        {bullets.map((b, i) => <li key={i}>{renderInline(b)}</li>)}
      </ul>,
    );
    bullets = [];
  };
  for (const line of text.split("\n")) {
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    if (bullet) {
      bullets.push(bullet[1]);
    } else {
      flush();
      if (line.trim()) blocks.push(<p key={`p-${blocks.length}`}>{renderInline(line)}</p>);
    }
  }
  flush();
  return <div className="space-y-1.5">{blocks}</div>;
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesRef = useRef(messages);
  const loadingRef = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the conversation for this browser tab.
  useEffect(() => {
    messagesRef.current = messages;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* storage unavailable */
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = useCallback(async (raw: string) => {
    const text = raw.trim().slice(0, MAX_INPUT);
    if (!text || loadingRef.current) return;

    const next: ChatMessage[] = [...messagesRef.current, { role: "user", text }];
    messagesRef.current = next;
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    loadingRef.current = true;
    trackEvent("chat_message", { location: window.location.pathname });

    try {
      const { reply, sources } = await sendChatMessage(next, `${document.title} (${window.location.pathname})`);
      setMessages((prev) => [...prev, { role: "assistant", text: reply, sources }]);
    } catch (err: unknown) {
      const apiMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(apiMessage || "Couldn't reach the assistant. Please try again, or WhatsApp us.");
      // Put the unanswered question back in the box so a retry doesn't duplicate it.
      setMessages((prev) => prev.slice(0, -1));
      setInput(text);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  // Open requests from anywhere on the site (navbar, product pages, …).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const { prompt, send: autoSend } = (e as CustomEvent<OpenChatDetail>).detail ?? {};
      setOpen(true);
      trackEvent("chat_open", { location: window.location.pathname });
      if (prompt && autoSend) void send(prompt);
      else if (prompt) setInput(prompt);
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [send]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const openPanel = () => {
    setOpen(true);
    trackEvent("chat_open", { location: window.location.pathname });
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const resetChat = () => {
    setMessages([]);
    setError("");
  };

  return (
    <>
      {/* ── Launcher ── */}
      {!open && (
        <button
          type="button"
          onClick={openPanel}
          aria-label="Open AI support assistant"
          className="fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_8px_24px_rgba(220,38,38,0.35)] transition-transform hover:bg-red-700 active:scale-95 md:right-6 md:bottom-6 md:h-auto md:w-auto md:gap-2 md:px-5 md:py-3.5"
        >
          <Sparkles className="h-6 w-6 md:h-5 md:w-5" aria-hidden="true" />
          <span className="hidden text-sm font-semibold md:inline">Ask AI Assistant</span>
        </button>
      )}

      {/* ── Panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="AI support assistant"
          className="fixed inset-0 z-[60] flex flex-col bg-white font-poppins md:inset-auto md:right-6 md:bottom-6 md:h-[min(620px,calc(100vh-3rem))] md:w-[390px] md:overflow-hidden md:rounded-2xl md:border md:border-gray-200 md:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-red-600 px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))] text-white md:pt-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">DSS AI Assistant</p>
              <p className="text-[11px] text-white/80">Answers from our products, services &amp; guides</p>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={resetChat}
                aria-label="Start a new conversation"
                title="New conversation"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-4 py-4 text-[14px] leading-relaxed" aria-live="polite">
            <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-gray-800 shadow-sm">
              {GREETING}
            </div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-red-200 bg-white px-3 py-1.5 text-left text-[13px] text-red-700 transition-colors hover:bg-red-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-red-600 px-3.5 py-2.5 text-white">
                  {m.text}
                </div>
              ) : (
                <div key={i} className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-gray-800 shadow-sm">
                  <FormattedText text={m.text} />
                  {m.sources?.length ? (
                    <div className="mt-2 border-t border-gray-100 pt-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Related</p>
                      <ul className="mt-1 space-y-0.5">
                        {m.sources.map((s) => (
                          <li key={s.url}>
                            <Link href={s.url} className="text-[13px] text-red-600! hover:underline!">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ),
            )}

            {loading && (
              <div className="inline-flex items-center gap-2 rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-gray-500 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Thinking…
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Human hand-off */}
          <div className="flex gap-2 border-t border-gray-200 bg-white px-3 pt-2.5">
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-[13px] font-semibold text-white!"
            >
              WhatsApp an expert
            </a>
            <Link
              href="/enquiry#contact-form"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-600 px-3 py-2 text-[13px] font-semibold text-red-600!"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Free site survey
            </Link>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="bg-white px-3 pt-2.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
          >
            <div className="flex items-end gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
              <label htmlFor="chat-assistant-input" className="sr-only">Your question</label>
              <textarea
                id="chat-assistant-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_INPUT}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                placeholder="Ask about cameras, installation, AMC…"
                className="max-h-28 flex-1 resize-none bg-transparent py-1 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700 disabled:opacity-40"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10.5px] text-gray-400">
              AI answers can be wrong. Confirm prices and details with our team.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
