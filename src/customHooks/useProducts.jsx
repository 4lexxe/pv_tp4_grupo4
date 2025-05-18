
import {useCallback } from 'react';

export const useProducts = ({products, setProducts, showFeedback, closeModal}) => {
    const addProduct = useCallback((newProduct) => {
      const productWithId = {
        ...newProduct,
        id: Math.max(...products.map(p => p.id), 0) + 1,
        precioConDescuento: newProduct.precioUnitario * (1 - newProduct.descuento/100)
      };
      
      setProducts(prevProducts => [...prevProducts, productWithId]);
      console.log(products)
      showFeedback(`Producto "${newProduct.name}" agregado correctamente`);
      closeModal();
    }, [products, showFeedback, closeModal, setProducts]);

  const updateProduct = useCallback((updatedProduct) => {
    const productWithDiscountPrice = {
      ...updatedProduct,
      precioConDescuento: updatedProduct.precioUnitario * (1 - updatedProduct.descuento/100)
    };
    
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productWithDiscountPrice.id ? productWithDiscountPrice : product
      )
    );
    
    showFeedback(`Producto "${updatedProduct.name}" actualizado correctamente`);
    closeModal();
  }, [showFeedback, closeModal, setProducts]);

  const deleteProduct = useCallback((productId) => {
    const productName = products.find(product => product.id === productId)?.name || "Producto";
    
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    showFeedback(`Producto "${productName}" eliminado correctamente`, 'success');
  }, [products, showFeedback, setProducts]);

  return {
    addProduct,
    updateProduct,
    deleteProduct,
  }
}

