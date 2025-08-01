import { Link } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ModeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Playground", href: "/playground" },
];

export function Header() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/">
          <img
            src="/voxelcraft-logo2.png"
            alt="Voxelcraft Logo"
            className="h-32 w-auto dark:invert-100"
          />
        </Link>
        <nav className="flex gap-2 items-center">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link to={item.href}>{item.label}</Link>
            </Button>
          ))}
          {/* Alternância de modo escuro */}
          <ModeToggle />
        </nav>
      </div>{" "}
    </header>
  );
}
