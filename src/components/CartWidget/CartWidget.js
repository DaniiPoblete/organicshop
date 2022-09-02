import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './CartWidget.css'

function CartWidget() {
	return (
		<Button type="primary" shape="round" icon={<ShoppingCartOutlined />} className="cart-widget">
			1
		</Button>
	);
}

export default CartWidget;