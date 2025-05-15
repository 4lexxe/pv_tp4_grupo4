import React, { useState } from 'react';

/**
 * Componente de barra de búsqueda que permite al usuario filtrar productos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onSearch - Función callback que recibe el término de búsqueda
 * @returns {JSX.Element} Componente de barra de búsqueda
 */
const SearchBar = ({ onSearch }) => {
  // Estado local para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Maneja el envío del formulario de búsqueda
   * @param {Event} e - Evento de formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviamos el término de búsqueda al componente padre
    onSearch(searchTerm);
    console.log('Búsqueda realizada:', searchTerm);
  };

  /**
   * Actualiza el estado local cuando cambia el input
   * @param {Event} e - Evento de cambio de input
   */
  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    // Opcional: Búsqueda en tiempo real mientras el usuario escribe
    onSearch(newSearchTerm);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Buscar productos, marcas y más..." 
        value={searchTerm}
        onChange={handleChange}
        aria-label="Buscar productos"
      />
      <button type="submit" className="search-button" aria-label="Realizar búsqueda">🔍</button>
    </form>
  );
};

export default SearchBar;