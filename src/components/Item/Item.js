import React from 'react';
import Meta from 'antd/es/card/Meta';
import { Card, Divider, Rate } from 'antd';
import styles from './Item.module.less';
import { Link } from 'react-router-dom';

function Item({product}) {
	return (
		<Link to={`/product/${product.id}`}>
			<Card
				cover={
					<img
						alt={product.handle}
						src={product.image}
						className={styles.image}
					/>
				}>
				<Meta
					title={product.title}
					description={product.vendor}
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