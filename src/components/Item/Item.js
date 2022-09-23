import React from 'react';
import Meta from 'antd/es/card/Meta';
import { Card, Divider, Rate } from 'antd';
import styles from './Item.module.less';
import { Link } from 'react-router-dom';

function Item({product}) {
	return (
		<Link to={`/product/${product.productId}`}>
			<Card
				cover={
					<img
						alt={product.productName}
						src={product.items[0].images[0].imageUrl}
						className={styles.image}
					/>
				}>
				<Meta
					title={product.productName}
					description={product.brand}
				/>
				<Divider />
				<div className={styles.detail}>
					<Rate value={product.rate} disabled />
					<p className={styles.price}>
						{product.price.toLocaleString("es-CL", {
							style: "currency",
							currency: "CLP"
						})}
					</p>
				</div>
			</Card>
		</Link>
	);
}

export default Item;