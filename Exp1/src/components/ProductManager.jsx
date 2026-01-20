import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, removeProduct } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { useAuth } from '../context/AuthContext';

const ProductManager = () => {
  const { user } = useAuth();
  const products = useSelector(state => state.products.items);
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddProduct = () => {
    if (newProductName && newProductPrice) {
      dispatch(addProduct({ name: newProductName, price: Number(newProductPrice) }));
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  const handleUpdateProduct = () => {
    if (editingId && newProductName && newProductPrice) {
      dispatch(updateProduct({ id: editingId, name: newProductName, price: Number(newProductPrice) }));
      setEditingId(null);
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  const startEditing = (product) => {
    setEditingId(product.id);
    setNewProductName(product.name);
    setNewProductPrice(product.price);
  };

  return (
    <div>
      <h2>Product Catalog</h2>
      {user?.role === 'admin' && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3>Admin Panel</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
          />
          {editingId ? (
            <button onClick={handleUpdateProduct}>Update Product</button>
          ) : (
            <button onClick={handleAddProduct}>Add Product</button>
          )}
          {editingId && <button onClick={() => { setEditingId(null); setNewProductName(''); setNewProductPrice(''); }}>Cancel</button>}
        </div>
      )}

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            {user?.role === 'admin' && (
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => startEditing(product)}>Edit</button>
                <button 
                  onClick={() => dispatch(removeProduct(product.id))} 
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '20px', backgroundColor: '#fdfdfd' }}>
        <h3>Cart Summary</h3>
        <p>Items in cart: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
        <ul>
          {cart.map(item => (
            <li key={item.id}>{item.name} - Qty: {item.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductManager;
