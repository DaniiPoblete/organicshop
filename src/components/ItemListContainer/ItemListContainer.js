import React, { useState } from 'react';
import styles from './ItemListContainer.module.less';
import ItemCount from '../ItemCount/ItemCount';
import { Card, Col, Divider, notification, Row } from 'antd';
import Meta from 'antd/es/card/Meta';

function ItemListContainer({greeting}) {
	const productList = [{
		id: 1,
		name: 'Birch Juice Serum',
		brand: 'Round Lab',
		desc: 'Descripción del producto',
		src: 'Round-Lab-Birch-Juice-Serum-2.jpeg',
		stock: 10,
		price: 24990
	}, {
		id: 2,
		name: 'Set de 3 serums mini',
		brand: 'Beauty of Joseon',
		desc: 'Descripción del producto',
		src: 'Beauty-of-Joseon-Trio-Serum-Gift-Set-2.jpeg',
		stock: 5,
		price: 22990
	}, {
		id: 3,
		name: 'Calendula Complete Cleansing Oil',
		brand: 'IUNIK',
		desc: 'Descripción del producto',
		src: 'iUnik-Calendula-Complete-Cleansing-Oil-4.jpeg',
		stock: 15,
		price: 23990
	}, {
		id: 4,
		name: 'Lip & Eye Remover',
		brand: 'Etude House',
		desc: 'Descripción del producto',
		src: 'Etude-House-Lip-Eye-Remover-6.jpeg',
		stock: 4,
		price: 4990
	}];

	const [products, setProducts] = useState(productList);

	const onAdd = (count, product) => {
		return notification.success({
			description: `${count}x [${product.brand}] ${product.name}`,
			message: 'Producto agregado exitosamente'
		});
	};

	const onCountChange = (count, product) => {
		product.totalPrice = product.price * count;
		setProducts([...products]);
	};

	return (
		<div className={styles.container}>
			<Row gutter={[24, 24]}>
				<Col span={24}>
					<h2>{greeting}</h2>
				</Col>
				{products.map((product) => (
					<Col xs={24} sm={12} md={8} lg={6} key={product.id}>
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
					</Col>
				))}
			</Row>
		</div>
	);
}

export default ItemListContainer;