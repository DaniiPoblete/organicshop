import React, { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { customFetch } from '../../assets/customFetch';
import { Spin } from 'antd';
import styles from './ItemDetailContainer.module.less';
import { productList } from '../../assets/productList';

function ItemDetailContainer() {
	const [product, setProduct] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getProduct = async () => {
			try {
				const productsData = await customFetch(productList);
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
				<ItemDetail product={product} />
			}
		</div>
	);
}

export default ItemDetailContainer;