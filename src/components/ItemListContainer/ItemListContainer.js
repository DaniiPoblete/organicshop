import React, { useEffect, useState } from 'react';
import { Breadcrumb, Empty, Space, Spin } from 'antd';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.less';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

function ItemListContainer({greeting}) {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const {catId} = useParams();

	const getProducts = async () => {
		try {
			setIsLoading(true);
			const productsCollection = collection(db, 'products');
			const q = catId ? query(productsCollection, where('categoryHandle', '==', catId)) : productsCollection;
			const data = await getDocs(q);
			const list = data.docs.map(product => {
				return {...product.data(), id: product.id};
			});

			setProducts(list);
		} catch (e) {
			console.log('Error: ', e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
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
					<Space direction={"vertical"} size={32}>
						{catId &&
							<Breadcrumb>
								<Breadcrumb.Item>
									<Link to={"/"}>Inicio</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item>
									<Link to={`/category/${catId}`}>{products[0].category}</Link>
								</Breadcrumb.Item>
							</Breadcrumb>
						}
						<ItemList products={products} />
					</Space>
					:
					<Empty description={"No hay productos disponibles"} />)
			}
		</div>
	);
}

export default ItemListContainer;