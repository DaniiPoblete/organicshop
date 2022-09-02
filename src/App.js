import React from 'react';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {
	const greeting = 'Spiral out.. keep going..';
	return (
		<>
			<NavBar />
			<ItemListContainer greeting={greeting} />
		</>
	);
}

export default App;
