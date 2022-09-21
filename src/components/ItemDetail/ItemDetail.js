import React from 'react';
import styles from './ItemDetail.module.less';
import { Breadcrumb, Carousel, Col, Divider, Rate, Row } from 'antd';
import { Link } from 'react-router-dom';

function ItemDetail({product}) {
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
					<h2>[{product.brand}] {product.productName}</h2>
					<p className={styles.price}>
						{product.priceRange.sellingPrice.highPrice.toLocaleString(
							"es-CL",
							{style: "currency", currency: "CLP"}
						)}
					</p>
					<Rate value={product.rate} disabled />
					<Divider />
					<h3>{product.description}</h3>
					{product.specificationGroups[0].specifications.map((obj, i) => (
						<p key={i}>
							<b>{obj.name}:</b> {obj.values[0]}
						</p>
					))}
				</Col>
			</Row>
		</>
	);
}

export default ItemDetail;