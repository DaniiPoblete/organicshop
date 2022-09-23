import React from 'react';
import 'antd/dist/antd.less';
import './App.module.less';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';

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
					<Route path={"/cart"} element={<Cart />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
