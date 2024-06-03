import React, { createContext, useState } from 'react';
import useAllItem from '../Hooks/useAllItem';
export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
	const [searchItem, setSearchItem] = useState([]);
	const [updateSearchItem, setUpdateSearchItem] = useState([]);
	const [deleteSearchItem, setDeleteSearchItem] = useState([]);

	const onSubmit = (data) => {
		const searchText = data.search.toLowerCase();
		const searchType = data.search_type;
		if (searchText.length < 2 && searchType == "search") {
			setSearchItem([]);
		}
		else if (searchText.length < 2 && searchType == "update") {
			setUpdateSearchItem([]);
		}
		else if (searchText.length < 2 && searchType == "delete") {
			setDeleteSearchItem([]);
		}
		else {
			fetch('http://localhost:2000/items')
				.then(res => res.json())
				.then(fruitData => {
					const filterData = fruitData.filter(item => {
						if (item.name && typeof item.name === 'string') {
							let name = item.name.toLowerCase();
							return name.includes(searchText);
						}
						return false;
					})
					if (searchType == "search") {
						setSearchItem(filterData);
					}
					else if (searchType == "update") {
						setUpdateSearchItem(filterData);
					}
					else if (searchType == "delete") {
						setDeleteSearchItem(filterData);
					}
				})
		}
	}
	const handleClear = (id) => {
		let searchField = document.getElementById(id);
		searchField.value = ''
		setSearchItem([]);
		setUpdateSearchItem([]);
	}

	const contextValue = {
		onSubmit,
		handleClear,
		searchItem,
		updateSearchItem,
		setUpdateSearchItem,
		deleteSearchItem,
		setDeleteSearchItem
	}
	return (
		<SearchContext.Provider value={contextValue}>
			{children}
		</SearchContext.Provider>
	)
};

export default SearchProvider;