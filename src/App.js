import React from 'react';
import 'antd/dist/antd.less';
import './App.module.less';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CartProvider from './contexts/CartContext';
import Order from './components/Order/Order';
import CategoriesProvider from './contexts/CategoriesContext';

function App() {
	const greeting = 'Productos';
	return (
		<>
			<CartProvider>
				<BrowserRouter>
					<CategoriesProvider>
						<NavBar />
					</CategoriesProvider>
					<Routes>
						<Route path={'/'} element={<ItemListContainer greeting={greeting} />} />
						<Route path={'/category/:catId'} element={<ItemListContainer greeting={greeting} />} />
						<Route path={'/product/:prodId'} element={<ItemDetailContainer />} />
						<Route path={'/cart'} element={<Cart />} />
						<Route path={'/order'} element={<Order />} />
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</>
	);
}

export default App;
