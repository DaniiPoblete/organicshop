import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styles from './Cart.module.less';
import { Button, Col, Empty, Modal, Row, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import CartForm from '../CartForm/CartForm';

function Cart() {
	const {cart, totalPrice, removeItem, clear, updateItem, resetCart} = useCart();
	const navigate = useNavigate();

	const showModal = (id) => {
		Modal.success({
			title: '¡Compra finalizada!',
			content: (
				<div>
					<br />
					<h4>Gracias por comprar con nosotros.</h4>
					<h4>El ID de tu compra es: <b>{id}</b></h4>
				</div>
			),
			onOk() {
				navigate("/");
			}
		});
	};

	return (
		<div className={`container ${styles.container}`}>
			<h2 className={styles.title}>Carrito de compras</h2>
			{cart.length > 0 ?
				(<Space size={32} direction={"vertical"}>
					<Button onClick={() => clear()}>Limpiar carrito</Button>
					<div>
						{cart.map(obj => (
							<CartItem key={obj.item.id} obj={obj} removeItem={removeItem} updateItem={updateItem} />
						))}
					</div>
					<div>
						<p className={styles.total}>Total: {totalPrice.toLocaleString("es-CL", {
							style: "currency",
							currency: "CLP"
						})}</p>
					</div>
					<Row gutter={[24, 24]}>
						<Col xs={24} md={14}>
							<CartForm cart={cart} totalPrice={totalPrice} resetCart={resetCart} showModal={showModal} />
						</Col>
					</Row>
				</Space>)
				:
				<Empty description={<p>No hay productos en el carrito. <Link to={"/"}>Ir al inicio</Link></p>} />
			}
		</div>
	);
}

export default Cart;