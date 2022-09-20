import React, { useState } from 'react';
import { Button, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg';
import styles from './NavBar.module.less';
import CartWidget from '../CartWidget/CartWidget';

function NavBar() {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const items = [
		{label: 'Categoría 1', key: 'item-1'},
		{label: 'Categoría 2', key: 'item-2'},
		{label: 'Categoría 3', key: 'item-3'},
		{label: 'Categoría 4', key: 'item-4'}
	];

	return (
		<nav>
			<Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} className={styles.collapsedMenuButton} />
			<img src={logo} alt="logo" className={styles.logo}/>
			<Menu items={items} mode="horizontal" className={styles.menu} />
			<CartWidget />
			<Drawer title="Kiowo" placement="left" onClose={onClose} visible={visible} className={styles.drawer}>
				<Menu items={items} mode="vertical" />
			</Drawer>
		</nav>
	);
}

export default NavBar;