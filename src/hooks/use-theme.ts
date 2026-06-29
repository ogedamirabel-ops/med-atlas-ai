import { useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';

export type Theme = 'light' | 'dark' | 'sepia' | 'teal';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
