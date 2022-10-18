import React from 'react';
import styles from './ItemDetail.module.less';
import { Button, Col, Image, Rate, Row, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';

function ItemDetail({product, onAdd, onCountChange, showCount, currentStock}) {
	return (
		<Row gutter={[32, 32]}>
			<Col xs={24} md={12}>
				<Image src={product.image} />
			</Col>
			<Col xs={24} md={12}>
				<h2>[{product.vendor}] {product.title}</h2>
				<Rate value={product.rate} disabled />
				<p className={styles.price}>
					{product.totalPrice?.toLocaleString(
						"es-CL",
						{style: "currency", currency: "CLP"}
					)}
				</p>
				<p className={styles.stock}>{product.stock} unidad(es) en stock.</p>
				<div className={styles.count}>
					{showCount ?
						<ItemCount
							stock={currentStock} initial={1}
							onAdd={(count) => onAdd(count, product)}
							onCountChange={(count) => onCountChange(count, product)}
						/>
						:
						<Link to={"/cart"}>
							<Button type="primary">Terminar mi compra</Button>
						</Link>
					}
				</div>
				<Tabs>
					<Tabs.TabPane tab="Descripción" key={0}>
						<div dangerouslySetInnerHTML={{__html: product.description}} />
					</Tabs.TabPane>
				</Tabs>
			</Col>
		</Row>
	);
}

export default ItemDetail;