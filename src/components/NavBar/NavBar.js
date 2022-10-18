import React, { useEffect, useState } from 'react';
import { Button, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg';
import styles from './NavBar.module.less';
import CartWidget from '../CartWidget/CartWidget';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { getDocs, collection } from 'firebase/firestore';

function NavBar() {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const [categories, setCategories] = useState([]);

	const location = useLocation();
	const {pathname} = location;

	const getCategories = async () => {
		try {
			const categoriesCollection = collection(db, 'categories');
			const data = await getDocs(categoriesCollection);
			const categoriesList = data.docs.map(product => {
				return {...product.data(), id: product.id};
			});

			const categoriesMenu = [];

			categoriesList.forEach(cat => {
				categoriesMenu.push({
					label: (<NavLink to={`/category/${cat.handle}`} onClick={onClose}>{cat.name}</NavLink>),
					key: `/category/${cat.handle}`
				});
			});

			setCategories(categoriesMenu);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	return (
		<nav>
			<Button type="primary" onClick={showDrawer} icon={<MenuOutlined />}
					className={styles.collapsedMenuButton} />
			<Link to={"/"}>
				<img src={logo} alt="logo" className={styles.logo} />
			</Link>
			<Menu items={categories} mode="horizontal" className={styles.menu} selectedKeys={[pathname]} />
			<Link to={"/cart"}>
				<CartWidget />
			</Link>
			<Drawer title="Navegación" placement="left" onClose={onClose} visible={visible} className={styles.drawer}>
				<Menu items={categories} mode="vertical" selectedKeys={[pathname]} />
			</Drawer>
		</nav>
	);
}

export default NavBar;