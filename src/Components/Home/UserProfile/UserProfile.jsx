import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const UserProfile = () => {
	const {user} = useContext(AuthContext)
	return (
		<div>
			<div>
				<div c></div>
			</div>
		</div>
	);
};

export default UserProfile;