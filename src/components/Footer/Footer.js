import React, { useEffect, useState } from 'react';
import { useCategories } from '../../contexts/CategoriesContext';
import { Link } from 'react-router-dom';
import styles from './Footer.module.less';
import logo from '../../assets/logo.svg';
import { Button, Col, Form, Input, Row, Tooltip } from 'antd';

function Footer() {
	const {categories} = useCategories();
	const [firstHalf, setFirstHalf] = useState([]);
	const [secondHalf, setSecondHalf] = useState([]);

	const setCategoryLists = () => {
		const half = Math.ceil(categories.length / 2);
		setFirstHalf(categories.slice(0, half));
		setSecondHalf(categories.slice(half));
	}

	const onFinish = () => {
		console.log('¡Próximamente!');
	};

	useEffect(() => {
		setCategoryLists();
		console.log(firstHalf);
	}, [categories])

	return (
		<div className={styles.wrapper}>
			<div className={`container ${styles.container}`}>
				<Row gutter={[32, 32]}>
					<Col xs={24} sm={8} lg={4} className={styles.logoWrapper}>
						<Link to={'/'}>
							<img src={logo} alt="logo" className={styles.logo} />
						</Link>
					</Col>
					<Col xs={12} sm={8} lg={6}>
						<div className={styles.catWrapper}>
							<h3>Categorías</h3>
							{firstHalf.map(cat => <Link key={cat.id} to={`/category/${cat.handle}`}>{cat.name}</Link>)}
						</div>
					</Col>
					<Col xs={12} sm={8} lg={6}>
						<div className={styles.catWrapper}>
							<h3>&nbsp;</h3>
							{secondHalf.map(cat => <Link key={cat.id} to={`/category/${cat.handle}`}>{cat.name}</Link>)}
						</div>
					</Col>
					<Col xs={24} sm={24} lg={8}>
						<h3>¡Suscríbete a nuestro Newsletter!</h3>
						<Form onFinish={onFinish}>
							<Input.Group compact>
								<Input className={styles.input} placeholder={'Ingresa tu email'} />
								<Tooltip title={'¡Próximamente!'}>
									<Button type="primary" htmlType="submit">Suscribirme</Button>
								</Tooltip>
							</Input.Group>
						</Form>
					</Col>
					<Col xs={24}>
						<p className={styles.copyright}>© 2022 <Link to={'/'}>OrganicShop</Link>. Todos los derechos
							reservados.</p>
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default Footer;