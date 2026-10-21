"use client";

import { Sparkles } from "lucide-react";
import { openChat } from "@/lib/chat-api";

type AskAiButtonProps = {
  label?: string;
  /** Question to start the conversation with. */
  prompt?: string;
  /** Send `prompt` immediately (true) or just pre-fill it (false). */
  send?: boolean;
  className?: string;
  /** Hide the sparkle icon. */
  plain?: boolean;
  onClick?: () => void;
};

/** Opens the AI support assistant. Usable from server components. */
export default function AskAiButton({
  label = "Ask AI Assistant",
  prompt,
  send = false,
  className = "",
  plain = false,
  onClick,
}: AskAiButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openChat({ prompt, send });
      }}
      className={className}
    >
      {!plain && <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />}
      {label}
    </button>
  );
}
