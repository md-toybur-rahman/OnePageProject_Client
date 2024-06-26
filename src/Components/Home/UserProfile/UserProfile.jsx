import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const UserProfile = () => {
	const { user } = useContext(AuthContext);
	const [userData, setUserData] = useState({});
	useEffect( () => {
		if(user) {
			fetch(`http://localhost:2000/users?email=${user?.email}`)
				.then(res => res.json())
				.then(data => {
					setUserData(data[0])
				})
		}
	}, [])
	const {first_name, last_name, email, phone_number, gender, address, user_role} = userData;
	return (
		<div>
			<div className='flex justify-center'>
				<div className="bg-[url('https://media.licdn.com/dms/image/D4D03AQG5CmsynJxUDg/profile-displayphoto-shrink_800_800/0/1713860584163?e=2147483647&v=beta&t=751B-oUARgTB_7wlfsezqtFrh3EQrWG6kTn-S72_CwI')] h-20 w-20 bg-cover rounded-full"></div>
			</div>
			<div className='mt-3 leading-8'>
				<h1>Name: {first_name} {last_name}</h1>
				<h1>Email: {email}</h1>
				<h1>Phone Number: {phone_number}</h1>
				<h1>Gender: {gender}</h1>
				<h1>Address: {address}</h1>
				<h1>User Type: {user_role? user_role : 'Normal User'}</h1>
			</div>
		</div>
	);
};

export default UserProfile;