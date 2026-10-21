import { apiPost } from "@/utils/api";

// ─── AI support assistant ──────────────────────────────────────────────────────

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  sources?: { title: string; url: string }[];
};

type ChatResponse = {
  reply: string;
  sources: { title: string; url: string }[];
};

/** Sends the conversation (latest message last) and returns the assistant's reply. */
export async function sendChatMessage(messages: ChatMessage[], page: string) {
  const { data } = await apiPost<ChatResponse>("/chat", {
    messages: messages.map(({ role, text }) => ({ role, text })),
    page,
  });
  return data;
}

// Any component can open the assistant (optionally with a question) by
// dispatching this event; ChatAssistant listens for it.
export const OPEN_CHAT_EVENT = "dss:open-chat";

export type OpenChatDetail = {
  /** Question to put in the assistant. */
  prompt?: string;
  /** Send `prompt` straight away instead of leaving it in the input box. */
  send?: boolean;
};

export function openChat(detail: OpenChatDetail = {}) {
  window.dispatchEvent(new CustomEvent<OpenChatDetail>(OPEN_CHAT_EVENT, { detail }));
}
