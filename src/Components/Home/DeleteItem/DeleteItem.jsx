import React, { useContext } from 'react';
import { SearchContext } from '../../../Provider/SearchProvider';
import SearchBar from '../SearchItem/SearchBar';
import DeleteItemCard from './DeleteItemCard';

const DeleteItem = () => {
	const {deleteSearchItem} = useContext(SearchContext);

	return (
		<div>
			<div className='relative'>
				<SearchBar search_type="delete" input_id="deleteInputField"></SearchBar>

				<div id='updateItemContainer' className={`${deleteSearchItem.length > 0 ? 'block' : 'hidden'} absolute w-full p-2 mt-3`}>
					{
						deleteSearchItem.map(item => <DeleteItemCard key={item._id} item={item} search_type="delete" input_id="deleteInputField"></DeleteItemCard>)
					}
				</div>
			</div>
		</div>
	);
};

export default DeleteItem;