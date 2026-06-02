interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "dark";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-red-50 text-red-700 border border-red-200",
  success:
    "bg-gray-100 text-gray-700 border border-gray-200",
  dark:
    "bg-gray-100 text-gray-800 border border-gray-200",
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
