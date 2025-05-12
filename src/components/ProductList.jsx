import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList; 