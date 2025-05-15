import React, { useState, useEffect } from 'react';

const ProductForm = ({ onAddProduct, onUpdateProduct, productToEdit, onCancel }) => {
  // Estado inicial del formulario - vacío para un nuevo producto o con datos para edición
  const [productData, setProductData] = useState({
    name: '',
    descripcion: '',
    precioUnitario: '',
    descuento: '0',
    category: '',
    stock: '',
    imageUrl: '',
    freeShipping: false
  });

  // Modo edición o creación
  const isEditMode = !!productToEdit;

  // Cargar datos del producto si estamos en modo edición
  useEffect(() => {
    if (productToEdit) {
      setProductData({
        name: productToEdit.name,
        descripcion: productToEdit.descripcion,
        precioUnitario: productToEdit.precioUnitario.toString(),
        descuento: productToEdit.descuento.toString(),
        category: productToEdit.category,
        stock: productToEdit.stock.toString(),
        imageUrl: productToEdit.imageUrl,
        freeShipping: productToEdit.freeShipping
      });
    }
  }, [productToEdit]);

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
    if ((name === 'precioUnitario' || name === 'descuento' || name === 'stock') && value !== '') {
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
      precioUnitario: productData.precioUnitario === '' ? 0 : Number(productData.precioUnitario),
      descuento: productData.descuento === '' ? 0 : Number(productData.descuento),
      stock: productData.stock === '' ? 0 : Number(productData.stock),
      // Si no se proporciona una URL de imagen, usar un placeholder
      imageUrl: productData.imageUrl || 'https://via.placeholder.com/200'
    };
    
    // Llamar a la función apropiada según el modo
    if (isEditMode) {
      // Conservar el ID original y actualizar el producto
      onUpdateProduct({
        ...formattedProduct,
        id: productToEdit.id
      });
    } else {
      // Crear nuevo producto
      onAddProduct(formattedProduct);
    }
    
    // Limpiar el formulario
    setProductData({
      name: '',
      descripcion: '',
      precioUnitario: '',
      descuento: '0',
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
      
      <div className="form-group full-width">
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={productData.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="precioUnitario">Precio Unitario:</label>
        <input
          type="text"
          id="precioUnitario"
          name="precioUnitario"
          value={productData.precioUnitario}
          onChange={handleChange}
          placeholder="0"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="descuento">Descuento (%):</label>
        <input
          type="text"
          id="descuento"
          name="descuento"
          value={productData.descuento}
          onChange={handleChange}
          placeholder="0"
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
        <button type="submit" className="btn-submit">
          {isEditMode ? 'Actualizar' : 'Guardar'}
        </button>
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