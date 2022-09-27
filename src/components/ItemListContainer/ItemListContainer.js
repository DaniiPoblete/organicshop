import React, { useEffect, useState } from 'react';
import { Breadcrumb, Empty, Pagination, Space, Spin } from 'antd';
import { productList } from '../../assets/productList';
import { customFetch } from '../../assets/customFetch';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.less';
import { Link, useParams } from 'react-router-dom';

function ItemListContainer({greeting}) {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const {catId} = useParams();

	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [pageSize, setPageSize] = useState(0);

	const getProducts = async () => {
		try {
			setIsLoading(true);
			const data = await customFetch(productList, catId, 'categoryId', page);
			setProducts(data.products);
			setTotal(data.total);
			setPageSize(data.pageSize);
		} catch (e) {
			console.log('Error: ', e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setPage(1);
		getProducts();
	}, [catId]);

	useEffect(() => {
		getProducts();
	}, [page]);

	return (
		<div className={`container ${styles.container}`}>
			{/*<h2>{greeting}</h2>*/}
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
						<Pagination current={page} total={total} pageSize={pageSize}
									onChange={(page) => setPage(page)} />
					</Space>
					:
					<Empty description={"No hay productos disponibles"} />)
			}
		</div>
	);
}

export default ItemListContainer;