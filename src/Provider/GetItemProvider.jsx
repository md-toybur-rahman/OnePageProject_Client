import React, { createContext, useContext, useState } from 'react';
import { SearchContext } from './SearchProvider';

export const getItemContext = createContext(null)

const GetItemProvider = ({children}) => {

	const [item, setItem] =useState([]);
	const {handleClear} = useContext(SearchContext);
	const handleGetItem = (id, search_type, input_id) => {
		const form = document.getElementById(input_id);
		// form.preventDefault();
		fetch(`http://localhost:2000/items?id=${id}`)
			.then(res => res.json())
			.then(data => {
				setItem(data);
				handleClear(input_id);
			})
	}

	const value = {
		item,
		handleGetItem
	}
	return (
		<getItemContext.Provider value={value}>
			{children}
		</getItemContext.Provider>
	);
};

export default GetItemProvider;