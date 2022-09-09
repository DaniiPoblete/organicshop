import React from 'react';
import Meta from 'antd/es/card/Meta';
import { Card, Divider } from 'antd';
import ItemCount from '../ItemCount/ItemCount';
import styles from './Item.module.less';

function Item({product, onAdd, onCountChange}) {
	return (
		<Card
			className={styles.card}
			cover={
				<img
					alt={product.name}
					src={require(`../../assets/products/${product.src}`)}
				/>
			}>
			<Meta
				title={`[${product.brand}] ${product.name}`}
				description={product.desc}
			/>
			<Divider />
			<p className={styles.price}>
				{product.totalPrice?.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}
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