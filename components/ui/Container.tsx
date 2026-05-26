interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export default function Container({
  children,
  className = "",
  as: Component = "div",
  id,
}: ContainerProps) {
  return (
    <Component id={id} className={`container-main ${className}`}>
      {children}
    </Component>
  );
}
