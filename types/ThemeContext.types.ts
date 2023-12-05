interface ThemeContext {
    isDarkMode: boolean,
    toggleMode: ()=>void;
    modeHandler: (mode: 'dark' | 'light') => void;
    theme: any
}