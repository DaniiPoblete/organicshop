import React from 'react';
import { Col, Row } from 'antd';
import Item from '../Item/Item';

function ItemList({products}) {
	return (
		<Row gutter={[24, 24]}>
			{products.map((product) => (
				<Col xs={24} sm={12} md={8} lg={6} key={product.id}>
					<Item product={product} />
				</Col>
			))}
		</Row>
	);
}

export default ItemList;