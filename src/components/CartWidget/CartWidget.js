import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCart } from '../../contexts/CartContext';

function CartWidget() {
	const [total, setTotal] = useState(0);

	const cart = useCart();

	useEffect(() => {
		setTotal(cart.getTotal());
	}, [cart.cart]);

	return (
		<Button type="primary" shape="round" icon={<ShoppingCartOutlined />}>
			{total > 0 && <span> {total}</span>}
		</Button>
	);
}

export default CartWidget;