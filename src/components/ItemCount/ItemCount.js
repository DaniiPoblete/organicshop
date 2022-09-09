import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from './ItemCount.module.less';

function ItemCount({stock, initial, onAdd, onCountChange}) {
	const [count, setCount] = useState(initial);

	const decrease = () => {
		setCount(count - 1);
	};

	const increase = () => {
		setCount(count + 1);
	};

	useEffect(() => {
		onCountChange(count);
	}, [count]);

	return (
		<div className={styles.itemCount}>
			<div className={styles.controls}>
				<Button onClick={decrease} disabled={count <= 1}>-</Button>
				<span className={styles.count}>{count}</span>
				<Button onClick={increase} disabled={count >= stock}>+</Button>
			</div>
			<Button type="primary" disabled={stock === 0} onClick={() => onAdd(count)}>
				Agregar al carrito
			</Button>
		</div>
	);
}

export default ItemCount;