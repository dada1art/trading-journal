"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
}

export function IconButton({
  icon: Icon,
  onClick,
  label,
  className = "",
  size = "default",
  type = "button",
}: IconButtonProps) {
  return (
    <Button
      type={type}
      size={size}
      variant="outline"
      className={className}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}