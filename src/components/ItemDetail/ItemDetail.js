import React from 'react';
import styles from './ItemDetail.module.less';
import { Breadcrumb, Carousel, Col, Divider, Rate, Row, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';

function ItemDetail({product, onAdd, onCountChange}) {
	return (
		<>
			<Breadcrumb className={styles.breadcrumb}>
				<Breadcrumb.Item>
					<Link to={`/category/${product.categoryId}`}>{product.category}</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					{product.productName}
				</Breadcrumb.Item>
			</Breadcrumb>
			<Row gutter={[32, 32]}>
				<Col xs={24} md={12}>
					<Carousel effect="fade" autoplay>
						{product.items[0].images.map(obj => (
							<img src={obj.imageUrl} alt="" key={obj.imageId} />
						))}
					</Carousel>
				</Col>
				<Col xs={0} md={2} />
				<Col xs={24} md={10}>
					<div className={styles.header}>
						<h2>[{product.brand}] {product.productName}</h2>
						<Rate value={product.rate} disabled />
						<p className={styles.price}>
							{product.totalPrice?.toLocaleString(
								"es-CL",
								{style: "currency", currency: "CLP"}
							)}
						</p>
					</div>
					<ItemCount
						stock={product.stock} initial={1}
						onAdd={(count) => onAdd(count, product)}
						onCountChange={(count) => onCountChange(count, product)}
					/>
					<Divider />
					<Tabs>
						<Tabs.TabPane tab="Descripción" key={0}>
							{product.description}
						</Tabs.TabPane>
						{product.specificationGroups[0].specifications.map((obj, i) => (
							<Tabs.TabPane tab={obj.name} key={i + 1}>
								{obj.values[0]}
							</Tabs.TabPane>
						))}
					</Tabs>
				</Col>
			</Row>
		</>
	);
}

export default ItemDetail;