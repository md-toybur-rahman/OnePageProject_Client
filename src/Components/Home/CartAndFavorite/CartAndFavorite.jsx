import React from 'react';
import CartCard from './CartCard';
import useCart from '../../../Hooks/useCart';

const CartAndFavorite = () => {
	const [cart, refetch] = useCart();
	return (
		<div>
			{
				cart.map((item, index) => <CartCard key={index} item={item} refetch={refetch}></CartCard>)
			}
		</div>
	);
};

export default CartAndFavorite;