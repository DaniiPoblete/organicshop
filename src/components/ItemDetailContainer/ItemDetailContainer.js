import React, { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { customFetch } from '../../assets/customFetch';
import { Spin } from 'antd';
import styles from './ItemDetailContainer.module.less';
import { productList } from '../../assets/productList';

function ItemDetailContainer() {
	const [product, setProduct] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const fetch = customFetch(productList);

	useEffect(() => {
		fetch.then(productData => {
			setProduct(productData[0]);
		}).catch(error => {
			console.log('Error: ', error);
		}).finally(() => {
			setIsLoading(false);
		});
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