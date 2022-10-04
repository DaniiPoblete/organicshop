import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './CartWidget.module.less';
import { useCart } from '../../contexts/CartContext';

function CartWidget() {
	const {totalCount} = useCart();

	return (
		<Button className={styles.button} type="primary" shape="round" icon={<ShoppingCartOutlined />}>
			{totalCount > 0 && <span> {totalCount}</span>}
		</Button>
	);
}

export default CartWidget;