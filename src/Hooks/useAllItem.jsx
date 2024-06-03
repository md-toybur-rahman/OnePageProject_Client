import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAllItem = () => {
	const {user} = useContext(AuthContext);
	const { refetch, isLoading,  isError, data: allItems = [], error} = useQuery({
		queryKey: ['allItems'],
		queryFn: async () => {
			const res = await fetch(`http://localhost:2000/items/`)
			return res.json();
		}
	})
	if(user) {
		return [allItems, refetch];
	}
	else{
		return [];
	}
};

export default useAllItem;