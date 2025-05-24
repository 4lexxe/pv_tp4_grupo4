import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Prioriza el tema guardado por el usuario
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode'); // Asegura que no haya light-mode
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode'); // Añade light-mode si el usuario lo forzó
      setIsDarkMode(false);
    } else {
      // Si no hay tema guardado, usa la preferencia del sistema
      if (prefersDark) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        setIsDarkMode(true);
      } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode'); // Usa light-mode para claridad si el sistema es claro
        setIsDarkMode(false);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode'); // Forzamos el modo claro con la clase
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode'); // Removemos la clase de claro
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // ... (tu JSX del botón es el mismo)
  return (
    <button
      onClick={toggleDarkMode}
      style={{
        padding: '10px 20px',
        margin: '0',
        cursor: 'pointer',
        backgroundColor: isDarkMode ? 'var(--button-bg)' : 'var(--yellow-accent)',
        color: isDarkMode ? 'var(--text-primary)' : 'var(--text-on-yellow)',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '600',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s'
      }}
      className="dark-mode-toggle-button"
    >
      {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
};

export default DarkModeToggle;