import React, { useEffect, useState } from 'react';
import { Empty, notification, Spin } from 'antd';
import { productList } from '../../assets/productList';
import { customFetch } from '../../assets/customFetch';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.less';
import { useParams } from 'react-router-dom';

function ItemListContainer({greeting}) {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const onAdd = (count, product) => {
		return notification.success({
			description: `${count}x ${product.productName}`,
			message: 'Producto agregado exitosamente'
		});
	};

	const onCountChange = (count, product) => {
		product.totalPrice = product.priceRange.sellingPrice.highPrice * count;
		setProducts([...products]);
	};

	const {catId} = useParams();

	useEffect(() => {
		const getProducts = async () => {
			try {
				setIsLoading(true);
				let productsData = await customFetch(productList);
				catId && (productsData = productsData.filter(obj => (obj.categoryId === catId)));
				setProducts(productsData);
			} catch (e) {
				console.log('Error: ', e);
			} finally {
				setIsLoading(false);
			}
		};

		getProducts();
	}, [catId]);

	return (
		<div className={`container ${styles.container}`}>
			<h2>{greeting}</h2>
			{isLoading ?
				<div className={styles.spinner}>
					<Spin size="large" />
				</div>
				:
				(products.length > 0 ?
					<ItemList
						products={products}
						onAdd={onAdd}
						onCountChange={onCountChange}
					/>
					:
					<Empty description={"No hay productos disponibles"} />)
			}
		</div>
	);
}

export default ItemListContainer;