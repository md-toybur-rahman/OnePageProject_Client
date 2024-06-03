import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../../Hooks/useCart';
import useAllItem from '../../../Hooks/useAllItem';
import AllItemCard from './AllItemCard';

const AllItem = () => {
	const { user } = useContext(AuthContext);
	const [, refetch] = useCart();
	const [allItems] = useAllItem();
	const sortedAllItems = [...allItems].sort((a, b) => a.name.localeCompare(b.name));
	const handleCart = (item) => {
		fetch(`http://localhost:2000/carts?email=${user?.email}`)
			.then(res => res.json())
			.then(data => {
				const filterData = data.filter(i => i.fruit_id == item._id);
				if (filterData.length > 0) {
					Swal.fire({
						position: "top-right",
						icon: "success",
						title: "Item already added in Cart",
						showConfirmButton: false,
						timer: 1500
					});
				}
				else {
					const cartItem = { fruit: item, user_email: user.email }
					fetch('http://localhost:2000/carts/', {
						method: 'POST',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify(cartItem)
					})
						.then(res => res.json())
						.then(data => {
							if (data.insertedId) {
								refetch();
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
			})
	}
	return (
		<div>
			{
				sortedAllItems.map((item) => <AllItemCard key={item._id} item={item} handleCart={handleCart}></AllItemCard>)
			}
		</div>
	);
};

export default AllItem;