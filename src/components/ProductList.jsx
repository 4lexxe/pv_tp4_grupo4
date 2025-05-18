import ProductItem from './ProductItem';

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="product-cards">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;