interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "dark";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-sky-100 text-sky-700 border border-sky-200",
  success:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",
  dark:
    "bg-gray-800 text-gray-200 border border-gray-700",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
