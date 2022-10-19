import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './CartForm.module.less';

function CartForm({cart, totalPrice, resetCart, showModal}) {
	const [isLoading, setIsLoading] = useState(false);

	const onFinish = async (formValues) => {
		try {
			setIsLoading(true);
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
		} finally {
			setIsLoading(false);
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
			span: 8
		}
	};

	const validateMessages = {
		required: 'Por favor, completa este campo.',
		whitespace: 'Por favor, completa este campo.',
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
						   hasFeedback
						   rules={[{required: true, whitespace: true}]}>
					<Input placeholder={"Ingresa tu nombre"} />
				</Form.Item>
				<Form.Item label="Apellido"
						   name="lastname"
						   hasFeedback
						   rules={[{required: true, whitespace: true}]}>
					<Input placeholder={"Ingresa tu apellido"} />
				</Form.Item>
				<Form.Item label="Email"
						   name="email"
						   hasFeedback
						   rules={[{required: true, type: 'email'}]}>
					<Input placeholder={"Ingresa tu email"} />
				</Form.Item>
				<Form.Item label="Confirmar email"
						   name="email2"
						   hasFeedback
						   rules={[{required: true}, ({getFieldValue}) => ({
							   validator(_, value) {
								   if (!value || getFieldValue('email') === value) {
									   return Promise.resolve();
								   }
								   return Promise.reject('Los emails no coinciden.');
							   }
						   })]}>
					<Input placeholder={"Confirma tu email"} />
				</Form.Item>
				<Form.Item>
					<Button className={styles.button} type="primary" htmlType="submit" loading={isLoading}>
						Finalizar compra
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default CartForm;
