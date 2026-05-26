import Badge from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "default" | "success" | "dark";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  badge,
  badgeVariant = "dark",
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleColor = light ? "text-white" : "text-gray-900";
  const subtitleColor = light ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`flex flex-col gap-4 mb-12 ${alignClass}`}>
      {badge && (
        <Badge variant={badgeVariant}>
          <span className="inline-block w-2 h-2 rounded-full bg-current opacity-70" />
          {badge}
        </Badge>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
