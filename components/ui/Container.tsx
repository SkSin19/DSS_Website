/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

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
  return React.createElement(
    // Use React.createElement to avoid JSX typing issues when `Component` is dynamic
    Component as any,
    { id: id as any, className: `container-main ${className}` } as any,
    children
  );
}
