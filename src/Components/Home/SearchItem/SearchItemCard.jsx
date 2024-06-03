import React, { useState } from 'react';
import useAllItem from '../../../Hooks/useAllItem';

const SearchItemCard = (props) => {
	const item = props.item;
	const { name, price, category, rating, imported_country, available_quantity, description, image_url } = item;
	const [isExpanded, setIsExpanded] = useState(false);
	const [, refetch] = useAllItem();
	const handleDetails = (id) => {
		refetch();
		const container = document.getElementById(id);
		if (container.classList.contains('height-0')) {
			setIsExpanded(!isExpanded);
		}
		else {
			setIsExpanded(!isExpanded);
		}
	}
	return (
		<div>
			<div className='text-white flex items-center justify-between border-b py-3'>
				<div className='flex items-center gap-4'>
					<img className='h-14 w-14 rounded-full' src="https://static.libertyprim.com/files/familles/peche-large.jpg?1574630286" alt="" />
					<h1>{name}</h1>
				</div>
				<div className='flex items-center gap-3'>
				<button onClick={() => handleDetails(`searchItemsDetailsContainer${name}`)} className='bg-[#F85559] font-medium px-3 rounded-md'>Details</button>
				</div>
			</div>
			<div id={`searchItemsDetailsContainer${name}`} className={`mt-3 h-0 overflow-y-hidden  height-transition ${isExpanded ? 'height-full' : 'height-0'}`}>
				<div className='grid gap-3'>
					<div className='grid grid-cols-2 items-center gap-3'>
						<h1>Fruit Name: {name}</h1>
						<h1>Price: {price}</h1>
						<h1>Category: {category}</h1>
						<h1>Ratings: {rating}</h1>
					</div>
					<div className='grid grid-cols-1 items-center gap-3'>
						<h1>Imported Country: {imported_country}</h1>
						<h1>Available Quantity: {available_quantity}</h1>
						<h1>Description: {description}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchItemCard;