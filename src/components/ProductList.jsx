import React from 'react';

const ProductList = ({ products, onEditProduct }) => {
  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="product-cards">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {product.descuento > 0 && (
                <div className="oferta-badge">OFERTA DEL DÍA</div>
              )}
              <div className="product-image">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="product-thumbnail"
                />
              </div>
              <div className="product-content">
                {product.category && (
                  <div className="product-seller-category">{product.category}</div>
                )}
                <h3 className="product-name">{product.name}</h3>
                
                {product.id === 1 && (
                  <>
                    <div className="product-seller">
                      Por <span className="seller-name">Stanley</span> <span className="seller-badge">★</span>
                    </div>
                    <div className="product-rating">
                      <span className="rating-score">5.0</span>
                      <span className="rating-stars">★★★★★</span>
                      <span className="rating-count">(2)</span>
                    </div>
                  </>
                )}
                
                {product.descuento > 0 && (
                  <div className="product-original-price">
                    ${product.precioUnitario.toLocaleString()}
                  </div>
                )}
                
                <div className="product-price-container">
                  <div className="product-price">
                    ${(product.descuento > 0 ? product.precioConDescuento : product.precioUnitario).toLocaleString()}
                  </div>
                  
                  {product.descuento > 0 && (
                    <div className="discount-percentage">{product.descuento}% OFF</div>
                  )}
                </div>
                
                <div className="product-installments">
                  en 12 cuotas de ${Math.round((product.descuento > 0 ? product.precioConDescuento : product.precioUnitario) / 12).toLocaleString()}
                </div>
                
                {product.freeShipping && (
                  <div className="free-shipping-tag">
                    Llega gratis mañana
                  </div>
                )}
                
                <div className="product-description">{product.descripcion}</div>
                <div className="product-stock">
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                </div>
                
                {/* Botón para editar producto */}
                <button 
                  className="btn-edit-product"
                  onClick={() => onEditProduct(product)}
                  aria-label={`Editar ${product.name}`}
                >
                  <span className="edit-icon">✏️</span> Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;