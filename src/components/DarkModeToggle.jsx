import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Detecta la preferencia del sistema operativo
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Aplica el tema guardado o el del sistema
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light'); // Asegura que "light" se guarde si no hay preferencia y el sistema es claro
      setIsDarkMode(false);
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  const toggleDarkMode = () => {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      style={{ // Estilos inline usando variables CSS para que el botón también cambie de tema
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
      className="dark-mode-toggle-button" // Puedes agregar una clase para estilos adicionales en CSS si lo necesitas
    >
      {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
};

export default DarkModeToggle;