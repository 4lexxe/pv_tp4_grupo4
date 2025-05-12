import { useState } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
  // Estado inicial con productos de ejemplo
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Laptop HP',
      price: 120000,
      category: 'Electrónica',
      stock: 10
    },
    {
      id: 2,
      name: 'Mouse inalámbrico',
      price: 5000,
      category: 'Accesorios',
      stock: 25
    },
    {
      id: 3,
      name: 'Monitor 24"',
      price: 45000,
      category: 'Electrónica',
      stock: 5
    }
  ]);

  // Función para agregar un nuevo producto
  const addProduct = (newProduct) => {
    // Asignar un ID único (en una app real usaríamos una base de datos o UUID)
    const productWithId = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    setProducts([...products, productWithId]);
  };

  return (
    <div className="app-container">
      <h1>Gestión de Productos</h1>
      <ProductForm onAddProduct={addProduct} />
      <ProductList products={products} />
    </div>
  )
}

export default App
