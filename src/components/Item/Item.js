import React from 'react';
import Meta from 'antd/es/card/Meta';
import { Card, Divider } from 'antd';
import ItemCount from '../ItemCount/ItemCount';
import styles from './Item.module.less';
import { Link } from 'react-router-dom';

function Item({product, onAdd, onCountChange}) {
	return (
		<Card
			cover={
				<Link to={`/product/${product.productId}`}>
					<img
						alt={product.productName}
						src={product.items[0].images[0].imageUrl}
						className={styles.image}
					/>
				</Link>
			}>
			<Meta
				title={product.productName}
				description={product.brand}
			/>
			<Divider />
			<p className={styles.price}>
				{product.totalPrice?.toLocaleString("es-CL", {style: "currency", currency: "CLP"})}
			</p>
			<ItemCount
				stock={product.stock} initial={1}
				onAdd={(count) => onAdd(count, product)}
				onCountChange={(count) => onCountChange(count, product)}
			/>
		</Card>
	);
}

export default Item;