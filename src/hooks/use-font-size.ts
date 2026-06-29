import { useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';

export type FontSize = 'small' | 'medium' | 'large';

const fontSizes: Record<FontSize, string> = {
    small: '14px',
    medium: '16px',
    large: '18px',
};

export function useFontSize() {
  const [fontSize, setFontSize] = useLocalStorage<FontSize>('font-size', 'medium');

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.fontSize = fontSizes[fontSize];
  }, [fontSize]);

  return [fontSize, setFontSize] as const;
}
