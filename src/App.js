import React from 'react';
import 'antd/dist/antd.less';
import './App.module.less';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
	const greeting = 'Productos';
	return (
		<>
			<NavBar />
			<ItemListContainer greeting={greeting} />
			<ItemDetailContainer />
		</>
	);
}

export default App;
