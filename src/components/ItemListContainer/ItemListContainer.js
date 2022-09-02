import React from 'react';
import styles from './ItemListContainer.module.css';

function ItemListContainer({greeting}) {
	return (
		<div className={styles.container}>
			<h1>{greeting}</h1>
		</div>
	);
}

export default ItemListContainer;