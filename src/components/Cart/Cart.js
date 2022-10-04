import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styles from './Cart.module.less';
import { Button, Col, Empty, Image, Row } from 'antd';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

function Cart() {
	const cart = useCart();

	return (
		<div className={`container ${styles.container}`}>
			<h2>Carrito de compras</h2>
			{cart.cart.length > 0 ?
				(<Row gutter={[24, 24]}>
					<Col xs={24} lg={16}>
						<Button className={styles.clear} onClick={() => cart.clear()}>Limpiar carrito</Button>
						{cart.cart.map(obj => (
							<div className={styles.listItem} key={obj.item.id}>
								<div className={styles.removeItem}>
									<Button type="link" onClick={() => cart.removeItem(obj.item.id)}
											icon={<CloseOutlined />}>
									</Button>
								</div>
								<Image src={obj.item.featured_image} />
								<div className={styles.detail}>
									<Link to={`/product/${obj.item.id}`} key={obj.item.id}>
										<p className={styles.title}>{obj.item.title}</p>
									</Link>
									<p className={styles.price}>{obj.item.price.toLocaleString("es-CL", {
										style: "currency",
										currency: "CLP"
									})}</p>
									<p>Cantidad: {obj.quantity}</p>
								</div>
							</div>
						))}
					</Col>
					<Col xs={24} lg={8}>
						<h3>El total de tu compra es:</h3>
						<p className={styles.total}>{cart.getTotalPrice().toLocaleString("es-CL", {
							style: "currency",
							currency: "CLP"
						})}</p>
					</Col>
				</Row>)
				:
				<Empty description={<p>No hay productos en el carrito. <Link to={"/"}>Ir al inicio</Link></p>} />
			}
		</div>
	);
}

export default Cart;