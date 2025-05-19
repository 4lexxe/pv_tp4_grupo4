import {useMemo, useEffect} from 'react'

const ProductFilters = ({selectedCategories,priceRange,freeShippingOnly,discountFilter,handleCategoryChange,handleSliderChange,handlePriceInputChange,applyPriceFilter,handleFreeShippingChange,handleDiscountFilterChange,clearAllFilters,setPriceRange,products}) => {
 
    
  /***************************************
   * CÁLCULO DE CATEGORÍAS ÚNICAS
   ***************************************/
  const uniqueCategories = useMemo(() => {
    const categories = {};
    products.forEach(product => {
      if (product.category) {
        categories[product.category] = (categories[product.category] || 0) + 1;
      }
    });
    return categories;
  }, [products]);

  useEffect(() => {
  const maxProductPrice = Math.max(...products.map(p => p.precioUnitario));
  setPriceRange(prev => ({
    ...prev,
    sliderValue: maxProductPrice > 0 ? maxProductPrice : 300000
  }));
  }, [products, setPriceRange]);

  return (
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
  )
}

export default ProductFilters