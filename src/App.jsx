import { useState, useMemo } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Modal from './components/Modal'
import SearchBar from './components/SearchBar'

function App() {
  /***************************************
   * ESTADO PARA EL MODAL
   ***************************************/
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);
  
  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  /***************************************
   * ESTADO DE BÚSQUEDA
   ***************************************/
  // Estado para almacenar el término de búsqueda actual
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Función que maneja la actualización del término de búsqueda
   * @param {string} term - El término de búsqueda ingresado por el usuario
   */
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  /***************************************
   * ESTADO INICIAL DE PRODUCTOS
   ***************************************/
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Set De Herramientas Mecánicas Stanley 97-543 - 150 Piezas',
      descripcion: 'Set de herramientas Stanley con 150 piezas, incluye llaves, destornilladores y más',
      precioUnitario: 259000,
      descuento: 42,
      precioConDescuento: 150000, // 259000 * (1 - 42/100)
      category: 'STANLEY',
      stock: 8,
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_685251-MLA53885564900_022023-O.webp',
      freeShipping: true
    },
    {
      id: 2,
      name: 'Laptop HP',
      descripcion: 'Laptop HP con procesador Intel Core i5, 8GB RAM, 512GB SSD',
      precioUnitario: 120000,
      descuento: 10,
      precioConDescuento: 108000, // 120000 * (1 - 10/100)
      category: 'Electrónica',
      stock: 10,
      imageUrl: 'https://ar-media.hptiendaenlinea.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/1/_/1_2.jpg',
      freeShipping: true
    },
    {
      id: 3,
      name: 'Mouse inalámbrico',
      descripcion: 'Mouse inalámbrico ergonómico con 6 botones y batería recargable',
      precioUnitario: 5000,
      descuento: 5,
      precioConDescuento: 4750, // 5000 * (1 - 5/100)
      category: 'Accesorios',
      stock: 25,
      imageUrl: 'https://images.fravega.com/f500/6ee914b6ed6b30d8ae91a2157f367da0.jpg',
      freeShipping: true
    },
    {
      id: 4,
      name: 'Monitor 24"',
      descripcion: 'Monitor LED Full HD 24 pulgadas, 75Hz, panel IPS con conectividad HDMI y VGA',
      precioUnitario: 45000,
      descuento: 0,
      precioConDescuento: 45000, // 45000 * (1 - 0/100)
      category: 'Electrónica',
      stock: 5,
      imageUrl: 'https://fullh4rd.com.ar/img/productos/18/monitor-24-hikvision-dsd5024f2av2-fhd-100hz-vga-hdmi-0.jpg',
      freeShipping: false
    }
  ]);

  /***************************************
   * FILTRADO DE PRODUCTOS
   ***************************************/
  /**
   * Filtra los productos basados en el término de búsqueda
   * Usa useMemo para mejorar el rendimiento evitando filtrados innecesarios
   */
  const filteredProducts = useMemo(() => {
    // Si no hay término de búsqueda, devolver todos los productos
    if (!searchTerm.trim()) return products;
    
    // Convertir el término de búsqueda a minúsculas para una comparación insensible a mayúsculas/minúsculas
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    // Filtrar productos que coincidan con el término de búsqueda en nombre, descripción o categoría
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTermLower) ||
      product.descripcion.toLowerCase().includes(searchTermLower) ||
      (product.category && product.category.toLowerCase().includes(searchTermLower))
    );
  }, [products, searchTerm]);

  /***************************************
   * SISTEMA DE RETROALIMENTACIÓN
   ***************************************/
  // Estado para el mensaje de retroalimentación
  const [feedback, setFeedback] = useState({
    message: '',
    type: '', // 'success' o 'error'
    visible: false
  });

  // Función para mostrar retroalimentación
  const showFeedback = (message, type = 'success') => {
    setFeedback({
      message,
      type,
      visible: true
    });

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  /***************************************
   * GESTIÓN DE PRODUCTOS
   ***************************************/
  // Función para agregar un nuevo producto
  const addProduct = (newProduct) => {
    /* *
     * Asignar un ID único al producto nuevo
     * En una app real usaríamos una base de datos o UUID
     * */
    const productWithId = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      precioConDescuento: newProduct.precioUnitario * (1 - newProduct.descuento/100)
    };
    setProducts([...products, productWithId]);
    
    // Mostrar mensaje de éxito
    showFeedback(`Producto "${newProduct.name}" agregado correctamente`);
    
    // Cerrar el modal después de agregar
    closeModal();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Gestión de Productos</h1>
      
      {/* Mensaje de retroalimentación */}
      {feedback.visible && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
      
      {/* Barra de búsqueda y botón para agregar producto */}
      <div className="action-buttons">
        <SearchBar onSearch={handleSearch} />
        <button className="btn-add-product" onClick={openModal}>
          Agregar Nuevo Producto
        </button>
      </div>
      
      {/* Contenedor principal con filtros laterales */}
      <div className="main-layout">
        {/* Panel de filtros */}
        <aside className="filters-panel">
          <div className="filters-section">
            <h3 className="filters-title">Categorías</h3>
            <ul className="category-list">
              <li className="category-item">
                <label className="category-label">
                  <input type="checkbox" name="categoryStanley" className="category-checkbox" />
                  <span className="category-name">STANLEY</span>
                  <span className="category-count">(1)</span>
                </label>
              </li>
              <li className="category-item">
                <label className="category-label">
                  <input type="checkbox" name="categoryElectronica" className="category-checkbox" />
                  <span className="category-name">Electrónica</span>
                  <span className="category-count">(2)</span>
                </label>
              </li>
              <li className="category-item">
                <label className="category-label">
                  <input type="checkbox" name="categoryAccesorios" className="category-checkbox" />
                  <span className="category-name">Accesorios</span>
                  <span className="category-count">(1)</span>
                </label>
              </li>
            </ul>
          </div>
          
          <div className="filters-section">
            <h3 className="filters-title">Precio</h3>
            <div className="price-range-container">
              <input 
                type="range" 
                min="0" 
                max="300000" 
                className="price-range-slider" 
                aria-label="Rango de precio máximo" 
              />
              <div className="price-inputs">
                <div className="price-input-group">
                  <label htmlFor="minPrice">Mínimo</label>
                  <input type="number" id="minPrice" placeholder="$ Mínimo" className="price-input" />
                </div>
                <span className="price-separator">-</span>
                <div className="price-input-group">
                  <label htmlFor="maxPrice">Máximo</label>
                  <input type="number" id="maxPrice" placeholder="$ Máximo" className="price-input" />
                </div>
              </div>
              <button type="button" className="btn-apply-price">Aplicar</button>
            </div>
          </div>
          
          <div className="filters-section">
            <h3 className="filters-title">Envío</h3>
            <label className="shipping-label">
              <input type="checkbox" name="freeShipping" className="shipping-checkbox" />
              <span className="shipping-text">Envío gratis</span>
            </label>
          </div>
          
          <div className="filters-section">
            <h3 className="filters-title">Descuentos</h3>
            <div className="discount-options">
              <label className="discount-label">
                <input type="radio" name="discount" value="all" className="discount-radio" defaultChecked />
                <span className="discount-text">Todos los productos</span>
              </label>
              <label className="discount-label">
                <input type="radio" name="discount" value="withDiscount" className="discount-radio" />
                <span className="discount-text">Con descuento</span>
              </label>
            </div>
          </div>
          
          <button type="button" className="btn-clear-filters">Limpiar filtros</button>
        </aside>
        
        {/* Contenido principal */}
        <div className="content-container">
          {/* Mostrar productos filtrados en lugar de todos los productos */}
          <ProductList products={filteredProducts} />
          
          {/* Mostrar información sobre los resultados de búsqueda */}
          {searchTerm.trim() && (
            <div className="search-results-info">
              {filteredProducts.length === 0 ? (
                <p>No se encontraron productos para "{searchTerm}"</p>
              ) : (
                <p>Se encontraron {filteredProducts.length} productos para "{searchTerm}"</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Modal con formulario */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Agregar Nuevo Producto"
      >
        <ProductForm 
          onAddProduct={addProduct} 
          onCancel={closeModal} 
        />
      </Modal>
    </div>
  )
}

export default App
