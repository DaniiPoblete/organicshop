import React from 'react';
import './ItemListContainer.css';

function ItemListContainer({greeting}) {
	return (
		<div className="container">
			<h1>{greeting}</h1>
		</div>
	);
}

export default ItemListContainer;