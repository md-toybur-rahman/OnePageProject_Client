import React, { useState } from 'react';
import AllItem from './AllItem/AllItem';
import Card from './Card';
import UserProfile from './UserProfile/UserProfile';
import SearchItem from './SearchItem/SearchItem';
import CartAndFavorite from './CartAndFavorite/CartAndFavorite';
import LastAdded from './LastAdded/LastAdded';
import AddItem from './AddItem/AddItem';
import UpdateItem from './UpdateItem/UpdateItem';
import DeleteItem from './DeleteItem/DeleteItem';
import ApproveItem from './ApproveItem/ApproveItem';

const Home = () => {

	return (
		<div>
			<div className="grid grid-cols-3 gap-4 my-8 text-white">
				<Card title="User Profile" component={<UserProfile></UserProfile>}></Card>
				<Card title="All Item" component={<AllItem></AllItem>}></Card>
				<Card title="Search Item" component={<SearchItem></SearchItem>}></Card>
				<Card title="Carts" component={<CartAndFavorite></CartAndFavorite>}></Card>
				<Card title="Last Added Item" component={<LastAdded></LastAdded>}></Card>
				<Card title="Add Item" component={<AddItem></AddItem>}></Card>
				<Card title="Update Item" component={<UpdateItem></UpdateItem>}></Card>
				<Card title="Delete Item" component={<DeleteItem></DeleteItem>}></Card>
				<Card title="Approve Section" component={<ApproveItem></ApproveItem>}></Card>
			</div>
		</div>
	);
};

export default Home;