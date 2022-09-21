import React from 'react';
import 'antd/dist/antd.less';
import './App.module.less';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	const greeting = 'Productos';
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path={"/"} element={<ItemListContainer greeting={greeting} />} />
					<Route path={"/category/:catId"} element={<ItemListContainer greeting={greeting} />} />
					<Route path={"/product/:prodId"} element={<ItemDetailContainer />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
