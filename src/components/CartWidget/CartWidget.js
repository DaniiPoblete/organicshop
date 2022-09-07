import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './CartWidget.module.css'

function CartWidget() {
	return (
		<Button type="primary" shape="round" icon={<ShoppingCartOutlined />} className={styles.cart}>
			{/*1*/}
		</Button>
	);
}

export default CartWidget;