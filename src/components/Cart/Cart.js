import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styles from './Cart.module.less';
import { Button, Col, Empty, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import CartForm from '../CartForm/CartForm';

function Cart() {
	const {cart, totalPrice, removeItem, clear, updateItem, resetCart} = useCart();

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
							<CartForm cart={cart} totalPrice={totalPrice} resetCart={resetCart} />
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