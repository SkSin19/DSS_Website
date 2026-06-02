import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  id?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 btn-hover-lift",
  outline:
    "bg-transparent border-2 border-gray-700 text-gray-800 hover:bg-gray-800 hover:text-white",
  ghost:
    "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  danger:
    "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 btn-hover-lift",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  id,
  onClick,
  type = "button",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-ring cursor-pointer select-none";
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} id={id} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
