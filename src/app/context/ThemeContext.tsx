import { createContext, useContext, useEffect } from 'react';

/* Light-only brand theme toggle removed per brand guidelines v1.1 */
type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Always enforce light theme
    document.documentElement.classList.remove('dark');
    try { localStorage.setItem('ixbom-theme', 'light'); } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {}, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
