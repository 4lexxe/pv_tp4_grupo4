import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Modal from './components/Modal'
import SearchBar from './components/SearchBar'
import {useProducts} from './customHooks/useProducts'
import {useFeedback} from './customHooks/useFeedback'
import {useModal} from './customHooks/useModal'
import {useFilterProducts} from './customHooks/useFilterProducts'
import { useState } from 'react'
import ProductFilters from './components/ProductFilters'
function App() {
  /***************************************
   * ESTADO DE PRODUCTOS
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
   /***************************************
   * ESTADO DE BÚSQUEDA Y FILTROS
   ***************************************/
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '', sliderValue: 300000 });
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [discountFilter, setDiscountFilter] = useState('all');

   /***************************************
   * ESTADO DE RETROALIMENTACIÓN
   ***************************************/
  const [feedback, setFeedback] = useState({
          message: '',
          type: '',
          visible: false
  });

   /***************************************
   * ESTADO PARA EL MODAL
   ***************************************/
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
   /***************************************
   * FILTRADO DE PRODUCTOS
   ***************************************/
  const {
    filteredProducts,
    handleSearch,
    handleCategoryChange,
    handleSliderChange,
    handlePriceInputChange,
    applyPriceFilter,
    handleFreeShippingChange,
    handleDiscountFilterChange,
    clearAllFilters
  } = useFilterProducts({
    products,
    searchTerm,
    selectedCategories,
    priceRange,
    freeShippingOnly,
    discountFilter,
    setSearchTerm,
    setSelectedCategories,
    setPriceRange,
    setFreeShippingOnly,
    setDiscountFilter
  });
 
 
  /***************************************
   * SISTEMA DE RETROALIMENTACIÓN
   ***************************************/
  const {showFeedback} = useFeedback({setFeedback});
  /***************************************
   * GESTIÓN DEL MODAL
   * ***************************************/
  const {openAddModal, openEditModal, closeModal} = useModal({isModalOpen, setIsModalOpen, setEditingProduct});
  /***************************************
   * GESTIÓN DE PRODUCTOS
   ***************************************/
  const {addProduct, updateProduct, deleteProduct} = useProducts({products, setProducts, showFeedback, closeModal});
 

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
        <button className="btn-add-product" onClick={openAddModal}>
          Agregar Nuevo Producto
        </button>
      </div>
      
      <div className="main-layout">
        <ProductFilters
          products={products}
          setPriceRange={setPriceRange}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
          freeShippingOnly={freeShippingOnly}
          discountFilter={discountFilter}
          handleCategoryChange={handleCategoryChange}
          handleSliderChange={handleSliderChange}
          handlePriceInputChange={handlePriceInputChange}
          applyPriceFilter={applyPriceFilter}
          handleFreeShippingChange={handleFreeShippingChange}
          handleDiscountFilterChange={handleDiscountFilterChange}
          clearAllFilters={clearAllFilters}
        />
        
        <div className="content-container">
          <ProductList 
            products={filteredProducts}
            onEditProduct={openEditModal}
            onDeleteProduct={deleteProduct}
          />
          
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
        title={editingProduct ? `Editar: ${editingProduct.name}` : "Agregar Nuevo Producto"}
      >
      <ProductForm 
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        productToEdit={editingProduct}
        onCancel={closeModal} 
      />
      </Modal>
    </div>
  )
}

export default App
