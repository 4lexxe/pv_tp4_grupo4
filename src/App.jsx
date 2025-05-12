import { useState } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div className="app-container">
      <h1>Gestión de Productos</h1>
      <ProductForm />
      <ProductList products={products} />
    </div>
  )
}

export default App
