import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import CartItem from '../CartItem/CartItem';
import styles from './Order.module.less';
import { useCart } from '../../contexts/CartContext';
import { Empty, Space, Spin } from 'antd';

function Order() {
	const [isLoading, setIsLoading] = useState(true);
	const [order, setOrder] = useState({});

	const {orderId} = useCart();

	const getOrder = async () => {
		try {
			setIsLoading(true);
			const sellingCollection = collection(db, 'selling');
			const refDoc = doc(sellingCollection, orderId);
			const data = await getDoc(refDoc);

			setOrder({...data.data()});
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getOrder();
	}, [orderId]);

	return (
		<div className={`container ${styles.container}`}>
			{isLoading ?
				<div className={styles.spinner}>
					<Spin size="large" />
				</div> :
				(order.items ?
						<Space size={32} direction="vertical">
							<h2>Detalles de la compra ({orderId})</h2>
							{order.items.map(obj => (
								<CartItem key={obj.item.id} obj={obj} isOrderView={true} />
							))}
							<div>
								<p className={styles.total}>Total: {order.total.toLocaleString('es-CL', {
									style: 'currency',
									currency: 'CLP'
								})}</p>
							</div>
						</Space>
						:
						<Empty description={'No hay ninguna compra asociada al código ingresado'} />
				)
			}
		</div>
	);
}

export default Order;