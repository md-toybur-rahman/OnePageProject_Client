import React from 'react';
import useAllItem from '../../../Hooks/useAllItem';
import LastAddedItemCard from './LastAddedItemCard';

const LastAdded = () => {
	const [allItems] = useAllItem();
	const reversedLastFiveItems = [...allItems].slice(-5).reverse();
	return (
		<div>
			{
				reversedLastFiveItems.map(item => <LastAddedItemCard key={item._id} item={item}></LastAddedItemCard>)
			}
		</div>
	);
};

export default LastAdded;