import React from 'react';
import styles from './ItemListContainer.module.less';
import ItemCount from '../ItemCount/ItemCount';
import { Card, Col, Divider, notification, Row } from 'antd';
import Meta from 'antd/es/card/Meta';

function ItemListContainer({greeting}) {
	const products = [{
		id: 1,
		name: 'Birch Juice Serum',
		brand: 'Round Lab',
		desc: 'Descripción del producto',
		src: 'Round-Lab-Birch-Juice-Serum-2.jpeg',
		stock: 10
	}, {
		id: 2,
		name: 'Set de 3 serums mini',
		brand: 'Beauty of Joseon',
		desc: 'Descripción del producto',
		src: 'Beauty-of-Joseon-Trio-Serum-Gift-Set-2.jpeg',
		stock: 5
	}, {
		id: 3,
		name: 'Calendula Complete Cleansing Oil',
		brand: 'IUNIK',
		desc: 'Descripción del producto',
		src: 'iUnik-Calendula-Complete-Cleansing-Oil-4.jpeg',
		stock: 15
	}];

	const onAdd = (count, name, brand) => {
		return notification.success({
			description: `${count}x [${brand}] ${name}`,
			message: 'Producto agregado exitosamente'
		});
	};

	return (
		<div className={styles.container}>
			<Row gutter={[24, 24]}>
				<Col span={24}>
					<h2>{greeting}</h2>
				</Col>
				{products.map((product) => (
					<Col xs={24} md={8} key={product.id}>
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
							<ItemCount
								stock={product.stock} initial={1}
								onAdd={(count) => onAdd(count, product.name, product.brand)}
							/>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
}

export default ItemListContainer;