import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
import SearchBar from './SearchBar';
import SearchProvider, { SearchContext } from '../../../Provider/SearchProvider';
import SearchItemCard from './SearchItemCard';

const SearchItem = () => {
	const { searchItem } = useContext(SearchContext);

	return (
		<div>
			<div>
				<SearchBar search_type="search" input_id="searchInputField"></SearchBar>
			</div>

			<div className='mt-3 min-h-[250px]'>
				{
					searchItem.map(item => <SearchItemCard key={item._id} item={item}></SearchItemCard>)
				}
			</div>

		</div>
	);
};

export default SearchItem;