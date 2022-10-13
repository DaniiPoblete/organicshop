import React from 'react';
import { Button, Form, Input } from 'antd';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './CartForm.module.less';

function CartForm({cart, totalPrice, resetCart, showModal}) {

	const onFinish = async (formValues) => {
		try {
			const sellingCollection = collection(db, 'selling');
			const data = {
				buyer: formValues,
				items: cart,
				total: totalPrice,
				date: serverTimestamp()
			};

			const saveData = await addDoc(sellingCollection, data);
			await updateItemsStock();
			resetCart();
			showModal(saveData.id);
		} catch (e) {
			console.log('Error: ', e);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Error en form:', errorInfo);
	};

	const updateItemsStock = async () => {
		cart.map(async (obj) => {
			const item = doc(db, 'products', obj.item.id);
			await updateDoc(item, {stock: obj.item.stock - obj.quantity});
		});
	};

	const layout = {
		labelCol: {
			span: 4
		}
	};

	const validateMessages = {
		required: 'Por favor, ingresa tu ${label}.',
		types: {
			email: 'Por favor, ingresa un email válido.'
		}
	};

	return (
		<>
			<h3 className={styles.title}>Ingresa tus datos para finalizar</h3>
			<Form onFinish={onFinish}
				  onFinishFailed={onFinishFailed}
				  autoComplete="off"
				  {...layout}
				  validateMessages={validateMessages}>
				<Form.Item label="Nombre"
						   name="name"
						   rules={[{required: true}]}>
					<Input />
				</Form.Item>
				<Form.Item label="Apellido"
						   name="lastname"
						   rules={[{required: true}]}>
					<Input />
				</Form.Item>
				<Form.Item label="Email"
						   name="email"
						   rules={[{required: true, type: 'email'}]}>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button className={styles.button} type="primary" htmlType="submit">
						Finalizar compra
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default CartForm;
