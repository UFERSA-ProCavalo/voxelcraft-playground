import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'forest' | 'ocean';
type Scheme = 'light' | 'dark' | 'high-contrast';

interface ThemeContextType {
  theme: Theme;
  scheme: Scheme;
  setTheme: (t: Theme) => void;
  setScheme: (s: Scheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');
  const [scheme, setScheme] = useState<Scheme>('light');

  useEffect(() => {
    document.documentElement.classList.remove(
      ...Array.from(document.documentElement.classList).filter(
        (c) => c.startsWith('theme-') || c.startsWith('scheme-')
      )
    );
    document.documentElement.classList.add(`theme-${theme}`, `scheme-${scheme}`);
  }, [theme, scheme]);

  return (
    <ThemeContext.Provider value={{ theme, scheme, setTheme, setScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
