import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementará la lógica para agregar el producto
    console.log('Datos del producto:', productData);
  };

  return (
    <div className="product-form">
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
};

export default ProductForm; 