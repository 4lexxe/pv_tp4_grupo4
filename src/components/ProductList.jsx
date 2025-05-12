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
              <h3>{product.name}</h3>
              <div className="product-details">
                <p><strong>Precio:</strong> ${product.price.toLocaleString()}</p>
                <p><strong>Categoría:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock} unidades</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 