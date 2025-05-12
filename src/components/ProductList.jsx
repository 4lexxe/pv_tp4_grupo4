import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="product-cards">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {/* Placeholder para imagen */}
                <div className="image-placeholder"></div>
              </div>
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  $ {product.price.toLocaleString()}
                </div>
                <div className="product-installments">
                  en 6 cuotas de $ {Math.round(product.price / 6).toLocaleString()}
                </div>
                <div className="product-shipping">
                  Envío gratis
                </div>
                <div className="product-category">{product.category}</div>
                <div className="product-stock">
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 