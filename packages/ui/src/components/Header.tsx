import * as React from "react";

interface HeaderProps {
  logo?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  variant?: "logo-left" | "logo-center" | "logo-right";
}

export function Header({
  logo,
  leftContent,
  rightContent,
  variant = "logo-left",
}: HeaderProps) {
  // Default logo if none provided
  const logoNode = logo || (
    <h1 className="text-2xl font-bold text-foreground">Voxelcraft Playground</h1>
  );

  // Layout logic
  let left = leftContent;
  let center = null;
  let right = rightContent;

  if (variant === "logo-left") {
    left = (
      <div className="flex items-center space-x-4">
        {logoNode}
        {leftContent}
      </div>
    );
    center = null;
    right = rightContent;
  } else if (variant === "logo-center") {
    center = logoNode;
  } else if (variant === "logo-right") {
    right = (
      <div className="flex items-center space-x-4">
        {rightContent}
        {logoNode}
      </div>
    );
    left = leftContent;
    center = null;
  }

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center min-w-0">{left}</div>
          {center && <div className="flex-1 flex justify-center">{center}</div>}
          <div className="flex items-center min-w-0">{right}</div>
        </div>
      </div>
    </header>
  );
}

