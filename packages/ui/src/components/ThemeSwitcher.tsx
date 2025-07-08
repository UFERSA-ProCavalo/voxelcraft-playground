import { useTheme } from '../hooks/useThemeProvider';

export function ThemeSwitcher() {
  const { theme, scheme, setTheme, setScheme } = useTheme();

  return (
    <div className="flex gap-4">
      <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
        <option value="default">Default</option>
        <option value="forest">Forest</option>
        <option value="ocean">Ocean</option>
      </select>

      <select value={scheme} onChange={(e) => setScheme(e.target.value as any)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="high-contrast">High Contrast</option>
      </select>
    </div>
  );
}
