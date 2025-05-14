import React, { useState } from 'react';

const ProductForm = ({ onAddProduct, onCancel }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
    freeShipping: false
  });

  /***************************************
   * MANEJO DE EVENTOS DEL FORMULARIO
   ***************************************/
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Manejo especial para checkbox
    if (type === 'checkbox') {
      setProductData(prevData => ({
        ...prevData,
        [name]: checked
      }));
      return;
    }
    
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
      stock: productData.stock === '' ? 0 : Number(productData.stock),
      // Si no se proporciona una URL de imagen, usar un placeholder
      imageUrl: productData.imageUrl || 'https://via.placeholder.com/200'
    };
    
    // Llamar a la función proporcionada por el componente padre
    onAddProduct(formattedProduct);
    
    // Limpiar el formulario
    setProductData({
      name: '',
      price: '',
      category: '',
      stock: '',
      imageUrl: '',
      freeShipping: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form-container">
      <div className="form-group full-width">
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
          type="text"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="0"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="stock">Stock:</label>
        <input
          type="text"
          id="stock"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          placeholder="0"
          required
        />
      </div>
      
      <div className="form-group full-width">
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
      
      <div className="form-group full-width">
        <label htmlFor="imageUrl">URL de Imagen:</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={productData.imageUrl}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        <small className="form-help">Deja vacío para usar imagen por defecto</small>
      </div>
      
      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="freeShipping"
            checked={productData.freeShipping}
            onChange={handleChange}
          />
          <span>Envío gratis</span>
        </label>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn-submit">Guardar</button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm; 