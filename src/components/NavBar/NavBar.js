import React, { useEffect, useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg';
import styles from './NavBar.module.less';
import CartWidget from '../CartWidget/CartWidget';
import { Link, NavLink, useLocation } from 'react-router-dom';
import OrderWidget from '../OrderWigdet/OrderWidget';
import { useCategories } from '../../contexts/CategoriesContext';

function NavBar() {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const [categoriesMenu, setCategoriesMenu] = useState([]);

	const location = useLocation();
	const {pathname} = location;

	const {categories} = useCategories();

	const setMenu = () => {
		setCategoriesMenu(categories.map(cat => ({
			label: (<NavLink to={`/category/${cat.handle}`} onClick={onClose}>{cat.name}</NavLink>),
			key: `/category/${cat.handle}`
		})));
	};

	useEffect(() => {
		setMenu();
	}, [categories]);

	return (
		<nav>
			<div className={`${styles.optionsWrapper} ${styles.collapsedMenuButton}`}>
				<Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
			</div>
			<Link to={'/'}>
				<img src={logo} alt="logo" className={styles.logo} />
			</Link>
			<Menu items={categoriesMenu} mode="horizontal" className={styles.menu} selectedKeys={[pathname]} />
			<div className={styles.optionsWrapper}>
				<Link to={'/cart'}>
					<CartWidget />
				</Link>
				<OrderWidget />
			</div>
			<Drawer title="Navegación" placement="left" onClose={onClose} visible={visible} className={styles.drawer}>
				<Menu items={categoriesMenu} mode="vertical" selectedKeys={[pathname]} />
			</Drawer>
		</nav>
	);
}

export default NavBar;