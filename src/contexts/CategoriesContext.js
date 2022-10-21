import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

function CategoriesProvider({children}) {
	const [categories, setCategories] = useState([]);

	const getCategories = async () => {
		try {
			const categoriesCollection = collection(db, 'categories');
			const data = await getDocs(categoriesCollection);
			const categoriesList = data.docs.map(product => {
				return {...product.data(), id: product.id};
			});

			setCategories(categoriesList);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	return (
		<CategoriesContext.Provider value={{categories}}>
			{children}
		</CategoriesContext.Provider>
	);
}

export default CategoriesProvider;