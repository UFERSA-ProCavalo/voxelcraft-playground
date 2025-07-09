import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import type * as React from "react";

export const NavigationMenuLink = BaseNavigationMenu.Link;


interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

interface NavigationMenuProps {
  items: NavItem[];
  renderLink?: (props: { href: string; children: React.ReactNode }) => React.ReactNode;
}

export function NavigationMenu({ items, renderLink }: NavigationMenuProps) {
  return (
    <BaseNavigationMenu.Root>
      <BaseNavigationMenu.List>
        {items.map(item => (
          <BaseNavigationMenu.Item key={item.label}>
            {item.children ? (
              <BaseNavigationMenu.Trigger>{item.label}</BaseNavigationMenu.Trigger>
            ) : item.href ? (
              renderLink ? (
                renderLink({ href: item.href, children: item.label })
              ) : (
                <BaseNavigationMenu.Link href={item.href}>{item.label}</BaseNavigationMenu.Link>
              )
            ) : (
              <span>{item.label}</span>
            )}
            {item.children && (
              <BaseNavigationMenu.Content>
                <ul>
                  {item.children.map(child => (
                    <li key={child.label}>
                      {child.href ? (
                        renderLink ? (
                          renderLink({ href: child.href, children: child.label })
                        ) : (
                          <BaseNavigationMenu.Link href={child.href}>{child.label}</BaseNavigationMenu.Link>
                        )
                      ) : (
                        <span>{child.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </BaseNavigationMenu.Content>
            )}
          </BaseNavigationMenu.Item>
        ))}
      </BaseNavigationMenu.List>
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner>
          <BaseNavigationMenu.Popup>
            <BaseNavigationMenu.Arrow />
            <BaseNavigationMenu.Viewport />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}
