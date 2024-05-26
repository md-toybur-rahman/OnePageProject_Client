import React from 'react';
import Swal from 'sweetalert2';

const CartCard = ({ item, refetch }) => {
	const { _id, fruit } = item;
	const { name } = fruit;
	console.log(name);
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:2000/carts?id=${id}`, {
					method: 'DELETE',
				})
					.then(res => res.json())
					.then(data => {
						if (data.deletedCount > 0) {
							Swal.fire({
								title: "Deleted!",
								text: "Your file has been deleted.",
								icon: "success"
							});
							refetch();
						}
					})
			}
		});
	}
	return (
		<div>
			<div className='text-white flex items-center justify-between border-b py-3'>
				<div className='flex items-center gap-4'>
					<img className='h-14 w-14 rounded-full' src="https://static.libertyprim.com/files/familles/peche-large.jpg?1574630286" alt="" />
					<h1>{name}</h1>
				</div>
				<div className='flex items-center gap-3'>
					<button onClick={() => handleDelete(_id)} className='border border-blue-100 px-3 rounded-md'>Delete</button>
				</div>
			</div>
		</div>
	);
};

export default CartCard;