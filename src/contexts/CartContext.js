import React, { createContext, useContext, useState } from 'react';
import { notification } from 'antd';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function CartProvider({children}) {
	const [cart, setCart] = useState([]);

	const addItem = (item, quantity) => {
		if (!isInCart(item.id)) {
			setCart([...cart, {item, quantity}]);
		} else {
			setCart(cart.map(obj => {
				if (obj.item.id === item.id) return {...obj, quantity: obj.quantity + quantity};
				return obj;
			}));
		}
	};

	const removeItem = (itemId) => setCart(cart.filter(obj => obj.item.id !== itemId));

	const clear = () => {
		setCart([]);

		notification.success({
			message: 'Carrito vaciado exitosamente',
			placement: 'topLeft'
		});
	};

	const isInCart = (itemId) => cart.some(obj => obj.item.id === itemId);

	const getTotal = () => cart.reduce((accumulator, obj) => accumulator + obj.quantity, 0);

	return (
		<CartContext.Provider value={{cart, addItem, removeItem, clear, getTotal}}>
			{children}
		</CartContext.Provider>
	);
}

export default CartProvider;