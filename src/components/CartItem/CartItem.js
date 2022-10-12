import React from 'react';
import styles from '../CartItem/CartItem.module.less';
import { Button, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';

function CartItem({obj, removeItem, updateItem}) {
	const onCountChange = (count, product) => {
		updateItem(product, count);
	};

	return (
		<div className={styles.listItem} key={obj.item.id}>
			<Button type="link" onClick={() => removeItem(obj.item.id)}
					icon={<DeleteOutlined />}>
			</Button>
			<Image src={obj.item.image} />
			<div className={styles.info}>
				<Link to={`/product/${obj.item.id}`} key={obj.item.id}>
					<p className={styles.name}>{obj.item.title}</p>
				</Link>
				<p>(x {obj.item.price.toLocaleString("es-CL", {
					style: "currency",
					currency: "CLP"
				})})</p>
			</div>
			<div className={styles.detail}>
				<ItemCount
					stock={obj.item.stock} initial={obj.quantity}
					onCountChange={(count) => onCountChange(count, obj.item)}
					showAddButton={false}
				/>
				<p className={styles.totalPrice}>{obj.totalPrice.toLocaleString("es-CL", {
					style: "currency",
					currency: "CLP"
				})}</p>
			</div>
		</div>
	);
}

export default CartItem;