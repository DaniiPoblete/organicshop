import React, { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { customFetch } from '../../assets/customFetch';
import { notification, Spin } from 'antd';
import styles from './ItemDetailContainer.module.less';
import { productList } from '../../assets/productList';
import { useParams } from 'react-router-dom';

function ItemDetailContainer() {
	const [product, setProduct] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [showCount, setShowCount] = useState(true);

	const onAdd = (count, product) => {
		setShowCount(false);

		return notification.success({
			description: `${count}x ${product.productName}`,
			message: 'Producto agregado exitosamente'
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
				const productsData = await customFetch(productList, prodId, 'productId');
				setProduct(productsData[0]);
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
				<ItemDetail
					product={product}
					onAdd={onAdd}
					onCountChange={onCountChange}
					showCount={showCount}
				/>
			}
		</div>
	);
}

export default ItemDetailContainer;