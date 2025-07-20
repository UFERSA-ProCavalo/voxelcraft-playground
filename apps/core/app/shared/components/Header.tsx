import {
  Header as UIHeader,
  ThemeSwitcher,
  NavigationMenu,
  NavigationMenuLink,
} from '@voxelcraft-playground/ui';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Playground', href: '/playground' },
  { label: 'Docs', href: '/docs' },
];

export function Header() {
  return (
    <UIHeader
      variant="logo-left"
      logo={<img src="/logo-light.svg" alt="Voxelcraft Logo" className="h-8 w-auto" />}
      leftContent={
        <NavigationMenu
          items={navItems}
          renderLink={({ href, children }) => (
            <NavigationMenuLink href={href} render={<Link to={href} />}>
              {children}
            </NavigationMenuLink>
          )}
        />
      }
      rightContent={<ThemeSwitcher />}
    />
  );
}
