import React, { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { customFetch } from '../../assets/customFetch';
import { Breadcrumb, notification, Space, Spin } from 'antd';
import styles from './ItemDetailContainer.module.less';
import { productList } from '../../assets/productList';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

function ItemDetailContainer() {
	const [product, setProduct] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [showCount, setShowCount] = useState(true);

	const cart = useCart();

	const onAdd = (count, product) => {
		setShowCount(false);

		cart.addItem(product, count);

		notification.success({
			description: `${count}x ${product.title}`,
			message: 'Producto agregado exitosamente',
			placement: 'topLeft'
		});
	};

	const onCountChange = (count, product) => {
		product.totalPrice = product.price * count;
		setProduct({...product});
	};

	const {prodId} = useParams();

	useEffect(() => {
		const getProduct = async () => {
			try {
				setIsLoading(true);
				const data = await customFetch(productList, prodId, 'id', 1);
				setProduct(data.products[0]);
			} catch (e) {
				console.error('Error: ', e);
			} finally {
				setIsLoading(false);
			}
		};

		getProduct();
	}, []);

	return (
		<div className={`container ${styles.container}`}>
			{isLoading ?
				<div className={styles.spinner}>
					<Spin size="large" />
				</div>
				:
				<Space direction={"vertical"} size={32}>
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to={"/"}>Inicio</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<Link to={`/category/${product.categoryId}`}>{product.category}</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							{product.title}
						</Breadcrumb.Item>
					</Breadcrumb>
					<ItemDetail
						product={product}
						onAdd={onAdd}
						onCountChange={onCountChange}
						showCount={showCount}
					/>
				</Space>
			}
		</div>
	);
}

export default ItemDetailContainer;