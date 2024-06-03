import React, { useContext } from 'react';
import { getItemContext } from '../../../Provider/GetItemProvider';

const UpdateItemCard = (props) => {
	const item = props.item;
	const {name, _id} = item;
	const {handleGetItem} = useContext(getItemContext)
	return (
		<div>
			<div className='text-white flex items-center justify-between border-b py-3'>
				<div className='flex items-center gap-4'>
					<img className='h-14 w-14 rounded-full' src="https://static.libertyprim.com/files/familles/peche-large.jpg?1574630286" alt="" />
					<h1>{name}</h1>
				</div>
				<div className='flex items-center gap-3'>
					<button onClick={() => handleGetItem(_id, props.search_type, props.input_id)} className='bg-[#F85559] font-medium px-3 rounded-md'>Update It</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateItemCard;