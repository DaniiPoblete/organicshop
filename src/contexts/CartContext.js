import React, { createContext, useContext, useEffect, useState } from 'react';
import { notification } from 'antd';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function CartProvider({children}) {
	const [cart, setCart] = useState(() => {
		const storageCart = localStorage.getItem('Cart');
		const savedCart = JSON.parse(storageCart);
		return savedCart || [];
	});

	const [totalCount, setTotalCount] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const [orderId, setOrderId] = useState(undefined);

	useEffect(() => {
		setTotalCount(getTotalCount);
		setTotalPrice(getTotalPrice);

		localStorage.setItem('Cart', JSON.stringify(cart));
	}, [cart]);

	const addItem = (item, quantity) => {
		if (!isInCart(item.id)) {
			setCart([...cart, {item, quantity, totalPrice: item.price * quantity}]);
		} else {
			setCart(cart.map(obj => obj.item.id === item.id ? {
				...obj,
				quantity: obj.quantity + quantity,
				totalPrice: obj.item.price * quantity
			} : obj));
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

	const updateItem = (item, quantity) => {
		setCart(cart.map(obj => obj.item.id === item.id ? {
			...obj,
			quantity: quantity,
			totalPrice: obj.item.price * quantity
		} : obj));
	};

	const resetCart = () => setCart([]);

	const cartItemQuantity = (itemId) => isInCart(itemId) ? cart.find(obj => obj.item.id === itemId).quantity : 0;

	const isInCart = (itemId) => cart.some(obj => obj.item.id === itemId);

	const getTotalCount = () => cart.reduce((accumulator, obj) => accumulator + obj.quantity, 0);

	const getTotalPrice = () => cart.reduce((accumulator, obj) => accumulator + obj.totalPrice, 0);

	return (
		<CartContext.Provider
			value={{
				cart,
				totalCount,
				totalPrice,
				addItem,
				removeItem,
				clear,
				updateItem,
				resetCart,
				cartItemQuantity,
				setOrderId,
				orderId
			}}>
			{children}
		</CartContext.Provider>
	);
}

export default CartProvider;