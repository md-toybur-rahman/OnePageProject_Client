import React from 'react';

const LastAddedItemCard = (props) => {
	const item = props.item;
	const {name, _id} = item;
	return (
		<div>
			<div className='text-white flex items-center justify-between border-b py-3'>
				<div className='flex items-center gap-4'>
					<img className='h-14 w-14 rounded-full' src="https://static.libertyprim.com/files/familles/peche-large.jpg?1574630286" alt="" />
					<h1>{name}</h1>
				</div>
				<div className='flex items-center gap-3'>
					<button className='bg-[#F85559] font-medium px-3 rounded-md'>Details</button>
				</div>
			</div>
		</div>
	);
};

export default LastAddedItemCard;