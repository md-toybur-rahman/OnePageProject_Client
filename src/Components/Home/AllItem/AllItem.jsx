import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const AllItem = () => {
	const {user} = useContext(AuthContext);
	const { refetch, isLoading, isError, data: items = [], error } = useQuery({
		queryKey: ['items'],
		queryFn: async () => {
			const res = await fetch('http://localhost:2000/items/')
			return res.json();
		}
	})
	console.log(items);
	const handleCart = (item) => {
		const cartItem = {fruitId: item._id, userEmail:user.email}
		fetch('http://localhost:2000/carts/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(cartItem)
		})
			.then(res => res.json())
			.then(data => {
				if(data.insertedId) {
					Swal.fire({
						position: "top-right",
						icon: "success",
						title: "Item add to Cart",
						showConfirmButton: false,
						timer: 1500
					});
				}
			})
	}
	return (
		<div>
			{
				items.map((item, index) =>
					<div key={index} className='text-white flex items-center justify-between border-b py-3'>
						<div className='flex items-center gap-4'>
							<img className='h-14 w-14 rounded-full' src="https://static.libertyprim.com/files/familles/peche-large.jpg?1574630286" alt="" />
							<h1>{item.name}</h1>
						</div>
						<div className='flex items-center gap-3'>
							<button onClick={() => handleCart(item)} className='border border-blue-100 px-3 rounded-md'>Add to cart</button>
							{/* <button className='border border-blue-100 px-3 rounded-md'>❤🤍</button> */}
						</div>
					</div>)
			}
		</div>
	);
};

export default AllItem;