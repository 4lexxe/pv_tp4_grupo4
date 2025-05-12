import { useState } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
  /***************************************
   * ESTADO INICIAL DE PRODUCTOS
   ***************************************/
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Laptop HP',
      price: 120000,
      category: 'Electrónica',
      stock: 10,
      imageUrl: 'https://via.placeholder.com/200?text=Laptop+HP',
      freeShipping: true
    },
    {
      id: 2,
      name: 'Mouse inalámbrico',
      price: 5000,
      category: 'Accesorios',
      stock: 25,
      imageUrl: 'https://via.placeholder.com/200?text=Mouse',
      freeShipping: true
    },
    {
      id: 3,
      name: 'Monitor 24"',
      price: 45000,
      category: 'Electrónica',
      stock: 5,
      imageUrl: 'https://via.placeholder.com/200?text=Monitor',
      freeShipping: true
    }
  ]);

  /***************************************
   * SISTEMA DE RETROALIMENTACIÓN
   ***************************************/
  // Estado para el mensaje de retroalimentación
  const [feedback, setFeedback] = useState({
    message: '',
    type: '', // 'success' o 'error'
    visible: false
  });

  // Función para mostrar retroalimentación
  const showFeedback = (message, type = 'success') => {
    setFeedback({
      message,
      type,
      visible: true
    });

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  /***************************************
   * GESTIÓN DE PRODUCTOS
   ***************************************/
  // Función para agregar un nuevo producto
  const addProduct = (newProduct) => {
    /* *
     * Asignar un ID único al producto nuevo
     * En una app real usaríamos una base de datos o UUID
     * */
    const productWithId = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    setProducts([...products, productWithId]);
    
    // Mostrar mensaje de éxito
    showFeedback(`Producto "${newProduct.name}" agregado correctamente`);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Gestión de Productos</h1>
      
      {/* Mensaje de retroalimentación */}
      {feedback.visible && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
      
      <div className="content-container">
        <ProductForm onAddProduct={addProduct} />
        <ProductList products={products} />
      </div>
    </div>
  )
}

export default App
