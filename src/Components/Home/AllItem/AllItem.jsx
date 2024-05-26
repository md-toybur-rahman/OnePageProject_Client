import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllItem = () => {
	const { refetch, isLoading, isError, data: items = [], error } = useQuery({
		queryKey: ['items'],
		queryFn: async () => {
			const res = await fetch('http://localhost:2000/items/')
			return res.json();
		}
	})
	console.log(items);
	return (
		<div>
			{
				items.map(item =>
					<div className='text-white flex items-center justify-between border-b py-3'>
						<div className='flex items-center gap-4'>
							<img className='h-14 w-14 rounded-full' src="https://static.libertyprim.com/files/familles/peche-large.jpg?1574630286" alt="" />
							<h1>{item.name}</h1>
						</div>
						<div className='flex items-center gap-3'>
							<button className='border border-blue-100 px-3 rounded-md'>Add to cart</button>
							<button className='border border-blue-100 px-3 rounded-md'>❤🤍</button>
						</div>
					</div>)
			}
		</div>
	);
};

export default AllItem;