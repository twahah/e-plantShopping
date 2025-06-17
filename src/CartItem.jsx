import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleContinueShopping = (e) => {
    onContinueShopping(e); // Call the parent function to continue shopping
  };

  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateQuantity({ name: item.name, quantity: updatedItem.quantity }));
    dispatch(addItem(updatedItem));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      
    const newQuantity = item.quantity - 1;
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(updateQuantity({ name: item.name, quantity: updatedItem.quantity }));
    } else {
      // dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const calculateTotalCost = (item) => {
  const cost = parseFloat(item.cost) || 0;
  const quantity = parseInt(item.quantity) || 0;
  return (cost * quantity).toFixed(2);
};

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (cost * quantity);
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${item.cost * item.quantity}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


