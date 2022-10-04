import React, { createContext, useContext, useEffect, useState } from 'react';
import { notification } from 'antd';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function CartProvider({children}) {
	const [cart, setCart] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		setTotalCount(getTotalCount);
		setTotalPrice(getTotalPrice);
	}, [cart]);

	const addItem = (item, quantity) => {
		if (!isInCart(item.id)) {
			setCart([...cart, {item, quantity}]);
		} else {
			setCart(cart.map(obj => obj.item.id === item.id ? {...obj, quantity: obj.quantity + quantity} : obj));
		}
	};

	const removeItem = (itemId) => {
		setCart(cart.filter(obj => obj.item.id !== itemId));

		notification.success({
			message: 'Producto eliminado exitosamente',
			placement: 'topLeft'
		});
	};

	const clear = () => {
		setCart([]);

		notification.success({
			message: 'Carrito vaciado exitosamente',
			placement: 'topLeft'
		});
	};

	const isInCart = (itemId) => cart.some(obj => obj.item.id === itemId);

	const getTotalCount = () => cart.reduce((accumulator, obj) => accumulator + obj.quantity, 0);

	const getTotalPrice = () => cart.reduce((accumulator, obj) => accumulator + (obj.item.price * obj.quantity), 0);

	return (
		<CartContext.Provider value={{cart, totalCount, totalPrice, addItem, removeItem, clear}}>
			{children}
		</CartContext.Provider>
	);
}

export default CartProvider;