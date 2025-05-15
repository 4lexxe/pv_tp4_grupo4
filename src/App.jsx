import { useState, useMemo, useEffect } from 'react'
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
   * ESTADO DE BÚSQUEDA Y FILTROS
   ***************************************/
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: '',
    sliderValue: 300000
  });
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [discountFilter, setDiscountFilter] = useState('all'); // 'all' o 'withDiscount'

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    const categoryName = name.replace('category', '');
    
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryName]);
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== categoryName));
    }
  };

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setPriceRange(prev => ({
      ...prev,
      sliderValue: parseInt(value, 10),
      max: value
    }));
  };

  const handlePriceInputChange = (e) => {
    const { id, value } = e.target;
    const numericValue = value === '' ? '' : parseInt(value, 10);
    
    if (id === 'minPrice') {
      setPriceRange(prev => ({ ...prev, min: numericValue }));
    } else if (id === 'maxPrice') {
      setPriceRange(prev => ({ ...prev, max: numericValue }));
    }
  };

  const applyPriceFilter = () => {
    console.log('Aplicando filtro de precio:', priceRange);
  };

  const handleFreeShippingChange = (e) => {
    setFreeShippingOnly(e.target.checked);
  };

  const handleDiscountFilterChange = (e) => {
    setDiscountFilter(e.target.value);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '', sliderValue: 300000 });
    setFreeShippingOnly(false);
    setDiscountFilter('all');
    setSearchTerm('');
  };

  /***************************************
   * CÁLCULO DE CATEGORÍAS ÚNICAS
   ***************************************/
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Set De Herramientas Mecánicas Stanley 97-543 - 150 Piezas',
      descripcion: 'Set de herramientas Stanley con 150 piezas, incluye llaves, destornilladores y más',
      precioUnitario: 259000,
      descuento: 42,
      precioConDescuento: 150000,
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
      precioConDescuento: 108000,
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
      precioConDescuento: 4750,
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
      precioConDescuento: 45000,
      category: 'Electrónica',
      stock: 5,
      imageUrl: 'https://fullh4rd.com.ar/img/productos/18/monitor-24-hikvision-dsd5024f2av2-fhd-100hz-vga-hdmi-0.jpg',
      freeShipping: false
    }
  ]);

  const uniqueCategories = useMemo(() => {
    const categories = {};
    products.forEach(product => {
      if (product.category) {
        categories[product.category] = (categories[product.category] || 0) + 1;
      }
    });
    return categories;
  }, [products]);

  /***************************************
   * FILTRADO DE PRODUCTOS
   ***************************************/
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearchTerm = !searchTerm.trim() || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase().trim()));
      
      if (!matchesSearchTerm) return false;
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(cat => 
          product.category && product.category.toLowerCase().includes(cat.toLowerCase())
        );
      
      if (!matchesCategory) return false;
      
      const price = product.descuento > 0 ? product.precioConDescuento : product.precioUnitario;
      const matchesMinPrice = priceRange.min === '' || price >= priceRange.min;
      const matchesMaxPrice = priceRange.max === '' || price <= priceRange.max;
      
      if (!matchesMinPrice || !matchesMaxPrice) return false;
      
      const matchesFreeShipping = !freeShippingOnly || product.freeShipping;
      
      if (!matchesFreeShipping) return false;
      
      const matchesDiscount = discountFilter === 'all' || 
        (discountFilter === 'withDiscount' && product.descuento > 0);
      
      return matchesDiscount;
    });
  }, [
    products, 
    searchTerm, 
    selectedCategories, 
    priceRange.min, 
    priceRange.max, 
    freeShippingOnly, 
    discountFilter
  ]);

  /***************************************
   * SISTEMA DE RETROALIMENTACIÓN
   ***************************************/
  const [feedback, setFeedback] = useState({
    message: '',
    type: '',
    visible: false
  });

  const showFeedback = (message, type = 'success') => {
    setFeedback({
      message,
      type,
      visible: true
    });

    setTimeout(() => {
      setFeedback(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  /***************************************
   * GESTIÓN DE PRODUCTOS
   ***************************************/
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      precioConDescuento: newProduct.precioUnitario * (1 - newProduct.descuento/100)
    };
    setProducts([...products, productWithId]);
    showFeedback(`Producto "${newProduct.name}" agregado correctamente`);
    closeModal();
  };

  useEffect(() => {
    const maxProductPrice = Math.max(...products.map(p => p.precioUnitario));
    setPriceRange(prev => ({
      ...prev,
      sliderValue: maxProductPrice > 0 ? maxProductPrice : 300000
    }));
  }, [products]);

  return (
    <div className="app-container">
      <h1 className="app-title">Gestión de Productos</h1>
      
      {feedback.visible && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
      
      <div className="action-buttons">
        <SearchBar onSearch={handleSearch} />
        <button className="btn-add-product" onClick={openModal}>
          Agregar Nuevo Producto
        </button>
      </div>
      
      <div className="main-layout">
        <aside className="filters-panel">
          <div className="filters-section">
            <h3 className="filters-title">Categorías</h3>
            <ul className="category-list">
              {Object.entries(uniqueCategories).map(([category, count]) => (
                <li key={category} className="category-item">
                  <label className="category-label">
                    <input 
                      type="checkbox" 
                      name={`category${category}`} 
                      className="category-checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    <span className="category-name">{category}</span>
                    <span className="category-count">({count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filters-section">
            <h3 className="filters-title">Precio</h3>
            <div className="price-range-container">
              <input 
                type="range" 
                min="0" 
                max={products.length > 0 ? Math.max(...products.map(p => p.precioUnitario)) : 300000} 
                value={priceRange.sliderValue}
                className="price-range-slider" 
                aria-label="Rango de precio máximo"
                onChange={handleSliderChange}
              />
              <div className="price-inputs">
                <div className="price-input-group">
                  <label htmlFor="minPrice">Mínimo</label>
                  <input 
                    type="number" 
                    id="minPrice" 
                    placeholder="$ Mínimo" 
                    className="price-input"
                    value={priceRange.min}
                    onChange={handlePriceInputChange}
                  />
                </div>
                <span className="price-separator">-</span>
                <div className="price-input-group">
                  <label htmlFor="maxPrice">Máximo</label>
                  <input 
                    type="number" 
                    id="maxPrice" 
                    placeholder="$ Máximo" 
                    className="price-input"
                    value={priceRange.max === '' ? priceRange.max : priceRange.max}
                    onChange={handlePriceInputChange}
                  />
                </div>
              </div>
              <button 
                type="button" 
                className="btn-apply-price"
                onClick={applyPriceFilter}
              >
                Aplicar
              </button>
            </div>
          </div>
          
          <div className="filters-section">
            <h3 className="filters-title">Envío</h3>
            <label className="shipping-label">
              <input 
                type="checkbox" 
                name="freeShipping" 
                className="shipping-checkbox"
                checked={freeShippingOnly}
                onChange={handleFreeShippingChange}
              />
              <span className="shipping-text">Envío gratis</span>
            </label>
          </div>
          
          <div className="filters-section">
            <h3 className="filters-title">Descuentos</h3>
            <div className="discount-options">
              <label className="discount-label">
                <input 
                  type="radio" 
                  name="discount" 
                  value="all" 
                  className="discount-radio"
                  checked={discountFilter === 'all'}
                  onChange={handleDiscountFilterChange}
                />
                <span className="discount-text">Todos los productos</span>
              </label>
              <label className="discount-label">
                <input 
                  type="radio" 
                  name="discount" 
                  value="withDiscount" 
                  className="discount-radio"
                  checked={discountFilter === 'withDiscount'}
                  onChange={handleDiscountFilterChange}
                />
                <span className="discount-text">Con descuento</span>
              </label>
            </div>
          </div>
          
          <button 
            type="button" 
            className="btn-clear-filters"
            onClick={clearAllFilters}
          >
            Limpiar filtros
          </button>
        </aside>
        
        <div className="content-container">
          <ProductList products={filteredProducts} />
          
          {(searchTerm.trim() || selectedCategories.length > 0 || 
            priceRange.min !== '' || priceRange.max !== '' || 
            freeShippingOnly || discountFilter === 'withDiscount') && (
            <div className="search-results-info">
              {filteredProducts.length === 0 ? (
                <p>No se encontraron productos con los criterios seleccionados</p>
              ) : (
                <p>Se encontraron {filteredProducts.length} productos</p>
              )}
            </div>
          )}
        </div>
      </div>
      
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
