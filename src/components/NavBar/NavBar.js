import React, { useState } from 'react';
import { Button, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg';
import styles from './NavBar.module.less';
import CartWidget from '../CartWidget/CartWidget';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { categoriesList } from '../../assets/categoriesList';

function NavBar() {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const categories = [];
	const location = useLocation();
	const {pathname} = location;

	categoriesList.forEach(cat => (
		categories.push({
			label: (<NavLink to={`/category/${cat.id}`}>{cat.name}</NavLink>),
			key: `/category/${cat.id}`
		})
	));

	console.log(pathname);
	return (
		<nav>
			<Button type="primary" onClick={showDrawer} icon={<MenuOutlined />}
					className={styles.collapsedMenuButton} />
			<Link to={"/"}>
				<img src={logo} alt="logo" className={styles.logo} />
			</Link>
			<Menu items={categories} mode="horizontal" className={styles.menu} selectedKeys={[pathname]} />
			<CartWidget />
			<Drawer title="Kiowo" placement="left" onClose={onClose} visible={visible} className={styles.drawer}>
				<Menu items={categories} mode="vertical" selectedKeys={[pathname]} />
			</Drawer>
		</nav>
	);
}

export default NavBar;