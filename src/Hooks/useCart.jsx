import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
	const {user} = useContext(AuthContext);
	const { refetch, isLoading,  isError, data: cart = [], error} = useQuery({
		queryKey: ['carts', user?.email],
		queryFn: async () => {
			const res = await fetch(`http://localhost:2000/carts?email=${user?.email}`)
			return res.json();
		}
	})
	if(user) {
		return [cart, refetch];
	}
	else{
		return [];
	}
};

export default useCart;