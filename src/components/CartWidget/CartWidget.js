import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function CartWidget() {
	return (
		<Button type="primary" shape="round" icon={<ShoppingCartOutlined />}>
			{/*1*/}
		</Button>
	);
}

export default CartWidget;