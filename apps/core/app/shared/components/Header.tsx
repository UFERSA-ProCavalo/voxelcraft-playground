import { Link } from 'react-router-dom';
import { Button } from '../../features/playground/components/ui/button';
import { Card } from '../../features/playground/components/ui/card';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Playground', href: '/playground' },
  { label: 'Docs', href: '/docs' },
];

export function Header() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/">
          <img src="/logo-light.svg" alt="Voxelcraft Logo" className="h-8 w-auto" />
        </Link>
        <nav className="flex gap-2">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link to={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
