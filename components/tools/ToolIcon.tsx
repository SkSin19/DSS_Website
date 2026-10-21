import { Calculator, Columns3 } from "lucide-react";
import type { Tool } from "@/lib/tools";

export default function ToolIcon({ icon, className }: { icon: Tool["icon"]; className?: string }) {
  const Icon = icon === "calculator" ? Calculator : Columns3;
  return <Icon className={className} aria-hidden="true" />;
}
