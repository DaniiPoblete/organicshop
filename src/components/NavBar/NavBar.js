import React, { useState } from 'react';
import { Button, Menu, Drawer } from 'antd';
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg';
import 'antd/dist/antd.css';
import './NavBar.css';
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
			<img src={logo} alt="logo" />
			<Menu items={items} mode="horizontal" className="menu mobile-hidden" />
			<CartWidget />
			<Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} className="desktop-hidden" />
			<Drawer title="Menú" placement="right" onClose={onClose} visible={visible}>
				<Menu items={items} mode="vertical" />
			</Drawer>
		</nav>
	);
}

export default NavBar;