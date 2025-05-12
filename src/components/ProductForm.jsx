import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    stock: ''
  });

  /***************************************
   * MANEJO DE EVENTOS DEL FORMULARIO
   ***************************************/
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Asegurarse de que los valores numéricos sean válidos
    if ((name === 'price' || name === 'stock') && value !== '') {
      // Permitir solo valores numéricos válidos o campo vacío
      if (!/^\d*\.?\d*$/.test(value)) {
        return; // No actualizar si no es un número válido
      }
    }
    
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convertir valores numéricos
    const formattedProduct = {
      ...productData,
      price: productData.price === '' ? 0 : Number(productData.price),
      stock: productData.stock === '' ? 0 : Number(productData.stock)
    };
    
    // Llamar a la función proporcionada por el componente padre
    onAddProduct(formattedProduct);
    
    // Limpiar el formulario
    setProductData({
      name: '',
      price: '',
      category: '',
      stock: ''
    });
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
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="text" /* Cambiado de 'number' a 'text' para mejor control */
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="0"
            required
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
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="text" /* Cambiado de 'number' a 'text' para mejor control */
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>
        
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
};

export default ProductForm; 